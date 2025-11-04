import Image from "next/image";

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-container">
        <div className="footer-grid">
          <div className="col-span-2">
            <div className="flex items-center mb-6" style={{ gap: "var(--spacing-md)" }}>
              <div className="w-12 h-12 bg-gradient-to-r flex items-center justify-center">
                <Image
                  src="/Colorstack_Logo.png"
                  alt="ColorStackNYU logo"
                  width={40}
                  height={40}
                  className="rounded-md"
                />
              </div>
              <h3 className="font-bold" style={{ fontSize: "var(--fs-h2)", color: "var(--text-high)" }}>ColorStackNYU</h3>
            </div>
            <p className="footer-tagline">
              Empowering the next generation of Black and Latino technologists
              at NYU and beyond
            </p>
          </div>
          <nav aria-label="Quick Links">
            <h4 className="font-semibold" style={{ fontSize: "18px", marginBottom: "var(--spacing-lg)", color: "var(--text-high)" }}>
              Quick Links
            </h4>
            <ul className="space-y-3" style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li>
                <a href="#about" className="block">
                  About Us
                </a>
              </li>
              <li>
                <a href="/events" className="block">
                  Events
                </a>
              </li>
              <li>
                <a href="/resources" className="block">
                  Resources
                </a>
              </li>
              <li>
                <a href="/meet-the-team" className="block">
                  Meet the Team
                </a>
              </li>
            </ul>
          </nav>
          <nav aria-label="Social Media">
            <h4 className="font-semibold" style={{ fontSize: "18px", marginBottom: "var(--spacing-lg)", color: "var(--text-high)" }}>Connect</h4>
            <ul className="space-y-3" style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li>
                <a
                  href="https://www.instagram.com/colorstacknyu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  aria-label="Follow us on Instagram (opens in new tab)"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/colorstacknyu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  aria-label="Connect with us on LinkedIn (opens in new tab)"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://chat.whatsapp.com/ETvUe1brGFk9zW361SVD94"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  aria-label="Join our WhatsApp group (opens in new tab)"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:colorstacknyu@gmail.com"
                  className="block"
                  aria-label="Email us at colorstacknyu@gmail.com"
                >
                  Email
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
