const arr = [1, 2];
function foo1(arg) {
    arg.push(3);
}
foo1(arr);
console.log(arr);

function foo2(arg) {
    arg = [1, 2, 3, 4];
}
foo2(arr);
console.log(arr);

function foo3(arg) {
    let b = arg;
    b.push(3);
}
foo3(arr);
console.log(arr);

function foo4(arg) {
    let b = arg;
    b = [1, 2, 3, 4];
}
foo4(arr);
console.log(arr);
