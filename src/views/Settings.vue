<template>
  <v-card>
    <v-tabs
        color="blue-grey darken-4"
        dark
    >
      <v-tab class="white--text">
        Site ayarları
      </v-tab>
    </v-tabs>

    <v-card-text>
      <v-form class="px-0 pt-2 md-px-10">
        <v-row>
          <v-col cols="12">
            <v-text-field ref="name"
                          label="Site Title"
                          v-model="$store.state.settings.siteSettings.title"
                          outlined></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Site açıklaması"
                          v-model="$store.state.settings.siteSettings.description"
                          outlined
                          ref="name"></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field label="Telefon no"
                          v-model="$store.state.settings.siteSettings.cellPhone"
                          outlined
                          ref="name"></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field label="Telefon no2"
                          v-model="$store.state.settings.siteSettings.landPhone"
                          outlined
                          ref="name"></v-text-field>
          </v-col>
            <v-col cols="12" md="4">
            <v-text-field label="Fax"
                          v-model="$store.state.settings.siteSettings.fax"
                          outlined
                          ref="name"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="E-posta"
                          v-model="$store.state.settings.siteSettings.email"
                          outlined
                          ref="name"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="Adres"
                          v-model="$store.state.settings.siteSettings.address"
                          outlined
                          ref="name"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Harita linki"
                          v-model="$store.state.settings.siteSettings.map"
                          outlined
                          ref="name"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="Facebook"
                          v-model="$store.state.settings.siteSettings.facebookUrl"
                          outlined
                          ref="name"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="Instagram"
                          v-model="$store.state.settings.siteSettings.instagramUrl"
                          outlined
                          ref="name"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="Twitter"
                          v-model="$store.state.settings.siteSettings.twitterUrl"
                          outlined
                          ref="name"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="Linkedin"
                          v-model="$store.state.settings.siteSettings.linkedinUrl"
                          outlined
                          ref="name"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="Pinterest"
                          v-model="$store.state.settings.siteSettings.pinterestUrl"
                          outlined
                          ref="name"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="Diğer sosyal medya"
                          v-model="$store.state.settings.siteSettings.otherSocialMediaUrl"
                          outlined
                          ref="name"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="Kdv oranı"
                          v-model="$store.state.settings.siteSettings.taxRate"
                          outlined
                          ref="name"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="Komisyon oranı"
                          v-model="$store.state.settings.siteSettings.comissionRate"
                          outlined
                          ref="name"></v-text-field>
          </v-col>
           <v-col cols="6">
            <v-text-field label="Google Recaptcha Site Key"
                          v-model="$store.state.settings.siteSettings.googleRecaptchaSiteKey"
                          outlined
                          ref="name"></v-text-field>
          </v-col>
                     <v-col cols="6">
            <v-text-field label="Google Recaptcha Secret Key"
                          v-model="$store.state.settings.siteSettings.googleRecaptchaSecretKey"
                          outlined
                          ref="name"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-row>
              <v-col cols="12" md="6">

                <v-file-input v-model="$store.state.settings.siteSettings.logo" color="blue-grey darken-4" label="Site Logosu" placeholder="Lutfen Logo Seciniz" prepend-icon="mdi-paperclip" outlined :show-size="1000">
                  <template v-slot:selection="{ index, text }">
                    <v-chip color="blue-grey darken-4" dark label small v-text="typeof $store.state.settings.siteSettings.logo === 'string' ? $store.state.settings.siteSettings.logo : text"></v-chip>
                  </template>
                </v-file-input>
              </v-col>
            </v-row>
          </v-col>


          <v-col cols="2" class="py-0">
            <v-btn class="btn" color="success" @click="updateData">Kaydet</v-btn>
          </v-col>

        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Settings",
  data(){
    return{
      settingsData:{},
    }
  },
  mounted() {
    this.getSitesettings()
  },
  methods: {
    getSitesettings() {
      this.api_get('/sitesettings', this.getSuccess)
    },
    getSuccess(response) {
      this.$store.state.settings.siteSettings = response.data[0]
    },
    updateData(){
      this.api_post('/sitesettings/update',{
        settings:this.$store.state.settings.siteSettings
      },this.successUpdate, this.errorUpdate)
    },
    successUpdate(){
     this.Error_Message('İslem Basarılı', '', 'success')
      this.getSitesettings();
    },
    errorUpdate(){
      this.Error_Message('İslem Hatalı', 'Tekrar deneyiniz', 'error')
    }

  }
}
</script>

<style scoped>

</style>
