import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" — build GitHub Pages'da /youtube-clone/ ichida ham ishlaydi
export default defineConfig({
  plugins: [react()],
  base: "./",
});
