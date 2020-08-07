import Tabbar from 'wot-design/packages/tabbar/index.js'
import TabbarItem from 'wot-design/packages/tabbar-item/index.js'
import { mount } from '@vue/test-utils'
import { testInstall } from './utils'

testInstall(Tabbar)
testInstall(TabbarItem)

describe('标签栏应该正确的渲染', () => {
  test('正确渲染一栏3个标签', () => {
    let wrapper = mount(Tabbar, {
      propsData: {
        value: 1
      },
      slots: {
        default: `
                            <wd-tabbar-item icon="wd-icon-bags">服务</wd-tabbar-item>
                            <wd-tabbar-item icon="wd-icon-dong">咚咚</wd-tabbar-item>
                            <wd-tabbar-item icon="wd-icon-chat">我</wd-tabbar-item>
                        `
      }
    })
    const item = wrapper.findAll(TabbarItem)
    expect(item.at(1).is(TabbarItem)).toBe(true)
    expect(item.length).toBe(3)
    expect(item.at(0).find('.wd-tabbar-item__label').text()).toBe('服务')
    expect(wrapper.find('.is-active .wd-tabbar-item__label').text()).toBe('咚咚')
  })
  test('修改选中、未选中、角标的颜色', () => {
    let wrapper = mount(Tabbar, {
      propsData: {
        activeColor: 'rgb(100, 100, 100)',
        inactiveColor: 'rgb(150, 150, 150)',
        badgeColor: 'rgb(200, 200, 200)',
        value: 2
      },
      slots: {
        default: `
                            <wd-tabbar-item icon="wd-icon-bags" dot>服务</wd-tabbar-item>
                            <wd-tabbar-item icon="wd-icon-dong" :value="8">咚咚</wd-tabbar-item>
                            <wd-tabbar-item icon="wd-icon-chat" value="new">我</wd-tabbar-item>
                        `
      }
    })
    expect(wrapper.element.querySelector('.is-active').style.color).toBe('rgb(100, 100, 100)')
    expect(wrapper.element.querySelectorAll('.wd-tabbar-item')[0].style.color).toBe('rgb(150, 150, 150)')
    expect(wrapper.element.querySelector('sup').style.backgroundColor).toBe('rgb(200, 200, 200)')
  })
  test('测试事件', () => {
    const changeHandler = jest.fn(value => value)
    let wrapper = mount(Tabbar, {
      propsData: {
        activeColor: 'rgb(100, 100, 100)',
        value: 2
      },
      listeners: {
        click: changeHandler
      },
      slots: {
        default: `
                            <wd-tabbar-item icon="wd-icon-bags">服务</wd-tabbar-item>
                            <wd-tabbar-item icon="wd-icon-dong">咚咚</wd-tabbar-item>
                            <wd-tabbar-item icon="wd-icon-chat">我</wd-tabbar-item>
                        `
      }
    })
    const item = wrapper.findAll(TabbarItem)
    item.at(0).trigger('click')

    console.log(wrapper.find('.is-active .wd-tabbar-item__label').text())

    console.log(item.at(0).html())
  })
})
