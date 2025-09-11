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
  url: string; // Notion page URL
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
  
  // Handle date range or single date
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
    // Check if environment variables are set
    if (!NOTION_EVENTS_TOKEN || !EVENTS_DATABASE_ID) {
      console.error("Missing environment variables:", { 
        hasToken: !!NOTION_EVENTS_TOKEN, 
        hasDatabase: !!EVENTS_DATABASE_ID 
      });
      return NextResponse.json(
        { error: "Missing NOTION_EVENTS_API_TOKEN or NOTION_EVENTS_DATABASE_ID" },
        { status: 500 }
      );
    }

    // Debug: Log token format (first few characters only for security)
    console.log("Events API token format check:", {
      tokenPrefix: NOTION_EVENTS_TOKEN.substring(0, 10) + "...",
      tokenLength: NOTION_EVENTS_TOKEN.length,
      databaseId: EVENTS_DATABASE_ID
    });

    console.log("Attempting to query Notion events database:", EVENTS_DATABASE_ID);

    // Query the database
    const pages = await notion.databases.query({
      database_id: EVENTS_DATABASE_ID,
      sorts: [{ property: "Date", direction: "ascending" }],
      // Optionally filter by status if you want only active events
      // filter: {
      //   property: "Status",
      //   select: {
      //     equals: "Active"
      //   }
      // }
    });

    console.log(`Found ${pages.results.length} events in database`);

    const events = (pages.results as any[]).map(toEventItem);

    // Filter out events without a title or date
    const validEvents = events.filter(event => event.title && event.start);

    console.log(`Returning ${validEvents.length} valid events`);

    return NextResponse.json({ events: validEvents }, { status: 200 });

  } catch (error: any) {
    console.error("Notion Events API Error:", error);
    
    // Log specific error details
    if (error.code === "unauthorized") {
      console.error("Authorization failed. Check your NOTION_EVENTS_API_TOKEN and ensure the integration has access to the database.");
      return NextResponse.json(
        { 
          error: "Unauthorized: Check your API token and database permissions",
          details: "Make sure your integration is shared with the events database"
        },
        { status: 401 }
      );
    }

    if (error.code === "object_not_found") {
      console.error("Database not found. Check your NOTION_EVENTS_DATABASE_ID.");
      return NextResponse.json(
        { 
          error: "Database not found: Check your NOTION_EVENTS_DATABASE_ID",
          databaseId: EVENTS_DATABASE_ID
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        error: "Failed to fetch events data from Notion",
        details: error.message || "Unknown error"
      },
      { status: 500 }
    );
  }
}

