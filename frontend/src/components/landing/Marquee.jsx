const words = [
  "FAST",
  "SAFE",
  "24/7",
  "GLOBAL",
  "PREMIUM",
  "SMART",
  "RELIABLE",
  "EVERYWHERE",
];

export default function Marquee() {
  const items = [...words, ...words];
  return (
    <section
      data-testid="marquee-section"
      className="relative border-y border-white/10 bg-[#0a0a0a] py-8 overflow-hidden"
    >
      <div className="flex whitespace-nowrap animate-ticker">
        {items.map((w, i) => (
          <div
            key={i}
            className="flex items-center gap-8 mx-8 shrink-0"
            data-testid={`marquee-item-${i}`}
          >
            <span className="font-display text-white text-5xl md:text-7xl tracking-tighter">
              {w}
            </span>
            <span className="w-3 h-3 rounded-full bg-yandex" />
          </div>
        ))}
      </div>
    </section>
  );
}
