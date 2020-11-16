<template>
  <div>
    <v-list-item class="blue darken-1" dark>
      <v-list-item-content>
        <v-list-item-title class="title white--text">Online Muzayede</v-list-item-title>
        <v-list-item-subtitle style="color: #ccc">O-C-S</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>
    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title" link :to="{name: item.route}" exact>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "Sideebar",
  data() {
    return {
      items: [
        {title: 'Dashboard', icon: 'mdi-view-dashboard', route: 'Home'},
        {title: 'Sayfalar', icon: 'mdi-image', route: 'Pages'},
        {title: 'Haberler', icon: 'mdi-newspaper', route: 'News'},
        {title: 'Sanatcilar', icon: 'mdi-account-star', route: 'Artists'},
        {title: 'Site Ayarlari', icon: 'mdi-settings', route: 'Settings'},
        {title: 'Dokumantasyon', icon: 'mdi-help-box', route: 'Documantation'},
      ],
    }
  }
}
</script>

<style scoped>

</style>
