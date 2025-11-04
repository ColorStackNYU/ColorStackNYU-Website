export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import { normalizeUrl } from "@/lib/urlHelpers";

const NOTION_EVENTS_TOKEN = process.env.NOTION_EVENTS_API_TOKEN!;
const EVENTS_DATABASE_ID = process.env.NOTION_EVENTS_DATABASE_ID!;

const notion = new Client({ auth: NOTION_EVENTS_TOKEN });

type EventItem = {
  id: string;
  title: string;
  start: string;
  end?: string;
  tags?: string[];
  status?: string;
  url: string;
  instagramUrl?: string;
};

function getTagsFromMultiSelect(multiSelect: any[]): string[] {
  if (!Array.isArray(multiSelect)) return [];
  return multiSelect.map((tag) => tag.name).filter(Boolean);
}

/**
 * Normalizes Instagram URLs
 * @param url - The URL to normalize
 * @returns Normalized Instagram URL or undefined if not a valid Instagram link
 */
function normalizeInstagramUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  
  const normalized = normalizeUrl(url);
  if (!normalized) return undefined;
  
  // If it's an Instagram URL, return it
  if (normalized.includes('instagram.com') || normalized.includes('instagr.am')) {
    return normalized;
  }
  
  // Not an Instagram URL
  return undefined;
}

function toEventItem(p: any): EventItem {
  const props = p.properties || {};
  const title = (props["Name"]?.title?.[0]?.plain_text || "").trim();
  const dateProperty = props["Date"]?.date;

  const start = dateProperty?.start || "";
  const end = dateProperty?.end || undefined;

  const tags = getTagsFromMultiSelect(props["Tags"]?.multi_select ?? []);
  const status = props["Status"]?.select?.name || "Scheduled";
  
  // Extract and validate Instagram URL (optional field)
  const rawInstagramUrl = props["Instagram link"]?.url || undefined;
  
  // Debug: log what we're getting
  if (title) {
    console.log(`Event "${title}": Instagram link raw = ${rawInstagramUrl}`);
  }
  
  const instagramUrl = normalizeInstagramUrl(rawInstagramUrl);

  return {
    id: p.id,
    title,
    start,
    end,
    tags,
    status,
    url: p.url,
    instagramUrl,
  };
}

// Mock data for local development
const MOCK_EVENTS: EventItem[] = [
  // Upcoming events
  {
    id: "mock-1",
    title: "ColorStack General Body Meeting",
    start: "2025-11-10T18:00:00",
    end: "2025-11-10T19:30:00",
    tags: ["general body meeting"],
    status: "Scheduled",
    url: "https://notion.so/mock-event-1",
    instagramUrl: "https://www.instagram.com/p/DOYxiXkjVEx/",
  },
  {
    id: "mock-2",
    title: "Technical Interview Workshop",
    start: "2025-11-15T17:00:00",
    end: "2025-11-15T19:00:00",
    tags: ["Workshop", "Career Development"],
    status: "Scheduled",
    url: "https://notion.so/mock-event-2",
    instagramUrl: "https://www.instagram.com/p/DOYxiXkjVEx/",
  },
  {
    id: "mock-3",
    title: "Resume Review Sessions",
    start: "2025-12-05T16:00:00",
    end: "2025-12-05T18:00:00",
    tags: ["Career Development"],
    status: "Scheduled",
    url: "https://notion.so/mock-event-3",
    instagramUrl: "https://www.instagram.com/p/DOYxiXkjVEx/",
  },
  // Past events
  {
    id: "mock-4",
    title: "Fall Kickoff Social",
    start: "2025-09-15T17:00:00",
    end: "2025-09-15T19:00:00",
    tags: ["Social", "Networking"],
    status: "Completed",
    url: "https://notion.so/mock-event-4",
    instagramUrl: "https://www.instagram.com/p/DOYxiXkjVEx/",
  },
  {
    id: "mock-5",
    title: "Google Office Visit",
    start: "2025-10-20T14:00:00",
    end: "2025-10-20T17:00:00",
    tags: ["Office Visit", "Networking"],
    status: "Completed",
    url: "https://notion.so/mock-event-5",
    instagramUrl: "https://www.instagram.com/p/DOYxiXkjVEx/",
  },
  {
    id: "mock-6",
    title: "Hackathon Prep Workshop",
    start: "2025-10-01T18:00:00",
    end: "2025-10-01T20:00:00",
    tags: ["Workshop", "Hackathon"],
    status: "Completed",
    url: "https://notion.so/mock-event-6",
    instagramUrl: "https://www.instagram.com/p/DOYxiXkjVEx/",
  },
];

export async function GET() {
  try {
    if (!NOTION_EVENTS_TOKEN || !EVENTS_DATABASE_ID) {
      console.warn("⚠️ Missing environment variables - using mock data for local development");
      console.warn("Set NOTION_EVENTS_API_TOKEN and NOTION_EVENTS_DATABASE_ID in .env.local to use real data");
      
      // Return mock data instead of error
      return NextResponse.json({ events: MOCK_EVENTS }, { status: 200 });
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

    // Debug: log property names and Instagram link details from first event
    if (response.results.length > 0) {
      console.log("=== First Event Properties ===");
      const props = response.results[0].properties || {};
      Object.keys(props).forEach(key => {
        console.log(`  "${key}"`);
      });
      console.log("Instagram link raw:", JSON.stringify(props["Instagram link"], null, 2));
      console.log("=============================");
    }

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
