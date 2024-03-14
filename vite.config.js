import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
	server: {
		host: "0.0.0.0",
		port: 3000,
	},
	plugins: [react(),tailwindcss(),autoprefixer()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});