var util = {
    getRandomInt: function(min, max) {
        return Math.floor((Math.random() * (max - min)) + min);
    },
    getRandomColor: function() {
        var colors = {
            white: '#FFF',
            magenta: '#F0F',
            cyan: '#0FF',
            yellow: '#FF0'
        };

        return colors[this.randomKey(colors)];
    },
    randomKey: function (obj) {
        var keys = Object.keys(obj)
        return keys[ keys.length * Math.random() << 0];
    }
};
