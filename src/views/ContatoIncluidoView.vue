<template>
    <div>
    <div class="notification is-success has-text-left mt-5">
      <span class="has-text-weight-bold">Mensagem do Aplicativo</span><br>
      O Contato foi incluído.   
    </div>
    <router-link class="button" to="/listarContatos">OK</router-link>
    </div>
</template>
<script>
export default
{
    name: "SairView",
}
</script>