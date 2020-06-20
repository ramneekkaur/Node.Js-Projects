let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
// series id=19322,1187684
let seriesId = process.argv[2];
let count=0;
let leaderboard=[];
let url = `https://www.espncricinfo.com/scores/series/${seriesId}/india-in-new-zealand-2019-20?view=results`;
// npm install request 
console.log("sending Request");
request(url, function (err, response, data) {
    console.log("Data Recieved");
    // console.log(response);clear
    if (err === null && response.statusCode === 200) {
        fs.writeFileSync("series.html", data);
        parseHTML(data);
        console.log("Processing Data");
    } else if (response.statusCode === 404) {
        console.log("Page Not found");
    } else {
        console.log(err);
        console.log(response.statusCode)
    }
})
function parseHTML(data) {
    // page => cheerio
    // load => html 
    let $ = cheerio.load(data);
    // Page=> selector pass  => text => text
    console.log("########################");
    let AllCards = $(".match-score-block");
    // console.log(AllCards.length);
    for (let i = 0; i < AllCards.length; i++) {
        let matchType = $(AllCards[i]).find("p.small.match-description").text();
        let test = matchType.includes("ODI") || matchType.includes("T20I");
        if(test==true){
            // console.log(matchType);
            let link = $(AllCards[i]).find(".match-cta-container a").attr("href");
            //console.log(link);
            let fullLink = `https://www.espncricinfo.com${link}`;
            //console.log(fullLink);
            count++;
            matchHandler(fullLink);

        }
    }
    console.log("########################")
    // console.log(text);
}

function matchHandler(link){
    request(link, function(err, response, data){
        if(err == null  && response.statusCode ==200){
            //console.log(`match${count} recieved`);
            fs.writeFileSync(`match${count}.html`,data);
            count--;
            handleEachMatch(data);
            if(count==0){
              //console.log("All match Processed");
              console.table(leaderboard);  
            }
            //console.log("Processing data");
        }else if (response.statusCode === 404) {
            console.log("Page Not found");
        } else {
            console.log(err);
            console.log(response.statusCode)
        }
    })
}

function handleEachMatch(data){
    let $ = cheerio.load(data);
    let matchType = $(".match-page-wrapper .desc.text-truncate").text();
   if(matchType.includes("ODI")){
       matchType="ODI";
   }else{
       matchType="T20I";
   }
   
    console.log(matchType);
    let inningsArr = $(".match-scorecard-table")
    let fti = inningsArr[0];
    let sti = inningsArr[1];

    let ftiName = $(fti).find(".header-title.label").text();
    let fInnigPlayers = $(fti).find(".table.batsman tbody tr");
    ftiName = ftiName.split("Innings")[0];
    //console.log(ftiName);
    for(let i=0; i<fInnigPlayers.length; i++){
        let isBatsman = $(fInnigPlayers[i]).find("td").hasClass("batsman-cell");
        //console.log(isBatsman);
        if(isBatsman == true) {
            let pName = $($(fInnigPlayers[i]).find("td")[0]).text();
            let runs = $($(fInnigPlayers[i]).find("td")[2]).text();
            //console.log(pName + " " + runs);
            createLeaderBoard(pName, matchType, runs, ftiName);
        }
    }
    console.log("````````````````````");
    let stiName = $(sti).find(".header-title.label").text();
    stiName = stiName.split("Innings")[0];
    let sInnigPlayers = $(sti).find(".table.batsman tbody tr");
    //console.log(stiName);
    for(let i=0; i<sInnigPlayers.length; i++){
        let isBatsman = $(sInnigPlayers[i]).find("td").hasClass("batsman-cell");
        //console.log(isBatsman);
        if(isBatsman == true) {
            let pName = $($(sInnigPlayers[i]).find("td")[0]).text();
            let runs = $($(sInnigPlayers[i]).find("td")[2]).text();
            //console.log(pName + " " + runs);
            createLeaderBoard(pName,matchType,runs,stiName);
        }
    }
    console.log("222222222222222222222222222222222");
}

function createLeaderBoard(name, format, runs, team) {
    //create a leaderboard
    // VK=> 
    // check => leaderboard => playe exist => update
    runs=parseInt(runs);
    for (let i = 0; i < leaderboard.length; i++) {
        let player = leaderboard[i];
        if (player.Name === name && player.Team === team && player.Format === format) {
            //  update runs
            // return;
            player.Total += runs;
            return;
        }
    }
    // create new player
    let pObj = {
        Name: name,
        Format: format,
        Total: runs,
        Team: team
    }
    // add to leaderboard
    leaderboard.push(pObj);
    // create a new entry

}