"use strict";

var events = require('events');

var state = function(){
    return new events.EventEmitter();
}

var STATE_DIR = module.exports = {
    'NONE' : state().on('begin', function(obj){
        obj.spawn();
    }),
    'SPAWN.THINKING' : state()
        .on('begin', function(obj){
            obj.onStateThink();
        })
        .on('update', function(obj){
            obj.thinking();
        }),
    'SPAWN.MOVING' : state()
        .on('begin', function(obj){
            obj.onStateMove();
        })
        .on('update', function(obj){
            obj.moving();
        }),
};



