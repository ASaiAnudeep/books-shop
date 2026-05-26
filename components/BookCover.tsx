import { CSSProperties } from "react";

const tokenMap: Record<string, [string, string]> = {
  dawn: ["#f4d29f", "#b56f4a"],
  coast: ["#8fc1b5", "#35615d"],
  atlas: ["#d6ba8a", "#7a5d3f"],
  signal: ["#8aa7d6", "#2c3f61"],
  studio: ["#f0c6ac", "#9b6144"],
  ledger: ["#d7c093", "#61503a"],
  midnight: ["#5f6fa4", "#2a2946"],
  time: ["#9fc7d1", "#40646e"],
  courtyard: ["#d6ad8a", "#7f4f36"],
  lantern: ["#eed18e", "#926734"],
  color: ["#c79bc8", "#7d4f7e"],
  ink: ["#9d9bb6", "#46435d"]
};

export const BookCover = ({ token, title }: { token: string; title: string }) => {
  const [start, end] = tokenMap[token] ?? ["#d5c7b1", "#74614e"];

  const style = {
    backgroundImage: `linear-gradient(140deg, ${start}, ${end})`
  } satisfies CSSProperties;

  return (
    <div style={style} className="h-48 w-full rounded-md p-3 text-white shadow-inner">
      <div className="h-full rounded border border-white/30 bg-black/15 p-3">
        <p className="font-display text-lg leading-tight">{title}</p>
      </div>
    </div>
  );
};
