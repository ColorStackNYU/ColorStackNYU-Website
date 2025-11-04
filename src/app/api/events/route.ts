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
  graphic?: string; // Image URL
  flyer?: string; // PDF URL
  instagramPostURL?: string;
  engageURL?: string;
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
  const status = props["Status"]?.select?.name || "Scheduled";
  
  // Media fields
  const graphic = props["Graphic"]?.files?.[0]?.file?.url || props["Graphic"]?.files?.[0]?.external?.url || undefined;
  const flyer = props["Flyer"]?.files?.[0]?.file?.url || props["Flyer"]?.files?.[0]?.external?.url || undefined;
  const instagramPostURL = props["InstagramPostURL"]?.url || undefined;
  const engageURL = props["EngageURL"]?.url || undefined;

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
    graphic,
    flyer,
    instagramPostURL,
    engageURL,
  };
}

// Mock data for local development
const MOCK_EVENTS: EventItem[] = [
  // Upcoming events
  {
    id: "mock-1",
    title: "ColorStack General Body Meeting",
    description: "Join us for our weekly meeting to discuss upcoming events and initiatives. All members welcome! We'll be discussing internship opportunities and planning our spring events.",
    start: "2025-11-10T18:00:00",
    end: "2025-11-10T19:30:00",
    location: "NYU Kimmel Center, Room 406",
    tags: ["General Meeting", "Weekly"],
    status: "Scheduled",
    url: "https://notion.so/mock-event-1",
    graphic: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    engageURL: "https://engage.nyu.edu/colorstack",
  },
  {
    id: "mock-2",
    title: "Technical Interview Workshop",
    description: "Practice coding interviews with peers and get feedback from industry professionals. Topics include: data structures, algorithms, system design, and behavioral questions.",
    start: "2025-11-15T17:00:00",
    end: "2025-11-15T19:00:00",
    location: "NYU Tandon School of Engineering",
    link: "https://example.com/workshop",
    tags: ["Workshop", "Career Development"],
    status: "Scheduled",
    url: "https://notion.so/mock-event-2",
    flyer: "https://example.com/flyer.pdf",
  },
  {
    id: "mock-3",
    title: "Resume Review Sessions",
    description: "Get your resume reviewed by upperclassmen and career advisors. Bring printed copies or come ready to share your screen!",
    start: "2025-12-05T16:00:00",
    end: "2025-12-05T18:00:00",
    location: "Zoom (Link provided to registered members)",
    tags: ["Career Development", "One-on-One"],
    status: "Scheduled",
    url: "https://notion.so/mock-event-3",
    instagramPostURL: "https://www.instagram.com/p/example/",
  },
  // Past events
  {
    id: "mock-4",
    title: "Fall Kickoff Social",
    description: "Welcome back event with food, games, and networking. Meet the e-board and connect with fellow members!",
    start: "2025-09-15T17:00:00",
    end: "2025-09-15T19:00:00",
    location: "NYU Kimmel Center",
    tags: ["Social", "Networking"],
    status: "Completed",
    url: "https://notion.so/mock-event-4",
    graphic: "https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=800",
  },
  {
    id: "mock-5",
    title: "Google Office Visit",
    description: "Exclusive tour of Google's NYC office followed by a Q&A with software engineers.",
    start: "2025-10-20T14:00:00",
    end: "2025-10-20T17:00:00",
    location: "Google NYC, 111 8th Ave",
    tags: ["Office Visit", "Networking"],
    status: "Completed",
    url: "https://notion.so/mock-event-5",
    graphic: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800",
  },
  {
    id: "mock-6",
    title: "Hackathon Prep Workshop",
    description: "Learn how to prepare for hackathons, form teams, and build winning projects.",
    start: "2025-10-01T18:00:00",
    end: "2025-10-01T20:00:00",
    location: "NYU Tandon",
    tags: ["Workshop", "Hackathon"],
    status: "Completed",
    url: "https://notion.so/mock-event-6",
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
