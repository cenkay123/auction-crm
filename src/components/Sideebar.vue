<template>
  <div>
    <v-list class="sidebarUser" dark>
      <v-list-item link class="pb-5">
        <v-list-item-content>
          <v-list-item-title class="title d-flex">
            <v-img :src="require('../assets/logo.png')" max-width="30"></v-img>
            <v-list-item-title style="font-size: 14px">Online Muzayede</v-list-item-title>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link class="pb-5">
        <v-list-item-content>
          <v-list-item-title class="text-center font-weight-bold">
            {{ $store.state.auth.userInfo.firstName }} {{ $store.state.auth.userInfo.lastName }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-center">{{ $store.state.auth.userInfo.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="px-2 userProfile">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list dense nav class="pt-5">
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
.sidebarUser {
  background: #122230!important;
  position: relative;
}

.userProfile {
  position: absolute;
  bottom: -22px;
  left: 38%;
}

</style>
