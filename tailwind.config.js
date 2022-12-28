module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    fontFamily: {
      title: ["Lato"],
      body: ["Roboto", "Open Sans"],
    },
    screens: {
      xxs: "280px",
      // => @media (min-width: 280px) { ... }

      xs: "400px",
      // => @media (min-width: 400px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      xxl: "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      textColor: (theme) => theme("colors"),
      textColor: {
        primary: "#1FB7BA",
        secondary: "#015290",
        textcolor: "#2B2B2B",
      },
      gradientColorStops: (theme) => ({
        ...theme("colors"),
        primary: "#1FB7BA",
        secondary: "#015290",
      }),
      backgroundColor: (theme) => ({
        ...theme("colors"),
        primary: "#1FB7BA",
        secondary: "#015290",
        bgPrimary: "#EDF6FA",
      }),
      width: {
        "1/20": "5%",
        "2/20": "10%",
        "3/20": "15%",
        "4/20": "20%",
        "5/20": "25%",
        "6/20": "30%",
        "7/20": "35%",
        "8/20": "40%",
        "9/20": "45%",
        "10/20": "50%",
        "11/20": "55%",
        "12/20": "60%",
        "13/20": "65%",
        "14/20": "70%",
        "15/20": "75%",
        "16/20": "80%",
        "17/20": "85%",
        "18/20": "90%",
        "19/20": "95%",
      },
      minWidth: {
        0: "0",
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        full: "100%",
        700: "700px",
        500: "500px",
      },
    },
  },
  variants: {
    extend: {
      textColor: ["active"],
      backgroundColor: ["active"],
    },
  },
  plugins: [],
};
