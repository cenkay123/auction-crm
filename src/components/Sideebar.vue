<template>
  <div>
    <!--<v-list-item class="blue darken-1" dark>
      <v-list-item-content>
        <v-list-item-title class="title white--text">Online Muzayede</v-list-item-title>
        <v-list-item-subtitle style="color: #ccc">Salimcan Karadeniz</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>-->
    <v-img
        height="200px"
        src="https://cdn.pixabay.com/photo/2016/11/21/17/59/blackboard-1846865_1280.jpg"
        class="pt-16"
    >
      <v-card-title class="white--text mt-20">
        <v-avatar size="40" color="red">
          <!--<span class="white--text">{{ $store.state.auth.userInfo.userName.slice(0,1) }}</span>-->
          <img src="https://cdn.pixabay.com/photo/2020/05/16/13/45/boy-5177643_1280.jpg" alt="user">
        </v-avatar>
        <h5 class="ml-3 mt-3 custom-sidebar-title">
          {{ $store.state.auth.userInfo.userName }}
          <v-subheader>Online Muzayede</v-subheader>
        </h5>
      </v-card-title>
    </v-img>
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
        {title: 'Site Ayarlari', icon: 'mdi-settings', route: 'Settings'},
        {title: 'Dokumantasyon', icon: 'mdi-help-box', route: 'Documantation'},
      ],
    }
  }
}
</script>

<style scoped>

.custom-sidebar-title {
  text-shadow: 1px 2px black!important;
}

.custom-sidebar-title .v-subheader {
  height: 10px!important;
  color: #fff!important;
  padding: 0!important;
}



</style>
