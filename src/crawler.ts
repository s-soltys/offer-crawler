import * as Crawler from 'crawler';
import * as http from 'http';
import * as colors from 'colors';
import * as fs from 'fs';

const config = {
    maxConnections : 10,
    retries: 3
};

export const crawler = new Crawler({ callback, ...config });

function callback(error: Error, res, done) {
    if (error) {
        console.error(error);
    } else {
        success(res, res.$, res.options);
    }
    done();
}

function success(res: http.IncomingMessage, $: JQueryStatic, options: any){
    let title = $("title").text();
    let href = $("a").attr('href');

    console.log(
`${colors.cyan('***')} Crawled to ${colors.cyan(options.uri)} with status ${colors.cyan(res.statusCode)}
Page title: ${colors.green(title)}
Link on page: ${colors.magenta(href)}
`);
}