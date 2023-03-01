export default function switchElems (arr: Array<any>, firstIndex: number, secondIndex: number) {
    const tmp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = tmp;
    return arr;
}