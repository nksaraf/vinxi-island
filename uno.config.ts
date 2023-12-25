import { defineConfig, presetUno } from "unocss";
import { presetRadix } from "unocss-preset-radix";
import { presetIcons } from "@unocss/preset-icons";
export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetRadix({
      palette: ["blue", "slate", "green", "yellow"],
      aliases: {
        scale: "slate",
        brand: "blue",
      },
    }),
  ],
});
