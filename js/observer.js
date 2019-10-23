// 实现一个监听器Observer
// 对所有属性进行监听，递归对象遍历所有属性
function defineReactive(data, key, val) {
    observe(val);//递归遍历所有属性
    let dep = new Dep();
    Object.defineProperty(data, key, {
        set: function (newVal) {            
            if (val == newVal) return;
              val = newVal;
              console.log("属性" + key + "已经被监听，现在的值为" + newVal.toString());
              dep.notify(); //属性值更改通知订阅者跟新相关操作
        },
        get: function () {
            if (Dep.target) {
                dep.addSub(Dep.target);  //给订阅器添加订阅者
            }
            return val;
        }
    })
}

// 观察者循环遍历对象
function observe(data) {
    if (!data || typeof data !== "object") return;  //判断data是否为对象
    Object.keys(data).forEach(key => {  //通过Object.keys()将data转化为数组进行遍历获取key
        defineReactive(data, key, data[key]);
    })

}

// 消息订阅器
function Dep() {
    this.subs = [];
}
Dep.prototype = {
    addSub: function (sub) {  //给订阅器添加订阅者方法
        this.subs.push(sub);
    },
    notify: function () {   //订阅器通知每个订阅者
        this.subs.forEach(sub => {
            sub.update();
        })
    }
}

