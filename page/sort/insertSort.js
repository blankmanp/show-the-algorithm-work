/*
* @Author: pengyanxin
* @Date:   2016-04-07 15:13:59
* @Last Modified by:   pengyanxin
* @Last Modified time: 2016-04-07 15:18:49
*/

'use strict';

function insertSort(arr, canvas) {
    Util.drawArray(arr, canvas);
    let len = arr.length;
    let time = 1;
    for (let i = 1; i < len; i ++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            arr[j] = key;
            j --;
            Util.delayDrawArray(arr, canvas, 1000 * time ++);
        }
    }
    return arr;
}