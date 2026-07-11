export function Footer() {
  return (
    <footer className="mt-12 border-t border-[var(--border)] bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between md:px-6">
        <p>© {new Date().getFullYear()} Keyrise. All rights reserved.</p>
        <div className="flex flex-wrap gap-4">
          <a href="mailto:[support@email.com]" className="hover:text-[var(--foreground)]">
            [support@email.com]
          </a>
          <a href="tel:[phone number]" className="hover:text-[var(--foreground)]">
            [phone number]
          </a>
          <a href="#help" className="hover:text-[var(--foreground)]">
            Help Center
          </a>
        </div>
      </div>
    </footer>
  );
}
