<template>
  <div style="display: contents">
    <v-app-bar-nav-icon @click.stop="$parent.$data.mini = !$parent.$data.mini"></v-app-bar-nav-icon>
    <v-toolbar-title>{{ $route.name }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-settings</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-btn icon>
      <v-avatar color="red" size="30">
        <span class="white--text">S</span>
      </v-avatar>
    </v-btn>
  </div>
</template>


<script>
export default {
  name: "Header",
  data() {
    return {
    }
  }
}
</script>

<style scoped>

</style>
