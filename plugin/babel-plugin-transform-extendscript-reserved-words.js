const reservedWords = [
  "char"
];

module.exports = () => {
  return {
    name: "transform-extendscript-reserved-words",

    visitor: {
      "BindingIdentifier|ReferencedIdentifier"(path) {
        if (reservedWords.indexOf(path.node.name) > -1) {
          path.scope.rename(path.node.name);
        }
      },
    },
  };
}