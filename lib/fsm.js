"use strict";

var StateMachine = require('./state_machine');

var FSM = module.exports = function( table ){
    this.machine = new StateMachine();
    this.table = table || {};
}
FSM.prototype = {
    init_table : function(table){
        this.table = table;
    },
    restore : function(key, arg){
        if(key in this.table){
            this.machine.restore(this.table[key], arg);
            return true;
        }
        return false;
    },
    setState : function(key, arg){
        if(key in this.table){
            this.machine.setState(this.table[key], arg);
            return true;
        }
        return false;
    },
    getState : function(){
        for(var key in this.table){
            if( this.table[key] == this.machine.getState() ){
                return key;
            }
        }
        return null;
    },
    update : function(arg){
        this.machine.update(arg);
    },
}

