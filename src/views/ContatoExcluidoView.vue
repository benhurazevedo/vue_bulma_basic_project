<template>
    <div>
    <div class="notification is-success has-text-left mt-5">
      <span class="has-text-weight-bold">Mensagem do Aplicativo</span><br>
      O contato foi excluído com sucesso!  
    </div>
    <router-link class="button" to="/listarContatos">OK</router-link>
    </div>
</template>
<script>
export default
{
    name: "ContatoExcluidoView",
}
</script>