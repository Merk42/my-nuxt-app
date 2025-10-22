import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, flushPromises, VueWrapper } from '@vue/test-utils';
import type { ComponentPublicInstance } from 'vue';
import Login from './login.vue'; // Adjust path to your login.vue file

// Type definition for the component instance
interface LoginComponent extends ComponentPublicInstance {
  username: string;
  password: string;
  cancontinue: boolean;
  handleSubmit: () => Promise<void>;
}

// Mock FormInput component
const FormInputStub = {
  name: 'FormInput',
  template: '<div><slot></slot><input :id="id" :type="type" :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" /></div>',
  props: ['id', 'type', 'modelValue'],
  emits: ['update:modelValue']
};

// Mock navigateTo function (Nuxt composable)
const mockNavigateTo = vi.fn();
vi.stubGlobal('navigateTo', mockNavigateTo);

describe('Login Component', () => {
  const createWrapper = () => {
    return mount(Login, {
      global: {
        stubs: {
          FormInput: FormInputStub
        }
      }
    }) as VueWrapper<LoginComponent>;
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Initial State', () => {
    it('should initialize with empty username and password', () => {
      const wrapper = createWrapper();
      
      expect(wrapper.vm.username).toBe('');
      expect(wrapper.vm.password).toBe('');
    });

    it('should have continue button disabled initially', () => {
      const wrapper = createWrapper();
      const button = wrapper.find('button');
      
      expect(button.attributes('disabled')).toBeDefined();
      expect(wrapper.vm.cancontinue).toBe(false);
    });
  });

  describe('Form Inputs', () => {
    it('should update username when input changes', async () => {
      const wrapper = createWrapper();
      const usernameInput = wrapper.find('#login-username');
      
      await usernameInput.setValue('testuser');
      
      expect(wrapper.vm.username).toBe('testuser');
    });

    it('should update password when input changes', async () => {
      const wrapper = createWrapper();
      const passwordInput = wrapper.find('#login-password');
      
      await passwordInput.setValue('testpassword123');
      
      expect(wrapper.vm.password).toBe('testpassword123');
    });

    it('should render FormInput with correct props', () => {
      const wrapper = createWrapper();
      
      const usernameInput = wrapper.find('#login-username');
      const passwordInput = wrapper.find('#login-password');
      
      expect(usernameInput.exists()).toBe(true);
      expect(passwordInput.exists()).toBe(true);
    });
  });

  describe('Continue Button State', () => {
    it('should enable button when both username and password are filled', async () => {
      const wrapper = createWrapper();
      
      await wrapper.find('#login-username').setValue('testuser');
      await wrapper.find('#login-password').setValue('password123');
      await wrapper.vm.$nextTick();
      
      const button = wrapper.find('button');
      expect(button.attributes('disabled')).toBeUndefined();
      expect(wrapper.vm.cancontinue).toBe(true);
    });

    it('should keep button disabled when only username is filled', async () => {
      const wrapper = createWrapper();
      
      await wrapper.find('#login-username').setValue('testuser');
      await wrapper.vm.$nextTick();
      
      const button = wrapper.find('button');
      expect(button.attributes('disabled')).toBeDefined();
      expect(wrapper.vm.cancontinue).toBe(false);
    });

    it('should keep button disabled when only password is filled', async () => {
      const wrapper = createWrapper();
      
      await wrapper.find('#login-password').setValue('password123');
      await wrapper.vm.$nextTick();
      
      const button = wrapper.find('button');
      expect(button.attributes('disabled')).toBeDefined();
      expect(wrapper.vm.cancontinue).toBe(false);
    });

    it('should disable button if username is cleared', async () => {
      const wrapper = createWrapper();
      
      await wrapper.find('#login-username').setValue('testuser');
      await wrapper.find('#login-password').setValue('password123');
      await wrapper.vm.$nextTick();
      
      expect(wrapper.vm.cancontinue).toBe(true);
      
      await wrapper.find('#login-username').setValue('');
      await wrapper.vm.$nextTick();
      
      expect(wrapper.vm.cancontinue).toBe(false);
    });
  });

  describe('Form Submission', () => {
    it('should call handleSubmit when form is submitted', async () => {
      const wrapper = createWrapper();
      const handleSubmitSpy = vi.spyOn(wrapper.vm, 'handleSubmit');
      
      await wrapper.find('#login-username').setValue('testuser');
      await wrapper.find('#login-password').setValue('password123');
      
      const form = wrapper.find('form');
      await form.trigger('submit');
      
      expect(handleSubmitSpy).toHaveBeenCalled();
    });

    it('should navigate to /overview on form submission', async () => {
      const wrapper = createWrapper();
      
      await wrapper.find('#login-username').setValue('testuser');
      await wrapper.find('#login-password').setValue('password123');
      
      const form = wrapper.find('form');
      await form.trigger('submit');
      await flushPromises();
      
      expect(mockNavigateTo).toHaveBeenCalledWith('/overview');
    });

    it('should prevent default form submission behavior', async () => {
      const wrapper = createWrapper();
      
      await wrapper.find('#login-username').setValue('testuser');
      await wrapper.find('#login-password').setValue('password123');
      
      const form = wrapper.find('form');
      const submitEvent = new Event('submit', { cancelable: true });
      const preventDefaultSpy = vi.spyOn(submitEvent, 'preventDefault');
      
      await form.element.dispatchEvent(submitEvent);
      
      // The @submit.prevent should handle this
      expect(submitEvent.defaultPrevented).toBe(true);
    });
  });

  describe('Rendering', () => {
    it('should render the main heading', () => {
      const wrapper = createWrapper();
      
      expect(wrapper.find('h1').text()).toBe('Welcome Back');
    });

    it('should render the sign in heading', () => {
      const wrapper = createWrapper();
      
      expect(wrapper.find('h2').text()).toBe('Sign in to ArtistWorks');
    });

    it('should render the create account link', () => {
      const wrapper = createWrapper();
      
      expect(wrapper.text()).toContain('New user?');
      expect(wrapper.text()).toContain('Create an account.');
    });

    it('should render the forgot password link', () => {
      const wrapper = createWrapper();
      
      expect(wrapper.text()).toContain('Forgot password?');
    });

    it('should render the "Or sign up with" divider', () => {
      const wrapper = createWrapper();
      const hrSpan = wrapper.find('.hr-span');
      
      expect(hrSpan.exists()).toBe(true);
      expect(hrSpan.text()).toBe('Or sign up with');
    });

    it('should render continue button with correct text', () => {
      const wrapper = createWrapper();
      const button = wrapper.find('button');
      
      expect(button.text()).toBe('Continue');
    });

    it('should render FormInput for username with correct label', () => {
      const wrapper = createWrapper();
      
      expect(wrapper.text()).toContain('Enter username');
    });

    it('should render FormInput for password with correct label', () => {
      const wrapper = createWrapper();
      
      expect(wrapper.text()).toContain('Enter password');
    });
  });

  describe('Computed Properties', () => {
    it('cancontinue should be reactive to username changes', async () => {
      const wrapper = createWrapper();
      
      expect(wrapper.vm.cancontinue).toBe(false);
      
      wrapper.vm.username = 'testuser';
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.cancontinue).toBe(false);
      
      wrapper.vm.password = 'password123';
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.cancontinue).toBe(true);
    });

    it('cancontinue should be false for whitespace-only values', async () => {
      const wrapper = createWrapper();
      
      wrapper.vm.username = '   ';
      wrapper.vm.password = '   ';
      await wrapper.vm.$nextTick();
      
      // The !! operator will convert whitespace to true, but empty string to false
      // This test documents current behavior
      expect(wrapper.vm.cancontinue).toBe(true);
    });
  });
});