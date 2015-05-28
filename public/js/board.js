function Board() {
    this.blocks = [];
    this.dom = this.createDOM();
}

Board.prototype = {
    createDOM: function() {
        var board = document.querySelector('.board');

        for (var i = 0; i < 25; i++) {
            var row = document.createElement('div');

            row.className = 'row';
            board.appendChild(row);
            for(var j = 0; j < 10; j++) {
                var column = document.createElement('div');

                column.className = 'column';
                if (i < 4) {
                    column.style.background = '#CCC';
                } else {
                    column.style.background = '#000';
                }
                row.appendChild(column);
                this.blocks.push(new Block(j, i, column));
            }
        }
        return board;
    },
    addBlock: function(block) {
        this.blocks.push(block);
    },
    getBlock: function(x, y) {
        for (var i = this.blocks.length - 1; i >= 0; i--) {
            if (this.blocks[i].x === x && this.blocks[i].y === y) {
                return this.blocks[i];
            }
        }
    },
    getBlockIfNotLocked: function(x, y) {
        var block = this.getBlock(x, y);
        if (block && !block.locked) {
            return block;
        }
    },
    run: function() {
        if (!this.piece || this.piece.locked) {
            this.piece = new Piece(this);
        }
        this.piece.run();
        this.checkForLineFill();
        if (this.checkEndOfGame()) {
            stopLoop();
        }
    },
    paint: function() {
        for (var i = this.blocks.length - 1; i >= 0; i--) {
            if (!this.blocks[i].locked) {
                if (this.blocks[i].y < 4) {
                    this.blocks[i].paint('#CCC')
                } else {
                    this.blocks[i].paint('#000');
                }
            }
        }
        this.piece.paint();
    },
    checkForLineFill: function() {
        for (var y = 4; y < 25; y++) {
            var fill = true;
            for (var x = 0; x < 10; x++) {
                if (this.getBlockIfNotLocked(x, y)) {
                    fill = false;
                }
            }
            if (fill) {
                this.emptyLine(y);
            }
        }
    },
    emptyLine: function(y) {
        for (var x = 0; x < 10; x++) {
            for (var line = y - 1; line > 3; line--) {
                if (!this.getBlock(x, line).locked) {
                    this.getBlock(x, line + 1).locked = false;
                    break;
                }

                this.getBlock(x, line + 1).paint(this.getBlock(x, line).dom.style.background);
            }
        }
    },
    checkEndOfGame: function() {
        return this.piece.locked && this.piece.insideSpawnZone();
    },
    keyPressed: function(keyCode) {
        console.log(keyCode);
        if (keyCode === 37) {
            this.piece.left();
        } else if (keyCode === 38) {
            this.piece.rotate();
        } else if (keyCode === 39) {
            this.piece.right();
        } else if (keyCode === 40) {
            this.piece.down();
        } else if (keyCode === 82) {
            restart();
        }
        this.paint();
    },
    clear: function() {
        this.piece = undefined;
        for (var i = this.blocks.length - 1; i >= 0; i--) {
            this.blocks[i].clear();
        }
    }
};
