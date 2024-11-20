<<<<<<< HEAD
=======
import daisyui from "daisyui";
>>>>>>> 49918b91c11b512ebc26dd6b9c9bbcc282732675
import type { Config } from "tailwindcss";

export default {
  content: [
<<<<<<< HEAD
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
=======
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
>>>>>>> 49918b91c11b512ebc26dd6b9c9bbcc282732675
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
<<<<<<< HEAD
  plugins: [],
=======
  plugins: [daisyui],
>>>>>>> 49918b91c11b512ebc26dd6b9c9bbcc282732675
} satisfies Config;
