export default function switchElems (arr: Array<any>, firstIndex: number, secondIndex: number) {
    const tmp = arr[firstIndex];
    // console.log('sec', arr[secondIndex]);
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = tmp;
    // console.log('tmp', tmp);
    // console.log('func', arr);
    return arr;
}