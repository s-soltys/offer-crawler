import { Observable } from 'rxjs';
import { Pages } from './pages';
import { CrawlRx } from './crawl-rx';
import * as colors from 'colors';
import 'typescript-array-extensions';
import { getRelevantLinks } from "./util";

let keywords = ["offset", "druk"];

let crawl = crawlLinksWithKeyboards(Pages, keywords)
    .flatMap(links => {
        return crawlLinksWithKeyboards(links, keywords).startWith(links);
    })
    .flatMap(links => {
        return links;
    })
    .distinct();

function crawlLinksWithKeyboards(pages: string[], keywords: string[]){
    return CrawlRx(Pages)
        .map(({ response, options, $ }) => {
            let links = getRelevantLinks(keywords, options.uri, $);
            return links;
        });
}

crawl.subscribe(
    result => {
        console.log("Loaded: " + result);
    // console.log(
    // `${colors.cyan('***')} Crawled to ${colors.cyan(options.uri)} with status ${colors.cyan(response.statusCode)}
    // Page title: ${colors.green(title)}
    // Links with keywords: ${colors.magenta(links.length)}
    // Example link: ${links[0]}
    // `);
    },
    error => console.error(error),
    () => console.log(colors.green("Completed..."))
);