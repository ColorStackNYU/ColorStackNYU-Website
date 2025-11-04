export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-grid">
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r flex items-center justify-center">
                <img
                  src="/Colorstack_Logo.png"
                  alt="Logo"
                  className="w-10 h-10 rounded-md"
                />
              </div>
              <h3 className="text-2xl font-bold text-high">ColorStackNYU</h3>
            </div>
            <p className="footer-tagline">
              Empowering the next generation of Black and Latino technologists
              at NYU and beyond
            </p>
          </div>
          <div>
            <h4 className="text-high font-semibold text-lg mb-4">
              Quick Links
            </h4>
            <div className="space-y-3">
              <a
                href="#about"
                className="block"
              >
                About Us
              </a>
              <a
                href="/events"
                className="block"
              >
                Events
              </a>
              <a
                href="/resources"
                className="block"
              >
                Resources
              </a>
              <a
                href="/meet-the-team"
                className="block"
              >
                Meet the Team
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-high font-semibold text-lg mb-4">Connect</h4>
            <div className="space-y-3">
              <a
                href="https://www.instagram.com/colorstacknyu/"
                target="_blank"
                className="block"
              >
                Instagram
              </a>
              <a
                href="#"
                target="_blank"
                className="block"
              >
                LinkedIn
              </a>
              <a
                href="https://chat.whatsapp.com/your-invite-link"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                WhatsApp
              </a>
              <a
                href="mailto:colorstacknyu@gmail.com"
                className="block"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
