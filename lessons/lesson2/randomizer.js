/*
Problem:
input: an unkown number of callback functions
output: call the callbacks at a random point in time

mental model: iterate through the input functions and call the set timeout with a random time for the number arg


Examples:
SEE CODE


Data structures / Algorithm:
delcare funciton as asynconous
capture inputs as an array
randomTimeout = Math.floor (length of input array * 2) * Math.random() + 1

iterate through the array of callbacks on each
  declare function = await callback()

  setTimeout (func, time)



*/





function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

function randomizer(...callbacks) {
  let count = 0;

  let counter = setInterval(() => {
    count += 1;
    console.log(count);

    if (count >= callbacks.length * 2) {
      clearInterval(counter);
    }
  }, 1000);
  

  for (let index = 0; index < callbacks.length; index += 1) {
    let currentFunc = callbacks[index];
    let randomTimeout = Math.floor(Math.random() * (callbacks.length * 2) + 1);
    setTimeout(currentFunc, randomTimeout * 1000);
  }
}

randomizer(callback1, callback2, callback3);

// Output:
// 1
// 2
// "callback2"
// 3
// "callback3"
// 4
// 5
// "callback1"
// 6