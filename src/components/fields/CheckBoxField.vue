<template>
<div class="text-left">
    <label v-if="label" :for="inputId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {{ label }}
    </label>
    <input type="checkbox" :name="name" :id="inputId"
      :checked="modelValue"
      class="w-6 h-6 text-green-600 bg-gray-100 border-gray-300 rounded-lg focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      v-on:input="$emit('update:modelValue', $event.target.checked)"
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
    modelValue: Boolean,
    label: String,
    inputId: {
      type: String,
      required: true,
    },
    name: String,
    msg: Object,
  },
  emits: ['update:modelValue'],
};

</script>
