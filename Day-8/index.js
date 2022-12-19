const {EventEmitter} = require("events");

const Button = new EventEmitter();

Button.on("click",(params)=>{
    console.log("Button Clicked",params);
});

setTimeout(()=>{
    Button.emit("click",1);
Button.emit("click",2)
},2000);
Button.on("click",()=>{
    console.log("Click happened");
})
module.exports = Button;