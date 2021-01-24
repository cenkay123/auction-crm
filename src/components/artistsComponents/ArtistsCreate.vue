<template>
  <v-card>
    <v-card-title class="pb-3">
      Yeni Sanatçı Ekle
    </v-card-title>
    <v-divider></v-divider>
    <v-form class="px-4 px-md-10 pt-2">
      <v-row>
        <v-col cols="12">
          <v-text-field ref="name" v-model="artistsForm.NameSurName" label="Ad Soyad" placeholder="Ad Soyad" dense
                        outlined></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-menu
              v-model="menuStart"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  v-model="artistsForm.BirthDate"
                  label="Doğum tarihi"
                  placeholder="Doğum tarihi"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
              ></v-text-field>
            </template>
            <v-date-picker
                v-model="artistsForm.BirthDate"
                @input="menuStart = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="6">
          <v-menu
              v-model="menuEnd"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  v-model="artistsForm.dateOfDeath"
                  label="Vefat tarihi"
                  placeholder="Vefat tarihi"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
              ></v-text-field>
            </template>
            <v-date-picker
                v-model="artistsForm.dateOfDeath"
                @input="menuEnd = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12">
          <div v-for="item in $store.state.form.languages" :key="item.id">
            <label class="custom-label">Sanatçı Bilgisi</label>
               <img :src="require('../../assets/'+item.code+'.png')" class="label-in-Img" height="150"/>
            <Editor :data="artistsForm" dataItem="About_" class="mt-3 mb-4" :lang="item"></Editor>
          </div>
        </v-col>
        <v-col cols="12">
          <label class="custom-label flag-EN">Resim yukle</label>
          <ImageUpload :data="artistsForm" class="mt-3" dataParameter="images"></ImageUpload>
        </v-col>
        <v-col cols="12" md="2" class=" py-0">
          <v-btn class="login-btn" color="success" @click="createArtist">Kaydet</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import Editor from "@/components/basicFormComponents/Editor";
import ImageUpload from "@/components/basicFormComponents/ImageUpload";
export default {
  name: "ArtistsCreate",
  components: {
    ImageUpload,
    Editor,
  },
  data() {
    return {
      artistsForm: {
        IsActive: true,
        BirthDate: null,
        dateOfDeath: null,
        images: []
      },
      menuStart: false,
      menuEnd: false,
    }
  },
  methods: {
    createArtist() {
      this.api_post('/artists/add', {
        Artist: this.artistsForm
      }, this.successArtist, this.errorArtist)
    },
    successArtist() {
      this.Error_Message('İslem Basarılı', '', 'success')
      this.$router.push({name: 'ArtistsList'})
    },
    errorArtist() {
      this.Error_Message('İslem Hatalı', 'Tekrar deneyiniz', 'error')
    },
  }
}
</script>

<style scoped>

</style>
