/**
 *
 * minimizing on `-1`, neutral on `0`, and maximizing on `1`
 */
type GetSearchDirection<Comparable> = (item: Comparable) => -1 | 0 | 1;

const binarySearch = <Comparable>(
  arr: Comparable[],
  getSearchDirection: GetSearchDirection<Comparable>,
  isMinimizing: boolean
) => {
  let minIdx = 0;
  let maxIdx = arr.length - 1;
  let targetIdx = -1;
  while (minIdx <= maxIdx) {
    const midIdx = Math.floor((minIdx + maxIdx) / 2);
    switch (getSearchDirection(arr[midIdx])) {
      case -1:
        maxIdx = midIdx - 1;
        break;
      case 0:
        targetIdx = midIdx;
        if (isMinimizing) {
          maxIdx = midIdx - 1;
        } else {
          minIdx = midIdx + 1;
        }
        break;
      case 1:
        minIdx = midIdx + 1;
    }
  }
  return targetIdx;
};

export const binarySearchMinimizing = <Comparable>(
  arr: Comparable[],
  getSearchDirection: GetSearchDirection<Comparable>
) => binarySearch(arr, getSearchDirection, true);

export const binarySearchMaximizing = <Comparable>(
  arr: Comparable[],
  getSearchDirection: GetSearchDirection<Comparable>
) => binarySearch(arr, getSearchDirection, false);
