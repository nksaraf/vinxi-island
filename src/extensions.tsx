import { cn } from "@/lib/utils";
import { AppIcon } from "./app-dock";
import { Count } from "./dynamic-island";
import { useSQL } from "./sql";

export const extensions = [
  {
    id: "like",
    name: "Like",
    icon: "icon-[ic--round-favorite] text-slate-8",
    className: "bg-slate-3",
    AppIcon: (props) => {
      const data = useSQL("SELECT * FROM likes where url = ?", [
        window.location.href,
      ]);

      console.log(data);
      return (
        <AppIcon
          {...props}
          icon={cn(
            "icon-[ic--round-favorite]",
            data.length > 0 ? "text-tomato-8" : " text-slate-8"
          )}
          className={cn(data.length > 0 ? "bg-tomato-3" : " bg-slate-3")}
        />
      );
    },
  },
  {
    id: "listening",
    name: "Pomodoro",
    icon: "text-amber-9",
    className: "bg-amber-3",
    width: 60,
    height: 20,
    children: (
      <>
        <Count />
      </>
    ),
    AppIcon: AppIcon,
  },
];
