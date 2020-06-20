function hello(greeter) {
    console.log("Hello from" + greeter);
    return undefined;
}

//let rVal = hello("Steve");
//console.log(rVal);

let a=[1,2,3,4,5];
b=a;
console.log(b);
let greeter = function sayHi(){
    console.log("function expression");
}
//let greeter=10;
//console.log(greeter);
//console.log(greeter());


function myfn(varName) {
    console.log(varName());
    console.log("I am waiting for line 32");
}
//first myfn-sayHi calls myfn and therefore "function expreesion " will print.
//Then varname() is not returning anything therefore it is returning undefined.
//And after that " I am waiting for line 32" will print. 
myfn(function sayHi() {
   console.log("function expression");
   //return true; 
});