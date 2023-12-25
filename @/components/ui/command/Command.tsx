import React, { FC, useRef, useEffect, useContext } from "react";
import useInView from "./hooks/useInView";
import { useShortcut } from "./hooks/useShortcut";
import { CategoryCommand } from "./types";
import run from "./utils/run";
import { motion } from "framer-motion";
import { MenuContext } from "./MenuProvider";

const Command: FC<{
  command: CategoryCommand;
  onMouseEnter: () => void;
  isSelected: boolean;
}> = ({ onMouseEnter, isSelected, command }) => {
  const { setOpen, config } = useContext(MenuContext);

  const select = () => {
    if (isSelected) {
      if (!command.closeOnComplete) setOpen(0);
      run(command);
    }
  };

  const topRef = useRef<HTMLSpanElement>(null);
  const bottomRef = useRef<HTMLSpanElement>(null);
  const enter = useShortcut({ targetKey: "Enter", handler: select });

  const inViewTop = useInView({ ref: topRef });
  const inViewBottom = useInView({ ref: bottomRef });

  useEffect(() => {
    if (isSelected && (!inViewTop || !inViewBottom))
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
  }, [isSelected, enter]);

  return (
    <div role="option" aria-selected={isSelected}>
      <span ref={topRef} aria-hidden="true" />
      {command.anchor ? (
        <command.anchor
          className="flex justify-between relative h-13.5 text-lg leading-7 items-center no-underline cursor-pointer transition duration-100 ease-linear"
          onMouseMove={onMouseEnter}
          style={{
            color: isSelected
              ? config?.commandActive || "#343434"
              : config?.commandInactive || "#828282",
          }}
          onClick={() => {
            if (!command.closeOnComplete) setOpen(0);
            run(command);
          }}
          href={command.href || "#"}
          target={command.newTab ? "_blank" : "_self"}
          rel="noreferrer"
        >
          {isSelected && (
            <motion.div
              layoutId="box"
              className="selected"
              initial={false}
              aria-hidden="true"
              transition={{ type: "spring", stiffness: 1000, damping: 80 }}
              style={{ background: config?.barBackground || "#82828220" }}
            />
          )}
          <div className="flex items-center relative w-full h-full ml-5">
            {command.icon && command.icon}
            <p className="command_text">{command.text}</p>
          </div>
          {command.shortcuts && (
            <div className="shortcuts">
              {command.shortcuts.modifier && (
                <kbd
                  style={{
                    backgroundColor: config?.shortcutBackground || "#82828220",
                  }}
                >
                  {command.shortcuts.modifier}
                </kbd>
              )}
              {command.shortcuts.keys.map((key, index) => (
                <kbd
                  key={index}
                  style={{
                    backgroundColor: config?.shortcutBackground || "#82828220",
                  }}
                >
                  {key}
                </kbd>
              ))}
            </div>
          )}
        </command.anchor>
      ) : (
        <a
          className="flex justify-between relative h-6 text-lg items-center no-underline cursor-pointer transition duration-100 ease-linear"
          onMouseMove={onMouseEnter}
          style={{
            color: isSelected
              ? config?.commandActive || "var(--slate12)"
              : config?.commandInactive || "#828282",
          }}
          onClick={() => {
            if (!command.closeOnComplete) setOpen(0);
            run(command);
          }}
          href={command.href || "#"}
          target={command.newTab ? "_blank" : "_self"}
          rel="noreferrer"
        >
          {isSelected && (
            <motion.div
              layoutId="box"
              className="vinxi-cmd-selected bg-[#82828220]"
              initial={false}
              aria-hidden="true"
              transition={{ type: "spring", stiffness: 1000, damping: 80 }}
            />
          )}
          <div className="flex items-center relative w-full h-full space-x-2 text-sm">
            {command.icon && command.icon}
            <p className="text-sm">{command.text}</p>
          </div>
          {command.shortcuts && (
            <div className="shortcuts">
              {command.shortcuts.modifier && (
                <kbd
                  style={{
                    backgroundColor: config?.shortcutBackground || "#82828220",
                  }}
                >
                  {command.shortcuts.modifier}
                </kbd>
              )}
              {command.shortcuts.keys.map((key, index) => (
                <kbd
                  key={index}
                  style={{
                    backgroundColor: config?.shortcutBackground || "#82828220",
                  }}
                >
                  {key}
                </kbd>
              ))}
            </div>
          )}
        </a>
      )}
      <span ref={bottomRef} className="scroll_ref" aria-hidden="true" />
    </div>
  );
};

export default Command;
