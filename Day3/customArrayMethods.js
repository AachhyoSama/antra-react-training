// 1. Explain what is prototype and what is prototype chain in your own words.
// In JavaScript, simply put a prototype is an object through which other objects can inherit properties and methods from.

// Each object has a special internal link called [[Prototype]] which points to its prototype object.
// When you try to access a property or method on an object and it doesn't exist,
// JavaScript looks up the prototype chain to find it, continuing until the property is found or there are no more prototypes to check.
// This forms a chain using the prototype which is known as prototype chaining

// 2. Implement your versions of the following Array methods (choose 6).
// map, filter, reduce, every, find, includes, join, pop, push, reverse, slice, sort

const arr = [1, 2, 3, 4, 5, 6];

console.log("---------- custom map - myMap ----------------");
Array.prototype.myMap = function (cb) {
    let newArr = [];

    for (let i = 0; i < this.length; i++) {
        newArr.push(cb(this[i], i, this));
    }

    return newArr;
};

// use myMap on the original array
const arrAfterMap = arr.myMap((val) => {
    return val + 1;
});

console.log("Original Array: ", arr);
console.log("Array after map: ", arrAfterMap);

console.log("---------- custom filter - myFilter ----------------");
Array.prototype.myFilter = function (callbackFn) {
    let filteredItems = [];

    for (let i = 0; i < this.length; i++) {
        // push only items that satisfies callback function
        if (callbackFn(this[i], i, this)) {
            filteredItems.push(this[i]);
        }
    }

    return filteredItems;
};

// use myFilter on the original array
const arrAfterFilter = arr.myFilter((val) => {
    return val % 2 == 0;
});

console.log("Original Array: ", arr);
console.log("Array after filter: ", arrAfterFilter);

console.log("---------- custom find - myFind ----------------");
Array.prototype.myFind = function (callbackFn) {
    for (let i = 0; i < this.length; i++) {
        if (callbackFn(this[i], i, this)) {
            return this[i];
        }
    }

    // return undefined if no items found
    return undefined;
};

// use myFind on the original array
const myFindResult = arr.myFind((val) => {
    return val > 4;
});

console.log("Original Array: ", arr);
console.log("Item found: ", myFindResult);

console.log("---------- custom join - myJoin ----------------");
Array.prototype.myJoin = function (stringParam = ",") {
    joinedString = "";

    for (let i = 0; i < this.length; i++) {
        joinedString += this[i];
        if (i !== this.length - 1) {
            joinedString += stringParam;
        }
    }

    return joinedString;
};

// use myJoin on the original array
const resultString = arr.myJoin("+");

console.log("Original Array: ", arr);
console.log("String Result after myJoin: ", resultString);

console.log("---------- custom reduce - myReduce ----------------");
Array.prototype.myReduce = function (callback, initialValue) {
    // Check if the array is empty and no initial value is provided
    if (this.length === 0 && initialValue === undefined) {
        throw new TypeError("Reduce of empty array with no initial value");
    }

    let accumulator = initialValue !== undefined ? initialValue : this[0];
    let startIndex = initialValue !== undefined ? 0 : 1;

    for (let i = startIndex; i < this.length; i++) {
        accumulator = callback(accumulator, this[i], i, this);
    }

    // Return the final accumulated value
    return accumulator;
};

// use myReduce on the original array
const reducedResult = arr.myReduce(
    (accumulator, currentValue) => accumulator + currentValue,
    4
);

console.log("Original Array: ", arr);
console.log("String Result after myReduce: ", reducedResult);

console.log("---------- custom slice - mySlice ----------------");
Array.prototype.mySlice = function (startIndex, endIndex) {
    // Handle negative indices
    const arrayLength = this.length >>> 0;
    let start =
        startIndex >= 0 ? startIndex : Math.max(arrayLength + startIndex, 0);
    let end = endIndex !== undefined ? endIndex : arrayLength;

    // Create a new array to store the sliced elements
    const slicedArray = [];

    for (let i = start; i < end; i++) {
        slicedArray.push(this[i]);
    }

    // Return the sliced array
    return slicedArray;
};

// use mySlice on the original array
const slicedResult = arr.mySlice(4);
const slicedResult2 = arr.mySlice(-3);

console.log("Original Array: ", arr);
console.log("String Result after mySlice: ", slicedResult);
console.log(
    "String Result after mySlice with negative parameter: ",
    slicedResult2
);
