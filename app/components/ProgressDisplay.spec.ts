import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ProgressDisplay from './ProgressDisplay.vue'; // Adjust the path to your component

describe('ProgressDisplay Component', () => {
  describe('totaltime computed property', () => {
    it('formats time correctly for whole minutes', () => {
      const wrapper = mount(ProgressDisplay, {
        props: {
          total: 120,
          completed: 60
        }
      });
      
      expect(wrapper.text()).toContain('2:00');
    });

    it('formats time correctly with seconds', () => {
      const wrapper = mount(ProgressDisplay, {
        props: {
          total: 125,
          completed: 60
        }
      });
      
      expect(wrapper.text()).toContain('2:05');
    });

    it('handles zero total time', () => {
      const wrapper = mount(ProgressDisplay, {
        props: {
          total: 0,
          completed: 0
        }
      });
      
      expect(wrapper.text()).toContain('0:00');
    });

    it('handles less than one minute', () => {
      const wrapper = mount(ProgressDisplay, {
        props: {
          total: 45,
          completed: 20
        }
      });
      
      expect(wrapper.text()).toContain('0:45');
    });

    it('handles large time values', () => {
      const wrapper = mount(ProgressDisplay, {
        props: {
          total: 3665, // 61 minutes and 5 seconds
          completed: 1000
        }
      });
      
      expect(wrapper.text()).toContain('61:05');
    });
  });

  describe('width computed property', () => {
    it('calculates 0% when completed is 0', () => {
      const wrapper = mount(ProgressDisplay, {
        props: {
          total: 100,
          completed: 0
        }
      });
      
      const progressFill = wrapper.find('.progress-fill');
      expect(progressFill.attributes('style')).toContain('width: 0%');
    });

    it('calculates 50% when half completed', () => {
      const wrapper = mount(ProgressDisplay, {
        props: {
          total: 100,
          completed: 50
        }
      });
      
      const progressFill = wrapper.find('.progress-fill');
      expect(progressFill.attributes('style')).toContain('width: 50%');
    });

    it('calculates 100% when fully completed', () => {
      const wrapper = mount(ProgressDisplay, {
        props: {
          total: 100,
          completed: 100
        }
      });
      
      const progressFill = wrapper.find('.progress-fill');
      expect(progressFill.attributes('style')).toContain('width: 100%');
    });

    it('calculates percentage correctly with decimal values', () => {
      const wrapper = mount(ProgressDisplay, {
        props: {
          total: 300,
          completed: 100
        }
      });
      
      const progressFill = wrapper.find('.progress-fill');
      expect(progressFill.attributes('style')).toContain('width: 33.333');
    });

    it('handles completion greater than total', () => {
      const wrapper = mount(ProgressDisplay, {
        props: {
          total: 100,
          completed: 150
        }
      });
      
      const progressFill = wrapper.find('.progress-fill');
      expect(progressFill.attributes('style')).toContain('width: 150%');
    });
  });

  describe('component structure', () => {
    it('renders the progress wrapper', () => {
      const wrapper = mount(ProgressDisplay, {
        props: {
          total: 100,
          completed: 50
        }
      });
      
      expect(wrapper.find('.progress-wrapper').exists()).toBe(true);
    });

    it('renders the progress container', () => {
      const wrapper = mount(ProgressDisplay, {
        props: {
          total: 100,
          completed: 50
        }
      });
      
      expect(wrapper.find('.progress-container').exists()).toBe(true);
    });

    it('renders the progress fill element', () => {
      const wrapper = mount(ProgressDisplay, {
        props: {
          total: 100,
          completed: 50
        }
      });
      
      expect(wrapper.find('.progress-fill').exists()).toBe(true);
    });

    it('displays the total time text', () => {
      const wrapper = mount(ProgressDisplay, {
        props: {
          total: 125,
          completed: 60
        }
      });
      
      expect(wrapper.text()).toContain('2:05');
    });
  });

  describe('prop updates', () => {
    it('updates width when completed prop changes', async () => {
      const wrapper = mount(ProgressDisplay, {
        props: {
          total: 100,
          completed: 25
        }
      });
      
      let progressFill = wrapper.find('.progress-fill');
      expect(progressFill.attributes('style')).toContain('width: 25%');
      
      await wrapper.setProps({ completed: 75 });
      
      progressFill = wrapper.find('.progress-fill');
      expect(progressFill.attributes('style')).toContain('width: 75%');
    });

    it('updates totaltime when total prop changes', async () => {
      const wrapper = mount(ProgressDisplay, {
        props: {
          total: 60,
          completed: 30
        }
      });
      
      expect(wrapper.text()).toContain('1:00');
      
      await wrapper.setProps({ total: 125 });
      
      expect(wrapper.text()).toContain('2:05');
    });
  });
});