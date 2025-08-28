"use client";

import { useState } from "react";

export default function GetConnected() {
    
    return (
        <section className="py-16">
            <div className="mx-auto max-w-3xl px-6">
                <header className="text-center mb-10">
                    <h2 className="text-3xl font-bold tracking-tight">Get Connected</h2>
                </header>

                <div className="grid gap-8 sm:grid-cols-2">
                    <div className="rounded-2xl border bg-white p-6 shadow-sm">
                        <h3 className="text-xl text-black font-semibold">Club Newsletter</h3>
                        <p className="text-sm text-black mt-1">
                            COMING SOON
                        </p>
                    </div>

                    <div className="rounded-2xl border bg-white p-6 shadow-sm">
                        <h3 className="text-xl text-black font-semibold">Discord Server</h3>
                        <p className="text-sm text-black mt-1">
                            COMING SOON
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}