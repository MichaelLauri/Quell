/* eslint-disable no-inner-declarations */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-restricted-syntax */
const { visit } = require('graphql/language/visitor');
/**
 * parseAST traverses the abstract syntax tree and creates a prototype object
 * representing all the queried fields nested as they are in the query.
 */

function parseAST(AST) {
  const queryRoot = AST.definitions[0];

  if (queryRoot.operation !== 'query') {
    // eslint-disable-next-line no-console
    console.log(`Error: Quell does not currently support ${queryRoot.operation} operations.`);
  }

  /**
   * visit() -- a utility provided in the graphql-JS library-- will walk
   * through an AST using a depth first traversal, invoking a callback
   * when each SelectionSet node is entered.
   *
   * More detailed documentation can be found at:
   * https://graphql.org/graphql-js/language/#visit
   */

  // visit() will build the prototype, declared here and returned from the function
  const prototype = {};

  visit(AST, {
    SelectionSet(node, key, parent, path, ancestors) {
      /**
       * Exclude SelectionSet nodes whose parents' are not of the kind
       * 'Field' to exclude nodes that do not contain information about
       *  queried fields.
       */
      if (parent.kind === 'Field') {
        /** GraphQL ASTs are structured such that a field's parent field
         *  is found three three ancestors back. Hence, we subtract three.
        */
        let depth = ancestors.length - 3;
        const objPath = [parent.name.value];

        /** Loop through ancestors to gather all ancestor nodes. This array
         * of nodes will be necessary for properly nesting each field in the
         * prototype object.
         */
        while (depth >= 5) {
          const parentNodes = ancestors[depth - 1];
          const { length } = parentNodes;
          objPath.unshift(parentNodes[length - 1].name.value);
          depth -= 3;
        }

        /** Loop over the array of fields at current node, adding each to
         *  an object that will be assigned to the prototype object at the
         *  position determined by the above array of ancestor fields.
         */
        const collectFields = {};
        for (const field of node.selections) {
          collectFields[field.name.value] = true;
        }

        /** Helper function to convert array of ancestor fields into a
         *  path at which to assign the `collectFields` object.
         */
        function setProperty(path, obj, value) {
          return path.reduce((prev, curr, index) => ((index + 1 === path.length)
            // if last item in path
            ? prev[curr] = value // set value
            : prev[curr] = prev[curr] || {}),
            // otherwise, if index exists, keep value or set to
            // empty object if index does not exist
            obj);
        }

        setProperty(objPath, prototype, collectFields);
      }
    },
  });

  return prototype;
}

module.exports = parseAST;
