<template lang="pug">
  section.container.transition-container
    style-title Physic-Demo
</template>

<script>
  import styled from 'vue-styled-components';

  const StyleTitle = styled('h1')`
    position: relative;
    width: 100%;
    margin: 16px auto;
    font-size: 32px;
    font-weight: 600;
    text-align: center;
  `;

  export default {
    name: 'Main',
    transition: 'slide-right',
    components: {
      StyleTitle
    }
  }
</script>
