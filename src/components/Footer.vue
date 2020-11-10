<template>
  <v-footer
      dark
      padless
  >
    <v-card
        class="flex"
        flat
        tile
    >
      <v-card-text class="py-2 text-center">
        {{ new Date().getFullYear() }} — <strong>Online Muzayede</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
    }
  }
}
</script>

<style scoped>

</style>
