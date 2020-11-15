<template>
  <v-card>
    <v-tabs
        background-color="primary"
        dark
    >
      <v-tab>
        Site ayarları
      </v-tab>
    </v-tabs>

    <v-card-text>
      <v-form class="px-10 pt-2">
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
          <v-col cols="4">
            <v-text-field label="Telefon no"
                          v-model="$store.state.settings.siteSettings.cellPhone"
                          outlined
                          ref="name"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field label="Telefon no2"
                          v-model="$store.state.settings.siteSettings.landPhone"
                          outlined
                          ref="name"></v-text-field>
          </v-col>
            <v-col cols="4">
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
      this.api_post('/sitesettings/update',{
         id:this.$store.state.settings.siteSettings.id,
         title:this.$store.state.settings.siteSettings.title,
         description:this.$store.state.settings.siteSettings.description,
         cellPhone:this.$store.state.settings.siteSettings.cellPhone,
         landPhone:this.$store.state.settings.siteSettings.landPhone,
         fax:this.$store.state.settings.siteSettings.fax,
         email:this.$store.state.settings.siteSettings.email,
         address:this.$store.state.settings.siteSettings.address,
         map:this.$store.state.settings.siteSettings.map,
         facebookUrl:this.$store.state.settings.siteSettings.facebookUrl,
         instagramUrl:this.$store.state.settings.siteSettings.instagramUrl,
         twitterUrl:this.$store.state.settings.siteSettings.twitterUrl,
         linkedinUrl:this.$store.state.settings.siteSettings.linkedinUrl,
         pinterestUrl:this.$store.state.settings.siteSettings.pinterestUrl,
         otherSocialMediaUrl:this.$store.state.settings.siteSettings.otherSocialMediaUrl,
         comissionRate:this.$store.state.settings.siteSettings.comissionRate,
         taxRate:this.$store.state.settings.siteSettings.taxRate,
         isActive:this.$store.state.settings.siteSettings.isActive,
      },this.successUpdate,this.errorUpdate)
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
