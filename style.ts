import type { ExtractShadowCSS } from "./shadow-dom-css";

export const virtualCode = (config: ExtractShadowCSS) => {
  return `const _shadowCssSheetsMap_ = new Map();
  const retryCount = new Map();
  export const updateShadowStyle = (__containner__,__retry__,id, content) => {
    let style = _shadowCssSheetsMap_.get(id);
    if (style && !(style instanceof HTMLStyleElement)) {
      removeShadowStyle(__containner__,id);
      style = undefined;
    }
    if (!style) {
      style = document.createElement('style');
      style.setAttribute('type', 'text/css');
      style.innerHTML = content;
      const root = document?.querySelector(__containner__);
  
      // if no root try again in a second
      if (!root) {
        let count = retryCount.get(id)
        if(!count||(count&&count<__retry__)){
          setTimeout(() => updateShadowStyle(__containner__,__retry__,id, content), 3000);
          if(count){
            count++
            retryCount.set(id,count)
          }else{
            retryCount.set(id,1)
          }
          return;
        }
      }
      const shadowEl = root?.shadowRoot;
      if(!root || !root?.shadowRoot) {
        if(${config.log}){
          console.warn('[vite-plugin-shadowcss]: not found shadowRoot')
        }
        return;
      } 

      const firstElementChild = root.shadowRoot?.querySelector(__containner__+'root');

      if(firstElementChild) shadowEl?.insertBefore(style,firstElementChild);
      else shadowEl.appendChild(style)
    } else {
      style.innerHTML = content;
    }
    _shadowCssSheetsMap_.set(id, style);
  };
  
  export const removeShadowStyle = (__containner__, id) => {
    const style = _shadowCssSheetsMap_.get(id);
    if (style) {
      const root = document?.querySelector(__containner__);
      if (!root || !root.shadowRoot) {
        if(${config.log}){
          console.warn('[vite-plugin-shadowcss]: not found shadowRoot');
        }
        return;
      }
      const shadowEl = root?.shadowRoot;
  
      if (style instanceof CSSStyleSheet) {
        if (shadowEl) {
          shadowEl.adoptedStyleSheets = shadowEl.adoptedStyleSheets.filter(
            (s) => s !== style
          );
        }
      } else if (shadowEl) {
        shadowEl.removeChild(style);
      }
      _shadowCssSheetsMap_.delete(id);
    }
  };
    `;
};
