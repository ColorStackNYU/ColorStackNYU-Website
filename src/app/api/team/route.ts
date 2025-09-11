import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const NOTION_TOKEN = process.env.NOTION_API_TOKEN!;
const DATABASE_ID = process.env.NOTION_DATABASE_ID!;

const notion = new Client({ auth: NOTION_TOKEN });

type Member = {
  id: string;
  name: string;
  role: string;     // "Club Position"
  year?: string;
  major?: string;
  minor?: string;
  email?: string;
  phone?: string;
  icon?: { type: "emoji" | "url"; value: string };
  url: string;      // Notion page url
};

function getPlainRichText(rich: any[]): string | undefined {
  if (!Array.isArray(rich) || rich.length === 0) return undefined;
  return rich.map((r) => r.plain_text).join("").trim() || undefined;
}

function pickIcon(icon: any): { type: "emoji" | "url"; value: string } | undefined {
  if (!icon) return undefined;
  if (icon.type === "emoji") return { type: "emoji", value: icon.emoji };
  if (icon.type === "external") return { type: "url", value: icon.external.url };
  if (icon.type === "file") return { type: "url", value: icon.file.url }; // may be expiring
  return undefined;
}

function toMember(p: any): Member {
  const props = p.properties || {};
  const name = (props["Name"]?.title?.[0]?.plain_text || "").trim();
  const role = props["Club Position"]?.select?.name || "Member";

  return {
    id: p.id,
    name,
    role,
    year: props["Year"]?.select?.name,
    major: getPlainRichText(props["Major"]?.rich_text ?? []),
    minor: getPlainRichText(props["Minor"]?.rich_text ?? []),
    email: props["Email"]?.email ?? undefined,
    phone: props["Phone"]?.phone_number ?? undefined,
    icon: pickIcon(p.icon),
    url: p.url,
  };
}

export async function GET() {
  try {
    // Check if environment variables are set
    if (!NOTION_TOKEN || !DATABASE_ID) {
      console.error("Missing environment variables:", { 
        hasToken: !!NOTION_TOKEN, 
        hasDatabase: !!DATABASE_ID 
      });
      return NextResponse.json(
        { error: "Missing NOTION_API_TOKEN or NOTION_DATABASE_ID" },
        { status: 500 }
      );
    }

    // Debug: Log token format (first few characters only for security)
    console.log("Token format check:", {
      tokenPrefix: NOTION_TOKEN.substring(0, 10) + "...",
      tokenLength: NOTION_TOKEN.length,
      databaseId: DATABASE_ID
    });

    console.log("Attempting to query Notion database:", DATABASE_ID);

    // Query the database
    const pages = await notion.databases.query({
      database_id: DATABASE_ID,
      sorts: [{ property: "Name", direction: "ascending" }],
      // You could add filters here if you want only active, etc.
    });

    console.log(`Found ${pages.results.length} pages in database`);

    const members = (pages.results as any[]).map(toMember);

    // Split into "leadership" vs "core" based on Club Position
    const leadershipSet = new Set([
      "President",
      "Vice President",
      "Chief of Staff",
      "Lead Developer",
      "Director of Partnerships",
      "Director of Events",
      "Director of Outreach",
      "Faculty Advisor",
    ]);

    const leadership = members.filter((m) => leadershipSet.has(m.role));
    const core = members.filter((m) => !leadershipSet.has(m.role));

    console.log(`Returning ${leadership.length} leadership and ${core.length} core members`);

    return NextResponse.json({ leadership, core }, { status: 200 });

  } catch (error: any) {
    console.error("Notion API Error:", error);
    
    // Log specific error details
    if (error.code === "unauthorized") {
      console.error("Authorization failed. Check your NOTION_API_TOKEN and ensure the integration has access to the database.");
      return NextResponse.json(
        { 
          error: "Unauthorized: Check your API token and database permissions",
          details: "Make sure your integration is shared with the database"
        },
        { status: 401 }
      );
    }

    if (error.code === "object_not_found") {
      console.error("Database not found. Check your NOTION_DATABASE_ID.");
      return NextResponse.json(
        { 
          error: "Database not found: Check your NOTION_DATABASE_ID",
          databaseId: DATABASE_ID
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        error: "Failed to fetch team data from Notion",
        details: error.message || "Unknown error"
      },
      { status: 500 }
    );
  }
}