var fs = require('fs-extra');
let fileurl = [];
fs.readdir('/public/images/configFile/', (err,files) => {  //拉取views 目录下的所有文件 -- 
    files.forEach(Element => {
        fileurl.push(Element);
    });
})
module.exports.fileurl = fileurl;