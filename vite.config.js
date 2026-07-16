import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base './' — Netlify뿐 아니라 file:// 로 열어도 동작하도록 상대 경로 사용
export default defineConfig({
  base: "./",
  plugins: [react()]
});
