"use strict";
var util = require('util');
var events = require('events');
var StateMachine = require('./state_machine');

var FSM = module.exports = function( table ){
    events.EventEmitter.call(this);
    this.machine = new StateMachine();
    this.table = table || {};
}
util.inherits(FSM, events.EventEmitter);

FSM.prototype.init_table = function(table){
    this.table = table;
};
FSM.prototype.restore = function(key, arg){
    if(key in this.table){
        this.machine.restore(this.table[key], arg);
        return true;
    }
    return false;
};
FSM.prototype.setState = function(key, arg){
    if(key in this.table){
        this.machine.setState(this.table[key], arg);
        this.emit('changed', key, arg);
        return true;
    }
    return false;
};
FSM.prototype.getState = function(){
    for(var key in this.table){
        if( this.table[key] == this.machine.getState() ){
            return key;
        }
    }
    return null;
};
FSM.prototype.update = function(arg){
    this.machine.update(arg);
};

