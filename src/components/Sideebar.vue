<template>
  <div>
    <v-list-item class="blue-grey darken-4" dark>
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
        {title: 'Site Ayarlari', icon: 'mdi-settings', route: 'Settings'},
        {title: 'Slaytlar', icon: 'mdi-image', route: 'Slayts'},
        {title: 'Sayfalar', icon: 'mdi-book', route: 'Pages'},
        {title: 'Haberler', icon: 'mdi-newspaper', route: 'News'},
        {title: 'Sanatcilar', icon: 'mdi-account-star', route: 'Artists'},
        {title: 'Kelimeler', icon: 'mdi-pencil', route: 'Words'},
        {title: 'Popup', icon: 'mdi-gift', route: 'Popup'},
        {title: 'Dokumantasyon', icon: 'mdi-help-box', route: 'Documantation'},
      ],
    }
  }
}
</script>

<style scoped>

</style>
