"use strict";
var events = require('events');

var DefaultState = (function(){
    var e = new events.EventEmitter();
    e.setMaxListeners(1);
    return e;
}());

var StateMachine = module.exports = function(){
    this.current = DefaultState;
}

StateMachine.prototype = {
    restore : function(state){
        this.current = state;
    },
    getState : function(){
        return this.current;
    },
    setState : function(newstate,arg){
        var oldstate = this.current;
        oldstate.emit('end', arg);
        this.current = newstate;
        this.current.emit('begin', arg);
    },
    update : function(arg){
        this.current.emit('update', arg);
    },
}
