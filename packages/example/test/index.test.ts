import { describe, expect, it } from 'vitest'
import { placeholder } from '../src/index'

describe('example', () => {
  it('placeholder returns expected value', () => {
    expect(placeholder()).toBe('example')
  })
})
