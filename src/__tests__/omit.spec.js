import omit from '../omit'

test('should omit keys', () => {
  expect(omit({ a: 'a', b: 'b', c: 'c' }, ['a','c'])).toEqual({ b: 'b' })
})
