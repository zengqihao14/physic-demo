<template lang="pug">
  styled-menu
    styled-menu-link(to="/") Main
    styled-menu-link(to="/simpleDemo") Simple-Demo
</template>

<script>
  import Vue from 'vue';
  import styled from 'vue-styled-components';

  const NLink = Vue.component('NLink');
  const StyledMenu = styled.ul`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    color: #FFF;
    padding: 15px 16px;
    margin: 0;
    width: 100%;
    height: 100%;
    border-right: 1px solid rgba(0, 0, 0, .15);
  `;

  const StyledMenuItem = styled.li`
    position: relative;
    width: 100%;
  `;

  const StyledMenuLink = styled(NLink)`
    display: block;
    color: #333;
    padding: 6px;
    margin: 0;
    font-size: 16px;
    text-align: ledt;
    text-decoration: none;
    width: 100%;
    &:hover {
      transition: color .48s ease;
      color: rgba(220, 100, 0, 1);
    }
  `;

  export default {
    name: 'GlobalSideBar',
    components: {
      StyledMenu,
      StyledMenuItem,
      StyledMenuLink
    }
  }
</script>
