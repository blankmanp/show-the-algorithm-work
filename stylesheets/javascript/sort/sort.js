/*
* @Author: pengyanxin
* @Date:   2016-04-06 12:43:24
* @Last Modified by:   pengyanxin
* @Last Modified time: 2016-04-06 21:46:39
*/

'use strict';

var Util = {
    draw: function draw(arr, canvas) {
        var width = canvas.width;
        var height = canvas.height;
        var len = arr.length;
        var lineWidth = width / len;
        var lineHeight = height / 100;
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, width, height);
        for (var i = 0; i < len; i++) {
            var y = arr[i] * lineHeight;
            var xBefore = lineWidth * i;
            ctx.fillStyle = '#dddddd';
            ctx.fillRect(xBefore, 20, lineWidth - 1, y);
            ctx.font = "30px Georigia";
            ctx.fillText(arr[i], xBefore, 20);
        }
    }
};

var Sort = {
    bubble: function bubble(arr, canvas) {
        Util.draw(arr, canvas);
        var len = arr.length;
        var time = 1;
        for (var i = 1; i < len; i++) {
            var key = arr[i];
            var j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                arr[j] = key;
                j--;
                // deep clone the arr
                var temp = arr.slice();
                setTimeout(function (arr, canvas) {
                    Util.draw(arr, canvas);
                }.bind(this, temp, canvas), 1000 * time++);
            }
        }
        return arr;
    }
};