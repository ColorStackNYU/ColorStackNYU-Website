"use client";

import { useEffect, useState, useMemo } from "react";
import Navigation from "../../components/navigation";
import ContentContainer from "../../components/ContentContainer";
import { fetchResources, type Resource } from "../../lib/fetchResources";
import { RESOURCE_CATEGORIES } from "../../lib/constants";

function ResourceCard({ r, onTagClick, setSelectedCategory }: { r: Resource; onTagClick: (tag: string) => void; setSelectedCategory: (category: string | null) => void }) {
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "var(--spacing-md)", marginBottom: "var(--spacing-md)" }}>
        <h3 style={{ margin: "0", fontSize: "18px", fontWeight: 700, color: "var(--text-high)", lineHeight: "1.3" }}>
          {r.title}
        </h3>
        <div className="external-link-icon" title="Opens in new tab">
          <span className="external-link-icon-arrow">↗</span>
        </div>
      </div>

      {/* Description (secondary) */}
      <p style={{ flex: 1, margin: "0 0 var(--spacing-lg) 0", fontSize: "14px", fontWeight: 400, color: "var(--text-mid)", lineHeight: "1.6" }}>
        {r.description}
      </p>

      {/* Category as tag-like element */}
      {r.category && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-sm)", marginBottom: "var(--spacing-md)" }}>
          <button
            onClick={(e) => {
              e.preventDefault();
              setSelectedCategory(r.category);
            }}
            className="resource-tag"
          >
            {r.category}
          </button>
        </div>
      )}

      {/* Metadata footer: Tags + Contributor */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "var(--spacing-md)", paddingTop: "var(--spacing-sm)", borderTop: "1px solid rgba(171, 130, 197, 0.15)" }}>
        <div style={{ display: "flex", gap: "var(--spacing-xs)", flexWrap: "wrap" }}>
          {r.tags && r.tags.map((tag) => (
            <button
              key={tag}
              onClick={(e) => {
                e.preventDefault();
                onTagClick(tag);
              }}
              style={{ 
                margin: "0", 
                padding: "0", 
                background: "none", 
                border: "none", 
                fontSize: "11px", 
                color: "var(--brand-1)", 
                cursor: "pointer",
                opacity: 0.9,
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-high)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "var(--brand-1)"}
            >
              #{tag}
            </button>
          ))}
        </div>
        <div>
          {r.contributedBy && (
            <p style={{ margin: "0", fontSize: "10px", color: "var(--text-mid)", opacity: 0.7, textAlign: "right" }}>
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
      <main id="main-content" className="page-main">
        <ContentContainer>
        <section className="page-heading">
          <div style={{ marginBottom: "var(--spacing-lg)" }}>
            <h1 className="wordmark">Resources</h1>
          </div>
          <p>
            Helpful links, guides, and tools for the community, by the community.
          </p>
          <p>
            <a
              href="https://github.com/ColorStackNYU/ColorStackNYU-Website/blob/main/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              How to contribute
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
              <div style={{ marginBottom: "var(--spacing-lg)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
                  {/* Category filter */}
                  <div>
                    <h3 className="text-sm font-semibold" style={{ color: "var(--text-high)", marginBottom: "var(--spacing-sm)" }}>
                      Browse by Category
                    </h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-sm)" }}>
                      <button
                        onClick={() => {
                          setSelectedCategory(null);
                          setSelectedTag(null);
                        }}
                        className={`filter-btn ${!selectedCategory ? 'filter-btn-active' : ''}`}
                      >
                        All Categories
                      </button>
                      {RESOURCE_CATEGORIES.map((category) => {
                        const isSelected = selectedCategory === category;
                        return (
                          <button
                            key={category}
                            onClick={() => {
                              setSelectedCategory(isSelected ? null : category);
                              setSelectedTag(null);
                            }}
                            className={`filter-btn ${isSelected ? 'filter-btn-active' : ''}`}
                          >
                            {category}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Active filters */}
                  {(selectedCategory || selectedTag) && (
                    <div style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "var(--spacing-md)",
                      padding: "var(--spacing-md)",
                      background: "rgba(171, 130, 197, 0.1)",
                      borderRadius: "8px",
                    }}>
                      <span style={{ color: "var(--text-mid)", fontSize: "14px" }}>Active filters:</span>
                      {selectedCategory && (
                        <span className="filter-tag">
                          Category: {selectedCategory}
                          <button 
                            onClick={() => setSelectedCategory(null)}
                            style={{ marginLeft: "6px", opacity: 0.7 }}
                          >
                            ×
                          </button>
                        </span>
                      )}
                      {selectedTag && (
                        <span className="filter-tag">
                          #{selectedTag}
                          <button 
                            onClick={() => setSelectedTag(null)}
                            style={{ marginLeft: "6px", opacity: 0.7 }}
                          >
                            ×
                          </button>
                        </span>
                      )}
                    </div>
                  )}
                </div>
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
                    <ResourceCard 
                      key={r.id} 
                      r={r} 
                      onTagClick={handleTagClick}
                      setSelectedCategory={setSelectedCategory}
                    />
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
        </ContentContainer>
      </main>
    </>
  );
}