export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const NOTION_EVENTS_TOKEN = process.env.NOTION_EVENTS_API_TOKEN!;
const EVENTS_DATABASE_ID = process.env.NOTION_EVENTS_DATABASE_ID!;

const notion = new Client({ auth: NOTION_EVENTS_TOKEN });

type EventItem = {
  id: string;
  title: string;
  description?: string;
  start: string;
  end?: string;
  location?: string;
  link?: string;
  tags?: string[];
  status?: string;
  url: string;
};

function getPlainRichText(rich: any[]): string | undefined {
  if (!Array.isArray(rich) || rich.length === 0) return undefined;
  return rich.map((r) => r.plain_text).join("").trim() || undefined;
}

function getTagsFromMultiSelect(multiSelect: any[]): string[] {
  if (!Array.isArray(multiSelect)) return [];
  return multiSelect.map((tag) => tag.name).filter(Boolean);
}

function toEventItem(p: any): EventItem {
  const props = p.properties || {};
  const title = (props["Name"]?.title?.[0]?.plain_text || "").trim();
  const dateProperty = props["Date"]?.date;

  const start = dateProperty?.start || "";
  const end = dateProperty?.end || undefined;

  const description = getPlainRichText(props["Description"]?.rich_text ?? []);
  const location = getPlainRichText(props["Location"]?.rich_text ?? []);
  const link = props["Link"]?.url || undefined;
  const tags = getTagsFromMultiSelect(props["Tags"]?.multi_select ?? []);
  const status = props["Status"]?.select?.name || "Active";

  return {
    id: p.id,
    title,
    description,
    start,
    end,
    location,
    link,
    tags,
    status,
    url: p.url,
  };
}

export async function GET() {
  try {
    if (!NOTION_EVENTS_TOKEN || !EVENTS_DATABASE_ID) {
      console.error("Missing environment variables:", {
        hasToken: !!NOTION_EVENTS_TOKEN,
        hasDatabase: !!EVENTS_DATABASE_ID,
      });
      return NextResponse.json(
        { error: "Missing NOTION_EVENTS_API_TOKEN or NOTION_EVENTS_DATABASE_ID" },
        { status: 500 }
      );
    }

    console.log("Events API token format check:", {
      tokenPrefix: NOTION_EVENTS_TOKEN.substring(0, 10) + "...",
      tokenLength: NOTION_EVENTS_TOKEN.length,
      databaseId: EVENTS_DATABASE_ID,
    });

    console.log("Attempting to query Notion events database:", EVENTS_DATABASE_ID);

    // Runtime guard + type escape so TS is happy
    const hasQueryMethod = typeof (notion.databases as any).query === "function";
    if (!hasQueryMethod) {
      console.error(
        "notion.databases.query is not a function. Check your @notionhq/client version."
      );
      return NextResponse.json(
        {
          error: "Notion SDK error: databases.query method not available",
          details: "Please check your @notionhq/client version and installation",
        },
        { status: 500 }
      );
    }

    const response = await (notion.databases as any).query({
      database_id: EVENTS_DATABASE_ID,
      sorts: [{ property: "Date", direction: "ascending" }],
      // filter: { property: "Status", select: { equals: "Active" } },
    });

    console.log(`Found ${response.results.length} events in database`);

    const events = response.results.map(toEventItem);
    const validEvents = events.filter((event: EventItem) => event.title && event.start);

    console.log(`Returning ${validEvents.length} valid events`);

    return NextResponse.json({ events: validEvents }, { status: 200 });
  } catch (error: any) {
    console.error("Notion Events API Error:", error);
    console.error("Error details:", {
      message: error.message,
      code: error.code,
      status: error.status,
      stack: error.stack,
    });

    if (error.code === "unauthorized") {
      return NextResponse.json(
        {
          error: "Unauthorized: Check your API token and database permissions",
          details: "Make sure your integration is shared with the events database",
        },
        { status: 401 }
      );
    }

    if (error.code === "object_not_found") {
      return NextResponse.json(
        {
          error: "Database not found: Check your NOTION_EVENTS_DATABASE_ID",
          databaseId: EVENTS_DATABASE_ID,
        },
        { status: 404 }
      );
    }

    // IMPORTANT: avoid `typeof notion.databases.query` here; use the same guard
    const hasQueryMethod =
      typeof (notion.databases as any).query === "function";

    return NextResponse.json(
      {
        error: "Failed to fetch events data from Notion",
        details: error.message || "Unknown error",
        errorType: typeof error,
        hasQuery: hasQueryMethod, // boolean, no TS error
      },
      { status: 500 }
    );
  }
}
