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
      this.$store.state.settings.loader=true;

      let formData = new FormData();
      formData.append('logo', this.$store.state.settings.siteSettings.logo)
      formData.append("id",this.$store.state.settings.siteSettings.id)
      formData.append("title",this.$store.state.settings.siteSettings.title)
      formData.append("description",this.$store.state.settings.siteSettings.description)
      formData.append("cellPhone",this.$store.state.settings.siteSettings.cellPhone)
      formData.append("landPhone",this.$store.state.settings.siteSettings.landPhone)
      formData.append("fax",this.$store.state.settings.siteSettings.fax)
      formData.append("email",this.$store.state.settings.siteSettings.email)
      formData.append("address",this.$store.state.settings.siteSettings.address)
      formData.append("map",this.$store.state.settings.siteSettings.map)
      formData.append("facebookUrl",this.$store.state.settings.siteSettings.facebookUrl)
      formData.append("instagramUrl",this.$store.state.settings.siteSettings.instagramUrl)
      formData.append("twitterUrl",this.$store.state.settings.siteSettings.twitterUrl)
      formData.append("linkedinUrl",this.$store.state.settings.siteSettings.linkedinUrl)
      formData.append("pinterestUrl",this.$store.state.settings.siteSettings.pinterestUrl)
      formData.append("otherSocialMediaUrl",this.$store.state.settings.siteSettings.otherSocialMediaUrl)
      formData.append("comissionRate",this.$store.state.settings.siteSettings.comissionRate)
      formData.append("taxRate",this.$store.state.settings.siteSettings.taxRate)
      formData.append("isActive",this.$store.state.settings.siteSettings.isActive)
      this.api_post('/sitesettings/update', formData,
          {headers: {'Content-Type': 'multipart/form-data'}}, this.successUpdate, this.errorUpdate)
    },
    successUpdate(){
      this.$store.commit('successMessage');
      this.getSitesettings();
    },
    errorUpdate(){
      this.$store.commit('errorMessage')
    }

  }
}
</script>

<style scoped>

</style>
