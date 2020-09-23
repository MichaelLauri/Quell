/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/**
 createQueryStr converts the query object into a formal GCL query string.
 */

function createQueryStr(queryObject) {
  const openCurl = ' { ';
  const closedCurl = ' } ';

  let mainStr = '';

  for (const key in queryObject) {
    mainStr += key + openCurl + stringify(queryObject[key]) + closedCurl;
  }

  function stringify(fieldsArray) {
    let innerStr = '';
    for (let i = 0; i < fieldsArray.length; i += 1) {
      if (typeof fieldsArray[i] === 'string') {
        innerStr += `${fieldsArray[i]} `;
      }
      if (typeof fieldsArray[i] === 'object') {
        for (const key in fieldsArray[i]) {
          innerStr += key + openCurl + stringify(fieldsArray[i][key]);
          innerStr += closedCurl;
        }
      }
    }
    return innerStr;
  }
  return openCurl + mainStr + closedCurl;
}

module.exports = createQueryStr;
