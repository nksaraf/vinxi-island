import { motion } from "framer-motion";
import { useEffect } from "react";
import { MotionValue, useSpring, useTransform } from "framer-motion";

const fontSize = 30;
const padding = 15;
const height = fontSize + padding;

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
