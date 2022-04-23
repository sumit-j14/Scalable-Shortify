const client = require('../DataBase/database')
let checkURL = require('../Utility/checkUrl')
let shortifyURL = require('../Utility/shortify')
let hascollided = require('../check_Collision/hascollided')
let saltedShortify = require('../Utility/salted-shortify')
const saltedMd5 = require('salted-md5');


let handleFound = (longURL)=> {
  const query = `
  Select * from shard_2 where longurl = ($1)
  `;
  client.query(query,[longURL] ,(err, res) => {
    if(err){
      console.log(err)
    }
    else
    {
      console.log(" simply returning found query")
      console.log(res.rows)
    }
  })
}
let handleNOTFound = (longURL)=>{
  console.log("inside handlenotfound");
  
  let shortURL=shortifyURL(longURL)
  //checking collision
  client.query('Select * from shard_2 where shortURL = ($1)',[shortURL],(err, res) => {
    if(err){
    console.log(err);
    }
    else
    {
      if(res.rows.length==0)
      {
          console.log(res.rows);
      console.log("no collision")
      handleNoCollision(longURL,shortURL);
      }
      else
      {
          console.log(res.rows);
        console.log("collided")
        handleCollision(longURL,shortURL)
      }
    }
    //  client.end()
  })
  
}
let handleCollision = (longURL, shortURL)=>{
  console.log("inside handleCollision");
  var  answer= true 
  var salt = 'abcd'
  shortURL=saltedMd5(longURL,salt).substring(25)
  console.log("new short url is "+shortURL);
  const query = `
  insert into shard_2(longurl, shorturl)
  values ($1, $2)
  `;
  client.query(query,[longURL,shortURL], (err, res) => {
    if(err){
      console.log(err);
    }
    else
    {
      console.log("inserted after saltifying ");
    console.log(res.rows);
    }
    })

}

//handling no collision
let handleNoCollision =(longURL,shortURL)=>{
  console.log("inside handle no collision");
  const query = `
  insert into shard_2(longurl, shorturl)
  values ($1, $2)
  `;
  client.query(query,[longURL,shortURL], (err, res) => {
    if(err){
      console.log(err);
    }
    else
    {
      console.log("insert successful");
    console.log(res.rows);
    }
    })
    
  }
  
  let checkShard = (longURL) => {
    let lURL= longURL
    //checking if the current url is valid
  if(!checkURL(longURL))
  {
    console.log("invalid url ");
    return;
  }
  //assumed valid url
  
  console.log("checking "+longURL+" in "+__filename);
  console.log("we have access to client ");
  client.query('Select * from shard_2 where longurl = ($1)',[longURL],(err, res) => {
    if(err){
      console.log("error occured in search query")
      console.log(err);
    }
    else
    {
      console.log("search successful");
      console.log(res.rows);
      if(res.rows.length==0)
      {
        console.log("not found")
        handleNOTFound(longURL)
      }
      else
      {
        console.log("found")
        handleFound(longURL)
      }
    }
    //  client.end()
  })
}
module.exports=checkShard;