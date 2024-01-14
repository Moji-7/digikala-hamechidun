import "@rneui/themed";
import { ColorShape } from "../lib/theme/colors/theme.type";

declare module "@rneui/themed" {
  export interface CreateThemeOptions {
    myColors: ColorShape;
  }
}