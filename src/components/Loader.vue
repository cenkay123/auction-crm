<template>
  <div class="text-center">
    <v-overlay :value="overlay">
      <v-progress-circular
          :rotate="360"
          :size="100"
          :width="15"
          :value="value"
          color="teal"
      >
        {{ value }}
      </v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
export default {
  name: "Loader",
  data() {
    return {
      message: true,
      interval: {},
      overlay: true,
      value: 0,
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    callFunction() {
      var th = this;
      setTimeout(function () {
        th.$store.state.settings.loader = false;
      }, 2000);
    },
  },
  watch: {
    overlay(val) {
      val && setTimeout(() => {
        this.overlay = false
      }, 2000)
    },
  },
  mounted() {
    this.callFunction();
    this.interval = setInterval(() => {
      if (this.value === 100) {
        return (this.value = 0)
      }
      this.value += 10
    }, 1000)
  },
}
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>