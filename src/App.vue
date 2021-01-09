<template>
  <v-app class="app" v-if="$store.state.auth.loggedIn">
    <v-navigation-drawer app  v-model="$store.state.form.drawer">
      <Sideebar></Sideebar>
    </v-navigation-drawer>
    <v-app-bar color="#122230" dense dark app>
      <Header></Header>
    </v-app-bar>
    <v-main color="grey">
      <v-container fluid>
        <Loader v-if="$store.state.settings.loader"></Loader>
        <Breadcrumbs v-if="$store.state.auth.loggedIn"></Breadcrumbs>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
  <v-app v-else>
    <Login></Login>
  </v-app>
</template>

<script>
// @ is an alias to /src

import Header from "@/components/Header";
import Loader from "@/components/Loader";
import Sideebar from "@/components/Sideebar";
import Login from "@/views/Login";
import Breadcrumbs from "@/components/Breadcrumbs";
export default {
  name: 'App',
  components: {Breadcrumbs, Login, Sideebar, Header, Loader},
  created() {
    this.$store.commit('hello');
  },
  data() {
    return {
      mini: true,
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
