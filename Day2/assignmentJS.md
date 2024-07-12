## Day 2 - Javascript Assignment

#1. Why are closures useful in JavaScript? Give an example use case. 
>  
>Closure seems to be a very important concept in JavaScript. Closures in JavaScript is useful because it allow functions to retain access to their lexical scope, enabling encapsulation, private variables, and function factories. As a result, they are essential for asynchronous programming, the module pattern and maintaining state.
>
> This also means you can create functions with private variables, keep state across function calls, and make specialized functions that remember specific information.
> 
> One of the very important use of Closure is data encapsulation, privacy as in private data and providing controlled access to these data.
> 
> Let's see a simple bank account example.
> ```js
> function createBankAccount(initialBalance) {
>    let balance = initialBalance; // Private variable
>
>    return {
>        deposit: function(amount) {
>            balance += amount;
>       },
>        withdraw: function(amount) {
>            if (amount <= balance) {
>                balance -= amount;
>            }
>        },
>        getBalance: function() {
>            return balance;
>        }
>    };
> }
>
> const myAccount = createBankAccount(100);
>
> myAccount.deposit(50);    // Add $50 to the balance
> console.log(myAccount.getBalance()); // 150
>
> myAccount.withdraw(30);   // Remove $30 from the balance
> console.log(myAccount.getBalance()); // 120
>
> console.log(myAccount.balance); // undefined (balance is private)
> ```
>


#2. When should you choose to use “let” or “const”?
>
> In JavaScript, we use "let" and "const" to declare variables with block scope.
>
> If the variable needs to be reassigned or updated later after it has been declared, then in this case I would use "let". 
For example: in a loop, where the value is reassigned in each loop.
>
> Whereas, if the variable needs to be constant i.e it's value cannot be changed after it is declared, then in this case I will use "const".
 

#3. Give an example of a common mistake related to hoisting and explain how to fix it.
> 
> Hoisting is the default behaviour of JavaScript where variable and function declarations are moved to the top of their respective scopes during compilation. 
> An example of a common mistake to hoisting can be related to function hoisting and function expressions.
> Function declarations are fully hoisted where as function expressions are not hoisted in the same way.
>```js
>console.log(add(2, 3)); // Error: add is not a function
>
>var add = function(a, b) {
>    return a + b;
>};
>
>```
> To fix this issue, always declare and define functions before using them.


#4. What will the outcome of each console.log() be after the function calls? Why?
```js
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
```
> 
> Let's see the results one by one.
>
> 1. Output: `[1, 2, 3]`
>
> foo1 function has argument `arg` gets assigned the reference to the outer scope's `arr`. Inside the function, `.push()` with value 3 is pushing the 3 into the arr, which will result in arr with [1, 2, 3].
>
> 2. Output: `[1, 2, 3]`
>
> foo2 function takes arg as parameter, which refers to `arr` due to pass by reference. Inside foo2, new variable arg is assigned with value as `[1, 2, 3, 4]`. This doesnot affect the original `arr` outside foo2. Hence, the console logs the original `arr` which is `[1, 2, 3]`.
>
> 3. Output: `[1, 2, 3, 3]` 
>
> Similar to above, foo3 takes arg as parameter referring to `arr` passed by reference. Inside foo3, local variable b is declared and initialized to arg, which is reference to `arr`. Then, this reference has value of 3 pushed to it which results in `[1, 2, 3, 3]`.
>
> 4. Output: `[1, 2, 3, 3]`
> 
>Similar to answer 2, foo4 function takes arg as parameter, which refers to `arr` due to pass by reference. Inside foo4, new variable arg is assigned with value as `[1, 2, 3, 4]`. This doesnot affect the original `arr` outside foo4. Hence, the console logs the original `arr` which has become `[1, 2, 3, 3]` after foo3.
>