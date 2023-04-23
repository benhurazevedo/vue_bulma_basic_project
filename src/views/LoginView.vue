<template>
    <div class="columns is-centered">
        <div class="column is-half">
            <span class="is-size-2">Login</span> 
            <div class="field has-text-left mt-2">
                <label class="label" for="email">Email</label>
                <div class="control has-icons-left has-icons-right">
                    <input :class="estiloCaixaEmail" id="email" v-model="email" type="text" placeholder="insira o email">
                    <span class="icon is-small is-left">
                        <font-awesome-icon :icon="['fas', 'envelope']" />
                    </span>
                    <span class="icon is-small is-right">
                        <div v-if="iconeCaixaEmailOK"><div><font-awesome-icon :icon="['fas', 'check']" /></div></div>
                        <div v-else><div><font-awesome-icon :icon="['fas', 'triangle-exclamation']" /></div></div>
                    </span>
                </div>
                <p :class="estiloAjudaPreenchEmail">{{ textoAjudaEmail }}</p>
            </div>
            <div class="field has-text-left mt-2">
                <label class="label" for="senha">Senha</label>
                <div class="control has-icons-left has-icons-right">
                    <input :class="estiloCaixaSenha"  id="senha" v-model="senha" type="password" placeholder="insira o senha">
                    <span class="icon is-small is-left">
                        <font-awesome-icon :icon="['fas', 'key']" />
                    </span>
                    <span class="icon is-small is-right">
                        <div v-if="iconeCaixaEmailOK"><div><font-awesome-icon :icon="['fas', 'check']" /></div></div>
                        <div v-else><div><font-awesome-icon :icon="['fas', 'triangle-exclamation']" /></div></div>
                    </span>
                </div>
                <p :class="estiloAjudaPreenchSenha">{{ textoAjudaSenha }}</p>
            </div>
            <div class="field has-text-left mt-2">
                <p>
                    <router-link class="button is-warning" to="/CadastrarUsr">É novo no app?</router-link>
                    <button type="button" class="button is-success" :disabled="prontoParaLogar" @click="logar">Enviar</button>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import router from '@/router';

export default
{
    name: "LoginView",
    data: function(){
        return {
            email: "",
            senha: "",
        };
    },
    computed: {
        ...mapGetters({getApiPath: "getApiPath"})
        ,estiloCaixaEmail: function()
        {
            return {
                input: true,
                "is-danger": this.email.length > 0 && (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email)),
                "is-success": /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email),
            }
        },
        estiloAjudaPreenchEmail: function(){
            return {
                help: true,
                "is-danger": this.email.length > 0 && (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email)),
                "is-success": /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email),
            };
        },
        textoAjudaEmail: function(){
            if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email)) 
                return "Está OK.";
            else 
                return "Preencha com email válido.";
        },
        iconeCaixaEmailOK: function(){
            return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email);
        },
        estiloCaixaSenha: function(){
            return {
                input: true,
                "is-danger": this.senha.length != 8,
                "is-success": this.senha.length == 8,
            }
        },
        estiloAjudaPreenchSenha: function(){
            return {
                help: true,
                "is-danger": this.senha.length != 8,
                "is-success": this.senha.length == 8,
            };
        },
        textoAjudaSenha: function(){
            return this.senha.length == 8 ? "Está OK." : "Preencha com 8 caracteres.";
        },
        iconeCaixaSenhaOK: function(){
            return this.senha.length == 8;
        },
        prontoParaLogar: function(){
            return !(this.senha.length == 8 
                && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email));
        },
    },
    methods: {
        resourceLogar: async function(basePath, objDados)
        {
            return await fetch(basePath + "/login",{
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: objDados.email,
                    senha: objDados.senha,
                })
            })
                .then(function(response){
                    if(response.status == 200)
                        return response.json();
                    else if(response.status == 404)
                        throw "Acesso negado!";
                })
                .then(function(data){
                    return data.jwt;
                })
                .catch(function(error){
                    console.log(error);
                    throw error;
                });
        },
        logar: async function()
        {
            try 
            {
                var jwt = await this.resourceLogar(this.getApiPath, this);
                this.setJwt(jwt);
                await router.push({name: "Listar Contatos"});
            }
            catch(error)
            {
                alert(error);
            }
        },
        ...mapActions({
            setJwt: "setJwt", 
        }),
    }
}
</script>