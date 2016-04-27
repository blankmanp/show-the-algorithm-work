/*
* @Author: blankmanp
* @Date:   2016-04-08 17:18:53
* @Last Modified by:   blankmanp
* @Last Modified time: 2016-04-27 16:43:07
*/

'use strict';

function mergeSort(arr, canvas) {
    let len = arr.length;
    if (len <= 1) {
        return arr;
    }
    let num = Math.floor(len / 2);
    let left = mergeSort(arr.slice(0, num), canvas);
    let right = mergeSort(arr.slice(num), canvas);
    return merge(left, right, canvas);
}

function merge(left, right, canvas) {
    let l = 0;
    let r = 0;
    let result = [];
    while (l < left.length && r < right.length) {
        if (left[l] < right[r]) {
            result.push(left[l]);
            l ++;
        } else {
            result.push(right[r]);
            r ++;
        }
    }
    result.concat(left.slice(l));
    result.concat(right.slice(r));
    return result;
}