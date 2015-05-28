function Block(x, y, dom) {
    this.x = x;
    this.y = y;
    this.dom = dom;
    this.locked = false;
}

Block.prototype = {
    paint: function(color) {
        this.dom.style.background = color;
    },
    clear: function() {
        if (this.y < 4) {
            this.dom.style.background = '#CCC';
        } else {
            this.dom.style.background = '#000';
        }
        this.locked = false;
    }
};
