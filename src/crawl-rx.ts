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
        let responses = 0;
        let isTerminatedByError = false;

        config = config || { maxConnections : 10, retries: 3 };

        let crawler = new Crawler({
            ...config,
            callback: (error, res, done) => {
                if (!isTerminatedByError){
                    if (!error) {
                        subscriber.next({ response: res, $: res.$, options: res.options });
                    } else {
                        isTerminatedByError = true;
                        subscriber.error(error);
                    }

                    if (++responses === queue.length){
                        subscriber.complete();
                    }
                }

                done();
            }
        });
        
        crawler.queue(queue);
    });
}