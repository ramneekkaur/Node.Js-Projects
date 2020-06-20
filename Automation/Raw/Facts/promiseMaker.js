let fs =require("fs");
//resolve
//reject
console.log("start");
function promiseMaker(path){
    return new Promise(function(resolve, reject){
        fs.readFile(path, function(err, data){
            if(err){
                reject(err);

            }else{
                resolve(data);
            }
        })
    })
}
let fRPromise = promiseMaker("f13.txt");
fRPromise.then(function(data){
    console.log("Inside then");
    console.log(data+ " ");
})
fRPromise.catch(function(err){
    console.log("Inside catch");
    console.log(err.message);
})
console.log("Move to next work");