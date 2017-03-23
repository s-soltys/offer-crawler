import * as Crawler from 'crawler';
import * as http from 'http';
import { Observable } from 'rxjs';

export interface CrawlResult {
    response: http.IncomingMessage,
    $: JQueryStatic,
    options: any
}

export function CrawlRx(queue: string[], config: any = undefined) {
    return new Observable<CrawlResult>(subscriber => {
        config = config || { maxConnections : 10, retries: 3 };

        let crawler = new Crawler({
            ...config,
            callback: (error, res, done) => {
                if (!error && res.statusCode === 200) {
                    subscriber.next({ response: res, $: res.$, options: res.options });
                } else {
                    subscriber.error(error || 'Page not found!');
                }
                done();
            }
        });
        
        crawler.queue(queue);
    });
}