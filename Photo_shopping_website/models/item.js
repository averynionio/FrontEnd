class Item{
    constructor(photoName, quailty, type, glossy,qty, price) {
        this.photoName = photoName;
        this.quailty = quailty;
        this.type = type;
        this.glossy = glossy;
        this.qty = qty;
        this.price = price
    }
}

module.exports = Item;

//moudle.exports --> export the entire file
//exports --> without the moudle only export the funciton