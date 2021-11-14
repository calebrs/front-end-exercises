function delayLog() {
  for (let count = 1; count <= 10; count += 1) {
    let logger = createLogger(count);
    setTimeout(logger, 1000 * count);
  }
}

function createLogger(num) {
  return function() {
    console.log(num);
  }
}

// delayLog();

// g, f, d, z, n, s, q

function afterNSeconds(func, seconds) {
  setTimeout(func, seconds * 1000);
}

let countId;

function startCounting() {
  let count = 0;
  countId = setInterval(() => {
    count += 1;
    console.log(count);
  }, 1000);
}

function stopCounting() {
  clearInterval(countId);
}

startCounting();