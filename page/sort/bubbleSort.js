/*
* @Author: pengyanxin
* @Date:   2016-04-07 21:48:05
* @Last Modified by:   pengyanxin
* @Last Modified time: 2016-04-07 21:50:20
*/

'use strict';

function bubbleSort(arr, canvas) {
    Util.drawArray(arr, canvas);
    let len = arr.length;
    let time = 1;
    for (let i = 0; i < len; i ++) {
        for (let j = 1; j < len - i; j ++) {
            if (arr[j - 1] > arr[j]) {
                [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
                Util.delayDrawArray(arr, canvas, 1000 * time ++);
            }
        }
    }
    return arr;
}