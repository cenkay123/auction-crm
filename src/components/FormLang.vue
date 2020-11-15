<template>
  <div>
  <v-select :items="languages" v-model="selected" item-text="lang" item-value="id"
            label="Dil secimi" outlined dense class="lang-select text-center"></v-select>
  </div>
</template>

<script>
export default {
  name: "FormLang",
  data() {
    return {
      languages: [
        {
          id: 1,
          lang: 'tr'
        },
        {
          id: 2,
          lang: 'en'
        }
      ],
      selected: 1
    }
  },
  watch: {
    'selected' () {
      this.$router.push({query: {lang: this.selected, pageId: this.$route.query.pageId ? this.$route.query.pageId : undefined}});
    }
  },
  mounted() {
    this.$router.push({query: {lang: this.selected, pageId: this.$route.query.pageId ? this.$route.query.pageId : undefined}})
  }
}
</script>

<style scoped>
.lang-select {
  max-width: 220px;
}

</style>
