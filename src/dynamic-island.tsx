import { Button, buttonVariants } from "@/components/ui/button";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import {
  Suspense,
  cache,
  startTransition,
  use,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { create } from "zustand";
import { combine } from "zustand/middleware";
import { Input } from "@/components/ui/input";
import { useKmenu, useShortcut } from "@/components/ui/command";
import Palette from "./cmd";

import { MotionValue, useSpring, useTransform } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useModeValue, useTodosTable } from "./brain/ui-react";
import { PARTYKIT_HOST, brainContext, useBrain } from "./brain";
import { appendCorsHeaders } from "h3";
import { Dock } from "./app-dock";
import { useSQL } from "./sql";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

const useDynamicIsland = create(
  combine(
    {
      mode: "idle",
      ringing: false,
    },
    (set, get) => {}
  )
);

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

export function CommandPlt() {
  const { toggle } = useKmenu();
  // const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   const down = (e: KeyboardEvent) => {
  //     if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
  //       e.preventDefault();
  //       toggle();
  //     }
  //   };
  //   document.addEventListener("keydown", down);
  //   return () => document.removeEventListener("keydown", down);
  // }, []);

  // useShortcut({
  //   targetKey: "i",
  //   modifier: "alt",
  //   handler() {
  //     toggle();
  //   },
  // });

  return (
    // <CommandDialog open={open} onOpenChange={setOpen}>
    //   <CommandInput placeholder="Type a command or search..." />
    //   <CommandList>
    //     <CommandEmpty>No results found.</CommandEmpty>
    //     <CommandGroup heading="Suggestions">
    //       <CommandItem>Calendar</CommandItem>
    //       <CommandItem>Search Emoji</CommandItem>
    //       <CommandItem>Calculator</CommandItem>
    //     </CommandGroup>
    //   </CommandList>
    // </CommandDialog>
    <Palette
    // crumbs={["Home"]}
    // commands={{
    //   index: 0,
    //   initialHeight: 10,
    //   commands: [],
    // }}
    />
  );
}

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

  console.log(state);

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
      <CommandPlt />
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
      {/* </Container> */}
    </>
  );
}

function Timer() {
  return (
    <motion.div
      {...{
        transition: {
          type: "spring",
          bounce: 0.5,
        },
        className:
          "relative flex h-[48px] w-[320px] items-center justify-between",
        // "children": [
        //   "<ForwardRef />",
        //   "<button />",
        //   "<div />"
        // ]
      }}
    >
      <Input className="text-foreground rounded-full h-full" />
      {/* <div className="bg-white h-full w-full"></div> */}
    </motion.div>
  );
}

let exitVariants = {
  exit: (style) => ({
    ...style,
    opacity: [1, 0],
    filter: "blur(5px)",
  }),
};

