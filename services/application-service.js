const https = require('https');
const fs = require('fs');
const url = require('url');
const unzip = require('unzip');
let folderCount = 0;
let currentFolder = 0;

function onFolderExists(folderName, err, stat) {
    currentFolder++;
    if (err) {
        console.log(`Folder ${currentFolder} (${folderName}) creating...`);
        fs.mkdir(`./assets/apps/${folderName}`, onFolderCreated.bind(this, folderName));
    } else {
        console.log(`Folder ${currentFolder} (${folderName}) exists, proceeding...`);
        onFolderCreated.call(this, folderName);
    }
}

function onFolderCreated(folderName, err, dir) {
    console.log(`Unzipping ${folderName}.zip...`);
    fs.createReadStream(`./assets/apps/${folderName}.zip`)
        .pipe(unzip.Extract({ path: `./assets/apps/${folderName}` }))
        .on('close', () => {
            console.log(`Unzipping of ${folderName}.zip has been finished, please wait for another apps...`);
            folderCount--;
            if (folderCount === 0) {
                console.log(`Unzipping of all APPLICATIONS has been finished but don't pay much attention, it's just for fun`);
            }
        });
}

function unzipApp(inputPath, outputPath) {
}

module.exports = (app, data) => {
    const applications = [];

    folderCount = data.applications.length;
    console.log(`Creating folders for ${folderCount} application(s)...`);

    data.applications.forEach(app => {
        const uri = app.uri.substr(0, app.uri.indexOf('?'));
        const lastSlash = uri.lastIndexOf('/');
        const fileName = uri.substr(lastSlash + 1);
        const file = fs.createWriteStream(`./assets/apps/${fileName}`);
        const folderNameArr = fileName.split('.');
        folderNameArr.pop();
        const folderName = folderNameArr.join('.');

        applications.push(false);

        https.get(uri, function (response) {
            response.pipe(file);

            file.on('finish', function() {
                file.close();
                fs.stat(`./assets/apps/${folderName}`, onFolderExists.bind(this, folderName));
            });
        }).on('error', function(err) { // Handle errors
            fs.unlink(`./assets/apps/${fileName}`); // Delete the file async. (But we don't check the result)
            console.error(err);
        });
    })
};
