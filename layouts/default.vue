<template lang="pug">
  .main-container(:class="isLoaded ? 'isLoaded' : ''")
    global-head
    styled-main-container
      styled-side-bar
        global-side-bar
      styled-page-contents
        nuxt
</template>

<script>
  import styled from 'vue-styled-components';
  import GlobalHead from '~/components/GlobalHead';
  import GlobalSideBar from '~/components/GlobalSideBar';

  const StyledMainContainer = styled.div`
    positon: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    min-height: calc(100vh - 54px);
    padding: 54px 0 0;
    background-color: rgba(0, 0, 0, .02);
  `;

  const StyledSideBar= styled.div`
    position: relative;
    width: 210px;
    height: auto;
    min-height: calc(100vh - 54px);
    z-index: 10;
  `;

  const StyledPageContents= styled.div`
    position: relative;
    width: calc(100% - 210px);
    height: auto;
    min-height: calc(100vh - 54px);
  `;

  export default {
    name: 'DefaultLayout',
    data() {
      return {
        isLoaded: false
      }
    },
    components: {
      GlobalHead,
      GlobalSideBar,
      StyledMainContainer,
      StyledSideBar,
      StyledPageContents
    },
    mounted() {
      this.isLoaded = true;
    }
  }
</script>

<style lang="sass">
  @import '~@/assets/style/main'
  .main-container
    opacity: 0
    transition: opacity .36s ease
    &.isLoaded
      opacity: 1
</style>
