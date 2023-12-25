import React, { FC, ReactNode, useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuContext } from "./MenuProvider";
import { CommandWrapperProps } from "./types";
import useClickOutside from "./hooks/useClickOutside";

export const CommandWrapper: FC<
  CommandWrapperProps & { children: ReactNode }
> = ({ children, value }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const {
    open,
    setOpen,
    placeholder,
    animate,
    config,
    setQuery,
    state,
    crumbs,
    input,
  } = useContext(MenuContext);

  useClickOutside({
    ref: menuRef,
    handler: () => setOpen(0),
  });

  return (
    <AnimatePresence>
      {open > 0 && (
        <motion.div
          className="dark flex flex-col items-center overflow-hidden fixed inset-0 z-50 w-screen h-screen select-none"
          initial={{ opacity: 0, pointerEvents: "none" }}
          animate={{ opacity: 1, pointerEvents: "auto" }}
          exit={{ opacity: 0, pointerEvents: "none" }}
          style={{
            backgroundColor: config?.backdropColor || "#FFFFFF90",
            backdropFilter: config?.backdropBlur
              ? `blur(${config?.backdropBlur}px)`
              : "blur(2px)",
          }}
        >
          <motion.div
            role="dialog"
            className="p-2 fixed border top-[20%] transition duration-100 ease-linear w-[640px] rounded-lg"
            aria-modal="true"
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: animate ? 0.98 : 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: config?.animationDuration ?? 0.1 }}
            style={{
              backgroundColor: config?.backgroundColor || "var(--slate1)",
              borderColor: config?.borderColor || "transparent",
              borderWidth: config?.borderWidth || 0,
              boxShadow: config?.boxShadow || "0px 0px 60px 10px #00000020",
            }}
          >
            <div className="flex flex-row space-x-1">
              {crumbs?.map((crumb, index) => (
                <button
                  onClick={() => setOpen(index + 1)}
                  className="text-xs border-none outline-none px-1 py-1 cursor-pointer"
                  style={{
                    backgroundColor: config?.breadcrumbColor || "var(--slate3)",
                    borderRadius: config?.breadcrumbRadius || 5,
                  }}
                  key={index}
                >
                  {crumb}
                </button>
              ))}
            </div>
            <div className="flex flex-row space-x-2 items-center">
              <span className="icon-[ph--command] text-sm"></span>
              <input
                placeholder={placeholder || "What do you need?"}
                defaultValue={value}
                className="py-1 bg-transparent text-base w-full outline-none text-foreground border-b border-scale-5"
                aria-expanded="true"
                aria-autocomplete="list"
                aria-haspopup="listbox"
                aria-readonly="true"
                role="combobox"
                autoFocus
                spellCheck="false"
                ref={input}
                aria-activedescendant={state.selected.toString()}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
