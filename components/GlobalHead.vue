<template lang="pug">
  styled-head Physic-Demo
</template>

<script>
  import styled from 'vue-styled-components';

  const StyledHead = styled.div`
    position: fixed;
    display: block;
    border-bottom: 1px solid #FFF;
    background-color: #333;
    color: #FFF;
    padding: 15px 30px;
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    width: 100%;
    z-index: 11;
  `;

  export default {
    name: 'GlobalHead',
    components: {
      StyledHead
    }
  }
</script>
