import * as cheerio from "cheerio";

const scrapeWiki = async (url, selector = "#mw-content-text p") => {
    const res = await fetch("http://localhost:8010/proxy/wiki/" + url);
    const data = await res.text();

    const parsedData = cheerio.load(data);
    parsedData("style").remove();

    const article = parsedData(selector).text();

    return article;
};

export default scrapeWiki;
