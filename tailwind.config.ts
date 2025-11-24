export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      colors: {
        "orange-primary": "var(--color-orange-primary)",
        "orange-secondary": "var(--color-orange-secondary)",
        "orange-light": "var(--color-orange-light)",
        "orange-soft": "var(--color-orange-soft)",
        "brown": "var(--color-brown)",
        "white-soft": "var(--color-white-soft)",
        "black-base": "var(--color-black)",
      },
    },
  },
  plugins: [],
};
