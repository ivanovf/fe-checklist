<template>

  <div class="p-8 flex flex-row-reverse sticky bottom-12">
    <router-link
      :to="{ name: route }"
      class="p-2 w-12 h-12 shadow rounded-full bg-sky-500 overflow-hidden" >
      <img src="@/assets/icons/plus.svg" alt="" class="svg-white">
    </router-link>
  </div>
</template>
<script>
export default {
  props: ['route']
}
</script>
<style>
.svg-white {
  filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%);
}
</style>
