import { sum } from '.'

describe('Sum', () => {
  it('Sum a and b', () => {
    const result = sum(2, 3)
    expect(result).toBe(5)
  })
})
