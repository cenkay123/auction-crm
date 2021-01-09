<template>
  <div>
    <v-progress-linear
        color="cyan"
        :indeterminate="true"
        class="mx-0 my-0 p-0 load"
        height="4"
    ></v-progress-linear>
  </div>
</template>

<script>
export default {
  name: "Loader",
  data() {
    return {
    }
  },
}
</script>

<style scoped>
.load {
  height: 5px;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
