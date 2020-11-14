<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="$store.state.pages.pages"
        sort-by="id"
        class="elevation-1"
    >
      <template v-slot:item.isMain="{ item }">
           <v-btn color="c00c292" v-if="item.isMain" @click="updateStatus(item.id,false)">AKTİF</v-btn>
           <v-btn color="error" v-if="!item.isMain" @click="updateStatus(item.id,true)">PASİF</v-btn>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Sayfalar</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn small color="primary" dark :to="{name: 'Create'}">Yeni Sayfa Olustur</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon small color="orange lighten-1" class="mr-2" v-bind="attrs" v-on="on" @click="routeUpdateItem(item.id)">
              mdi-pencil
            </v-icon>
          </template>
          <span>Duzenle</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon small color="red lighten-1" v-bind="attrs" v-on="on" @click="deleteItem(item.id)">mdi-delete
            </v-icon>
          </template>
          <span>Sil</span>
        </v-tooltip>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
    <v-snackbar v-model="snackbar" :timeout="timeout">{{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">Kapat</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      headers: [
        {
          text: '#',
          align: 'start',
          sortable: false,
          value: 'id'
        },
        {text: 'Baslik', value: 'title'},
        {text: 'Status', value: 'isMain'},
        {text: 'İslemler', value: 'actions', sortable: false}
      ],
      snackbar: false,
      text: 'Bir sorun ile karsilasildi.',
      timeout: 2000,
      switch: ''
    }
  },
  mounted() {
    this.fetchPages()
  },
  methods: {
    fetchPages() {
      this.api_get('/pages', this.successFetchPages, this.errorPages)
    },
    successFetchPages(response) {
      this.$store.commit('successPages', response.data)
    },
    errorPages() {
      this.snackbar = true
    },
    deleteItem(id) {
       this.$store.dispatch('deleteItem',{
          id:id,
          endpoint:'/pages/delete/'
        })
    },
    updateStatus(id,status){
       this.$store.dispatch('statusChange',{
          id:id,
          IsMain:status,
          endpoint:'/pages/update/'
        })
    },

    routeUpdateItem(id){
      this.$router.push({name: 'Update', params: {id: id}})
    }

  }
}
</script>

<style scoped>

</style>
