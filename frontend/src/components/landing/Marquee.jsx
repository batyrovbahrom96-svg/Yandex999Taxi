import { useT } from "@/lib/i18n";

export default function Marquee() {
  const items = useT().marquee;
  const row = [...items, ...items];
  return (
    <div data-testid="marquee-section" className="relative border-y border-white/10 bg-taxi py-4 overflow-hidden">
      <div className="flex whitespace-nowrap animate-ticker">
        {row.map((t, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="font-display text-black text-lg md:text-xl tracking-tight px-6">{t}</span>
            <span className="w-2 h-2 bg-redb rotate-45 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
