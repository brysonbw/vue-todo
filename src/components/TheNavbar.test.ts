import Vuetify from 'vuetify';
import Vue from 'vue';
import TheNavbar from '../components/TheNavbar.vue';
import { createLocalVue, shallowMount } from '@vue/test-utils';

describe('<TheNavbar />', () => {
  const localVue = createLocalVue();
  let vuetify: Vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
  });

  it('renders <TheNavbar />', () => {
    const wrapper = shallowMount(TheNavbar);
    const navElement = wrapper.find('nav');
    expect(navElement.exists()).toBe(true);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders <a> tag (github link)', () => {
    const wrapper = shallowMount(TheNavbar);
    const a = wrapper.find('a');
    expect(a.exists()).toBe(true);
  });

  it('renders <a> tag href (vue-todo repo url)', () => {
    const wrapper = shallowMount(TheNavbar);
    const a = wrapper.find('a');

    expect(a.attributes().href).toBe('https://github.com/brysonbw/vue-todo');
  });

  it('renders v-icon text', () => {
    const wrapper = shallowMount(TheNavbar, {
      localVue,
      vuetify,
    });
    const icon = wrapper.findComponent({ name: 'v-icon' });

    // expect material icon text within v-icon
    expect(icon.text()).toBe('mdi-github');
  });

  it('renders v-toolbar-title text', () => {
    const wrapper = shallowMount(TheNavbar, {
      localVue,
      vuetify,
    });
    const toolbar = wrapper.findComponent({ name: 'v-toolbar-title' });

    expect(toolbar.text()).toBe('Vue Todo');
  });
});
