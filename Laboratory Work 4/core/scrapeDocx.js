import StreamZip from "node-stream-zip";

// https://github.com/abhinaba-ghosh/any-text
const scrapeDocx = (filePath) => {
    return new Promise((resolve, reject) => {
        open(filePath).then((res, err) => {
            if (err) {
                reject(err);
            }
            let body = "";
            let components = res.toString().split("<w:t");
            for (let i = 0; i < components.length; i++) {
                let tags = components[i].split(">");
                let content = tags[1].replace(/<.*$/, "");
                body += content + "\n";
            }
            resolve(body);
        });
    });
};

const open = (filePath) => {
    return new Promise((resolve, reject) => {
        const zip = new StreamZip({
            file: filePath,
            storeEntries: true,
        });
        zip.on("ready", () => {
            let chunks = [];
            let content = "";
            zip.stream("word/document.xml", (err, stream) => {
                if (err) {
                    reject(err);
                }
                stream.on("data", (chunk) => {
                    chunks.push(chunk);
                });
                stream.on("end", () => {
                    content = Buffer.concat(chunks);
                    zip.close();
                    resolve(content.toString());
                });
            });
        });
    });
};

export default scrapeDocx;
