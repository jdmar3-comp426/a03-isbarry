/**************************************************************************
 *
 * Functions as first-class citizens
 *
 **************************************************************************/

/**
 * Write and export a function named "repeat" that calls a given function
 *   over and over a specified number of times.
 *
 * @param fn      The function to repetitively call
 * @param n       The number of times to call the function
 * @param params  An array of parameters to pass to every function invocation
 * @return        Returns an array containing the return values obtained
 *                from calling the function
 */
 export const repeat = (fn, n, ...params) => {
    var return_array = []
    for(let i = 0; i < n; i++){
        return_array.push(fn(...params))
    }
    return return_array;

};


/**
 * Use the repeat function to log the string "Hello, world!" to the console
 *   10 times.
 */
export const repeatDemo = () => {
    
    var arr = repeat(print, 10, "Hello, world!");
    
    arr.forEach(function(entry) {
        console.log(entry);
      });
    
};


function print(message){
    return message;
}

/**************************************************************************
 *
 *   
 *
 **************************************************************************/

/**
 * Write and export a function named "multiplyBy" which takes a single number
 *   parameter "num1" and returns a function that takes a different number
 *   parameter "num2". The returned function should calculate and return the
 *   product of num1 and num2.
 */
export const multiplyBy = (num1) => {

    return function mult(num2){
        return num1 * num2
    }

};


/**
 * Use the multiplyBy function to create and export a function named
 *   "tenTimes" that multiplies a number by 10.
 */
export const tenTimes = multiplyBy(10);


/**
 * Write and export a function named "tenTimesFifty" which uses the tenTimes
 *   function to multiply 50 by 10 and returns the result.
 */
export const tenTimesFifty = () => {
    return tenTimes(50)
};

//console.log(tenTimesFifty());

/**************************************************************************
 *
 * Array callback filtering
 *
 **************************************************************************/

/**
 * Write and export a function named "everyEven" which takes an array and a test
 *   function for checking individual elements of the array. The "everyEven"
 *   function should test the even elements of the array and return true only
 *   if at least one of the even elements passes the test.
 *
 * @param arr   An array whose even elements should be tested
 * @param test  A function which takes as input a single element of the array
 *              and returns true or false, such that true means the element
 *              passed the test and false means it failed
 * @return      boolean true if at every even-indexed element passes the test
 *              function
 *
 * Example usage:
 *    everyEven([1, 5, 1, 0, 1], x => x === 1)  <--  returns true
 *    everyEven([1, 1, 0, 1, 1], x => x === 1)  <--  returns false
 */
export const everyEven = (arr, test) => {
    var index = 0;
    var passed_all = true;
    arr.forEach(element =>{
        if (index % 2 != 0){
            index++;
            return
        }else{
            if(test(element) == false){
                passed_all = false
            }
            index++;
        }
    })

    return passed_all;
};

//console.log(everyEven([1, 1, 0, 1, 1], x => x === 1));
/**
 * Write and export a function named "someEven" which takes an array and a test
 *   function for checking individual elements of the array. The "someEven"
 *   function should test the even elements of the array and return true only
 *   if at least one of the even elements passes the test.
 *
 * @param arr   An array whose even elements should be tested
 * @param test  A function which takes as input a single element of the array
 *              and returns true or false, such that true means the element
 *              passed the test and false means it failed
 * @return      boolean true if at least one even-indexed element passes the
 *              test function
 *
 * Example usage:
 *    someEven([4, 3, 2, 1, 0], x => x === 3)  <--  returns false
 *    someEven([1, 0, 1, 0, 1], x => x === 0)  <--  returns false
 *    someEven([1, 1, 1, 1, 0], x => x === 0)  <--  returns true
 *    someEven([0, 0, 0, 0, 0], x => x === 0)  <--  returns true
 */
export const someEven = (arr, test) => {
    var index = 0;
    var passed_one = false;
    arr.forEach(element =>{
        if (index % 2 != 0){
            index++;
            return
        }else{
            if(test(element) == true){
                passed_one = true
            }
            index++;
        }
    })

    return passed_one;
};

//console.log(someEven([1, 1, 1, 1, 0], x => x === 0));
/**
 * Write and export a function named "filter" which takes an array and a test
 *   function for checking individual elements of the array. The "filter"
 *   function should test the elements of the array and return true only
 *   if all of the odd elements pass the test.
 *
 * @param arr   An array whose elements should be tested
 * @param test  A function which takes as input a single element of the array
 *              and returns true or false, such that true means the element
 *              passes the test and false means it fails the test
 * @return      {fail: [], pass: []} an object with two keys: "pass" and "fail". The value
 *              of "pass" should be an array containing all the elements of arr
 *              which passed the test. The value of "fail" should be an array
 *              containing all the elements of arr which failed the test.
 *
 * Example usage:
 *    filter(['yes', 'nope', 'maybe', 'yellow'], x => x[0] === 'y')
 *       -->  { pass: ['yes', 'yellow'], fail: ['nope', 'maybe'] }
 *    filter([1, 90, 5, 31], x => x % 2 === 1)
 *       -->  { pass: [1, 5, 31], fail: [90] }
 */
export const filter = (arr, test) => {
    var index = 0;
    var test_obj = {pass: [], fail: []};
    arr.forEach(element =>{
      
        if(test(element) == true){
            test_obj.pass.push(element);
        }else{
            test_obj.fail.push(element);
        }            
    })
    if(test_obj.pass.length == 0){
        delete test_obj.pass;
    }
    if(test_obj.pass.length == 0){
        delete test_obj.fail;
    }
    

    return test_obj;


};

//console.log(filter(['yes', 'nope', 'maybe', 'yellow'], x => x[0] === 'y'))
/**
 * Write and export a function named "allEvensAreOdd" which takes as input an
 *   array and returns true only if all of the even elements in the array are
 *   odd numbers. Use the "everyEven" function in this function.
 */
export const allEvensAreOdd = (arr) => {
    return everyEven(arr,  x => x % 2 != 0)
};


/**
 * Write and export a function named "anEvenIsOdd" which takes as input an
 *   array and returns true if at least one of the even-indexed elements in the
 *   array is an odd number. Use the "someEven" function in this function.
 */
export const anEvenIsOdd = (arr) => {
    return someEven(arr,  x => x % 2 != 0)
};

//console.log(anEvenIsOdd([2, 1, 4, 1, 1]))

/**
 * Write and export a function named "hasExactly" which takes an array, a test
 *   function for checking individual elements of the array, and a number n.
 *   The "hasExactly" function should return true only if exactly n elements
 *   pass the test. You must use the filter function.
 */
export const hasExactly = (arr, test, n) => {
    var returned_obj = filter(arr, test);
    if (returned_obj.pass.length == n){
        return true;
    }

    return false
};

//console.log(hasExactly(['yes', 'nope', 'maybe', 'yellow'], x => x[0] === 'y', 2));