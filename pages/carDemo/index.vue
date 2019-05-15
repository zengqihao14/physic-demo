<template lang="pug">
  section.container.transition-container
    styled-title Car-Demo
    styled-container
      styled-content(ref="physicBody")
</template>

<script>
  import styled from 'vue-styled-components';
  import CarDemoEngine from '~/middleware/physicEngine/CarDemo';

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
      keyboardUpEvents(ev) {
        const { key } = ev;
        if (key === 'c') {
          this.physicEngine.createCar();
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
        if (key === 'ArrowRight' || key === 'ArrowLeft') {
          this.physicEngine.carRelease();
        }
      },
      keyboardDownEvents(ev) {
        const { key } = ev;
        if (key === 'ArrowRight') {
          this.physicEngine.carGoForward();
        }
        if (key === 'ArrowLeft') {
          this.physicEngine.carGoBackward();
        }
      }
    },
    mounted() {
      this.physicEngine = new CarDemoEngine(this.$refs.physicBody.$el);
      this.physicEngine.run();
      window.physicEngine = this.physicEngine;
      document.addEventListener('keyup', this.keyboardUpEvents);
      document.addEventListener('keydown', this.keyboardDownEvents);
    },
    beforeDestroy() {
      document.removeEventListener('keyup', this.keyboardEvents);
      document.removeEventListener('keydown', this.keyboardDownEvents);
    }
  }
</script>
