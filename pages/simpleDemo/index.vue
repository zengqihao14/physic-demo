<template lang="pug">
  section.container.transition-container
    styled-title Simple-Demo
    styled-container
      styled-content(ref="physicBody")
</template>

<script>
  import styled from 'vue-styled-components';
  import SimpleDemoEngine from '~/middleware/physicEngine/SimpleDemo';

  const StyledTitle = styled('h1')`
    position: relative;
    width: 100%;
    margin: 16px auto;
    font-size: 28px;
    font-weight: 600;
    text-align: center;
  `;

  const StyledContainer = styled.div`
    position: relative;
    display: block;
    margin: 32px auto;
    padding: 16px;
    width: 100%;
    max-width: 820px;
    height: 600px;
    border: 1px solid rgba(0, 0, 0, .15);
    border-radius: 3px;
    overflow: hidden;
  `;

  const StyledContent = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  `;

  export default {
    name: 'SimpleDemo',
    transition: 'slide-left',
    data() {
      return {
        physicEngine: null
      }
    },
    components: {
      StyledTitle,
      StyledContainer,
      StyledContent
    },
    methods: {
      keyboardEvents(ev) {
        const { key } = ev;
        if (key === 'c') {
          this.physicEngine.createSolidBox();
        }
        if (key === 'C') {
          this.physicEngine.createSolidCircle();
        }
        if (key === 'r') {
          this.physicEngine.run();
        }
        if (key === 'R') {
          this.physicEngine.reset();
        }
        if (key === 's') {
          this.physicEngine.stop();
        }
        if (key === 'd') {
          this.physicEngine.toggleDebugMode();
        }
      }
    },
    mounted() {
      this.physicEngine = new SimpleDemoEngine(this.$refs.physicBody.$el);
      this.physicEngine.run();
      window.physicEngine = this.physicEngine;
      document.addEventListener('keyup', this.keyboardEvents);
    },
    beforeDestroy() {
      document.removeEventListener('keyup', this.keyboardEvents);
    }
  }
</script>
