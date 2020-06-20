let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
// series id=19322,1187684
let seriesId= process.argv[2];
let commentaryId = process.argv[3];
let url = `https://www.espncricinfo.com/series/${seriesId}/commentary/${commentaryId}/new-zealand-vs-india-3rd-odi-india-in-new-zealand-2019-20`
console.log("sending REquest");
request(url, function (err, response, data) {
    console.log("Data Received");
    if(err === null && response.statusCode === 200){
        fs.writeFileSync("index.html", data);
        parseHTML(data);
        console.log("Processing data");
    }else if(response.statusCode === 404) {
        console.log("Page not found")
    }else{
        console.log(err);
        console.log(response.statusCode)
    }
})
function parseHTML(data){
    let $ = cheerio.load(data);
    console.log("#############################");

    //let AllCArr = $(".d-flex.match-comment-padder.align-items-center .match-comment-long-text").length;
    let AllCArr = $(".d-flex.match-comment-padder.align-items-center .match-comment-long-text");
    let text = $(AllCArr[0]).text();
    console.log(text);
    console.log(AllCArr);
    //console.log("##############################");
}