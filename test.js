function changeName(newName) {
  this.name = newName;
}

function createUser(name, age) {
  function changeName(newName) {
    changeName(newName);
  }
  return { name, age, changeName };
}

console.log(Math.floor(69 / 10) * 10 + 10);
