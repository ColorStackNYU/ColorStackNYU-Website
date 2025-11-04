"use client";

import { useState } from "react";

export default function GetConnected() {
    
    return (
        <section className="section">
            <div className="site-container">
                <header className="text-center mb-10">
                    <h2 className="text-3xl font-bold tracking-tight" style={{color:'var(--text-high)'}}>Get Connected</h2>
                </header>

                <div className="grid gap-8 sm:grid-cols-2">
                    <div className="surface-card">
                        <h3 className="text-xl font-semibold" style={{color:'var(--text-high)'}}>Club Newsletter</h3>
                        <p className="text-sm mt-1" style={{color:'var(--text-mid)'}}>
                            Stay up to date with our events and news — subscribe below.
                        </p>
                        <a
                            href="http://eepurl.com/jnc-JE"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-4 btn btn-primary"
                        >
                            Subscribe
                        </a>
                    </div>

                    <div className="surface-card">
                        <h3 className="text-xl font-semibold" style={{color:'var(--text-high)'}}>WhatsApp Group Chat</h3>
                        <p className="text-sm mt-1" style={{color:'var(--text-mid)'}}>
                            Join our WhatsApp group to get quick updates and chat with members.
                        </p>
                        <a
                            href="https://chat.whatsapp.com/ETvUe1brGFk9zW361SVD94?mode=ac_t"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Join ColorStackNYU WhatsApp group chat"
                            className="inline-block mt-4 btn btn-primary"
                        >
                            Join Group Chat
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}