import { shallowMount } from '@vue/test-utils'
import HeaderLayout from '@/components/layouts/HeaderLayout.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const uid = 'CheckList'
    const wrapper = shallowMount(HeaderLayout, {
      props: { uid }
    })
    expect(wrapper.text()).toMatch(uid)
  })
})
