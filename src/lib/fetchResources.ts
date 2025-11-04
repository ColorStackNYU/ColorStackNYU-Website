export type Resource = {
  id: string;
  title: string;
  description: string;
  link: string;
  category: string;
  tags?: string[]; // Optional
  dateAdded: string;
  contributedBy?: string; // Optional: name of contributor for points tracking
};

export const RESOURCE_CATEGORIES = [
  "Interview Prep",
  "Coursework",
  "Career Growth",
  "Web Development",
  "Mobile Development",
  "Data Science",
  "System Design",
] as const;

export async function fetchResources(): Promise<Resource[]> {
  try {
    const response = await fetch("/resources.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Failed to fetch resources");
    }
    const data = await response.json();
    return data.resources || [];
  } catch (error) {
    console.error("Error fetching resources:", error);
    return [];
  }
}
