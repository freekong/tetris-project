export function generateRandom(min: number = 1, max: number = 7) {
  return Math.round(Math.random() * (max - min) + min)
}

/**
 * @description: 生成一个随机的类型
 * @return { string } type
 */
export const randomType = () => {
  const tetrominoArray: Array<string> = ['I', 'L', 'J', 'O', 'S', 'Z', 'T']
  const num: number = generateRandom()
  return tetrominoArray[num]
}

/**
 * @description: 生成一个随机的方向
 * @return { number } direction
 */
export const randomDirection = () => {
  let direction: number = generateRandom(1, 4)
  return direction
}