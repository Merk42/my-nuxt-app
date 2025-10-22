<template>
    <div class="margin-sm">
        <label :for="name">
            <slot></slot>
            {{ label }}
        </label>
        <input
            v-bind="$attrs"
            :name="name"
            :id="name"
            :type="type"
            :value="inputValue"
            @input="onInput($event)"
            @blur="handleBlur"
            :class="{ 'error': !!errorMessage }"
        />
        <ul class="input-notes no-bullet" v-if="!errorMessage">
            <li class="margin-z" v-if="hasNotes"><slot name="notes"></slot></li>
            <li class="margin-z" v-if="props.minlength">minimum {{ props.minlength }} characters</li>
            <li class="margin-z" v-if="props.maxlength">maximum {{ props.maxlength }} characters</li>
        </ul>
        <p class="error" v-show="errorMessage">
        {{ errorMessage }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { toRef, computed, useSlots } from 'vue';
import { useField } from 'vee-validate';
defineOptions({
  inheritAttrs: false
})
const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  name: {
    type: String,
    default: 'this field'
  },
  label: {
    type: String
  },
  successMessage: {
    type: String,
    default: '',
  },
  minlength: {
    type: [Number, String]
  },
  maxlength: {
    type: [Number, String]
  },
  required: {
    type: Boolean
  }
});
const emit = defineEmits(['update:modelValue'])

const onInput = (event: any) => {
  handleChange(event, true)
  emit('update:modelValue', event.target.value)
}
function isRequired(value: any) {
  if ((value && value.toString().trim()) || !props.required) {
    return true;
  }
  return 'This field is required';
}

// use `toRef` to create reactive references to `name` prop which is passed to `useField`
// this is important because vee-validte needs to know if the field name changes
// https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
const name = toRef(props, 'name');

// we don't provide any rules here because we are using form-level validation
// https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
} = useField(name, isRequired, {
  initialValue: props.modelValue,
  syncVModel: true,
  valueProp: props.modelValue
});

const slots = useSlots();
const hasNotes = computed(() => {
  return !!slots['notes']
})

</script>

<style scoped>
.input-notes li+li {
  margin-top:.25rem;
}
label {
    margin-bottom:.5rem;
    display: block;
    font-weight: normal;
}
input {
    border:1px solid gray;
    border-radius:.5rem;
    padding:.75rem;
    width:100%
}
</style>
