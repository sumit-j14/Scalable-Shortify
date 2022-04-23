var validUrl = require('valid-url');
  
// check if the mentioned long url is a valid one
let checkURL = (url)=>{
    if (validUrl.isUri(url)){
        console.log('valid url returning true');
        return true;
    } else {
        console.log('invalid url');
        return false;
    }
}
module.exports= checkURL;