import daisyuiUiThemes from "daisyui/src/theming/themes";
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      "light",
      {
        black: {
          ...daisyuiUiThemes["black"],
          primary: "rgb(29 ,155, 240)",
          secondary: "rgb(24 ,24, 24)",
        },
      },
    ],
  },
};

