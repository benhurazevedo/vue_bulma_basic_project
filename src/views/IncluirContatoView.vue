<template>
    <div class="columns is-centered">
        <div class="column is-half">
            <span class="is-size-2">Inserir Contato</span> 
            <div class="field has-text-left mt-5 ">
                <label class="label" for="nome">Nome</label>
                <div class="control  has-icons-left has-icons-right">
                    <input :class="estiloCaixaNome" v-model="nome" id="nome" type="text" placeholder="insira o nome">
                    <span class="icon is-small is-left">
                        <font-awesome-icon :icon="['fas', 'head-side-cough']" />
                    </span>
                    <span class="icon is-small is-right">
                        <font-awesome-icon  :icon="estiloIconeCaixaNome" />
                    </span>
                </div>
                <p :class="estiloAjudaPreenchNome">{{ textoAjudaNome }}</p>
            </div>
            <div class="field has-text-left mt-2 ">
                <label class="label" for="telefone">Telefone</label>
                <div class="control has-icons-left has-icons-right">
                    <input :class="estiloCaixaTelefone" v-model="telefone" id="telefone" type="text" placeholder="insira o telefone">
                    <span class="icon is-small is-left">
                        <font-awesome-icon :icon="['fas', 'phone']" />
                    </span>
                    <span class="icon is-small is-right">
                        <font-awesome-icon  :icon="estiloIconeCaixaTelefone" />
                    </span>
                </div>
                <p :class="estiloAjudaPreenchTelefone">{{ textoAjudaTelefone }}</p>
            </div>
            <div class="field has-text-left mt-2">
                <p>
                    <button type="button" class="button is-warning" @click="cancelar">Cancelar</button>
                    <button type="button" class="button is-success" @click="incluirContato" :disabled="naoPodeIncluir">Incluir</button>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import router  from '@/router';
import { mapGetters } from 'vuex';

export default
{
    name: "IncluirContatoView",
    data: function()
    {
        return {
            nome: "",
            telefone: "",
        };
    },
    computed:{
        ...mapGetters({
            getJwt:"getJwt",
            getApiPath: "getApiPath",
        }),
        estiloCaixaNome: function(){
            return {
                input: true,
                "is-danger": this.nome.length < 3,
                "is-success": this.nome.length >= 3 && this.nome.length < 30,
            }
        },
        estiloIconeCaixaNome: function(){
            return (this.nome.length >= 3 && this.nome.length < 30) ? 
                ['fas', 'check'] :
                ['fas', 'triangle-exclamation'];
        },
        estiloAjudaPreenchNome: function(){
            return {
                help: true,
                "is-danger": this.nome.length < 3,
                "is-success": this.nome.length >= 3 && this.nome.length < 30,
            };
        },
        textoAjudaNome: function(){
            return this.nome.length >= 3 && this.nome.length < 30 ? "Está OK." : "Preencha com texto entre 3 e 30 caracteres.";
        },
        estiloCaixaTelefone: function(){
            return {
                input: true,
                "is-danger": !/^[0-9]{10,11}$/.test(this.telefone),
                "is-success": /^[0-9]{10,11}$/.test(this.telefone),
            }
        },
        estiloIconeCaixaTelefone: function(){
            return /^[0-9]{10,11}$/.test(this.telefone) ?
                ['fas', 'check'] :
                ['fas', 'triangle-exclamation'];
        },
        estiloAjudaPreenchTelefone: function(){
            return {
                help: true,
                "is-danger": !/^[0-9]{10,11}$/.test(this.telefone),
                "is-success": /^[0-9]{10,11}$/.test(this.telefone),
            };
        },
        textoAjudaTelefone: function(){
            return /^[0-9]{10,11}$/.test(this.telefone)
                ? "Está OK." : "Preencha com o ddd e número do telefone (somente números).";
        },
        naoPodeIncluir: function(){
            return !(/^[0-9]{10,11}$/.test(this.telefone) && this.nome.length >= 3 && this.nome.length < 30)
        }
    },
    methods:{
        cancelar: async function()
        {
            this.nome = "";
            this.telefone = "";
            await router.push({name: "Listar Contatos"});
        },
        incluirContato: async function()
        {
            await fetch(this.getApiPath + "/incluir_contato",{
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "jwt": this.getJwt,
                },
                body: JSON.stringify({
                    nome: this.nome,
                    telefone: this.telefone,
                })
            })
                .then(async function(response){
                    if(response.status == 201)
                    {
                        await router.push({name: "Contato Incluido"});
                    }
                    else 
                        throw "Falha ao incluir contato!";
                })
                .catch(function(error){
                    console.log(error);
                    alert(error);
                });
        },
    }
}
</script>