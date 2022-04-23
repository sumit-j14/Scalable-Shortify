const client = require('../DataBase/database')

let has_shortURL_Access = (shortURL)=>{
    client.query('Select * from shard_0 where shorturl = ($1)',[shortURL],(err, res) => {
        if(err){
          console.log("error occured in search query")
          console.log(err);
        }
        else
        {
          console.log(res.rows);
          if(res.rows.length==0)
          {
            //check db _ 1
            client.query('Select * from shard_1 where shorturl = ($1)',[shortURL],(err, res) => {
                if(err){
                  console.log("error occured in search query")
                  console.log(err);
                }
                else
                {
                  console.log(res.rows);
                  if(res.rows.length==0)
                  {
                    //check db _ 2
                    client.query('Select * from shard_2 where shorturl = ($1)',[shortURL],(err, res) => {
                        if(err){
                          console.log("error occured in search query")
                          console.log(err);
                        }
                        else
                        {
                          console.log(res.rows);
                          if(res.rows.length==0)
                          {
                            //check db _ 3
                            client.query('Select * from shard_3 where shorturl = ($1)',[shortURL],(err, res) => {
                                if(err){
                                  console.log("error occured in search query")
                                  console.log(err);
                                }
                                else
                                {
                                  console.log(res.rows);
                                  if(res.rows.length==0)
                                  {
                                    //it means not present
                                    console.log("the mentioned short url is not present");
                                  }
                                  else
                                  {
                                    console.log("short url found");
                                    const query = `
                          Select * from shard_3 where shorturl = ($1)
                          `;
                          client.query(query,[shortURL] ,(err, res) => {
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
                                }
                              })
                          }
                          else
                          { 
                            console.log("short url found");
                            const query = `
                  Select * from shard_3 where shorturl = ($1)
                  `;
                  client.query(query,[shortURL] ,(err, res) => {
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
                        }
                      })
                  }
                  else
                  {
                    
                    console.log("short url found");
                    const query = `
          Select * from shard_1 where shorturl = ($1)
          `;
          client.query(query,[shortURL] ,(err, res) => {
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
                }
              })
          }
          else
          {
            console.log("short url found");
            const query = `
  Select * from shard_0 where shorturl = ($1)
  `;
  client.query(query,[shortURL] ,(err, res) => {
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
        }
      })
}
module.exports=has_shortURL_Access