"use client";

import { useEffect, useState } from "react";
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
        gap: "12px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ marginBottom: "4px" }}>{r.title}</h3>
          {r.category && (
            <p className="text-xs" style={{ color: "var(--text-mid)" }}>
              {r.category}
            </p>
          )}
          {r.contributedBy && (
            <p className="text-xs" style={{ color: "var(--brand-1)", marginTop: "4px" }}>
              Contributed by {r.contributedBy}
            </p>
          )}
        </div>
        <span style={{ color: "var(--brand-1)", fontSize: "18px", flexShrink: 0, marginTop: "2px" }}>
          ↗
        </span>
      </div>

      <p style={{ flex: 1 }}>{r.description}</p>

      {r.tags && r.tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "4px" }}>
          {r.tags.map((tag) => (
            <button
              key={tag}
              onClick={(e) => {
                e.preventDefault();
                onTagClick(tag);
              }}
              className="resource-tag"
              style={{
                display: "inline-block",
                padding: "4px 10px",
                backgroundColor: "rgba(171, 130, 197, 0.15)",
                color: "var(--brand-1)",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: 500,
                border: "1px solid rgba(171, 130, 197, 0.3)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(171, 130, 197, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(171, 130, 197, 0.15)";
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </a>
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
    const matchesCategory = !selectedCategory || r.category === selectedCategory;
    const matchesTag = !selectedTag || (r.tags && r.tags.includes(selectedTag));
    return matchesCategory && matchesTag;
  });
  return (
    <>
      <Navigation />
      <main className="page-main site-container">
        <section className="page-heading max-w-3xl mx-auto">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "24px", marginBottom: "16px" }}>
            <div>
              <h1 className="wordmark">Resources</h1>
            </div>
            <a
              href="https://github.com/ColorStackNYU/ColorStackNYU-Website/issues/new?template=resource_submission.md&title=Add+Resource:+[Title]"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ whiteSpace: "nowrap" }}
            >
              Submit a resource
            </a>
          </div>
          <p>
            Helpful links, guides, and tools—curated by our community.{" "}
            <button
              onClick={scrollToContribute}
              style={{
                background: "none",
                border: "none",
                color: "var(--brand-1)",
                cursor: "pointer",
                textDecoration: "underline",
                fontWeight: 500,
                padding: 0,
                font: "inherit",
              }}
            >
              How to contribute
            </button>
          </p>
        </section>

        <section>
          {loading ? (
            <p style={{ color: "var(--text-mid)" }}>Loading resources...</p>
          ) : (
            <>
              {/* Filter Controls */}
              <div style={{ marginBottom: "32px" }}>
                <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-high)" }}>
                  Filter by Category
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "8px",
                      border: !selectedCategory ? "2px solid var(--brand-1)" : "1px solid rgba(171, 130, 197, 0.3)",
                      backgroundColor: !selectedCategory ? "rgba(171, 130, 197, 0.2)" : "transparent",
                      color: "var(--text-high)",
                      cursor: "pointer",
                      fontWeight: !selectedCategory ? 600 : 500,
                      fontSize: "14px",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!selectedCategory) return;
                      e.currentTarget.style.borderColor = "var(--brand-1)";
                      e.currentTarget.style.backgroundColor = "rgba(171, 130, 197, 0.15)";
                    }}
                    onMouseLeave={(e) => {
                      if (!selectedCategory) return;
                      e.currentTarget.style.borderColor = "rgba(171, 130, 197, 0.3)";
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    All
                  </button>
                  {RESOURCE_CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      style={{
                        padding: "8px 16px",
                        borderRadius: "8px",
                        border: selectedCategory === category ? "2px solid var(--brand-1)" : "1px solid rgba(171, 130, 197, 0.3)",
                        backgroundColor: selectedCategory === category ? "rgba(171, 130, 197, 0.2)" : "transparent",
                        color: "var(--text-high)",
                        cursor: "pointer",
                        fontWeight: selectedCategory === category ? 600 : 500,
                        fontSize: "14px",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (selectedCategory === category) return;
                        e.currentTarget.style.borderColor = "var(--brand-1)";
                        e.currentTarget.style.backgroundColor = "rgba(171, 130, 197, 0.15)";
                      }}
                      onMouseLeave={(e) => {
                        if (selectedCategory === category) return;
                        e.currentTarget.style.borderColor = "rgba(171, 130, 197, 0.3)";
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {selectedTag && (
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingTop: "12px", borderTop: "1px solid rgba(171, 130, 197, 0.2)" }}>
                    <span style={{ color: "var(--text-mid)", fontSize: "14px" }}>Tag filter active:</span>
                    <span style={{ padding: "4px 12px", backgroundColor: "rgba(217, 70, 239, 0.2)", borderRadius: "6px", color: "var(--accent)", fontSize: "14px", fontWeight: 500 }}>
                      {selectedTag}
                    </span>
                    <button
                      onClick={() => setSelectedTag(null)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--brand-1)",
                        cursor: "pointer",
                        textDecoration: "underline",
                        fontSize: "14px",
                        padding: 0,
                      }}
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>

              {/* Results */}
              {filteredResources.length === 0 ? (
                <p style={{ color: "var(--text-mid)", textAlign: "center", padding: "48px 0" }}>
                  No resources found with the selected filters.
                </p>
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
                  style={{ color: "var(--brand-1)", textDecoration: "underline" }}
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

          <div style={{ marginTop: "24px", padding: "16px", backgroundColor: "rgba(124, 58, 237, 0.1)", borderRadius: "8px", borderLeft: "4px solid var(--brand-1)" }}>
            <p style={{ color: "var(--text-mid)", fontSize: "14px" }}>
              <strong>First time on GitHub?</strong> No problem! GitHub's web editor makes it easy to contribute without leaving your browser. Just follow the steps above.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}