
function myVue(options) { 
    let self = this;
    this.vm = this;
    this.data = options.data;
    this.methods = options.methods;
    Object.keys(this.data).forEach(function (key) { 
        self.proxyKeys(key);
    })
    observe(options.data);
    new Compile(options.el, this)
    options.mounted.call(this);
    // el.innerHTML = this.data[exp];
    // new Watcher(this, exp, function (valve) { 
    //     console.log(valve);
    //     el.innerHTML = valve;
    // })
    return this;
}

myVue.prototype = {
    proxyKeys: function (key) { 
        Object.defineProperty(this, key, {
            get: function () { 
                return this.data[key];
            },
            set: function (newValue) { 
                this.data[key] = newValue;
            }
        })
    }
}