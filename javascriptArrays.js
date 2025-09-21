// Array methods and their explanations

var num = [1, 2, 3, 4];

// Returns the element at index 1 (second element)
// Output: 2
num.at(1)               

// Adds 5 to the end of the array
// Result: [1, 2, 3, 4, 5]
num.push(5)             

// Removes the last element from the array
// Result: [1, 2, 3, 4]
num.pop()               

// Fills all elements in the array with 1
// Result: [1, 1, 1, 1]
num.fill(1)             

// Removes the first element from the array
// Output: 1, Result: [1, 1, 1]
num.shift()             

// Adds 5 to the beginning of the array
// Result: [5, 1, 1, 1]
num.unshift(5)          

// Reverses the array in place
num.reverse()           

// Checks if the array includes the value 2
// Output: true or false
num.includes(2)         

// Creates a new array with each element multiplied by 2
num.map(item => item * 2)

// Creates a new array with elements greater than 2
num.filter(item => item > 2)

// Finds the first element greater than 2
num.find(item => item > 2)

// Finds the index of the first element equal to 2
num.findIndex(item => item === 2)

// Checks if every element is greater than 0
num.every(item => item > 0)

// Reduces the array to a single value by summing all elements
num.reduce((acc, item) => acc + item, 0)

// Converts the array to a string
num.toString()

// Joins all elements into a string separated by '*'
num.join('*')

// Changes elements starting at index 1, removes 2 elements, inserts 'h' and 'm'
// Example: [5, 1, 1, 1] -> [5, 'h', 'm', 1]
num.splice(1, 2, 'h', 'm')

// Returns a shallow copy of a portion of the array from index 1 to 3 (not including 3)
num.slice(1, 3)

// Sorts the array (default is lexicographical order)
num.sort()

// Sorts array x in ascending order
x.sort(function(a, b){return a - b})

// Sorts array x in descending order
x.sort(function(a, b){return b - a})

// Randomly shuffles array x
x.sort(function(a, b){return 0.5 - Math.random()})