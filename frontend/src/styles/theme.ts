import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    green: {
      "950": "#4f7e0f",
      "900": "#246b44",
      "800": "#2d8655",
      "700": "#339961",
      "600": "#40bf79",
      "500": "#66cc94",
      "400": "#9fdfbc",
      "300": "#9699B0",
      "200": "#B3B5C6",
      "100": "#f0f2f5",
      "50": "#EEEEF2",
    },
    black: {
      "900": "#000",
      "700": "#333"
    },
    orange: {
      "800": "#FF9902"
    }
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
  styles: {
    global: {
      body: {
        bg: 'green.100',
        color: 'black.700'
      }
    }
  }
});
