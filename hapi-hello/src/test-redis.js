const Redis=require('ioredis');

const db= new Redis({
  port:7001,
  host:'127.0.0.1',
  family:4
});

console.log("redis DB ",db);
db.get("key",function(err,response){
  if(err){
    console.log(err);
  }
  console.log("Resonse :",response);
});
