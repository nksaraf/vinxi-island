import { motion } from "framer-motion";
import { Suspense, startTransition, useRef } from "react";
import {
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { useBrain } from "../brain";
import { extensions } from "../../src/extensions";

console.log(extensions);
export function Dock() {
  let mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="mx-auto flex h-9 items-end gap-2 px-3 py-2"
    >
      {/* {[...Array(5).keys()].map((i) => (
              <AppIcon mouseX={mouseX} key={i} index={i} />
            ))} */}
      {extensions.map((extension) => (
        <Suspense
          fallback={
            <div
              style={{
                width: 20,
                height: 20,
              }}
              className="rounded-full bg-slate-3"
            />
          }
        >
          <extension.AppIcon
            mouseX={mouseX}
            key={extension.id}
            {...extension}
          />
        </Suspense>
      ))}
    </motion.div>
  );
}
function useDockIcon(mouseX: MotionValue, w: number, h: number) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthSync = useTransform(distance, [-150, 0, 150], [w, w * 1.3, w]);
  let heightSync = useTransform(distance, [-150, 0, 150], [h, h * 1.3, h]);
  let fontSizeSync = useTransform(distance, [-150, 0, 150], [1, 1.3, 1]);
  let width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let scale = useSpring(fontSizeSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return {
    ref,
    width,
    height,
    scale,
  };
}
export function AppIcon({
  mouseX,
  icon,
  id,
  className,
  width: w = 20,
  height: h = 20,
  children,
}: {
  mouseX: MotionValue;
}) {
  const { width, height, scale, ref } = useDockIcon(mouseX, w, h);
  const brain = useBrain();
  return (
    <motion.div
      ref={ref}
      onClick={() => {
        startTransition(() => {
          brain.setModeValue(id);
        });
      }}
      style={{ width, height }}
      className={cn(
        "w-5 rounded-full flex flex-row items-center justify-center",
        className
      )}
    >
      <motion.span
        className={cn("text-sm", icon)}
        style={{
          scale,
        }}
      >
        {children}
      </motion.span>
    </motion.div>
  );
}
