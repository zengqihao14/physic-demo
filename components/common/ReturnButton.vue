<template lang="pug">
  styled-return-link(:to="path || '/'") Go back
</template>

<script>
  import Vue from 'vue';
  import styled from 'vue-styled-components';

  const NLink = Vue.component('NLink');
  const StyledReturnLink = styled(NLink)`
    display: block;
    border-radius: 4px;
    border: 1px solid #333;
    background-color: #333;
    color: #FFF;
    padding: 6px 30px;
    margin: 60px auto 32px;
    font-size: 16px;
    text-align: center;
    text-decoration: none;
    width: 220px;

    &:hover {
      transition: opacity .48s ease;
      opacity: .8;
    }
  `;

  export default {
    name: 'ReturnBtn',
    props: {
      path: String
    },
    components: {
      StyledReturnLink
    }
  }
</script>
