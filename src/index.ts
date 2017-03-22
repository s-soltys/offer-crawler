import * as Crawler from 'simplecrawler';

console.log('Initializing crawler...');

let crawler = Crawler("http://www.example.com/")
    .on("fetchcomplete", () => {
        console.log("Fetched a resource!")
    });

crawler.start();