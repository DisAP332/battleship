console.log("heyo");

function delay() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("waited");
      resolve(); // Resolve the promise after the timeout
    }, 300);
  });
}

await delay();
console.log("after");

setTimeout(() => {
  console.log("targets reset");
}, 100);
