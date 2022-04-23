const client = require('../DataBase/database')

let hascollided = (longURL,shortURL)=>{

    client.query('Select * from shard_0 where shortURL = ($1)',[shortURL],(err, res) => {
        if(err){
        console.log(err);
        }
        else
        {
          if(res.rows.length==0)
          {
              console.log(res.rows);
          console.log("no collision")
          return false
          }
          else
          {
              console.log(res.rows);
            console.log("collided")
            return true;
          }
        }
        //  client.end()
      })

}
module.exports=hascollided