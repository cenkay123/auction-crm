<template>
  <div>
    <v-data-table
        :headers="headers"
        :search="search"
        :items="languages"
        sort-by="id"
        class="elevation-5"
    >
      <template v-slot:item.isActive="{ item }">
        <v-btn color="c00c292" small v-if="item.isActive" @click="updateStatus(item.id,false)">AKTİF</v-btn>
        <v-btn color="error" small v-if="!item.isActive" @click="updateStatus(item.id,true)">PASİF</v-btn>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Diller</v-toolbar-title>
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
        </v-toolbar>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "LanguageSettings",
  data() {
    return {
      search: '',
      languages: [],
      headers: [
        {
          text: '#',
          align: 'start',
          sortable: false,
          value: 'id'
        },
        {text: 'Baslik', value: 'name'},
        {text: 'Status', value: 'isActive'}
      ],
    }
  },
  mounted() {
    this.fetchLanguages()
  },
  methods: {
    fetchLanguages() {
      this.api_get('/languages', this.fetchSuccess, this.fetchError);
    },
    fetchSuccess(response) {
      this.languages = response.data;
    },
    fetchError() {
      this.$store.commit('errorLanguageSettings')
    },
    updateStatus(id, status) {
      this.mixinUpdateItem('/languages/isactiveupdate', {
          Id: id,
          IsActive: status
      }, this.fetchLanguages)
    },
  }
}
</script>

<style scoped>

</style>
