// 实现订阅者Watcher
function Watcher(vm, exp, cb) {     
    this.vm = vm;
    this.exp = exp;
    this.cb = cb;
    this.valve = this.get();
}

Watcher.prototype = {
    update: function () { 
        this.run();
    },
    run: function () { 
        let value = this.vm.data[this.exp];
        let oldValue = this.valve;
        if (value != oldValue) { 
            this.valve = value;
            this.cb.call(this.vm, value, oldValue);
        }
    },
    get: function () { 
        Dep.target = this;   //缓存自己
        let value = this.vm.data[this.exp];  //强制执行监听器里边的get函数           
        Dep.target = null;
        console.log(this);
        
        return value;
    }
}
