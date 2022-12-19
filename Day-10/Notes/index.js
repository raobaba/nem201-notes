
// setTimeout(()=>{
//     console.log("Timeout");
// })

// setTimeout(()=>{
//     console.log("Intermediate")
// },0);
// const fs = require("fs");
// fs.readFile("index.js","base64", function(err,data){
//     setTimeout(()=>{
//     console.log("Timeout");
// })

// setTimeout(()=>{
//     console.log("Intermediate")
// },0);
// })

setTimeout(()=>{
    console.log("Timeout");
})

setTimeout(()=>{
    console.log("Intermediate")
},0);

process.nextTick(()=>{
    console.log("Inside xck");
})
//rdcli -h redis-13866.c212.ap-south-1-1.ec2.cloud.redislabs.com --port 13866 --auth T01p0SKVzUpTRv1QpybcX7Ztrg0l9Cbv