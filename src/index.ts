import * as Crawler from 'crawler';
import * as http from 'http';

console.log('Initializing crawler...');

let crawler = new Crawler({
    maxConnections : 10,
    callback: (error: Error, res: http.IncomingMessage, done: Function) => {
        if (error) {
            console.log(error);
        } else {
            let options = (res as any).options;
            let $: JQueryStatic = (res as any).$;
            
            console.log(`
            *** Crawled to ${options.uri}
                Page title: ${$("title").text()}
                Link on page: ${$("a").attr('href')}
            `);
        }
        done();
    }
});

crawler.queue(['http://www.example.com', 'http://www.example.com?query=0']);