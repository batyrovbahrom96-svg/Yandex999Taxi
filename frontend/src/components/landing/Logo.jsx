export const Logo = ({ size = "md" }) => {
  const box = size === "lg" ? "w-12 h-12" : "w-10 h-10";
  return (
    <div className="flex items-center gap-3 select-none" data-testid="brand-logo">
      <img
        src="/logo-999.png"
        alt="999 Taxi logotipi"
        className={`${box} rounded-md object-cover shrink-0`}
      />
      <div className="flex flex-col leading-none">
        <span className="font-display text-white text-lg tracking-tighter">999 TAXI</span>
        <span className="font-mono-accent text-taxi text-[9px]">HAYDOVCHILAR XIZMATI</span>
      </div>
    </div>
  );
};
