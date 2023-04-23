<template>
    <div class="columns is-centered">
        <div class="column is-half">
          <p class="mt-5 has-text-centered"><router-link class="button is-success" to="/incluirContato">Incluir Contato</router-link></p>
        
            <table v-if="temContatos" class="table mt-5 is-fullwidth">
                <thead>
                    <tr>
                        <th>Cod</th>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="contato in lista" v-bind:key="contato.id">
                        <td>{{ contato.id }}</td>
                        <td>{{ contato.nome }}</td>
                        <td>{{ contato.telefone }}</td>
                        <td><router-link class="button is-small is-danger" :to="`/excluirContato/${contato.id}`">Excluir</router-link></td>
                    </tr>
                </tbody>
            </table>
            <p v-else class="has-text-centered mt-5">
                Não há contatos cadastrados.
            </p>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default
{
    name: "ListarContatosView",
    data: function(){
        return {
            lista: [], 
        };
    },
    computed: {
        temContatos: function()
        {
            return this.lista.length > 0;
        },
        ...mapGetters({getJwt: "getJwt", getApiPath: "getApiPath"}),
    },
    methods:{
        setListaContados: async function(dataComponent)
        {
            dataComponent.lista =  await fetch(dataComponent.getApiPath + "/lista_contatos",{
                method: "GET",
                mode: "cors",
                headers: {
                    "jwt": dataComponent.getJwt,
                }
            })
                .then(function(response){
                    if(response.status == 401)
                        throw "acesso negado! saia do aplicativo e faça login!"
                    else if(response.status == 200)
                        return response.json();
                })
                .catch(function(error){
                    console.log(error);
                    alert(error);
                });
        }
    },
    mounted: function()
    {
        this.setListaContados(this);
    }
}
</script>