const obj = {
  a: 10,
  b: 234
}

const obj2 = {
  c: 'Hel',
  d: 'Whattup'
}

console.log('Loaded', { ...obj, ...obj2 });