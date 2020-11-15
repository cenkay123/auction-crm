<template>
  <v-breadcrumbs :items="$route.meta.breadcrumb">
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item
          :href="item.route"
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
  data() {
    return {
      itm:this.$route.meta.breadcrumb,
      items: [
        {
          text: 'Dashboard',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: 'Link 1',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
        {
          text: 'Link 2',
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
      ],
    }
  },
  watch: {
    '$route'() {
      this.updateList()
    }
  },
}
</script>

<style scoped>

</style>