export const RESOURCE_CATEGORIES = [
  "Interview Prep",
  "Classes",
  "Career Growth",
  "Web Development",
  "Mobile Development",
  "Data Science",
  "System Design",
  "Leadership",
] as const;

export type ResourceCategory = (typeof RESOURCE_CATEGORIES)[number];
