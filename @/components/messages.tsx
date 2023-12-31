import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useBrain } from "../brain";

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
export function Home() {
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
