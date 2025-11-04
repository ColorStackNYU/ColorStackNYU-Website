export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const NOTION_TOKEN = process.env.NOTION_API_TOKEN!;
const DATABASE_ID = process.env.NOTION_DATABASE_ID!;

const notion = new Client({ auth: NOTION_TOKEN });

type Member = {
  id: string;
  name: string;
  role: string; // "Club Position"
  year?: string;
  major?: string;
  minor?: string;
  email?: string;
  phone?: string;
  icon?: { type: "emoji" | "url"; value: string };
  url: string; // Notion page url
  linkedinUrl?: string;
  hallOfFame?: boolean;
  quote?: string;
};

function getPlainRichText(rich: any[]): string | undefined {
  if (!Array.isArray(rich) || rich.length === 0) return undefined;
  return rich.map((r) => r.plain_text).join("").trim() || undefined;
}

function pickIcon(icon: any): { type: "emoji" | "url"; value: string } | undefined {
  if (!icon) return undefined;
  if (icon.type === "emoji") return { type: "emoji", value: icon.emoji };
  if (icon.type === "external") return { type: "url", value: icon.external.url };
  if (icon.type === "file") return { type: "url", value: icon.file.url };
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
    linkedinUrl: props["Linked-In"]?.url ?? undefined,
    hallOfFame: props["Hall of Fame"]?.checkbox ?? false,
    quote: getPlainRichText(props["Quote"]?.rich_text ?? []),
  };
}

// Mock data for local development
const MOCK_TEAM_DATA = {
  leadership: [
    {
      id: "mock-lead-1",
      name: "Sarah Johnson",
      role: "President",
      year: "Senior",
      major: "Computer Science",
      email: "president@colorstack.nyu.edu",
      icon: { type: "emoji" as const, value: "👩‍💻" },
      url: "https://notion.so/mock-lead-1",
      linkedinUrl: "https://linkedin.com/in/sarahjohnson",
    },
    {
      id: "mock-lead-2",
      name: "Michael Chen",
      role: "Vice President",
      year: "Junior",
      major: "Computer Science & Data Science",
      email: "vp@colorstack.nyu.edu",
      icon: { type: "emoji" as const, value: "🚀" },
      url: "https://notion.so/mock-lead-2",
    },
    {
      id: "mock-lead-3",
      name: "Aisha Patel",
      role: "Lead Developer",
      year: "Senior",
      major: "Computer Science",
      minor: "Business",
      email: "dev@colorstack.nyu.edu",
      icon: { type: "emoji" as const, value: "💻" },
      url: "https://notion.so/mock-lead-3",
    },
  ],
  core: [
    {
      id: "mock-core-1",
      name: "James Rodriguez",
      role: "Developer",
      year: "Sophomore",
      major: "Computer Science",
      icon: { type: "emoji" as const, value: "🎨" },
      url: "https://notion.so/mock-core-1",
    },
    {
      id: "mock-core-2",
      name: "Emily Zhang",
      role: "Events Coordinator",
      year: "Junior",
      major: "Integrated Digital Media",
      icon: { type: "emoji" as const, value: "🎉" },
      url: "https://notion.so/mock-core-2",
      linkedinUrl: "https://linkedin.com/in/emilyzhang",
    },
  ],
  hallOfFame: [
    {
      id: "mock-hof-1",
      name: "David Martinez",
      role: "President",
      year: "Alumni",
      major: "Computer Science",
      icon: { type: "emoji" as const, value: "🎓" },
      url: "https://notion.so/mock-hof-1",
      linkedinUrl: "https://linkedin.com/in/davidmartinez",
      hallOfFame: true,
      quote: "ColorStack @ NYU helped me land my dream job at Google. The community support was invaluable!",
    },
    {
      id: "mock-hof-2",
      name: "Jessica Liu",
      role: "Vice President",
      year: "Alumni",
      major: "Computer Science & Mathematics",
      icon: { type: "emoji" as const, value: "🌟" },
      url: "https://notion.so/mock-hof-2",
      linkedinUrl: "https://linkedin.com/in/jessicaliu",
      hallOfFame: true,
      quote: "Being part of this community shaped my career path and connected me with amazing people.",
    },
  ],
};

export async function GET() {
  try {
    if (!NOTION_TOKEN || !DATABASE_ID) {
      console.warn("⚠️ Missing environment variables - using mock data for local development");
      console.warn("Set NOTION_API_TOKEN and NOTION_DATABASE_ID in .env.local to use real data");
      
      // Return mock data instead of error
      return NextResponse.json(MOCK_TEAM_DATA, { status: 200 });
    }

    console.log("Token format check:", {
      tokenPrefix: NOTION_TOKEN.substring(0, 10) + "...",
      tokenLength: NOTION_TOKEN.length,
      databaseId: DATABASE_ID,
    });

    console.log("Attempting to query Notion database:", DATABASE_ID);

    // Guard + cast so TS is happy even if types don't include `.query`
    const hasQueryMethod = typeof (notion.databases as any).query === "function";
    if (!hasQueryMethod) {
      console.error("notion.databases.query is not a function. Check your @notionhq/client version.");
      return NextResponse.json(
        {
          error: "Notion SDK error: databases.query method not available",
          details: "Please check your @notionhq/client version and installation",
        },
        { status: 500 }
      );
    }

    const response = await (notion.databases as any).query({
      database_id: DATABASE_ID,
      sorts: [{ property: "Name", direction: "ascending" }],
    });

    console.log(`Found ${response.results.length} pages in database`);

    // Explicitly type the array so `m` in filters is not `any`
    const members: Member[] = (response.results as any[]).map(toMember);

    const leadershipSet = new Set<string>([
      "President",
      "Vice President",
      "Chief of Staff",
      "Lead Developer",
      "Director of Partnerships",
      "Director of Events",
      "Director of Outreach",
      "Faculty Advisor",
    ]);

    const leadership: Member[] = members.filter((m) => leadershipSet.has(m.role) && !m.hallOfFame);
    const core: Member[] = members.filter((m) => !leadershipSet.has(m.role) && !m.hallOfFame);
    const hallOfFame: Member[] = members.filter((m) => m.hallOfFame);

    console.log(`Returning ${leadership.length} leadership, ${core.length} core members, and ${hallOfFame.length} Hall of Fame`);

    return NextResponse.json({ leadership, core, hallOfFame }, { status: 200 });
  } catch (error: any) {
    console.error("Notion API Error:", error);
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
          details: "Make sure your integration is shared with the database",
        },
        { status: 401 }
      );
    }

    if (error.code === "object_not_found") {
      return NextResponse.json(
        {
          error: "Database not found: Check your NOTION_DATABASE_ID",
          databaseId: DATABASE_ID,
        },
        { status: 404 }
      );
    }

    const hasQueryMethod =
      typeof (notion.databases as any).query === "function";

    return NextResponse.json(
      {
        error: "Failed to fetch team data from Notion",
        details: error.message || "Unknown error",
        errorType: typeof error,
        hasQuery: hasQueryMethod,
      },
      { status: 500 }
    );
  }
}
