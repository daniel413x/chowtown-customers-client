export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        diagnostics: {
          ignoreCodes: [1343],
        },
        astTransformers: {
          before: [
            {
              path: "node_modules/ts-jest-mock-import-meta",
              options: { metaObjectReplacement: { env: { VITE_APP_API_URL: "http://localhost:5000/api" } } },
            },
          ],
        },
      },
    ],
  },
  moduleNameMapper: {
    '^@/(.*)': '<rootDir>/src/$1',
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/src/test/__ mocks __/fileMock.js",
    "\\.(css|less|scss|sass)$": "<rootDir>/src/test/__mocks__/cssModuleMock.js",
  },
};
