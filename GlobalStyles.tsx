import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  html {
    --system-16-font-size: 16px;
    --system-14-font-size: 14px;
    --system-12-font-size: 12px;
    --nav-medium-width: 244px;
    --nav-narrow-width: 74px;
    --ig-primary-background: black;
    --ig-primary-text: white;
    --ig-secondary-text: rgb(168, 168, 168);
    --ig-primary-button: rgb(0, 149, 246);
    --ig-tertiary-text: rgb(115, 115, 115);
    --ig-separator: rgb(38, 38, 38);
    --ig-hover-overlay: rgba(255, 255, 255, .1);
    --ig-search-input: rgb(54 54 54);
    --ig-badge: rgb(255, 48, 64);
  }
`;

export default GlobalStyles;
