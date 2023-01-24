const EventEmitter = require('events');
const eventEmitter = new EventEmitter();


eventEmitter.on('showArrayNotes', (params) => {
    console.log('this is array notes: ', params);
});

eventEmitter.on('apply', (params) => {
    console.log('this is the event apply: ', params);
});

eventEmitter.on('off', (params) => {
    console.log('this is the event of: ', params);
});

module.exports = eventEmitter;
