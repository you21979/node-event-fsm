"use strict";

var FSM = require('../..');
var events = require('events');
var util = require("util");

var serial = 0;

var Obj = module.exports = function(tbl){
    events.EventEmitter.call(this);

    this.id = ++serial;
    this.count = {
        think : 0,
        move : 0,
    };
    this.fsm = new FSM(tbl);
    this.fsm.on('changed', function(key, arg){
        //console.log('changed:'+key);
    });
    this.pos = {
        x : 0,
        y : 0,
        z : 0,
    };
    this.fsm.restore('NONE');
}
util.inherits(Obj, events.EventEmitter);
(function(proto, ext){ for(var key in ext) proto[key] = ext[key]; })
(Obj.prototype, {
    spawn : function(){
        this.fsm.setState('SPAWN.THINKING', this);
    },
    onStateThink : function(){
        this.count.think = 0;
    },
    onStateMove : function(){
        this.count.move = 0;
    },
    moving : function(){
        var x = this.pos.x;
        var y = this.pos.y;
        this.pos.x += (Math.random() * 100) - 50;
        this.pos.y += (Math.random() * 100) - 50;
        this.emit('moved', {x:this.pos.x, y:this.pos.y}, {x:x, y:y});
        this.count.move++;
        if(this.count.move > 10){
            this.fsm.setState('SPAWN.THINKING', this);
        }
    },
    thinking : function(){
        var r = Math.random() * 100 | 0;
        var select = 'SPAWN.THINKING'
        if(r > 80){
            select = 'SPAWN.MOVING'
        }
        this.fsm.setState(select, this);
        this.emit('thinked', select);
        this.count.think++;
    },
    update : function(){
        this.fsm.update(this);
    },
});
