module.exports = function(api) {
  api.cache(true);
  
  return {
    "presets": [
      [
        "extendscript",
        {
          "loose": true,
          "module": "amd"
        }
      ]
    ],
    "plugins": [
      "@babel/transform-member-expression-literals",
      "@babel/transform-property-literals",
      "@babel/plugin-transform-property-mutators",
      "@babel/plugin-transform-reserved-words",
      "./plugin/babel-plugin-transform-extendscript-reserved-words.js"
    ]
  };
}