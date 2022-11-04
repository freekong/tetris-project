export interface coord {
  row: number,
  col: number
}

export function mapTetrominoI (row: number, col: number, direction: number) {
  let changedMapArray: Array<coord> = []
  switch (direction) {
    case 1:
      changedMapArray = [
        { row: row - 2, col },
        { row: row - 1, col },
        { row, col },
        { row: row + 1, col }
      ]
      break;
    case 2:
      changedMapArray = [
        { row, col: col - 1 },
        { row, col },
        { row, col: col + 1 },
        { row, col: col + 2 }
      ]
      break;
    case 3:
      changedMapArray = [
        { row: row - 1, col },
        { row, col },
        { row: row + 1, col },
        { row: row + 2, col }
      ]
      break;
    case 4:
      changedMapArray = [
        { row, col: col - 2 },
        { row, col: col - 1 },
        { row, col },
        { row, col: col + 1 }
      ]
      break;
    default:
      break;
  }
  return changedMapArray
}

export function mapTetrominoL(row: number, col: number, direction: number) {
  let changedMapArray: Array<coord> = []
  switch (direction) {
    case 1:
      changedMapArray = [
        { row: row - 1, col },
        { row, col },
        { row: row + 1, col },
        { row: row + 1, col: col + 1 }
      ]
      break;
    case 2:
      changedMapArray = [
        { row, col: col + 1 },
        { row, col },
        { row, col: col - 1 },
        { row: row + 1, col: col - 1}
      ]
      break;
    case 3:
      changedMapArray = [
        { row: row + 1, col },
        { row, col },
        { row: row - 1, col },
        { row: row - 1, col: col - 1}
      ]
      break;
    case 4:
      changedMapArray = [
        { row, col: col -1 },
        { row, col },
        { row, col: col + 1},
        { row: row - 1, col: col + 1}
      ]
      break
    default:
      break;
  }
  return changedMapArray
}

export function mapTetrominoJ(row: number, col: number, direction: number) {
  let changedMapArray: Array<coord> = []
  switch (direction) {
    case 1:
      changedMapArray = [
        { row: row - 1, col },
        { row, col },
        { row: row + 1, col },
        { row: row + 1, col: col - 1 }
      ]
      break;
    case 2:
      changedMapArray = [
        { row, col: col + 1 },
        { row, col },
        { row, col: col - 1 },
        { row: row - 1, col: col - 1}
      ]
      break;
    case 3:
      changedMapArray = [
        { row: row + 1, col },
        { row, col },
        { row: row - 1, col },
        { row: row - 1, col: col + 1}
      ]
      break;
    case 4:
      changedMapArray = [
        { row, col: col -1 },
        { row, col },
        { row, col: col + 1},
        { row: row + 1, col: col + 1}
      ]
      break
    default:
      break;
  }
  return changedMapArray
}

export function mapTetrominoO(row: number, col: number, direction: number) {
  let changedMapArray: Array<coord> = []
  switch (direction) {
    case 1:
      changedMapArray = [
        { row: row - 1, col },
        { row: row - 1, col: col + 1 },
        { row, col: col + 1 },
        { row, col }
      ]
      break;
    case 2:
      changedMapArray = [
        { row, col },
        { row, col: col + 1 },
        { row: row + 1, col: col + 1 },
        { row: row + 1, col}
      ]
      break;
    case 3:
      changedMapArray = [
        { row, col: col - 1 },
        { row, col },
        { row: row + 1, col },
        { row: row + 1, col: col - 1 }
      ]
      break;
    case 4:
      changedMapArray = [
        { row: row - 1, col: col -1 },
        { row: row - 1, col },
        { row, col },
        { row, col: col - 1 }
      ]
      break
    default:
      break;
  }
  return changedMapArray
}

export function mapTetrominoS(row: number, col: number, direction: number) {
  let changedMapArray: Array<coord> = []
  switch (direction) {
    case 1:
      changedMapArray = [
        { row: row - 1, col },
        { row, col },
        { row, col: col + 1 },
        { row: row + 1, col: col + 1 },
      ]
      break;
    case 2:
      changedMapArray = [
        { row, col: col + 1 },
        { row, col },
        { row: row + 1, col },
        { row: row + 1, col: col - 1 }
      ]
      break;
    case 3:
      changedMapArray = [
        { row: row + 1 , col },
        { row, col },
        { row, col: col - 1 },
        { row: row + 1, col: col - 1}
      ]
      break;
    case 4:
      changedMapArray = [
        { row: row - 1, col: col + 1 },
        { row: row - 1, col },
        { row, col },
        { row, col: col - 1 }
      ]
      break
    default:
      break;
  }
  return changedMapArray
}

export function mapTetrominoZ(row: number, col: number, direction: number) {
  let changedMapArray: Array<coord> = []
  switch (direction) {
    case 1:
      changedMapArray = [
        { row: row - 1, col: col - 1 },
        { row: row - 1, col },
        { row, col },
        { row, col: col + 1 },
      ]
      break;
    case 2:
      changedMapArray = [
        { row: row - 1, col: col + 1 },
        { row, col: col + 1 },
        { row, col },
        { row: row + 1, col }
      ]
      break;
    case 3:
      changedMapArray = [
        { row: row + 1, col: col + 1 },
        { row: row + 1, col },
        { row, col },
        { row, col: col - 1}
      ]
      break;
    case 4:
      changedMapArray = [
        { row: row + 1, col: col - 1 },
        { row, col: col - 1 },
        { row, col },
        { row: row - 1, col}
      ]
      break
    default:
      break;
  }
  return changedMapArray
}

export function mapTetrominoT(row: number, col: number, direction: number) {
  let changedMapArray: Array<coord> = []
  switch (direction) {
    case 1:
      changedMapArray = [
        { row: row - 1, col: col - 1 },
        { row: row - 1, col },
        { row: row - 1, col: col + 1 },
        { row, col },
      ]
      break;
    case 2:
      changedMapArray = [
        { row: row - 1, col: col + 1 },
        { row, col: col + 1 },
        { row: row + 1, col: col + 1 },
        { row, col }
      ]
      break;
    case 3:
      changedMapArray = [
        { row: row + 1, col: col + 1 },
        { row: row + 1, col },
        { row: row + 1, col: col - 1},
        { row, col },
      ]
      break;
    case 4:
      changedMapArray = [
        { row: row + 1, col: col - 1 },
        { row, col: col - 1 },
        { row: row - 1, col: col - 1 },
        { row, col },
      ]
      break
    default:
      break;
  }
  return changedMapArray
}

/**
 * @description: 判断是否可以移动
 * @param { String } type [判断左边界还是有边界]
 * @return void 
 */
export function moveable (type: String, changedMapArray: Array<coord>) {
  let moveBool: boolean = true
  for (let i = 0; i < changedMapArray.length; i++) {
    const item = changedMapArray[i];
    if (type === 'left') {
      if (item.col <= 0 ) {
        moveBool = false
        break
      }
    } else {
      if (item.col >= 9) {
        moveBool = false
        break
      }
    }
  }

  return moveBool
}