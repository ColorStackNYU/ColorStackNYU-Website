"use client";

import { useEffect, useState, useMemo } from "react";
import Navigation from "../../components/navigation";
import { fetchResources, RESOURCE_CATEGORIES, type Resource } from "../../lib/fetchResources";

function ResourceCard({ r, onTagClick }: { r: Resource; onTagClick: (tag: string) => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={r.link}
      target={r.link.startsWith("http") ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className="card resource-card"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Title + Link Icon (dominant) */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "12px" }}>
        <h3 style={{ margin: "0", fontSize: "18px", fontWeight: 700, color: "var(--text-high)", lineHeight: "1.3" }}>
          {r.title}
        </h3>
        <div
          title="Opens in new tab"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: isHovered ? "rgba(212, 181, 255, 0.2)" : "rgba(212, 181, 255, 0.1)",
            border: "1px solid rgba(212, 181, 255, 0.4)",
            flexShrink: 0,
            transition: "all 0.2s ease",
          }}
        >
          <span
            style={{
              color: isHovered ? "#d4b5ff" : "#b5a3d4",
              fontSize: "18px",
              transition: "all 0.2s ease",
              transform: isHovered ? "scale(1.15)" : "scale(1)",
            }}
          >
            ↗
          </span>
        </div>
      </div>

      {/* Description (secondary) */}
      <p style={{ flex: 1, margin: "0 0 16px 0", fontSize: "14px", fontWeight: 400, color: "#e8e6ff", lineHeight: "1.6" }}>
        {r.description}
      </p>

      {/* Tags (tertiary) */}
      {r.tags && r.tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
          {r.tags.map((tag) => (
            <button
              key={tag}
              onClick={(e) => {
                e.preventDefault();
                onTagClick(tag);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onTagClick(tag);
                }
              }}
              className="resource-tag"
              style={{
                display: "inline-block",
                padding: "3px 8px",
                backgroundColor: "transparent",
                color: "#d4b5ff",
                borderRadius: "5px",
                fontSize: "11px",
                fontWeight: 600,
                border: "1px solid #d4b5ff",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(212, 181, 255, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = "2px solid #d4b5ff";
                e.currentTarget.style.outlineOffset = "2px";
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = "none";
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Metadata footer: Category + Contributor (de-emphasized) */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "12px", paddingTop: "8px", borderTop: "1px solid rgba(171, 130, 197, 0.15)" }}>
        <div>
          {r.category && (
            <p style={{ margin: "0", fontSize: "11px", color: "#d4b5ff", opacity: 1 }}>
              {r.category}
            </p>
          )}
        </div>
        <div>
          {r.contributedBy && (
            <p style={{ margin: "0", fontSize: "10px", color: "#d4b5ff", opacity: 0.9, textAlign: "right" }}>
              Contributed by {r.contributedBy}
            </p>
          )}
        </div>
      </div>
    </a>
  );
}

function StatStrip({ resources }: { resources: Resource[] }) {
  const { resourcesCount, contributorsCount, lastAddedDays } = useMemo(() => {
    const links = new Set<string>();
    const contributors = new Set<string>();
    const exclude = new Set(["community/anonymous", "community", "anonymous"]);
    let latest: number | null = null;

    resources.forEach((r) => {
      if (r.link) links.add(r.link);

      if (r.contributedBy) {
        const name = r.contributedBy.trim().toLowerCase();
        if (name && !exclude.has(name)) {
          contributors.add(name);
        }
      }

      if (r.dateAdded) {
        const t = Date.parse(r.dateAdded);
        if (!Number.isNaN(t)) {
          if (latest === null || t > latest) latest = t;
        }
      }
    });

    const resourcesCount = links.size;
    const contributorsCount = contributors.size;
    const lastAddedDays = latest !== null ? Math.floor((Date.now() - latest) / (1000 * 60 * 60 * 24)) : null;
    return { resourcesCount, contributorsCount, lastAddedDays };
  }, [resources]);

  const resourceLabel = resourcesCount === 1 ? "resource" : "resources";
  const contributorLabel = contributorsCount === 1 ? "contributor" : "contributors";

  return (
    <div style={{ marginTop: "12px", color: "var(--text-mid)", fontSize: "14px", display: "flex", gap: "12px", alignItems: "center" }}>
      <span>
        {resourcesCount} {resourceLabel}
      </span>
      <span>•</span>
      <span>
        {contributorsCount} {contributorLabel}
      </span>
      {lastAddedDays !== null && (
        <>
          <span>•</span>
          <span>
            Last added: {lastAddedDays === 0 ? "today" : lastAddedDays === 1 ? "1 day ago" : `${lastAddedDays} days ago`}
          </span>
        </>
      )}
    </div>
  );
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const loadResources = async () => {
      const data = await fetchResources();
      setResources(data);
      setLoading(false);
    };

    loadResources();
  }, []);

  const scrollToContribute = () => {
    const element = document.getElementById("contribute");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  const filteredResources = resources.filter((r) => {
    const matchesCategory = selectedCategories.size === 0 || selectedCategories.has(r.category);
    const matchesTag = !selectedTag || (r.tags && r.tags.includes(selectedTag));
    return matchesCategory && matchesTag;
  });
  return (
    <>
      <Navigation />
      <main className="page-main site-container">
        <section className="page-heading max-w-3xl mx-auto">
          <div style={{ marginBottom: "16px" }}>
            <h1 className="wordmark">Resources</h1>
          </div>
          <p>
            Helpful links, guides, and tools—curated by our community.{" "}
            <button
              onClick={scrollToContribute}
              style={{
                background: "none",
                border: "none",
                color: "#d4b5ff",
                cursor: "pointer",
                textDecoration: "underline",
                fontWeight: 500,
                padding: 0,
                font: "inherit",
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = "2px solid #d4b5ff";
                e.currentTarget.style.outlineOffset = "2px";
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = "none";
              }}
            >
              How to contribute →
            </button>
          </p>

          {/* Stat strip: global counts (computed from JSON) */}
          {/**
           * Resources: unique links (exact URL dedupe)
           * Contributors: unique contributedBy (case-insensitive), excluding Community/Anonymous
           * Optional: Last added: N days ago
           */}
          <StatStrip resources={resources} />
        </section>

        <section>
          {loading ? (
            <p style={{ color: "var(--text-mid)" }}>Loading resources...</p>
          ) : (
            <>
              {/* Filter Controls */}
              <div style={{ marginBottom: "32px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <h3 className="text-sm font-semibold" style={{ color: "var(--text-high)" }}>
                    Filter
                  </h3>
                  {(selectedCategories.size > 0 || selectedTag) && (
                    <button
                      onClick={() => {
                        setSelectedCategories(new Set());
                        setSelectedTag(null);
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#d4b5ff",
                        cursor: "pointer",
                        textDecoration: "underline",
                        fontSize: "13px",
                        padding: 0,
                        fontWeight: 500,
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.outline = "2px solid #d4b5ff";
                        e.currentTarget.style.outlineOffset = "2px";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.outline = "none";
                      }}
                    >
                      Clear filters
                    </button>
                  )}
                </div>

                {/* Category chips */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
                  <button
                    onClick={() => setSelectedCategories(new Set())}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedCategories(new Set());
                      }
                    }}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "8px",
                      border: selectedCategories.size === 0 ? "1px solid rgba(171, 130, 197, 0.5)" : "1px solid rgba(171, 130, 197, 0.3)",
                      backgroundColor: selectedCategories.size === 0 ? "transparent" : "transparent",
                      color: selectedCategories.size === 0 ? "var(--text-mid)" : "var(--text-high)",
                      cursor: "pointer",
                      fontWeight: 500,
                      fontSize: "14px",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (selectedCategories.size === 0) return;
                      e.currentTarget.style.borderColor = "var(--brand-1)";
                      e.currentTarget.style.backgroundColor = "rgba(171, 130, 197, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      if (selectedCategories.size === 0) return;
                      e.currentTarget.style.borderColor = "rgba(171, 130, 197, 0.3)";
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.outline = "2px solid #d4b5ff";
                      e.currentTarget.style.outlineOffset = "2px";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.outline = "none";
                    }}
                  >
                    All
                  </button>
                  {RESOURCE_CATEGORIES.map((category) => {
                    const isSelected = selectedCategories.has(category);
                    return (
                      <button
                        key={category}
                        onClick={() => {
                          const newCategories = new Set(selectedCategories);
                          if (isSelected) {
                            newCategories.delete(category);
                          } else {
                            newCategories.add(category);
                          }
                          setSelectedCategories(newCategories);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            const newCategories = new Set(selectedCategories);
                            if (isSelected) {
                              newCategories.delete(category);
                            } else {
                              newCategories.add(category);
                            }
                            setSelectedCategories(newCategories);
                          }
                        }}
                        style={{
                          padding: "8px 16px",
                          borderRadius: "8px",
                          border: isSelected ? "2px solid var(--brand-1)" : "1px solid rgba(171, 130, 197, 0.3)",
                          backgroundColor: isSelected ? "rgba(171, 130, 197, 0.2)" : "transparent",
                          color: "var(--text-high)",
                          cursor: "pointer",
                          fontWeight: isSelected ? 600 : 500,
                          fontSize: "14px",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          if (isSelected) return;
                          e.currentTarget.style.borderColor = "var(--brand-1)";
                          e.currentTarget.style.backgroundColor = "rgba(171, 130, 197, 0.1)";
                        }}
                        onMouseLeave={(e) => {
                          if (isSelected) return;
                          e.currentTarget.style.borderColor = "rgba(171, 130, 197, 0.3)";
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.outline = "2px solid #d4b5ff";
                          e.currentTarget.style.outlineOffset = "2px";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.outline = "none";
                        }}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>

                {/* Tag filter indicator */}
                {selectedTag && (
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingTop: "12px", borderTop: "1px solid rgba(171, 130, 197, 0.2)" }}>
                    <span style={{ color: "var(--text-mid)", fontSize: "14px" }}>Tag:</span>
                    <span style={{ padding: "4px 12px", backgroundColor: "rgba(217, 70, 239, 0.2)", borderRadius: "6px", color: "var(--accent)", fontSize: "14px", fontWeight: 500 }}>
                      {selectedTag}
                    </span>
                    <button
                      onClick={() => setSelectedTag(null)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#d4b5ff",
                        cursor: "pointer",
                        textDecoration: "underline",
                        fontSize: "13px",
                        padding: 0,
                        fontWeight: 500,
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.outline = "2px solid #d4b5ff";
                        e.currentTarget.style.outlineOffset = "2px";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.outline = "none";
                      }}
                    >
                      Clear tag
                    </button>
                  </div>
                )}
              </div>

              {/* Results */}
              {filteredResources.length === 0 ? (
                <div style={{ textAlign: "center", padding: "64px 32px" }}>
                  <p style={{ color: "var(--text-mid)", fontSize: "16px", marginBottom: "12px" }}>
                    No resources yet in this category.
                  </p>
                  <p style={{ color: "var(--text-mid)", fontSize: "14px", marginBottom: "24px" }}>
                    Want to add one?{" "}
                    <button
                      onClick={scrollToContribute}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#d4b5ff",
                        cursor: "pointer",
                        textDecoration: "underline",
                        fontWeight: 500,
                        padding: 0,
                        font: "inherit",
                        fontSize: "14px",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.outline = "2px solid #d4b5ff";
                        e.currentTarget.style.outlineOffset = "2px";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.outline = "none";
                      }}
                    >
                      Learn how to contribute
                    </button>
                  </p>
                </div>
              ) : (
                <div className="card-grid">
                  {filteredResources.map((r) => (
                    <ResourceCard key={r.id} r={r} onTagClick={handleTagClick} />
                  ))}
                </div>
              )}
            </>
          )}
        </section>

        {/* Secondary CTA: bottom of resources list */}
        {filteredResources.length > 0 && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "48px", marginBottom: "64px" }}>
            <a
              href="https://github.com/ColorStackNYU/ColorStackNYU-Website/blob/feat/css-changes/public/resources.json"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "12px 24px",
                borderRadius: "8px",
                border: "1.5px solid rgba(212, 181, 255, 0.4)",
                backgroundColor: "transparent",
                color: "#d4b5ff",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#d4b5ff";
                e.currentTarget.style.backgroundColor = "rgba(212, 181, 255, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(212, 181, 255, 0.4)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = "2px solid #d4b5ff";
                e.currentTarget.style.outlineOffset = "2px";
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = "none";
              }}
            >
              Add a resource
            </a>
          </div>
        )}

        <section id="contribute" className="max-w-3xl mx-auto" style={{ marginTop: "80px" }}>
          <h2 className="text-3xl font-bold mb-6" style={{ color: "var(--text-high)" }}>
            How to Contribute
          </h2>
          <p style={{ color: "var(--text-mid)", marginBottom: "24px", lineHeight: "1.6" }}>
            Know a great resource? We'd love to add it! Contributing is simple and doesn't require any coding experience.
          </p>

          <div style={{ backgroundColor: "rgba(171, 130, 197, 0.08)", padding: "24px", borderRadius: "12px", border: "1px solid rgba(171, 130, 197, 0.2)" }}>
            <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--text-high)" }}>
              Add a Resource on GitHub
            </h3>
            <ol style={{ color: "var(--text-mid)", lineHeight: "1.8", paddingLeft: "24px", marginBottom: "16px" }}>
              <li style={{ marginBottom: "12px" }}>
                Go to the{" "}
                <a
                  href="https://github.com/ColorStackNYU/ColorStackNYU-Website/blob/feat/css-changes/public/resources.json"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#d4b5ff", textDecoration: "underline" }}
                >
                  resources.json file
                </a>
              </li>
              <li style={{ marginBottom: "12px" }}>
                Click the <strong>pencil icon</strong> to edit (you'll need a GitHub account)
              </li>
              <li style={{ marginBottom: "12px" }}>
                Add your resource as a new object in the <code style={{ color: "var(--accent)" }}>"resources"</code> array
              </li>
              <li style={{ marginBottom: "12px" }}>
                Fill in the required fields:
                <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
                  <li><code style={{ color: "var(--accent)" }}>title</code>, <code style={{ color: "var(--accent)" }}>description</code>, <code style={{ color: "var(--accent)" }}>link</code>, <code style={{ color: "var(--accent)" }}>category</code>, <code style={{ color: "var(--accent)" }}>dateAdded</code></li>
                </ul>
              </li>
              <li style={{ marginBottom: "12px" }}>
                <strong>Optional fields:</strong>
                <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
                  <li><code style={{ color: "var(--accent)" }}>tags</code> - Array of labels (e.g., "algorithms", "python")</li>
                  <li><code style={{ color: "var(--accent)" }}>contributedBy</code> - Your name to get credit</li>
                </ul>
              </li>
              <li style={{ marginBottom: "12px" }}>
                At the bottom, select <strong>"Create a new branch"</strong> and submit a pull request
              </li>
              <li>
                We'll review and merge it! That's it.
              </li>
            </ol>
          </div>

          <div style={{ marginTop: "24px", padding: "12px", backgroundColor: "rgba(124, 58, 237, 0.08)", borderRadius: "6px", borderLeft: "3px solid #d4b5ff" }}>
            <p style={{ color: "var(--text-mid)", fontSize: "12px", margin: 0 }}>
              <strong>New to GitHub?</strong> Use the web editor—no installation needed.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}