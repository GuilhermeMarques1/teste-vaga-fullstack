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
      "100": "#D1D2DC",
      "50": "#EEEEF2",
    },
    black: {
      "900": "#333"
    }
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'gray.50'
      }
    }
  }
});
