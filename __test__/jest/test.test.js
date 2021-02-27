import TestClass from '../test-class'

test('can listen on and fire', () => {
  const testObj = new TestClass()
  let count = 0
  testObj.on('inc', e => {
    count++
  })
  testObj.on('dec', e => {
    count++
  })
  testObj.inc()
  testObj.inc()
  testObj.dec()
  expect(count).toBe(3)
})


test('can listen on and off', () => {
  const testObj = new TestClass()
  let count = 0
  const h = testObj.on('inc', e => {
    count++
  })
  testObj.on('dec', e => {
    count++
  })
  testObj.inc()
  testObj.inc()
  h.remove()
  testObj.inc()
  testObj.dec()
  expect(count).toBe(3)
})
