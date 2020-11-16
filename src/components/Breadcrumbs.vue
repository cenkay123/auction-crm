<template>
  <v-breadcrumbs :items="$route.meta.breadcrumb">
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item
          :to="item.route"
          :disabled="item.disabled"
      >
        {{ item.name.toUpperCase() }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>


<script>
export default {
  name: "Breadcrumbs",
}
</script>

<style scoped>

</style>
