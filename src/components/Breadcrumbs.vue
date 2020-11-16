<template>
  <v-breadcrumbs :items="$route.meta.breadcrumb" class="pl-0">
    <template v-slot:item="{ item }">
      <v-btn small>
        <v-breadcrumbs-item :to="item.route" :disabled="item.disabled">
          {{ item.name.toUpperCase() }}
        </v-breadcrumbs-item>
      </v-btn>
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
