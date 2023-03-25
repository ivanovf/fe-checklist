<template>
  <select name="user-number" id="user-number"
    v-on:input="$emit('update:modelValue', $event.target.value)"
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 mb-4 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option v-for="(value, i) in options" :value="value" :key="i" :selected="modelValue === value">
      {{ value }}
    </option>
    </select>
</template>

<script>

export default {
  props: {
    modelValue: String,
    active: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      options: []
    }
  },
  emits: ['update:modelValue'],
  async mounted() {
    //Get a list of user to avoid repetition.
    const r = await this.callEndpoints(
      this.axios,
      'get',
      '/locks/all?limit=20&offset=0',
      localStorage.token
    );

    if (r?.error?.status === 401) {
      this.$router.push({ name: 'locks' });
    }
    else {
      const usersUsed = r.data.map(({ userNumber }) => userNumber);
      if (this.active) {
        this.options = usersUsed;
      }
      else {
        console.log(usersUsed);
        for (let i = 1; i <= 20; i++) {
          let val = i < 10 ? `0${i}`: i;
          if (!usersUsed.includes(val)) {
            this.options.push(val);
          }

        }
      }
    }

  }
}
</script>
