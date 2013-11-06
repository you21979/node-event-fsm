"use strict";
var Task = require('./task');
var Obj = require('./obj');
var State = require('./state');


var task = new Task(1000, 1);

task.start();
task.on('report', function(count){
    //console.log('exec : ' + count);
});
var update = function(func){
    task.add(function(){
        func();
        update(func);
    });
};
var factory = function(){
    var obj = new Obj(State);
    obj.on('moved', function(now, old){
        console.log('id=%d, x:%d, y:%d', obj.id, now.x, now.y);
    });
    obj.on('thinked', function(select){
        console.log('id=%d select:%s', obj.id, select);
    });
    return obj;
}
var main = function(){
    var obj1 = factory();
    var obj2 = factory();

    update(function(){
        obj1.update();
        obj2.update();
    });
}
main();
