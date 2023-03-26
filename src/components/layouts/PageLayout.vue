<template>
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="main">
      <slot name="body"></slot>
    </div>
    <div class="gap"></div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
</template>
<style scoped>
.gap {
  height: 80px;
}
</style>
