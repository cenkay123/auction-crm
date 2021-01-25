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
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list dense nav class="pt-5">
      <div v-for="item in items" :key="item.title">
        <!--DropDown None-->
        <v-list-item v-if="item.dropDown.length < 1" link :to="{name: item.route}" exact>
          <template>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>
        <!--DropDown Block-->
        <v-list-item v-else>
          <v-list-group
              link
              :value="false"
              class="w-100 customListgroup"
          >
            <template v-slot:activator class="pl-0">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <template v-if="item.dropDown.length!= 0">
              <v-list-item
                  v-for="dropItem in item.dropDown" :key="dropItem.title"
                  link :to="{name: dropItem.route}" exact
                  class="sidebarDropdown"
              >
                <v-list-item-title v-text="dropItem.title"></v-list-item-title>
              </v-list-item>
            </template>
          </v-list-group>
        </v-list-item>
      </div>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "Sideebar",
  data() {
    return {
      items: [
        {title: 'Dashboard', icon: 'mdi-view-dashboard', route: 'Home', dropDown: []},
        {title: 'Site Ayarlari', icon: 'mdi-settings', route: 'Settings', dropDown: []},
        {title: 'Slaytlar', icon: 'mdi-image', route: 'Slayts', dropDown: []},
        {title: 'Sayfalar', icon: 'mdi-book', route: 'Pages', dropDown: []},
        {title: 'Haberler', icon: 'mdi-newspaper', route: 'News', dropDown: []},
        {title: 'Sanatcilar', icon: 'mdi-account-star', route: 'Artists', dropDown: []},
        {title: 'Kelimeler', icon: 'mdi-pencil', route: 'Words', dropDown: []},
        {title: 'Popup', icon: 'mdi-gift', route: 'Popup', dropDown: []},
        {
          title: 'Urunler', icon: 'mdi mdi-cart',
          dropDown: [{
            title: 'Urunler Kategorisi',
            route: 'Categories',
          },
            {
              title: 'Urunler',
              route: 'Products',
            }]
        },
        {
          title: 'Kullanıcılar', icon: 'mdi mdi-account',
          dropDown: [{
            title: 'Kullanıcı Ekle',
            route: 'UsersCreate',
          },
            {
              title: 'Kullanıcılar',
              route: 'Users',
            }]
        },
        {title: 'Dokumantasyon', icon: 'mdi-help-box', route: 'Documantation', dropDown: []},
      ],
    }
  }
}
</script>

<style scoped>
.sidebarUser {
  background: #122230 !important;
  position: relative;
}

.userProfile {
  position: absolute;
  bottom: -22px;
  left: 38%;
}

</style>
