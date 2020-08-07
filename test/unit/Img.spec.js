import Img from 'wot-design/packages/img/index.js'
import { mount } from '@vue/test-utils'
import { testInstall } from './utils'

testInstall(Img)

describe('图片应该正确的渲染', () => {
  test('正确的默认渲染', () => {
    let wrapper = mount(Img)
    expect(wrapper.contains('.wd-img')).toBe(true)
  })

  test('应该渲染为圆形图片', () => {
    let wrapper = mount(Img, {
      propsData: {
        round: true
      }
    })
    expect(wrapper.contains('.round')).toBe(true)
  })
})
