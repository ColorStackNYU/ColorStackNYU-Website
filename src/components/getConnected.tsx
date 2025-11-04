"use client";

import ContentContainer from "./ContentContainer";

export default function GetConnected() {
    
    return (
        <section className="section">
            <ContentContainer>
                <header className="text-center" style={{ marginBottom: "var(--spacing-3xl)" }}>
                    <h2 className="font-bold tracking-tight" style={{ fontSize: "var(--fs-h2)", color: "var(--text-high)" }}>Get Connected</h2>
                </header>

                <div className="connect-grid">
                    <div className="connect-card">
                        <h3 className="connect-title">Club Newsletter</h3>
                        <p className="connect-desc">Stay up to date with our events and news</p>
                        <a
                            href="http://eepurl.com/jnc-JE"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block btn btn-primary"
                            style={{ marginTop: "var(--spacing-6xl)" }}
                        >
                            Subscribe
                        </a>
                    </div>

                    <div className="connect-card">
                        <h3 className="connect-title">Join National ColorStack</h3>
                        <p className="connect-desc">Access opportunities, mentorship, and join 10,000+ members</p>
                        <a
                            href="https://www.colorstack.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block btn btn-primary"
                            style={{ marginTop: "var(--spacing-6xl)" }}
                        >
                            Apply Now
                        </a>
                    </div>

                    <div className="connect-card">
                        <h3 className="connect-title">WhatsApp Group Chat</h3>
                        <p className="connect-desc">Join our WhatsApp group to get quick updates and chat with members.</p>
                        <a
                            href="https://chat.whatsapp.com/ETvUe1brGFk9zW361SVD94?mode=ac_t"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Join ColorStackNYU WhatsApp group chat"
                            className="inline-block btn btn-primary"
                            style={{ marginTop: "var(--spacing-6xl)" }}
                        >
                            Join Group Chat
                        </a>
                    </div>
                </div>
            </ContentContainer>
        </section>
    );
}