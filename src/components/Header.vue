<template>
  <div style="display: contents">
    <v-btn icon color="#3fb983" @click.stop="sidebarDrawer">
      <v-icon>mdi-arrow-split-vertical</v-icon>
    </v-btn>
    <v-toolbar-title>{{ $route.meta.title }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu bottom offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
        depressed
        class="font-weight-bold mr-2"
        color="#073b4c"
        small
        v-bind="attrs"
        v-on="on"
        >
          {{ $store.state.form.selectedLanguage.lang }}
          <v-icon
              right
              dark
              small
          >
            mdi-arrow-down-thick
          </v-icon>
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item
            v-for="(language, i) in $store.state.form.languages"
            :key="i"
            @click="$store.commit('changeLanguage', language)"
            :class="{'v-list-item--active': language.id === $store.state.form.selectedLanguage.id}"
        >
          <v-list-item-title class="align-center d-flex">
          <span>
            <img :src="require(`../assets/${language.code}.png`)" :alt="`${language.lang}`" class="mr-1">
          </span>
            {{ language.lang.toUpperCase() }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn color="#fff" icon :to="{name: 'Settings'}">
      <v-icon>mdi-settings</v-icon>
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
    },
    sidebarDrawer() {
      this.$store.commit('sidebarAction');
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
  margin: 0 !important;
}

</style>
