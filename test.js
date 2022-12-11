
const array1 = [5, 12, 8, 130, 44];

const token = "neo4j 1234"

const replaceBase64Token = (str = '') => str.replace('-', '+').replace('_', '/');


const decodeJWT = (token) => {
    try {
      /* Get Token Header */
      const base64HeaderUrl = token.split('.')[0];
      const base64Header = replaceBase64Token(base64HeaderUrl);
      const header = JSON.parse(atob(base64Header));
      /* Get Token payload and date's */
      const base64Url = token.split('.')[1];
      const base64 = replaceBase64Token(base64Url);
      const dataJWT = JSON.parse(atob(base64));
      return {
        userId: dataJWT.sub,
        ...dataJWT,
        header,
      };
    } catch (err) {
      return null;
    }
  };

const token_replace = replaceBase64Token(token)

//Convert to base64
const token64 = Buffer.from(token).toString('base64')
console.log(Buffer.from(token).toString('base64') + '\n');

//Decode base64
console.log(Buffer.from(token64, 'base64').toString() + '\n');
// console.log(Buffer.from(token_replace, 'base64').toString())

// const isLargeNumber = (element) => { 
//     return element > 13;}

// console.log(array1.findIndex(isLargeNumber));
