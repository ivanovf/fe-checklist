<template>
  <div class="text-left my-4">
    <label
      :for="inputId ?? name"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      {{ label }}
    </label>
    <select
      :name="name"
      :id="inputId ?? name"
      v-on:input="$emit('update:modelValue', $event.target.value)"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 mb-4 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option
        v-for="item in options"
        :value="item.value"
        :key="item.value"
        :selected="modelValue === item.value"
      >
        {{ item.label }}
      </option>
    </select>
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
    inputId: String,
    name: String,
    options: Array,
    msg: Object,
  },
  emits: ['update:modelValue'],
}

</script>
