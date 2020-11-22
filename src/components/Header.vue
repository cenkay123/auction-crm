<template>
  <div style="display: contents">
    <v-app-bar-nav-icon color="#fff" @click.stop="$parent.$data.mini = !$parent.$data.mini"></v-app-bar-nav-icon>
    <v-toolbar-title>{{ $route.meta.title }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn color="#fff" icon :to="{name: 'Settings'}">
      <v-icon>mdi-settings</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-menu bottom offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon>
          <v-avatar color="#073b4c" size="30">
            <span class="white--text">{{ $store.state.auth.userInfo.userName.slice(0, 1) }}</span>
          </v-avatar>
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item>
          <v-list-item-title class="mode-item">
            <v-switch v-model="$vuetify.theme.isDark" color="indigo" hide-details></v-switch>
            <span>Koyu Tema</span>
          </v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item :to="{name: 'Settings'}">
          <v-list-item-title>
            <v-icon color="cyan" class="mr-2">mdi-settings</v-icon>
            Site Ayarlari
          </v-list-item-title>
        </v-list-item>
        <v-list-item :to="{name: 'Documantation'}">
          <v-list-item-title>
            <v-icon color="cyan" class="mr-2">mdi-help-box</v-icon>
            Dokumentasyon
          </v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item @click="logout">
          <v-list-item-title>
            <v-icon color="red" class="mr-2">mdi-logout</v-icon>
            Guvenli Cikis
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>


<script>
export default {
  name: "Header",
  data() {
    return {}
  },
  methods: {
    logout() {
      this.$store.commit('logout');
    }
  }
}
</script>

<style scoped>
.mode-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.mode-item .v-input--switch {
  margin: 0!important;
}

</style>
