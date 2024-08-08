/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
      function({ addUtilities }) {
          addUtilities({
              '.hide-scrollbar': {
                  /* Hide scrollbar for Chrome, Safari and Opera */
                  '&::-webkit-scrollbar': {
                      display: 'none',
                  },
                  /* Hide scrollbar for IE, Edge and Firefox */
                  '-ms-overflow-style': 'none', /* IE and Edge */
                  'scrollbar-width': 'none', /* Firefox */
              },
          });
      },
  ],
}
