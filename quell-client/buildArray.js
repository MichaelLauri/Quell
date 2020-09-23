/* eslint-disable no-use-before-define */
/* eslint-disable guard-for-in */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/** Helper function that loops over a collection of references,
   *  calling another helper function -- buildItem() -- on each. Returns an
   *  array of those collected items.
   */
function buildArray(prototype, map, collection) {
  const response = [];

  for (const query in prototype) {
    // collection = 1.Object type field passed into buildArray()
    // when called from buildItem() or 2.Obtained item from cache or 3.Empty array
    collection = collection || JSON.parse(sessionStorage.getItem(map[query])) || [];
    for (const item of collection) {
      response.push(buildItem(prototype[query], JSON.parse(sessionStorage.getItem(item)), map));
    }
  }

  return response;
}

/** Helper function that iterates through keys -- defined on passed-in
   *  prototype object, which is always a fragment of this.proto, assigning
   *  to tempObj the data at matching keys in passed-in item. If a key on
   *  the prototype has an object as its value, buildArray is
   *   recursively called.
   *
   *  If item does not have a key corresponding to prototype, that field
   *  is toggled to false on prototype object. Data for that field will
   *  need to be queried.
   *
   */
function buildItem(prototype, item, map) {
  const tempObj = {}; // gets all the in-cache data
  // Traverse fields in prototype (or nested field object type)
  // if key points to an object (an object type field, e.g. "cities" in a "country")
  for (const key in prototype) {
    if (typeof prototype[key] === 'object') {
      const prototypeAtKey = { [key]: prototype[key] };
      // returns e.g. tempObj['cities'] = [{name: 'Bobby'}, {id: '2'}]
      tempObj[key] = buildArray(prototypeAtKey, map, item[key]);

      /** The fieldsMap property stores a mapping of field names to collection
         *  names, used when normalizes responses for caching. For example: a 'cities'
         *  field might contain an array of City objects. When caching, this array should
         *  contain unique references to the corresponding object stored in the cached City
         *  array.
         *
         *  Slicing the reference at the first hyphen removes the object's unique identifier,
         *  leaving only the collection name.
        */
      // this.fieldsMap[key] = item[key][0].slice(0, item[key][0].indexOf('-'));
    } else if (prototype[key]) { // if field is scalar
      if (item[key] !== undefined) { // if in cache
        tempObj[key] = item[key];
      } else { // if not in cache
        prototype[key] = false;
      }
    }
  }
  return tempObj;
}

module.exports = buildArray;
