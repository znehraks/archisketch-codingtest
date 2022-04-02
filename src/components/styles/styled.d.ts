import "styled-components";

declare module "styled-components" {
  export interface OriginalTheme {
    bgColor: string;
    textColor: string;
    accentColor: string;
  }
}
