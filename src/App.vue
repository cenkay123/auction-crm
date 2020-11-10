<template>
  <v-app class="app" v-if="login">
    <v-navigation-drawer app :mini-variant.sync="mini" permanent>
      <v-list-item class="blue darken-1" dark>
        <v-list-item-content>
          <v-list-item-title class="title white--text">Online Muzayede</v-list-item-title>
          <v-list-item-subtitle style="color: #ccc">Salimcan Karadeniz</v-list-item-subtitle>
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
    </v-navigation-drawer>
    <v-app-bar color="blue darken-1" dense dark app>
      <v-app-bar-nav-icon @click.stop="mini = !mini"></v-app-bar-nav-icon>
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
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
  <v-app v-else>
    <v-main>
      <v-navigation-drawer app class="login-left">
        <div class="mt-3 mt-md-15 pa-13">
          <div class="display-1 text-center primary--text">Online Muzayede</div>
          <div class="title my-2 text-sm-body-1 text-center">Hoş geldiniz! Birlikte harika şeyler inşa edelim.</div>
          <a class="my-4 v-btn v-btn--contained v-btn--router theme--light v-size--default d-flex">
            <span class="v-btn__content">Fiyatlandirma</span>
          </a>
        </div>
        <img src="https://lux-admin-pro.indielayer.com/images/illustrations/signin-illustration.svg">
      </v-navigation-drawer>
      <v-container fluid class="login-bg">
        <div class="login-area">
          <v-card class="mx-auto my-12" max-width="400">
            <v-img height="100" src="https://travibot.com/en/wp-content/uploads/2019/08/auction-520x245.jpg"></v-img>
            <v-card-title class="login-title pb-0">Welcome</v-card-title>
            <v-card-text>
              <div class="subtitle-1 justify-center text-center">Sign in your account</div>
            </v-card-text>
            <v-divider class="mx-4"></v-divider>
            <v-row>
              <v-col cols="12" class="px-7 py-0 pt-3">
                <v-text-field label="Email" class="login-input" outlined></v-text-field>
              </v-col>
              <v-col cols="12" class="px-7 py-0">
                <v-text-field label="Password" class="login-input" outlined></v-text-field>
              </v-col>
              <v-col cols="12" class="px-7 py-0">
                <v-btn class="login-btn" color="success">Login</v-btn>
              </v-col>
            </v-row>
          </v-card>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'App',
  data() {
    return {
      items: [
        {title: 'Dashboard', icon: 'mdi-view-dashboard', route: 'Home'},
        {title: 'Sayfalar', icon: 'mdi-image', route: 'Pages'},
        {title: 'Site Ayarlari', icon: 'mdi-settings', route: 'Settings'},
        {title: 'Dokumantasyon', icon: 'mdi-help-box', route: 'Documantation'},
      ],
      right: null,
      mini: false,
      login: true
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Quicksand&display=swap');

.app {
  font-family: 'Quicksand', sans-serif !important;
  letter-spacing: .0125em !important;
}

.login-bg {
  background: #f2f5f8;
}

.login-area {
  height: 97.5vh;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
}

.login-btn {
  width: 100%;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 20px;
}

.login-title {
  justify-content: center;
  font-size: 25px;
  padding-bottom: 0;
}

.login-input {
  padding-bottom: 5px;
  height: 70px;
}

.login-left {
  min-width: 400px;
  display: flex;
}

.login-left img {
  width: 300px;
  display: flex;
  margin: 0 auto;
  position: fixed;
  bottom: 50px;
  left: 10%;
}
</style>
