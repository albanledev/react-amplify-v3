import { defineConfig } from "cypress";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

export default defineConfig({
  env: {
    testEmail: process.env.CYPRESS_TEST_EMAIL,
    testPassword: process.env.CYPRESS_TEST_PASSWORD,
    url: process.env.NEXT_PUBLIC_URL,
  },
  e2e: {
    setupNodeEvents(on, config) {
      config.env = {
        ...config.env,
        ...process.env,
      };
      return config;
    },
  },
});
