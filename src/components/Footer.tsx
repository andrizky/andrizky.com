export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-6">
        <p className="text-sm text-text-muted">
          © {year} · Andri Rizky P
        </p>
      </div>
    </footer>
  )
}
