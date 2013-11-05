"use strict";

var FSM = require('..');
var Events = require('events');


var Obj = function(tbl){
    this.fsm = new FSM(tbl);
    this.count = 0;
}
Obj.prototype = {
    enter : function(){
        this.fsm.setState('hoge', this);
    },
    leave : function(){
        this.fsm.setState('huga', this);
    },
    update : function(){
        this.count++;
        if(this.count===20){
            this.fsm.setState('end', this);
        }
        this.fsm.update(this);
    },
}

var createState = function(){
    var e = new Events.EventEmitter();
    e.setMaxListeners(0);
    return e;
}
var ObjectManager = function(){
    var self = this;
    this.state_table = {
        end : createState()
            .on('begin', function(obj){
                console.log('end');
                self.lists.forEach(function(o, i){
                    if(o === obj){
                        self.lists.splice(i, 1)
                    }
                });
            }),
        hoge : createState()
            .on('begin', function(obj){
                console.log('hoge_begin ->');
            })
            .on('end', function(obj){
            })
            .on('update', function(obj){
                obj.leave();
            })
            ,
        huga : createState()
            .on('begin', function(obj){
                console.log('huga_begin <-');
            })
            .on('end', function(obj){
            })
            .on('update', function(obj){
                obj.enter();
            })
            ,
    }
    this.lists = [];
}
ObjectManager.prototype = {
    create : function(){
        return new Obj(this.state_table);
    },
    task_start : function(){
        var self = this;
        process.nextTick(function T(){
            var obj = self.lists.shift();
            if(obj){
                obj.update();
                self.lists.push(obj);
            }
            process.nextTick(T);
        });
    },
    task_stop : function(){
    },
}
var Factory = new ObjectManager();

var main = function(){
    Factory.task_start();

    var obj = Factory.create();
    obj.enter();

    Factory.lists.push(obj);
}


main();
