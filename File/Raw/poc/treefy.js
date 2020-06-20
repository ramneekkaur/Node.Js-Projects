let fs = require('fs');
let path = require("path");
function treefyLogic(src, dest, node) {
    if(node.isFile == true){
        let srcPath = path.join(src, node.newName);
        let destPath = path.join(dest, node.oldName);
        fs.copyFileSync(srcPath, destPath);
        console.log(`File copied from ${srcPath} ${destPath}`);

    }else{
        let dirPath = path.join(dest, node.name);
        if(!fs.existsSync(dirPath)){
            fs.mkdirSync(dirPath);
        }

        for(let i = 0; i<node.children.length; i++){
            let child = node.children[i];
            let pPath = dirPath;
            treefyLogic(src, pPath, child);
        }
    }
}

let input = process.argv.slice(2);
let src = input[0],dest = input[1];

let root = require(path.join(src, "metadata.json"));

treefyLogic(src, dest, root)