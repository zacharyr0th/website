module.exports = {
    extends: [
      "stylelint-config-standard",
      "stylelint-config-prettier"
    ],
    plugins: [
      "stylelint-order",
      "stylelint-scss"
    ],
    rules: {
      "indentation": 2,
      "number-leading-zero": "always",
      "string-quotes": "double",
      "color-hex-length": "short",
      "block-no-empty": true,
      "color-no-invalid-hex": true,
      "declaration-colon-space-after": "always",
      "max-nesting-depth": 3,
      "selector-max-id": 0,
      "selector-class-pattern": "^[a-z][a-zA-Z0-9]+$",
      "at-rule-no-unknown": [
        true,
        {
          "ignoreAtRules": ["tailwind", "apply", "variants", "responsive", "screen"]
        }
      ]
    }
  };
  