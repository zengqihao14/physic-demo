<template lang="pug">
  .loading-dots(v-if="loading")
    .loading-dot.loading-dot---one
    .loading-dot.loading-dot--two
    .loading-dot.loading-dot--three
</template>

<script>
  export default {
    data: () => ({
      loading: false
    }),
    methods: {
      start () {
        this.loading = true
      },
      finish () {
        this.loading = false
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.$nuxt.$loading.start();
        setTimeout(() => this.$nuxt.$loading.finish(), 0);
      })
    }
  }
</script>

<style lang="sass">
  @import '~@/assets/style/_partial/loading'
</style>

