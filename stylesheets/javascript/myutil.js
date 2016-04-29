/*
* @Author: pengyanxin
* @Date:   2016-04-07 15:14:36
* @Last Modified by:   blankmanp
* @Last Modified time: 2016-04-30 00:33:47
* @Last Modified by:   blankmanp
* @Last Modified time: 2016-04-07 22:05:12
*/

// use ES5

'use strict';

var Util = {
    len: 5, // the length of array [just consider sort function]
    delayTime: 1000, // the animate delay time
    initArrayCanvas: function (arr, canvas) {
        var width = canvas.width < 150 ? canvas.width : 150,
            ctx = canvas.getContext('2d');
        this.len = arr.length;
        var itemWidth = width / this.len;
        for (var i = 0; i < this.len; i ++) {
            ctx.strokeStyle = 'black';
            ctx.strokeRect(itemWidth * i, 2, itemWidth, itemWidth);
            ctx.font = '10px Arial';
            ctx.fillText(arr[i], itemWidth * (i + 0.5), 20 + itemWidth * 0.5);
        }
    }, // try to change the way of showing the array
    drawArray: function (arr, canvas) {
        var width = canvas.width,
            height = canvas.height,
            len = arr.length,
            lineWidth = width / len,
            lineHeight = (height - 30) / 100,
            ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, width, height);
        for (var i = 0; i < len; i++) {
            var y = arr[i] * lineHeight;
            var xBefore = lineWidth * i;
            ctx.fillStyle = '#dddddd';
            ctx.fillRect(xBefore, 30, lineWidth - 1, y);
            ctx.font = "30px Georigia";
            ctx.fillText(arr[i], xBefore, 30);
        }
    },
    delayDrawArray: function (arr, canvas, delay) {
        var temp = arr.slice(),
            delayTime = delay || 1000;
        setTimeout(function (arr, canvas) {
            Util.drawArray(arr, canvas);
        }.bind(this, temp, canvas), delayTime);
    }
}