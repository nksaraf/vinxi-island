// const root = document.createElement("div");
// root.id = "crx-root";
// document.body.append(root);
// const shadowDOM = root.attachShadow?.({ mode: "open" });

// import "./index.css?shadow";
// import ReactDOM from "react-dom/client";
// import { DynamicIsland } from "./dynamic-island";
// import { MenuProvider } from "@/components/ui/command";

// ReactDOM.createRoot(shadowDOM).render(
//   // <html>
//   //   <head>{/* <link rel="stylesheet" href={"/shadow.css"} /> */}</head>
//   //   <body>
//   <MenuProvider>
//     <DynamicIsland />
//   </MenuProvider>
//   // </body>
//   // </html>
// );

// if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
//   throw new Error(
//     "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
//   );
// }

import React from "react";
import { DynamicIsland } from "./dynamic-island";
import createShadowRoot from "./shadow-root";
import style from "./index.css?inline";
import { MenuProvider } from "@/components/ui/command";

void (async () => {
  const root = createShadowRoot("vinxi-island", {
    style: import.meta.env.DEV ? "" : style,
    mode: import.meta.env.DEV ? "open" : "closed",
  });
  root.render(
    <React.StrictMode>
      <MenuProvider config={{}}>
        <DynamicIsland />
      </MenuProvider>
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
