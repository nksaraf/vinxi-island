import { Button } from "@/components/ui/button";
import { motion, useDragControls } from "framer-motion";
import { Suspense, useLayoutEffect, useRef, useState } from "react";

import { create } from "zustand";
import { combine } from "zustand/middleware";
import { Input } from "@/components/ui/input";

import { useModeValue } from "../brain/ui-react";
import { Dock } from "./dock";
import { useSQL } from "../lib/sql";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { RingMode } from "./ringing";
import { Like } from "./like";
import { Listening } from "./todo";
import { Home } from "./messages";
import { Timer } from "./timer";
import { useBrain } from "@/brain";

let animationStates = {
  "ring-mode-idle": { scale: 0.9, scaleX: 0.9 },
  "timer-ring-mode": { scale: 0.7, y: -7.5 },
  "ring-mode-timer": { scale: 1.4, y: 7.5 },
  "timer-listening": { scaleY: 1.1, y: 7.5 },
  "listening-ring-mode": { scale: 0.65, y: -32 },
  "ring-mode-listening": { scale: 1.5, y: 12.5 },
  "timer-idle": { scale: 0.7, y: -7.5 },
  "listening-timer": { scaleY: 0.9, y: -12 },
  "listening-idle": { scale: 0.4, y: -36 },
};

function useScreenSize() {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
}

export function DynamicIsland() {
  let [animationStyle, setAnimationStyle] = useState(),
    [springBounce, setSpringBounce] = useState(1),
    [currentHeight, setCurrentHeight] = useState(28),
    [currentWidth, setCurrentWidth] = useState(28),
    islandRef = useRef<HTMLDivElement>(null);

  const size = useScreenSize();

  const state = useModeValue();

  const brain = useBrain();

  function getCurrentComponent() {
    switch (state) {
      case "timer":
        return <Timer />;
      case "listening":
        return <Listening />;
      case "ring-mode":
        return <RingMode />;
      case "like":
        return <Like />;
      case "messages":
        return <Home />;
      default:
        return <Idle />;
    }
  }

  const dragControls = useDragControls();

  useLayoutEffect(() => {
    let element = islandRef.current;
    if (element) {
      let newBounceValue;
      let { height, width } = element.getBoundingClientRect(),
        heightDifference = Math.abs(height - currentHeight),
        heightAdjustment = heightDifference / 100;
      (newBounceValue = Math.min(
        Math.max(
          (newBounceValue =
            height < currentHeight
              ? 0.35 - 0.3 * heightAdjustment
              : 0.3 + 0.3 * heightAdjustment),
          0.3
        ),
        0.35
      )),
        heightDifference < 20 && (newBounceValue = 0.5),
        setCurrentHeight(height),
        setCurrentWidth(width),
        setSpringBounce(newBounceValue);
    }
  }, [state]);

  let anotherRef = useRef();

  return (
    <>
      <div className="fixed dark left-1/2 -translate-x-1/2 bottom-3 z-[100000]">
        <Suspense>
          <motion.div
            drag
            dragControls={dragControls}
            dragListener={false}
            ref={anotherRef}
            onPointerDown={(e) => {
              console.log(e);

              let target = e.target as HTMLElement;
              if (target.classList.contains("undraggable")) {
                return;
              }

              let parent = target.parentElement;
              while (parent && parent !== anotherRef.current) {
                if (parent.classList.contains("undraggable")) {
                  return;
                }
                parent = parent.parentElement;
              }

              dragControls.start(e);
            }}
            onDoubleClick={() => {
              brain.setModeValue("idle");
            }}
            // dragSnapToOrigin
            // layout
            // layoutRoot
            initial={{
              // x: size[0] / 2 - currentWidth / 2,
              y: 0,
            }}
            animate={{
              // x: size[0] / 2 - currentWidth / 2,
              y: 0,
            }}
            // style={{
            //   transform: `translateX(${
            //     0
            //     // size[0] / 2 - currentWidth / 2
            //   }px) translateY(${
            //     -8
            //     // size[1] / 2 - currentHeight / 2
            //   }px)`,
            // }}
            style={{
              x: document.body.scrollHeight > window.innerHeight ? 8 : 0,

              y: 0,
            }}
          >
            <ContextMenu modal={false}>
              <ContextMenuTrigger asChild>
                <motion.div
                  layout
                  transition={{ type: "spring", bounce: springBounce }}
                  style={{ borderRadius: "32px" }}
                  className="min-w-[100px] rounded-full bg-scale-1 
              //shadow-md //shadow-scale-3 //drop-shadow-scale-1
              "
                >
                  <motion.div
                    ref={islandRef}
                    transition={{ type: "spring", bounce: springBounce }}
                    key={state}
                    initial={{
                      scale: 0.9,
                      opacity: 0,
                      filter: "blur(5px)",
                      originX: 0.5,
                      originY: 0.5,
                    }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      filter: "blur(0px)",
                      originX: 0.5,
                      originY: 0.5,
                      transition: { delay: 0.3 },
                    }}
                  >
                    {getCurrentComponent()}
                  </motion.div>
                </motion.div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem
                  onClick={() => {
                    globalThis.hideIsland();
                  }}
                >
                  Hide
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
            {/* <div className="pointer-events-none absolute left-1/2 top-0 flex h-[200px] w-[300px] -translate-x-1/2 items-start justify-center">
            <AnimatePresence mode="popLayout" custom={animationStyle}>
              <motion.div
                initial={{ opacity: 0 }}
                exit="exit"
                variants={exitVariants}
              >
                {getCurrentComponent()}
              </motion.div>
            </AnimatePresence>
          </div> */}
          </motion.div>
        </Suspense>
      </div>
    </>
  );
}

let exitVariants = {
  exit: (style) => ({
    ...style,
    opacity: [1, 0],
    filter: "blur(5px)",
  }),
};

function Idle() {
  return <Dock />;
}
