<template>
  <div id="app">
    <nav class="navbar is-light" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
        </a>
    
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
    
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          
        </div>
    
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <sair-button-component></sair-button-component>
            </div>
          </div>
        </div>
      </div>
    </nav>
      <router-view/>
    
  </div>
</template>
<script>
// eslint-disable-next-line 
import bulma from '../node_modules/bulma/css/bulma.min.css';
  
import SairButtonComponent from './components/AppComponents/SairButtonComponent.vue';
export default{
  name: "App",
  components: {
    SairButtonComponent,
  },
}
</script>
<style>
</style>
