/*
* @Author: pengyanxin
* @Date:   2016-04-07 15:14:18
* @Last Modified by:   pengyanxin
* @Last Modified time: 2016-04-07 15:23:56
*/

'use strict';

function selectSort(arr, canvas) {
    Util.drawArray(arr, canvas);
    let len = arr.length;
    let time = 1;
    for (let i = 0; i < len; i ++) {
        let min = i;
        for (let j = i + 1; j < len; j ++) {
            if (arr[min] > arr[j])
                min = j;
        }
        [arr[i], arr[min]] = [arr[min], arr[i]];
        Util.delayDrawArray(arr, canvas, 1000 * time ++);
    }
    return arr;
}