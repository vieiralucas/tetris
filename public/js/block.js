function Block(x, y, dom) {
    this.x = x;
    this.y = y;
    this.dom = dom;
    this.locked = false;
}

Block.prototype = {
    paint: function(color) {
        this.dom.style.background = color;
    }
};
