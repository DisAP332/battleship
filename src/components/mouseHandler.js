let values = [];
let cords = [];
let ShipPositions = [];
let cord;
let ship = 1;
let shipSize;
let max;
let axis = 'x';

function check() {
  if (ShipPositions.length < 5) { return true; }
  for (let i = 0; i <= (values.length - 1); i++) {
    for (let y = 0; y <= (ShipPositions.length - 1); y++) {
      if (values[i] === ShipPositions[y]) {
        return false;
      }
    }
  }
  return true;
}

function mouseHandler(value, event) {
  if (event === 'reset') {
    ShipPositions = [];
    ship = 1;
    for (let i = 1; i <= 100; i++) {
      cord = document.getElementById(`placeHolder${[i]}`);
      cord.setAttribute('style', '');
    }
  }
  if (event === 'mouseover') {
    if (values.length > 0) {
      for (let y = 0; y <= (values.length - 1); y++) {
        if (values[y] <= 100) {
          if (axis === 'x') {
            cord = document.querySelector(`#grid :nth-child(${values[y]})`);
            cord.setAttribute('style', '');
          } else if (axis === 'y' && ((values[0]) + (y * 10)) <= 100) {
            cord = document.querySelector(`#grid :nth-child(${(values[0]) + (y * 10)})`);
            cord.setAttribute('style', '');
          }
        }
      }
    }
    cords = [];
    if (ship === 1) {
      shipSize = 5;
      values = [];
      for (let i = 0; i <= (shipSize - 1); i++) {
        if (axis === 'x') {
          values.push((Number(value) + i));
        } else { values.push((Number(value) + (i * 10))); }
      }
    }

    if (ship === 2) {
      shipSize = 4;
      values = [];
      for (let i = 0; i <= (shipSize - 1); i++) {
        if (axis === 'x') {
          values.push((Number(value) + i));
        } else { values.push((Number(value) + (i * 10))); }
      }
    }
    if (ship === 3) {
      shipSize = 3;
      values = [];
      for (let i = 0; i <= (shipSize - 1); i++) {
        if (axis === 'x') {
          values.push((Number(value) + i));
        } else { values.push((Number(value) + (i * 10))); }
      }
    }
    if (ship === 4) {
      shipSize = 3;
      values = [];
      for (let i = 0; i <= (shipSize - 1); i++) {
        if (axis === 'x') {
          values.push((Number(value) + i));
        } else { values.push((Number(value) + (i * 10))); }
      }
    }
    if (ship === 5) {
      shipSize = 2;
      values = [];
      for (let i = 0; i <= (shipSize - 1); i++) {
        if (axis === 'x') {
          values.push((Number(value) + i));
        } else { values.push((Number(value) + (i * 10))); }
      }
    }
    for (let i = 0; i <= (values.length - 1); i++) {
      if (axis === 'x') {
        cord = document.querySelector(`#grid :nth-child(${values[i]})`);
        max = (((Math.floor((values[0] - 1) * 0.10)) + 1) * 10);
        if ((values[0] + (shipSize - 1)) > max) {
          if (values[i] > max && !check()) {} else if (values[i] <= max) { cord.setAttribute('style', 'background-color:red;'); }
        } else {
          cord.setAttribute('style', 'background-color:yellow;');
        }
      } else if (axis === 'y') {
        cord = document.querySelector(`#grid :nth-child(${(values[0]) + (i * 10)})`);
        if ((values[0] + ((shipSize - 1) * 10)) > 100) {
          if (((values[0]) + (i * 10)) <= 100) { cord.setAttribute('style', 'background-color: red'); }
        } else {
          cord.setAttribute('style', 'background-color: yellow;');
        }
      }
    }
  }
  if (event === 'click') {
    if (check()) {
      for (let i = 0; i <= (values.length - 1); i++) {
        cord = document.getElementById(`placeHolder${values[i]}`);
        max = (((Math.floor((values[0] - 1) * 0.10)) + 1) * 10);
        if (axis === 'x') {
          if ((values[0] + (shipSize - 1)) <= max) {
            cord.setAttribute('style', 'background-color:blue;');
            ShipPositions.push(values[i]);
            if (i === (values.length - 1)) {
              ship++;
            }
          }
        } else if ((values[0] + ((shipSize - 1) * 10)) < 100) {
          cord.setAttribute('style', 'background-color: blue;');
          ShipPositions.push(values[i]);
          if (i === (values.length - 1)) {
            ship++;
          }
        }
      }
    }
  }
  if (event === 'axis') {
    if (axis === 'x') {
      axis = 'y';
      for (let i = 1; i <= 100; i++) {
        cord = document.querySelector(`#grid :nth-child(${[i]})`);
        cord.setAttribute('style', '');
      }
    } else {
      axis = 'x';
      for (let i = 1; i <= 100; i++) {
        cord = document.querySelector(`#grid :nth-child(${[i]})`);
        cord.setAttribute('style', '');
      }
    }
  }
}
export { ShipPositions };

export { mouseHandler };
