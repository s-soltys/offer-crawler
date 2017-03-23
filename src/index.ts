import { crawler } from './crawler';

console.log('Initializing crawler...');
crawler.queue(['http://www.example.com', 'http://www.example.com?query=0']);