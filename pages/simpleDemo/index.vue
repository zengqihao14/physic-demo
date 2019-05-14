<template lang="pug">
  section.container.transition-container
    styled-title Simple-Demo
    styled-container
    return-btn
</template>

<script>
  import styled from 'vue-styled-components';
  import ReturnBtn from '~/components/common/ReturnButton';

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
    width: 100%;
    max-width: 820px;
    height: 600px;
    border: 1px solid rgba(0, 0, 0, .15);
    border-radius: 3px;
  `;

  export default {
    name: 'SimpleDemo',
    transition: 'slide-left',
    components: {
      StyledTitle,
      StyledContainer,
      ReturnBtn
    }
  }
</script>
