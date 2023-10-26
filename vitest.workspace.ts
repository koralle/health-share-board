import { defineWorkspace } from "vitest/config";

const workspace = defineWorkspace([
  {
    extends: "./vitest.config.ts",
    test: {
      include: ["packages/domains/tests/**/*.test.ts"],
      exclude: ["**/node_modules/**/*"],
      setupFiles: [],
    }
  },
  {
    test: {
      include: ["packages/infrastructures/tests/**/*.test.ts"],
      exclude: ["**/node_modules/**/*"],
      setupFiles: [],
    }
  },
  {
    test: {
      include: ["packages/usecases/tests/**/*.test.ts"],
      exclude: ["**/node_modules/**/*"],
      setupFiles: [],
    }
  },
  {
    test: {
      include: ["packages/backend/tests/**/*.test.ts"],
      exclude: ["**/node_modules/**/*"],
      setupFiles: [],
    }
  },
  {
    test: {
      include: ["packages/backend/web/**/*.test.ts"],
      exclude: ["**/node_modules/**/*"],
      setupFiles: [],
    }
  },
])

export default workspace
