/**
 * @jest-environment jsdom
 */
import { JSDOM } from 'jsdom'

import Barevich from './index'

describe('Test Barevich class', () => {
  it('+++ Should be init with params', () => {
    const jsdom = new JSDOM()
    const node = jsdom.window.document.createElement('div')

    node.setAttribute('id', 'test')

    const MOCK_DATA = [{
      items: [
        {
          key: 'lol',
          value: 41,
          color: 'aqua'
        }
      ]
    }]

    const MOCK_PARAMS = {
      node,
      data: MOCK_DATA,
      width: 600,
      height: 300
    }

    const bar = new Barevich(MOCK_PARAMS)

    bar.init()

    expect(bar.init).toBeCalled()
  })
})
