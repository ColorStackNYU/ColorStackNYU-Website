"use client";

import { useEffect, useState, useMemo } from "react";
import Navigation from "../../components/navigation";
import { fetchResources, RESOURCE_CATEGORIES, type Resource } from "../../lib/fetchResources";

function ResourceCard({ r, onTagClick }: { r: Resource; onTagClick: (tag: string) => void }) {
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
    >
      {/* Title + Link Icon (dominant) */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "12px" }}>
        <h3 style={{ margin: "0", fontSize: "18px", fontWeight: 700, color: "var(--text-high)", lineHeight: "1.3" }}>
          {r.title}
        </h3>
        <div className="external-link-icon" title="Opens in new tab">
          <span className="external-link-icon-arrow">↗</span>
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
    <div className="stat-strip">
      <div className="stat-item">
        <span>
          {resourcesCount} {resourceLabel}
        </span>
      </div>
      <div className="stat-item">
        <span>
          {contributorsCount} {contributorLabel}
        </span>
      </div>
      {lastAddedDays !== null && (
        <div className="stat-item">
          <span>
            Last added: {lastAddedDays === 0 ? "today" : lastAddedDays === 1 ? "1 day ago" : `${lastAddedDays} days ago`}
          </span>
        </div>
      )}
    </div>
  );
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const loadResources = async () => {
      const data = await fetchResources();
      setResources(data);
      setLoading(false);
    };

    loadResources();
  }, []);

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  const filteredResources = resources.filter((r) => {
    const matchesCategory = !selectedCategory || r.category === selectedCategory;
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
            Helpful links, guides, and tools—curated by our community.
          </p>
          <p>
            <a
              href="https://github.com/ColorStackNYU/ColorStackNYU-Website/blob/main/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              How to contribute →
            </a>
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
              <div style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <h3 className="text-sm font-semibold" style={{ color: "var(--text-high)" }}>
                    Filter
                  </h3>
                  {(selectedCategory || selectedTag) && (
                    <button
                      onClick={() => {
                        setSelectedCategory(null);
                        setSelectedTag(null);
                      }}
                      className="text-link"
                      style={{ fontSize: "13px" }}
                    >
                      Clear filters
                    </button>
                  )}
                </div>

                {/* Category chips */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedCategory(null);
                      }
                    }}
                    className={`filter-btn ${!selectedCategory ? 'filter-btn-all' : ''}`}
                  >
                    All
                  </button>
                  {RESOURCE_CATEGORIES.map((category) => {
                    const isSelected = selectedCategory === category;
                    return (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(isSelected ? null : category);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSelectedCategory(isSelected ? null : category);
                          }
                        }}
                        className={`filter-btn ${isSelected ? 'filter-btn-active' : ''}`}
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
                      className="text-link"
                      style={{ fontSize: "13px" }}
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
                    <a
                      href="https://github.com/ColorStackNYU/ColorStackNYU-Website/blob/main/CONTRIBUTING.md"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link"
                      style={{ fontSize: "14px" }}
                    >
                      Learn how to contribute
                    </a>
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
              href="https://github.com/ColorStackNYU/ColorStackNYU-Website/blob/main/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-secondary"
            >
              Add a resource
            </a>
          </div>
        )}
      </main>
    </>
  );
}