module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "simple-import-sort"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          // Source: https://engineering.udacity.com/sorting-imports-on-save-in-react-projects-with-eslint-6fd419b994c3
          // `react` first
          ["^react$"],
          // packages starting with a character
          ["^[a-z]"],
          // Packages starting with `@`
          ["^@"],
          // Packages starting with `~`
          ["^~"],
          // Imports starting with `../` or `./`
          [
            "^\\.\\.(?!/?$)",
            "^\\.\\./?$",
            "^\\./(?=.*/)(?!/?$)",
            "^\\.(?!/?$)",
            "^\\./?$",
          ],
          // Style imports
          ["^.+\\.s?css$"],
          // Side effect imports
          ["^\\u0000"],
        ],
      },
    ],
  },
};
