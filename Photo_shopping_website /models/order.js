const Item = require("./item")

class Order {
    constructor() {
        this.items = []
    }
    addItem(item) {
        this.items.push(item);
    }
}

module.exports = Order;

/**
let a = new Item("Book", 100, 10)
let b = new Item("computer", 200, 120)
let o = new Order;
o.addItem(a);
o.addItem(b);
console.log(o);
*/
