import { Button, buttonVariants } from "@/components/ui/button";
import { motion } from "framer-motion";

// function Container({ actions, children, className }) {
//   return (
//     <div
//       className={`fixed top-0 my-6 rounded-lg shadow-sm dark:bg-[#0B0B09] ${className}`}
//     >
//       <div className="flex w-full rounded-t-lg px-4 py-6">{children}</div>
//       {actions && (
//         <div className="flex justify-center gap-2 rounded-b-lg border-t border-gray-400 bg-[#FBFBF9] p-2 py-2.5 dark:bg-[#151514]">
//           {actions.map((action) => (
//             <button
//               key={action.label}
//               className="rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-1200 shadow-border outline-none transition-colors hover:bg-gray-200 focus-visible:shadow-focus-ring-button dark:bg-gray-100"
//               onClick={action.onClick}
//             >
//               {action.label}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
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
export function RingMode() {
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
  return (
    <motion.div
      {...{
        initial: {
          width: 128,
        },
        animate: {
          // width: useDynamicIsland().ringing ? 148 : 128,
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
