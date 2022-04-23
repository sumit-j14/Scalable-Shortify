const md5 = require('md5');

let shortifyURL = (longURL)=> {
    let md5hash= md5(longURL)
    console.log(typeof md5hash);

    //extracting last 7 characters
    let shortURL= md5hash.substring(25);

    console.log(shortURL);
    return shortURL;
}
module.exports = shortifyURL;
