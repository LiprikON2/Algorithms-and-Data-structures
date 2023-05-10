import scrapeWiki from "./scrapeWiki";
import "../style.css";

const article = await scrapeWiki("Астероид");

console.log("Article\n\n", article);
