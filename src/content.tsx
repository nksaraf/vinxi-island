import React from "react";
import createShadowRoot from "@/lib/shadow-root";
import style from "./index.css?inline";
import { Root } from "./root";

void (async () => {
  if (localStorage.getItem("vinxi-island") === "hidden") {
    return;
  }

  const root = createShadowRoot("vinxi-island", {
    style: import.meta.env.DEV ? "" : style,
    mode: import.meta.env.DEV ? "open" : "closed",
  });

  globalThis.hideIsland = () => {
    localStorage.setItem("vinxi-island", "hidden");
    root.unmount();
  };

  root.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  );

  // HMR Hack
  // https://github.com/crxjs/chrome-extension-tools/issues/600
  if (import.meta.env.DEV) {
    await import("./index.css");
    const styleElement = document.querySelectorAll("[data-vite-dev-id]")!;
    styleElement.forEach((el) => {
      console.log(styleElement);
      root.shadowRoot.insertBefore(el, root.shadowRoot.firstChild);
    });
  }
})();
