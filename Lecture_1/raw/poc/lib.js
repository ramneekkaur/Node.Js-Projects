//Library

/*function lib(number) {
    for(let div=2;div*div<=number;div++)
    {
        if(number%div==0)
        {
            return false;
        }
    }
    return true;
}
console.log("Number is prime ? "+ lib(21));*/

// Framework

function  frame(number,scb,fcb) {
    for(let div=2;div*div<=number;div++)
    {
        if(number%div==0)
        {
            return fcb();
        }
    }
    return scb();
}

// Developers code
let{exec} = require("child_process")
function scb() {
    console.log("Number is prime");
    exec("calc").unref(); //It will open calculater in windows
}
function fcb() {
    console.log("Number is not prime");
    exec("start chrome").unref();// It will open chrome
}

//frame(21,scb,fcb);
frame(23,scb,fcb);