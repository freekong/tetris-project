export function generateRandom(min: number = 1, max: number = 7) {
  return Math.round(Math.random() * (max - min) + min)
}