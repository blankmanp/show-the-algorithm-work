/*
* @Author: pengyanxin
* @Date:   2016-04-06 12:43:24
* @Last Modified by:   pengyanxin
* @Last Modified time: 2016-04-06 21:46:39
*/

'use strict';

let Util = {
    draw: function (arr, canvas) {
        let width = canvas.width;
        let height = canvas.height;
        let len = arr.length;
        let lineWidth = width / len;
        let lineHeight = height / 100;
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < len; i ++) {
            let y = arr[i] * lineHeight;
            let xBefore = lineWidth * i;
            ctx.fillStyle = '#dddddd';
            ctx.fillRect(xBefore, 20, lineWidth - 1, y);
            ctx.font = "30px Georigia";
            ctx.fillText(arr[i], xBefore, 20);
        }
    }
};

let Sort = {
    bubble: function (arr, canvas) {
        Util.draw(arr, canvas);
        let len = arr.length;
        let time = 1;
        for (let i = 1; i < len; i ++) {
            let key = arr[i];
            let j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                arr[j] = key;
                j --;
                // deep clone the arr
                let temp = arr.slice();
                setTimeout(function(arr, canvas) { Util.draw( arr, canvas ) }.bind(this, temp, canvas), 1000 * time ++);
            }
        }
        return arr;
    }
}