<template>
  <v-row dense>
    <v-col cols="12">
      <v-alert color="warning" dark icon="mdi-vuetify" border="left" prominent>
        Praesent congue erat at massa. Nullam vel sem. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
        Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros.
        Curabitur at lacus ac velit ornare lobortis.
      </v-alert>
    </v-col>
    <v-col cols="12">
      <router-view></router-view>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Pages",
}
</script>

<style scoped>

</style>
