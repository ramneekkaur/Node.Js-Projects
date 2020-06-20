let request = require("request");
let fs = require("fs");
let url = "https://www.espncricinfo.com/scores/series/19322/india-in-new-zealand-2019-20"
console.log("Work start");
request(url, function (err, response, data) {
    console.log("Come back later");
    if(err === null && response.statusCode === 200){
        fs.writeFileSync("index.html", data);
    }else if(response.statusCode === 404) {
        console.log("Page not found")
    }else{
        console.log(err);
        console.log(response.statusCode)
    }
})
console.log("Doing other stuff")