<template>
  <div>
    <v-data-table
        :headers="headers"
        :search="search"
        :items="exhibitions"
        sort-by="id"
        class="elevation-5"
    >
      <template v-slot:item.isActive="{ item }">
        <v-btn color="c00c292" small v-if="item.isActive" @click="updateStatus(item.id,false)">AKTİF</v-btn>
        <v-btn color="error" small v-if="!item.isActive" @click="updateStatus(item.id,true)">PASİF</v-btn>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Sergiler</v-toolbar-title>
          <v-divider class="mx-4 d-none d-md-flex" inset vertical></v-divider>
          <v-text-field
              v-model="search"
              label="Ara"
              hide-details
              outlined
              dense
              style="font-size: 12px; max-width: 300px"
              placeholder="Bu alandan arama yapabilirsiniz.."
              class="d-none d-md-flex"
          ></v-text-field>
          <v-spacer></v-spacer>

          <v-btn class="mr-3" small color="blue-grey darken-4" dark @click="deleteAllClear(null)">
            <span class="d-none d-md-inline">Sıfırla</span>
            <v-icon small class="ml-0 ml-md-1">mdi-close-outline</v-icon>
          </v-btn>
          <download-excel :data="exhibitions" name="Categories.xls">
            <v-btn class="mr-3" small color="blue-grey darken-4" dark>Export
              <v-icon small class="ml-1">mdi-export</v-icon>
            </v-btn>
          </download-excel>
          <v-btn class="mr-3" small color="blue-grey darken-4" dark :to="{name: 'ExhibitionsCreate'}">Yeni Olustur
            <v-icon small class="ml-1">mdi-plus-outline</v-icon>
          </v-btn>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon small color="orange lighten-1" class="mr-2" v-bind="attrs" v-on="on"
                    @click="routeUpdateItem(item.id)">
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
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "ExhibitionsList",
  data() {
    return {
      search: '',
      exhibitions: [],
      headers: [
        {
          text: '#',
          align: 'start',
          sortable: false,
          value: 'id'
        },
        {text: 'Sergi adı', value: 'title_tr'},
        {text: 'Durum', value: 'isActive'},
        {text: 'İslemler', value: 'actions'}
      ],
    }
  },
  mounted() {
    this.fetchSergi()
  },

  methods: {
    fetchSergi() {
      this.api_get('/exhibitions', this.fetchSuccess, this.fetchError);
    },
    fetchSuccess(response) {
      this.exhibitions = response.data;
    },
    fetchError() {
      this.Error_Message('İslem Hatalı', 'Tekrar deneyiniz', 'error')
    },
    updateStatus(id, status) {
      this.mixinUpdateItem('/exhibitions/isactiveupdate', {
        exhibitions: {
          Id: id,
          IsActive: status
        }
      }, this.fetchSergi)
    },
    deleteItem(id) {
      this.mixinDeleteItem('/exhibitions/delete/' + id, {
        Id: id
      }, this.fetchSergi);
    },
    routeUpdateItem(id) {
      this.$router.push({name: 'ExhibitionsUpdate', params: {id: id}})
    },
    deleteAllClear() {
      this.mixinDeleteItem('/exhibitions/deleteall', {Id: null}, this.fetchSergi);
    },
  }
}
</script>

<style scoped>

</style>