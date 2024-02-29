//sort function
const sortAscending = (arr) => {
  const sortedArr = [];
  const toSortArr = [];
  // console.log(arr);
  arr.map((element, index) => {
    // console.log(element);
    let { name } = element[`${Object.keys(element)[0]}`];
    let employee = `${Object.keys(element)[0]}`;
    toSortArr.push({ name, employee, originalIndex: index });
    return 0;
  });

  // sort array here
  toSortArr.sort((a, b) => {
    // console.log(a);
    if (!a.name || !b.name) {
      return -1;
    }
    const nameA = a.name.toLowerCase() || null;
    const nameB = b.name.toLowerCase() || null;
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  console.log(toSortArr);

  //format sorted array to original array format

  toSortArr.map((element) => {
    let { originalIndex } = element;
    sortedArr.push(arr[originalIndex]);
    return 0;
  });
  return sortedArr;
};

//search function
// sortDescending(arr);
// console.log(sortDescending(arr));
export { sortAscending };
