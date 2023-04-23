<template>
    <div class="columns is-centered">
        <div class="column is-half">
            <span class="is-size-2">Deseja excluir o Contato?</span> 
            
            <div class="field has-text-left mt-2">
                <p>
                    <router-link class="button is-warning" to="/listarContatos">Não</router-link>
                    <button type="button" class="button is-danger" @click="excluirContato">Sim</button>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import router from "@/router";

export default
{
    name: "ExcluirContatoView",
    computed: {
        ...mapGetters({
            getJwt:"getJwt",
            getApiPath: "getApiPath",
        }),
    },
    methods:{
        excluirContato: async function()
        {
            await fetch(this.getApiPath + "/apagar_contato/" + this.$route.params.id,{
                method: "DELETE",
                mode: "cors",
                headers: {
                    "jwt": this.getJwt,
                }
            })
                .then(async function(response){
                    if(response.status == 204)
                    {
                        await router.push({name: "Contato Excluido"});
                    }
                    else 
                        throw "Falha ao excluir contato!";
                })
                .catch(function(error){
                    console.log(error);
                    alert(error);
                });
        }
    }
}
</script>