const md5 = require('md5');
const path = require('path')

let main_function = (longURL)=>{
    console.log("checking "+longURL);
    let md5hash= md5(longURL)
    console.log("md5 hash is ",md5hash);

    //sharding function
    //this is "hash-based sharding"
    let shard_hash=(md5hash.charCodeAt(1)+md5hash.charCodeAt(0))%4;
    console.log("chosen database is shard_"+shard_hash);
    
    //redirect to that database
    let db_path=path.join(__dirname,'..','/DB_shards/' ,'shard_'+shard_hash+'.js');
    console.log(db_path);

    //handling further requirements
    let checkShard = require(db_path)
    checkShard(longURL);
}

module.exports=main_function;