function Container({ actions, children, className }) {
  return (
    <div
      className={`fixed top-0 my-6 rounded-lg shadow-sm dark:bg-[#0B0B09] ${className}`}
    >
      <div className="flex w-full rounded-t-lg px-4 py-6">{children}</div>
      {actions && (
        <div className="flex justify-center gap-2 rounded-b-lg border-t border-gray-400 bg-[#FBFBF9] p-2 py-2.5 dark:bg-[#151514]">
          {actions.map((action) => (
            <button
              key={action.label}
              className="rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-1200 shadow-border outline-none transition-colors hover:bg-gray-200 focus-visible:shadow-focus-ring-button dark:bg-gray-100"
              onClick={action.onClick}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// export function DynamicIsland2() {
//   const mode = useDynamicIsland().mode;
//   return (
//     <div className="dark absolute bottom-3 left-1/2 -translate-x-1/2">
//       {/* <div className="flex items-start"> */}
//       <motion.div
//         layout
//         {...{
//           layout: true,
//           transition: {
//             type: "spring",
//             bounce: 0.5,
//           },
//           style: {
//             borderRadius: "32px",
//           },
//           className:
//             "min-w-[100px] overflow-hidden rounded-full bg-background shadow-lg shadow-scale9 drop-shadow-scale12",
//         }}
//       >
//         {/* <div className="absolute inset-0 m-auto mr-4 ml-4 flex items-center justify-between">
//         <div className="flex items-center">
//           <div className="rounded-full bg-blue-600 w-3 h-3 m-2"></div>
//         </div>
//         <div className="flex items-center">
//           <span className="text-white text-sm">Now Playing...</span>
//         </div>
//       </div> */}
//         {/* <Popover>
//           <PopoverTrigger>
//             <Button variant="ghost" size="xs" className="rounded-full">
//               <span className="icon-[ph--heart-bold] text-foreground" />
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="dark">Hello</PopoverContent>
//         </Popover> */}
//         <motion.div
//           key={mode}
//           {...{
//             transition: {
//               type: "spring",
//               bounce: 0.5,
//             },
//             initial: {
//               scale: 0.9,
//               opacity: 0,
//               filter: "blur(5px)",
//               originX: 0.5,
//               originY: 0.5,
//             },
//             animate: {
//               scale: 1,
//               opacity: 1,
//               filter: "blur(0px)",
//               originX: 0.5,
//               originY: 0.5,
//               transition: { delay: 0.05 },
//             },
//           }}
//         >
//           {mode === "idle" ? <Idle /> : <RingMode />}
//         </motion.div>
//       </motion.div>
//       <div
//         {...{
//           className:
//             "pointer-events-none absolute left-1/2 flex h-[200px] w-[300px] -translate-x-1/2 items-end justify-center bottom-3",
//         }}
//       >
//         <AnimatePresence
//           {...{
//             mode: "popLayout",
//             custom: {
//               scale: 0.9,
//               scaleX: 0.9,
//             },
//           }}
//         >
//           <motion.div
//             key={mode + "second"}
//             {...{
//               initial: {
//                 opacity: 0,
//               },
//               exit: "exit",
//               // variants: {
//               //   exit: 'ƒ exit() {}',
//               // },
//             }}
//           >
//             {mode === "idle" ? <Idle /> : <RingMode />}
//           </motion.div>
//         </AnimatePresence>
//       </div>
//       {/* </div> */}
//     </div>
//   );
// }

function RingMode() {
  // useEffect(() => {
  //   let i = setInterval(() => {
  //     store.setState({
  //       ringing: !store.getState().ringing,
  //     });
  //   }, 3000);

  //   return () => {
  //     clearInterval(i);
  //   };
  // }, []);

  console.log(useDynamicIsland().ringing);
  return (
    <motion.div
      {...{
        initial: {
          width: 128,
        },
        animate: {
          width: useDynamicIsland().ringing ? 148 : 128,
        },
        transition: {
          type: "spring",
          bounce: 0.5,
        },
        className: "relative flex h-[28px] items-center justify-between px-2.5",
        // "children": [
        //   "<ForwardRef />",
        //   "<button />",
        //   "<div />"
        // ]
      }}
    >
      <motion.button
        onClick={() => {
          useDynamicIsland.setState({
            mode: "idle",
            // ringing: !store.getState().ringing,
          });
        }}
        {...{
          initial: {
            width: 0,
            opacity: 0,
            filter: "blur(4px)",
          },
          animate: !useDynamicIsland().ringing
            ? {
                width: 0,
                opacity: 0,
                filter: "blur(4px)",
              }
            : {
                width: 40,
                opacity: 1,
                filter: "blur(0px)",
              },
          transition: {
            type: "spring",
            bounce: 0.35,
          },
          className:
            "absolute left-[5px] h-[18px]  w-12 cursor-pointer rounded-full bg-[#FD4F30]",
        }}
      ></motion.button>

      <motion.div>
        <Button
          variant="ghost"
          size="xs"
          className="rounded-full"
          onClick={() => {
            useDynamicIsland.setState({
              ringing: !useDynamicIsland.getState().ringing,
            });
          }}
        >
          <span className="icon-[ph--heart-bold] text-foreground" />
        </Button>
      </motion.div>

      <motion.button
        className={buttonVariants({
          variant: "ghost",
          size: "xs",
        })}
        onClick={() => {
          useDynamicIsland.setState({
            mode: "idle",
          });
        }}
      >
        <span className="icon-[ph--heart-bold] text-foreground" />
      </motion.button>
    </motion.div>
  );
}

function Idle() {
  return <Dock />;
  return (
    <Button
      variant="ghost"
      size="xs"
      className="rounded-full"
      onClick={() => {
        useDynamicIsland.setState({
          mode: "like",
        });
      }}
    >
      <span className="icon-[ph--heart-bold] text-scale-12" />
    </Button>
  );
}

function Inner() {
  const data = useSQL("SELECT * FROM likes");
  return null;
}

function useSQLMutation(sql: string) {
  return useMutation({
    mutationFn: async (params: any[]) => {
      const res = await fetch(`http://${PARTYKIT_HOST}/parties/main/brain`, {
        method: "POST",
        body: JSON.stringify({ sql, action: "exec", params }),
      });
      return await res.json();
    },
  });
}

function Like() {
  const [state, setState] = useState(false);
  const brain = useBrain();
  const action = useSQLMutation(
    `INSERT INTO likes (url, title, datetime, type) VALUES (?, ?, ?, ?)`
  );
  return (
    <motion.div
      layout
      {...{
        transition: {
          type: "spring",
          bounce: 0.5,
        },
        className:
          "relative flex flex-col h-content w-[280px] flex-col justify-between px-4 py-4 space-y-4",
        // "children": [
        //   "<ForwardRef />",
        //   "<button />",
        //   "<div />"
        // ]
      }}
    >
      <Suspense>
        <Inner />
      </Suspense>
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
            await action.mutateAsync([
              window.location.href,
              document.title,
              Date.now().toLocaleString("en-us"),
              "website",
            ]);
            startTransition(() => {
              brain.setModeValue("idle");
            });
          }}
        >
          <span className="icon-[ic--round-favorite] text-sm"></span>
          <span>Like</span>
        </Button>
      </div>
      {/* <Input className="text-foreground rounded-full h-full" /> */}
      {/* Hello */}
      {/* <div className="bg-white h-full w-full"></div> */}
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

const fontSize = 30;
const padding = 15;
const height = fontSize + padding;

export function Count() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let i = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);

    return () => {
      clearInterval(i);
    };
  }, []);

  return (
    <span className="tabular-nums">
      {Math.floor(count / 60)}:
      {Math.floor(count % 60).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}
    </span>
  );
}

function Counter({ value }: { value: number }) {
  return (
    <div style={{ fontSize }} className="flex overflow-hidden leading-none">
      <Digit place={100} value={value} />
      <Digit place={10} value={value} />
      <Digit place={1} value={value} />
    </div>
  );
}

function Digit({ place, value }: { place: number; value: number }) {
  let valueRoundedToPlace = Math.floor(value / place);
  let animatedValue = useSpring(valueRoundedToPlace);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div style={{ height }} className="relative w-[12px] tabular-nums">
      {[...Array(10).keys()].map((i) => (
        <Number key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  );
}

function Number({ mv, number }: { mv: MotionValue; number: number }) {
  let y = useTransform(mv, (latest) => {
    let placeValue = latest % 10;
    let offset = (10 + number - placeValue) % 10;

    let memo = offset * height;

    if (offset > 5) {
      memo -= 10 * height;
    }

    return -memo;
  });

  let opacity = useTransform(y, [-10, 0, 10], [0, 1, 0]);

  // opacity = useSpring(opacity, {
  //   mass: 0.1,
  //   stiffness: 150,
  //   damping: 12,
  // });
  return (
    <motion.span
      style={{ y, opacity }}
      transition={{
        duration: 0.1,
      }}
      className="text-sm absolute inset-0 flex items-center justify-center"
    >
      {number}
    </motion.span>
  );
}

function Listening() {
  const todos = useTodosTable();

  const brain = useBrain();
  console.log(todos);
  return (
    <div className="flex w-full items-center gap-2 p-4 py-3">
      <button
        aria-label="Pause timer"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-4 transition-colors hover:bg-[#694608]"
      >
        <div>
          <svg
            viewBox="0 0 10 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 fill-current text-amber-9"
          >
            <path d="M1.03906 12.7266H2.82031C3.5 12.7266 3.85938 12.3672 3.85938 11.6797V1.03906C3.85938 0.328125 3.5 0 2.82031 0H1.03906C0.359375 0 0 0.359375 0 1.03906V11.6797C0 12.3672 0.359375 12.7266 1.03906 12.7266ZM6.71875 12.7266H8.49219C9.17969 12.7266 9.53125 12.3672 9.53125 11.6797V1.03906C9.53125 0.328125 9.17969 0 8.49219 0H6.71875C6.03125 0 5.67188 0.359375 5.67188 1.03906V11.6797C5.67188 12.3672 6.03125 12.7266 6.71875 12.7266Z"></path>
          </svg>
        </div>
      </button>
      <button
        onClick={() => {
          brain.setModeValue("idle");
        }}
        aria-label="Exit"
        className="mr-12 flex h-8 w-8 items-center justify-center rounded-full bg-green-3 text-white transition-colors hover:bg-green-5"
      >
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg> */}
        <span className="icon-[ph--check-bold] text-green-10" />
      </button>
      <div className="flex items-baseline gap-1.5 text-[#FDB000]">
        <span
          className="text-lg font-semibold leading-none text-foreground"
          contentEditable
        >
          Do this task by today
        </span>
        <div className="relative overflow-hidden w-[64px] text-2xl font-light">
          0:
          <div
            className="inline-block tabular-nums"
            // style="filter: blur(0px); opacity: 1; transform: translateY(0px) translateZ(0px);"
          >
            5
          </div>
          <div
            className="inline-block tabular-nums"
            // style="filter: blur(0px); opacity: 1; transform: translateY(-11.2591px) translateZ(0px);"
            data-motion-pop-id=":rt8:"
          >
            1
          </div>
        </div>
      </div>
    </div>
  );
}

let seeds = [
  { user: "me", text: "Yo yo" },
  { user: "them", text: "Hey! What's up?" },
  { user: "me", text: "Nm dude. Wrapping up work soon" },
  { user: "them", text: "Nice" },
  { user: "me", text: "Want to lift tonight?" },
  { user: "them", text: "Yep just about finishing up work" },
  { user: "them", text: "Can you give me like 10" },
  { user: "me", text: "Perf" },
  { user: "me", text: "We hitting shoulders today?" },
  { user: "them", text: "Yep" },
  { user: "me", text: "Awesome!" },
  { user: "me", text: "See you soon 💪" },
];

seeds = seeds.map((seed, i) => ({ ...seed, id: i + 1 }));

function Home() {
  const [messages, setMessages] = useState(seeds);
  const [lastChangedIndex, setLastChangedIndex] = useState(null);
  const brain = useBrain();

  function addMessage() {
    let index = Math.floor(Math.random() * messages.length);
    let newId = messages.length
      ? Math.max(...messages.map((m) => m.id)) + 1
      : 1;
    let newMessage = {
      id: newId,
      user: Math.random() > 0.5 ? "me" : "them",
      text: "Your mom said it's time to come home",
    };

    setLastChangedIndex(index);
    setMessages([
      ...messages.slice(0, index),
      newMessage,
      ...messages.slice(index),
    ]);
  }

  function removeMessage(message) {
    setLastChangedIndex(messages.indexOf(message));
    setMessages((messages) => messages.filter((m) => m.id !== message.id));
  }

  let animatingMessages = messages.slice(lastChangedIndex);

  return (
    <div className="w-[480px] mx-auto flex flex-col px-4 pb-4 max-h-[640px] overflow-y-auto pretty-scroll">
      <ul className="w-full mt-4 text-sm">
        <AnimatePresence initial={false} mode="popLayout">
          {messages.map((message) => (
            <motion.li
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                opacity: { duration: 0.2 },
                layout: {
                  type: "spring",
                  bounce: 0.4,
                  duration: lastChangedIndex
                    ? animatingMessages.indexOf(message) * 0.15 + 0.85
                    : 1,
                },
              }}
              style={{
                originX: message.user === "me" ? 1 : 0,
              }}
              key={message.id}
            >
              <div className="py-0.5 flex">
                <button
                  onClick={() => removeMessage(message)}
                  className={`${
                    message.user === "me"
                      ? "bg-blue-500 ml-auto"
                      : "bg-gray-500 mr-auto"
                  } px-3 py-1 bg-blue-500 text-white text-left rounded-full`}
                >
                  {message.text}
                </button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <div className="text-right mt-4">
        <button
          onClick={addMessage}
          className="hover:bg-gray-100 active:bg-gray-200 rounded-full inline-flex items-center justify-center p-1.5 text-gray-500 hover:text-gray-700"
        >
          <span className="w-4 h-4 icon-[ph--plus]" />
        </button>
        <button
          onClick={() => {
            brain.setModeValue("idle");
          }}
          className="hover:bg-gray-100 active:bg-gray-200 rounded-full inline-flex items-center justify-center p-1.5 text-gray-500 hover:text-gray-700"
        >
          <span className="w-4 h-4 icon-[ph--x]" />
        </button>
      </div>
    </div>
  );
}
