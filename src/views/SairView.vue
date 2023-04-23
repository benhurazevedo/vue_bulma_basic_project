<template>
    <div>
    <div class="notification is-success has-text-left mt-5">
      <span class="has-text-weight-bold">Mensagem do Aplicativo</span><br>
      Você saiu do aplicativo. <br>
      Para entrar novamente, vá para o login.   
    </div>
    <router-link class="button" to="/">Logar novamente</router-link>
    </div>
</template>
<script>
export default
{
    name: "SairView",
}
</script>