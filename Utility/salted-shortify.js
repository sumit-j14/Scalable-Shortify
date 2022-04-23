const saltedMd5 = require('salted-md5');

// this function produces salted md5 hash
let saltedShortify = (salt,longURL,shortURL)=>{
    console.log("salt is "+salt)
    const saltedHash = saltedMd5('Some data', 'salt')
    saltedHash= saltedHash.substring(25)

    console.log("new hash is "+saltedHash)
    return saltedHash
}
module.exports= saltedShortify