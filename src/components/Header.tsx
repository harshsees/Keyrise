"use client";

import { Menu, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

const navItems = ["Visas", "Destinations", "Pricing", "Help"];
const destinations = ["Dubai", "Abu Dhabi", "Sharjah", "Ras Al Khaimah"];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      destinations.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          <a href="#" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary)] text-sm font-bold text-white">
              VC
            </div>
            <span className="text-sm font-semibold text-[var(--foreground)]">
              Keyrise
            </span>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-[var(--muted)] lg:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href={item === "Pricing" ? "#pricing" : "#"}
                className="hover:text-[var(--foreground)]"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="rounded-lg border border-[var(--border)] p-2 text-[var(--muted)] hover:bg-[#f8f8fc]"
              aria-label="Open destination search"
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-semibold text-[var(--foreground)]"
            >
              India
            </button>
            <a href="#application-flow" className="px-2 text-sm text-[var(--muted)]">
              Login / My Applications
            </a>
            <a
              href="#application-flow"
              className="rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--primary-hover)]"
            >
              Start Application
            </a>
          </div>

          <button
            type="button"
            className="rounded-lg border border-[var(--border)] p-2 lg:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle mobile menu"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-[var(--border)] bg-white px-4 py-4 lg:hidden">
            <div className="mb-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="rounded-lg border border-[var(--border)] p-2"
                aria-label="Search destinations"
              >
                <Search className="h-4 w-4" />
              </button>
              <span className="rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-semibold">
                India
              </span>
            </div>
            <div className="flex flex-col gap-3 text-sm text-[var(--foreground)]">
              {navItems.map((item) => (
                <a key={item} href={item === "Pricing" ? "#pricing" : "#"}>
                  {item}
                </a>
              ))}
              <a href="#application-flow">Login / My Applications</a>
              <a
                href="#application-flow"
                className="rounded-xl bg-[var(--primary)] px-4 py-3 text-center font-semibold text-white"
              >
                Start Application
              </a>
            </div>
          </div>
        )}
      </header>

      {searchOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center bg-black/30 px-4 pt-20">
          <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Search destinations
              </h3>
              <button type="button" onClick={() => setSearchOpen(false)}>
                <X className="h-5 w-5 text-[var(--muted)]" />
              </button>
            </div>
            <input
              aria-label="Search destination"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search Dubai, Abu Dhabi..."
              className="mb-3 w-full rounded-xl border border-[var(--border)] px-4 py-3 text-sm"
            />
            <ul className="space-y-2">
              {filtered.length ? (
                filtered.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm text-[var(--foreground)]"
                  >
                    {item}
                  </li>
                ))
              ) : (
                <li className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
                  No destinations found.
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
