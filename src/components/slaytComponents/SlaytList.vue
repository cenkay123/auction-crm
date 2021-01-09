<template>
  <div>
    <v-data-table
        :headers="headers"
        :search="search"
        :items="$store.state.storeData.slayts"
        sort-by="id"
        class="elevation-5"
    >
      <template v-slot:item.isActive="{ item }">
        <v-btn color="c00c292" small v-if="item.isActive" @click="updateStatus(item.id,false)">AKTİF</v-btn>
        <v-btn color="error" small v-if="!item.isActive" @click="updateStatus(item.id,true)">PASİF</v-btn>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Slaytlar</v-toolbar-title>
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

          <v-btn class="mr-3" small color="red" dark @click="deleteAllClear()">Sıfırla
            <v-icon small class="ml-1">mdi-close-outline</v-icon>
          </v-btn>
          <download-excel :data="$store.state.storeData.slayts" name="Slaytlar.xls">
            <v-btn class="mr-3" small color="warning" dark>Export
              <v-icon small class="ml-1">mdi-export</v-icon>
            </v-btn>
          </download-excel>
          <v-btn class="mr-3" small color="primary" dark :to="{name: 'SlaytsCreate'}">Yeni Olustur
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
  name: "SlaytList",
  data() {
    return {
      search: '',
      headers: [
        {
          text: '#',
          align: 'start',
          sortable: false,
          value: 'id'
        },
        {text: 'Baslik', value: 'title_tr'},
        {text: 'Status', value: 'isActive'},
        {text: 'İslemler', value: 'actions'}
      ],
    }
  },
  mounted() {
    this.fetchSliders()
  },
  methods: {
    fetchSliders() {
      this.api_get('/sliders', this.fetchSuccess, this.fetchError);
    },
    fetchSuccess(response) {
      this.$store.commit('successSlayt', response.data)
    },
    fetchError() {
      this.$store.commit('errorSlayt')
    },
    updateStatus(id, status) {
      this.mixinUpdateItem('/sliders/isactiveupdate', {
        slider:{
          Id: id,
          IsActive: status
        }
      }, this.fetchSliders)
    },
    deleteAllClear() {
      this.mixinDeleteItem('/sliders/deleteall', {Id: null}, this.fetchSliders);
    },
    deleteItem(id) {
      this.mixinDeleteItem('/sliders/delete/' + id, {
        Id: id
      }, this.fetchSliders);
    },
    routeUpdateItem(id) {
      this.$router.push({name: 'SlaytsUpdate', params: {id: id}})
    }

  }
}
</script>

<style scoped>

</style>
