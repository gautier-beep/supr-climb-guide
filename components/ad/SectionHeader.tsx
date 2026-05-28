interface SectionHeaderProps {
  overline?: string
  title: string
  description?: string
  className?: string
}

export default function SectionHeader({
  overline,
  title,
  description,
  className = '',
}: SectionHeaderProps) {
  return (
    <header className={`px-4 ${className}`}>
      {overline && <p className="ad-overline mb-2">{overline}</p>}
      <h2 className="ad-section-title text-balance">{title}</h2>
      {description && <p className="mt-2 text-[15px] text-ink-muted leading-relaxed">{description}</p>}
    </header>
  )
}
