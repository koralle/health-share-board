import { defineProject } from "vitest/config";

const config = defineProject({
  test: {
    alias: {
      "@/": new URL("./src/", import.meta.url).pathname,
    },
  },
});

export default config;
