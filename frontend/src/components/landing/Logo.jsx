export const Logo = ({ size = "md" }) => {
  const box = size === "lg" ? "w-12 h-12 text-xl" : "w-10 h-10 text-lg";
  return (
    <div className="flex items-center gap-3 select-none" data-testid="brand-logo">
      <div className={`${box} bg-taxi rounded-md flex items-center justify-center relative overflow-hidden shrink-0`}>
        <span className="font-display text-black tracking-tighter">999</span>
        <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-redb" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display text-white text-lg tracking-tighter">999 TAXI</span>
        <span className="font-mono-accent text-taxi text-[9px]">HAYDOVCHILAR XIZMATI</span>
      </div>
    </div>
  );
};
