// Fake "ajax" that resolves between 350ms to 1s
export function ajax() {
  return new Promise((resolve) => {
    setTimeout(resolve, random(500, 2000))
  })
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}
