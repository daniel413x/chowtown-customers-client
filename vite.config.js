import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from 'fs';

// with auth0, we must use https to run cypress locally
const certifications = () => {
	const certPath = path.resolve(__dirname, 'certs/localhost.pem');
	const keyPath = path.resolve(__dirname, 'certs/localhost-key.pem');
	return {
		key: fs.readFileSync(keyPath),
		cert: fs.readFileSync(certPath),
	}
}

export default defineConfig({
	server: {
		host: "0.0.0.0",
		port: 3000,
    https: process.env.NODE_ENV === "production" ? undefined : certifications(),
	},
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
