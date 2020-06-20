let fs = require("fs");
let path = require("path");

function checkWhetherFile(path_string){
    return fs.lstatSync(path_string).isFile();
}

function childReader(src) {
    let children = fs.readdirSync(src);
    return children;
}

function viewFlatFile(src){
    let isFile = checkWhetherFile(src);
    if(isFile == true){
        console.log(src + "*");
    }else{
        console.log(src);

        let children = childReader(src);

        for(let i = 0; i < children.length; i++) {
            let childPath = path.join(src, children[i]);
            viewFlatFile(childPath);
        }
    }
}

function viewTree(src, indent){
    let isFile = checkWhetherFile(src);
    if(isFile == true){
        console.log(indent + path.basename(src) + "*");
    }else{
        console.log(indent + path.basename(src));

        let children = childReader(src);

        for(let i = 0; i < children.length; i++) {
            let childPath = path.join(src, children[i]);
            viewTree(childPath, indent + "\t");
        }
    }
}

let input = process.argv.slice(2)[0];

viewTree(input, "");