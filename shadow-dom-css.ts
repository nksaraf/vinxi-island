import { createFilter } from "@rollup/pluginutils";
import { virtualCode } from "./style";
import type { Plugin } from "vite";

export interface Config {
  key?: string;
  container: string;
  output: string;
  retry?: number;
}
export interface ExtractShadowCSS {
  config: Config[] | Config;
  include?: any;
  exclude?: any;
  log?: boolean;
}

const inlineShadowReg = /(.*)[?&]shadow(=?)(?<key>([^&]*))/;

const matchShadow = (path: string, reg: RegExp) => {
  const match = path.match(reg);
  if (match) {
    const key = match.groups?.key || true;
    return key;
  } else {
    return null;
  }
};

const parseConfig = (config: Config[] | Config, id: string): Config => {
  if (Array.isArray(config)) {
    const match = matchShadow(id, inlineShadowReg);
    if (match !== "true" && match !== true) {
      return config.find((c) => c.key === match)!;
    }
    return config[0];
  }
  return config;
};

export function build(options: ExtractShadowCSS): Plugin {
  const filter = createFilter(options?.include, options?.exclude);

  const extractedCSS = new Map();

  return {
    name: "build:extract-shadow-css",
    enforce: "pre",
    apply: "build",
    async transform(code, id) {
      if (!filter(id)) {
        return null;
      }
      const inlineMatch = matchShadow(id, inlineShadowReg);
      if (inlineMatch) {
        let conetnt = code;
        const key = parseConfig(options.config, id).output;
        if (extractedCSS.has(key)) {
          extractedCSS.set(key, `${extractedCSS.get(key)}\n${conetnt}`);
        } else extractedCSS.set(key, conetnt);
        return {
          code: "",
          map: {
            mappings: "",
          },
        };
      }
      return null;
    },
    generateBundle() {
      if (extractedCSS.size === 0) {
        return;
      }
      extractedCSS.forEach((code, output) => {
        this.emitFile({
          type: "asset",
          fileName: output,
          source: code,
        });
      });
    },
  };
}

// TODO sourceMap
const dev = (options: ExtractShadowCSS): Plugin => {
  const virtualModuleId = "virtual:shadow-dom-css";
  const resolvedVirtualModuleId = `\0${virtualModuleId}`;

  const filter = createFilter(options?.include, options?.exclude);
  return {
    name: "dev:extract-shadow-css",
    enforce: "post",
    apply: "serve",
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return virtualCode(options);
      }
    },
    transform(code, id) {
      if (!filter(id)) {
        return null;
      }
      const inlineMatch = matchShadow(id, inlineShadowReg);
      if (inlineMatch) {
        const { container, retry = 1 } = parseConfig(options.config, id);
        const fn = `\nconst __retry__= ${retry};\nconst __containner__= '${container}';\n import { updateShadowStyle, removeShadowStyle } from 'virtual:shadow-dom-css';\n`;
        let _code = fn + code;
        _code = _code.replace(
          "__vite__updateStyle(",
          "updateShadowStyle(__containner__,__retry__, "
        );
        _code = _code.replace(
          "__vite__removeStyle(",
          "removeShadowStyle(__containner__, "
        );
        return {
          code: _code,
        };
      }
    },
  };
};

// https://github.com/element-plus/element-plus/issues/6529
// TODO sourceMap
export const cssvarplugin = (options?: ExtractShadowCSS): Plugin => {
  const filter = createFilter(options?.include, options?.exclude);
  return {
    name: "cssvar:extract-shadow-css",
    enforce: "pre",
    transform(code, id) {
      if (!filter(id)) {
        return null;
      }
      const inlineMatch = matchShadow(id, inlineShadowReg);
      if (inlineMatch) {
        if (code.includes(":root")) {
          const _code = code.replace(/:root/g, ":host");
          return {
            code: _code,
          };
        }
      }
    },
  };
};

export function shadowDomCssPlugin(options: ExtractShadowCSS): Plugin[] {
  return [dev(options), cssvarplugin(options), build(options)];
}
