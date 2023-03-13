<template>
<div class="text-left my-4">
    <label :for="inputId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {{ label }}
    </label>
    <input :type="type" :name="name" :id="inputId"
      :class="classes"
      :value="modelValue"
      v-on:input="$emit('update:modelValue', $event.target.value)"
    />
    <div class="msg" v-if="msg && msg.type">
      <p v-if="msg.type === 'error'" class="mt-2 text-sm text-red-600 dark:text-red-500">{{ msg.text }}</p>
      <p v-if="msg.type === 'success'" class="mt-2 text-sm text-green-600 dark:text-green-500">{{ msg.text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
    label: String,
    inputId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text'
    },
    name: String,
    msg: Object,
  },
  emits: ['update:modelValue'],
  computed: {
    classes() {
      return {
        'border': true,
        'bg-gray-50': !this.msg,
        'border-gray-300': !this.msg,
        'text-gray-900': !this.msg,
        'focus:ring-blue-500': !this.msg,
        'focus:border-blue-500': !this.msg,
        'dark:bg-gray-700': true,
        'dark:border-gray-600': !this.msg,
        'dark:placeholder-gray-400': !this.msg,
        'dark:text-white': true,
        'dark:focus:ring-blue-500': true,
        'dark:focus:border-blue-500': true,
        'block': true,
        'w-full': true,
        'p-2.5': true,
        'text-sm': true,
        'rounded-lg': true,
        'bg-red-50': this.msg?.type && this.msg.type === 'error',
        'border-red-500': this.msg?.type && this.msg.type === 'error',
        'text-red-900': this.msg?.type && this.msg.type === 'error',
        'placeholder-red-700': this.msg?.type && this.msg.type === 'error',
        'focus:ring-red-500': this.msg?.type && this.msg.type === 'error',
        'focus:border-red-500': this.msg?.type && this.msg.type === 'error',
        'dark:text-red-500': this.msg?.type && this.msg.type === 'error',
        'dark:placeholder-red-500': this.msg?.type && this.msg.type === 'error',
        'dark:border-red-500': this.msg?.type && this.msg.type === 'error',

      }
    }
  }
};

</script>
