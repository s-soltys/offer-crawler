import { Observable } from 'rxjs';
import { Pages } from './pages';
import { CrawlRx } from './crawl-rx';
import * as colors from 'colors';
import 'typescript-array-extensions';

let keywords = ["offset", "druk"];

let crawl = CrawlRx(Pages)
    .flatMap(({ response, options, $ }) => {
        let title = $("title").text();

        let res = keywords.flatMap(keyword => {
            return $(`a:contains("${keyword}")`)
                .toArray()
                .map(e => $(e))
                .map(e => ({ keyword, text: e.text(), href: e.prop('href') as string }));
        });

        let links = res.map(r => 'http://teatrwielki.pl/' + r.href);

        console.log(
        `${colors.cyan('***')} Crawled to ${colors.cyan(options.uri)} with status ${colors.cyan(response.statusCode)}
        Page title: ${colors.green(title)}
        Links with keywords: ${colors.magenta(links.length)}
        Example link: ${links[0]}
        `);

        return CrawlRx(links).map(({ response, options, $ }) => 'Success: ' + $('title').text() + ' code ' + response.statusCode);
    });

crawl.subscribe(console.log, console.error, () => console.log("Completed..."));