import * as schedule from 'node-schedule';

console.log('Scheduling job...');
let job = schedule.scheduleJob('0 17 ? * 0,4-6', () => {
  console.log('Task launched!');
});

setInterval(() => console.log('Checkup...'), 60 * 1000);