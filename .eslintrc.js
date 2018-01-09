module.exports = {
  "parser": "babel-eslint",
  "extends": ['eslint-config-airbnb'],
  "env": {
    "browser": true,
    "node": true
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      experimentalObjectRestSpread: true,
    }
  },
  "globals": {
    "window": true,
    "document": true,
    "axios":true,
    "React": true,
  },
  "rules": {
    "indent": [2, 4],
    "linebreak-style": [0, "windows"],
    "object-curly-newline":0,
    "no-console": 0,
    'comma-dangle': ['error', 'always-multiline'],
    "function-paren-newline":0,
    "no-param-reassign": 0,
    "arrow-parens": 0,
    "react/jsx-indent":[2,4],
    "react/no-array-index-key":0,
    "react/jsx-indent-props":[2,4],
    "react/no-array-index-keys":0,
    'react/prop-types': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    "react/jsx-filename-extension":[1, { extensions: ['.js', '.jsx', '.md'] }]
  },
  "plugins": [
    "import",
    "react"
  ]
}
