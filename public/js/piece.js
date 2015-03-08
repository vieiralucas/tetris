function Piece(board) {
    this.board = board;
    this.blocks = [];
    this.spawn();
    this.color = util.getRandomColor();
    this.locked = false;
    this.paint();
    this.orientation = 0;
}

Piece.prototype = {
    spawn: function() {
        var self = this;
        var shapes = {
            square: function() {
                self.blocks = [self.board.getBlock(4, 2), self.board.getBlock(5, 2), self.board.getBlock(4, 3), self.board.getBlock(5, 3)];
            },
            bar: function() {
                self.blocks = [self.board.getBlock(3, 3), self.board.getBlock(4, 3), self.board.getBlock(5, 3), self.board.getBlock(6, 3)];
            },
            l: function() {
                self.blocks = [self.board.getBlock(4, 3), self.board.getBlock(4, 2), self.board.getBlock(5, 2), self.board.getBlock(6, 2)];
            },
            s: function() {
                self.blocks = [self.board.getBlock(4, 3), self.board.getBlock(5, 3), self.board.getBlock(5, 2), self.board.getBlock(6, 2)];
            },
            t: function() {
                self.blocks = [self.board.getBlock(4, 3), self.board.getBlock(5, 3), self.board.getBlock(6, 3), self.board.getBlock(5, 2)];
            }
        };
        var shape = util.randomKey(shapes);
        this.type = shape;
        shapes[shape]();
    },
    run: function() {
        if (this.checkLocked()) {
            this.lock();
        } else {
            this.fall();
        }
    },
    fall: function() {
        for (var i = this.blocks.length - 1; i >= 0; i--) {
            this.blocks[i] = this.board.getBlock(this.blocks[i].x, this.blocks[i].y + 1);
        }
    },
    lock: function() {
        for (var i = this.blocks.length - 1; i >= 0; i--) {
            this.blocks[i].locked = true;
        }
        this.locked = true;
    },
    paint: function() {
        for (var i = this.blocks.length - 1; i >= 0; i--) {
            this.blocks[i].paint(this.color);;
        }
    },
    checkLocked: function() {
        for (var i = this.blocks.length - 1; i >= 0; i--) {
            if (!this.board.getBlock(this.blocks[i].x, this.blocks[i].y + 1)) {
                return true;
            } else if(this.board.getBlock(this.blocks[i].x, this.blocks[i].y + 1).locked) {
                return true;
            }
        }
        return false;
    },
    rotate: function() {
        var self = this;
        var bar = function() {
                if (self.orientation === 0) {
                    self.blocks[0] = self.board.getBlock(self.blocks[0].x + 1, self.blocks[0].y - 3);
                    self.blocks[1] = self.board.getBlock(self.blocks[1].x, self.blocks[1].y - 2);
                    self.blocks[2] = self.board.getBlock(self.blocks[2].x - 1, self.blocks[2].y - 1);
                    self.blocks[3] = self.board.getBlock(self.blocks[3].x - 2, self.blocks[3].y);
                    self.orientation = 1;
                } else {
                    self.blocks[0] = self.board.getBlock(self.blocks[0].x - 1, self.blocks[0].y + 3);
                    self.blocks[1] = self.board.getBlock(self.blocks[1].x, self.blocks[1].y + 2);
                    self.blocks[2] = self.board.getBlock(self.blocks[2].x + 1, self.blocks[2].y + 1);
                    self.blocks[3] = self.board.getBlock(self.blocks[3].x + 2, self.blocks[3].y);
                    self.orientation = 0;
                }
            },
            l = function() {
                if (self.orientation === 0) {
                    self.blocks[0] = self.board.getBlock(self.blocks[0].x, self.blocks[0].y - 2);
                    self.blocks[1] = self.board.getBlock(self.blocks[1].x + 1, self.blocks[1].y - 1);
                    self.blocks[2] = self.board.getBlock(self.blocks[2].x, self.blocks[2].y);
                    self.blocks[3] = self.board.getBlock(self.blocks[3].x - 1, self.blocks[3].y + 1);
                    self.orientation = 1
                } else if (self.orientation === 1) {
                    self.blocks[0] = self.board.getBlock(self.blocks[0].x + 2, self.blocks[0].y + 1);
                    self.blocks[1] = self.board.getBlock(self.blocks[1].x + 1, self.blocks[1].y + 2);
                    self.blocks[2] = self.board.getBlock(self.blocks[2].x, self.blocks[2].y + 1);
                    self.blocks[3] = self.board.getBlock(self.blocks[3].x - 1, self.blocks[3].y);
                    self.orientation = 2
                } else if (self.orientation === 2) {
                    self.blocks[0] = self.board.getBlock(self.blocks[0].x - 1, self.blocks[0].y + 1);
                    self.blocks[1] = self.board.getBlock(self.blocks[1].x - 2, self.blocks[1].y);
                    self.blocks[2] = self.board.getBlock(self.blocks[2].x - 1, self.blocks[2].y - 1);
                    self.blocks[3] = self.board.getBlock(self.blocks[3].x, self.blocks[3].y - 2);
                    self.orientation = 3;
                } else if (self.orientation === 3) {
                    self.blocks[0] = self.board.getBlock(self.blocks[0].x - 1, self.blocks[0].y);
                    self.blocks[1] = self.board.getBlock(self.blocks[1].x, self.blocks[1].y - 1);
                    self.blocks[2] = self.board.getBlock(self.blocks[2].x + 1, self.blocks[2].y);
                    self.blocks[3] = self.board.getBlock(self.blocks[3].x + 2, self.blocks[3].y + 1);
                    self.orientation = 0;
                }
            },
            s = function() {
                if (self.orientation === 0) {
                    self.blocks[0] = self.board.getBlock(self.blocks[0].x, self.blocks[0].y - 2);
                    self.blocks[1] = self.board.getBlock(self.blocks[1].x - 1, self.blocks[1].y - 1);
                    self.blocks[3] = self.board.getBlock(self.blocks[3].x - 1, self.blocks[3].y + 1);
                    self.orientation = 1
                } else {
                    self.blocks[0] = self.board.getBlock(self.blocks[0].x, self.blocks[0].y + 2);
                    self.blocks[1] = self.board.getBlock(self.blocks[1].x + 1, self.blocks[1].y + 1);
                    self.blocks[3] = self.board.getBlock(self.blocks[3].x + 1, self.blocks[3].y - 1);
                    self.orientation = 0
                }
            },
            t = function() {
                if (self.orientation === 0) {
                    self.blocks[0] = self.board.getBlock(self.blocks[0].x, self.blocks[0].y - 2);
                    self.blocks[1] = self.board.getBlock(self.blocks[1].x - 1, self.blocks[1].y - 1);
                    self.blocks[2] = self.board.getBlock(self.blocks[2].x - 2, self.blocks[2].y);
                    self.orientation = 1
                } else if (self.orientation === 1) {
                    self.blocks[0] = self.board.getBlock(self.blocks[0].x + 2, self.blocks[0].y + 1);
                    self.blocks[1] = self.board.getBlock(self.blocks[1].x + 1, self.blocks[1].y);
                    self.blocks[2] = self.board.getBlock(self.blocks[2].x, self.blocks[2].y - 1);
                    self.blocks[3] = self.board.getBlock(self.blocks[3].x, self.blocks[3].y + 1);
                    self.orientation = 2
                } else if (self.orientation === 2) {
                    self.blocks[0] = self.board.getBlock(self.blocks[0].x - 1, self.blocks[0].y + 1);
                    self.blocks[2] = self.board.getBlock(self.blocks[2].x + 1, self.blocks[2].y - 1);
                    self.blocks[3] = self.board.getBlock(self.blocks[3].x - 1, self.blocks[3].y - 1);
                    self.orientation = 3;
                } else if (self.orientation === 3) {
                    self.blocks[0] = self.board.getBlock(self.blocks[0].x - 1, self.blocks[0].y);
                    self.blocks[1] = self.board.getBlock(self.blocks[1].x, self.blocks[1].y + 1);
                    self.blocks[2] = self.board.getBlock(self.blocks[2].x + 1, self.blocks[2].y + 2);
                    self.blocks[3] = self.board.getBlock(self.blocks[3].x + 1, self.blocks[3].y);
                    self.orientation = 0;
                }
            };

        if (this.type === 'bar') {
            bar();
        } else if (this.type === 'l') {
            l();
        } else if (this.type === 's') {
            s();
        } else if (this.type === 't') {
            t();
        }
    },
    left: function() {
        for (var i = this.blocks.length - 1; i >= 0; i--) {
            if (!this.board.getBlock(this.blocks[i].x - 1, this.blocks[i].y)) {
                return;
            } else if (this.board.getBlock(this.blocks[i].x - 1, this.blocks[i].y).locked) {
                return;
            }
        }
        for (var i = this.blocks.length - 1; i >= 0; i--) {
            this.blocks[i] = this.board.getBlock(this.blocks[i].x - 1, this.blocks[i].y);
        }
    },
    right: function() {
        for (var i = this.blocks.length - 1; i >= 0; i--) {
            if (!this.board.getBlock(this.blocks[i].x + 1, this.blocks[i].y)) {
                return;
            } else if (this.board.getBlock(this.blocks[i].x + 1, this.blocks[i].y).locked) {
                return;
            }
        }

        for (var i = this.blocks.length - 1; i >= 0; i--) {
            this.blocks[i] = this.board.getBlock(this.blocks[i].x + 1, this.blocks[i].y);
        }
    },
    down: function() {
        for (var i = this.blocks.length - 1; i >= 0; i--) {
            if (!this.board.getBlock(this.blocks[i].x, this.blocks[i].y + 1)) {
                return;
            } else if (this.board.getBlock(this.blocks[i].x, this.blocks[i].y + 1).locked) {
                return;
            }
        }

        for (var i = this.blocks.length - 1; i >= 0; i--) {
            this.blocks[i] = this.board.getBlock(this.blocks[i].x, this.blocks[i].y + 1);
        }
    }
};
