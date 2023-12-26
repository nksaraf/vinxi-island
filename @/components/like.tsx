import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense, startTransition, useState } from "react";
import { useBrain } from "../brain";
import { useSQLMutation } from "@/lib/sql";

export function Like() {
  const [state, setState] = useState(false);
  const brain = useBrain();
  const action = useSQLMutation(
    `INSERT INTO likes (url, title, datetime, type) VALUES (?, ?, ?, ?)`,
    ["url", "title", "datetime", "type"]
  );
  return (
    <motion.div
      layout
      transition={{
        type: "spring",
        bounce: 0.5,
      }}
      className="relative flex h-content w-[280px] flex-col justify-between px-4 py-4 space-y-4"
    >
      <motion.div layout className="flex flex-row relative">
        {/* <div className="absolute top-2 left-2 flex flex-row space-x-1 items-center text-white bg-tomato-8 p-1 rounded-full">
              <span className="icon-[ic--round-favorite] text-xs"></span>
            </div> */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-black/70 text-foreground p-2 border-scale-3 border-l border-r border-b rounded-b-2xl">
          <HostTitle className="line-clamp-2 text-sm font-semibold" />
        </div>
        <HostOGImage className="flex-1 aspect-auto h-[160px]  rounded-2xl border border-scale-3" />
        {/* <div>
              <HostTitle className="line-clamp-2 font-semibold" />
            </div> */}
      </motion.div>
      <AnimatePresence initial={false} mode="popLayout">
        {state ? (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              opacity: { duration: 0.2 },
              layout: {
                type: "spring",
                bounce: 0.4,
                duration: 1,
              },
            }}
            className="undraggable"
            // style={{
            //   originX: message.user === "me" ? 1 : 0,
            // }}
            // initial={{ y: "100%", opacity: 0 }}
            // animate={{ y: 0, opacity: 1 }}
            // exit={{ opacity: 0 }}
            // className={buttonVariants({
            //   className:
            //     "rounded-full bg-tomato-8 text-sm hover:bg-tomato-6 text-tomato-12 flex flex-row space-x-1 items-center",
            // })}
            onClick={async () => {}}
          >
            {/* <span className="icon-[ic--round-favorite] text-base"></span>
                    <span>Like</span> */}
            abcas, ad, asd, ada, sda,d
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div className="flex flex-row space-x-2">
        <motion.button
          className="w-7 h-7 bg-slate-6 rounded-full"
          onClick={() => {
            setState(true);
          }}
        >
          <span className="icon-[bi--tags] text-slate-12 text-sm" />
        </motion.button>
        <Button
          size="xs"
          className="rounded-full flex-1 bg-tomato-8 text-sm hover:bg-tomato-6 text-tomato-12 flex flex-row space-x-1 items-center"
          onClick={async () => {
            await action.mutateAsync({
              url: window.location.href,
              title: document.title,
              datetime: Date.now().toLocaleString("en-us"),
              type: "website",
            });
            startTransition(() => {
              brain.setModeValue("idle");
            });
          }}
        >
          <span className="icon-[ic--round-favorite] text-sm"></span>
          <span>Like</span>
        </Button>
      </div>
    </motion.div>
  );
}
function HostOGImage(props) {
  const [state] = useState(() => {
    return document
      .querySelector("meta[property='og:image']")
      ?.getAttribute("content");
  });
  return (
    <div
      style={{
        backgroundImage: `url(${state})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
      {...props}
    />
  );
}
function HostTitle(props) {
  const [state] = useState(() => {
    return (
      document.title ??
      document
        .querySelector("meta[property='og:title']")
        ?.getAttribute("content")
    );
  });
  return <h1 {...props}>{state}</h1>;
}
