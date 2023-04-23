<template>
    <div class="columns is-centered">
        <div class="column is-half">
            <span class="is-size-2">Cadastre-se</span> 
            <div class="field has-text-left mt-5">
                <label class="label" for="nome">Nome</label>
                <div class="control has-icons-left has-icons-right">
                    <input :class="estiloCaixaNome" id="nome" v-model="nome" type="text" placeholder="insira o nome">
                    <span class="icon is-small is-left">
                        <font-awesome-icon :icon="['fas', 'user']" />
                    </span>
                    <span class="icon is-small is-right">
                        <div v-if="iconeCaixaNomeOK"><div><font-awesome-icon :icon="['fas', 'check']" /></div></div>
                        <div v-else><div><font-awesome-icon :icon="['fas', 'exclamation-triangle']" /></div></div>
                    </span>
                </div>
                <p :class="estiloAjudaPreenchNome">{{ textoAjuda }}</p>
            </div>
            <div class="field has-text-left mt-2">
                <label class="label" for="email">Email</label>
                <div class="control has-icons-left has-icons-right">
                    <input :class="estiloCaixaEmail" @blur="consultarEmail" id="email" v-model="email" type="text" placeholder="insira o email">
                    <span class="icon is-small is-left">
                        <font-awesome-icon :icon="['fas', 'envelope']" />
                    </span>
                    <span class="icon is-small is-right">
                        <div v-if="iconeCaixaEmailOK"><div><font-awesome-icon :icon="['fas', 'check']" /></div></div>
                        <div v-else><div><font-awesome-icon :icon="['fas', 'exclamation-triangle']" /></div></div>
                    </span>
                </div>
                <p :class="estiloAjudaPreenchEmail">{{ textoAjudaEmail }}</p>
            </div>
            <div class="field has-text-left mt-2">
                <label class="label" for="senha">Senha</label>
                <div class="control has-icons-left has-icons-right">
                    <input :class="estiloCaixaSenha" id="senha" v-model="senha" type="password" placeholder="insira o senha">
                    <span class="icon is-small is-left">
                        <font-awesome-icon :icon="['fas', 'key']" />
                    </span>
                    <span class="icon is-small is-right">
                        <div v-if="iconeCaixaSenhaOK"><div><font-awesome-icon :icon="['fas', 'check']" /></div></div>
                        <div v-else><div><font-awesome-icon :icon="['fas', 'exclamation-triangle']" /></div></div>
                    </span>
                </div>
                <p :class="estiloAjudaPreenchSenha">{{ textoAjudaSenha }}</p>
            </div>
            <div class="field has-text-left mt-2">
                <label class="label" for="senha">Reentre a Senha</label>
                <div class="control has-icons-left has-icons-right">
                    <input :class="estiloCaixaCopiaSenha" id="copia-senha" v-model="copiaSenha" type="password" placeholder="copia da senha">
                    <span class="icon is-small is-left">
                        <font-awesome-icon :icon="['fas', 'key']" />
                    </span>
                    <span class="icon is-small is-right">
                        <div v-if="iconeCaixaCopiaSenhaOK"><div><font-awesome-icon :icon="['fas', 'check']" /></div></div>
                        <div v-else><div><font-awesome-icon :icon="['fas', 'exclamation-triangle']" /></div></div>
                    </span>
                </div>
                <p :class="estiloAjudaPreenchCopiaSenha">{{ textoAjudaCopiaSenha }}</p>
            </div>
            <div class="field has-text-left mt-2">
                <p>
                    <button class="button is-warning" type="button" @click="cancelar">Cancelar</button>
                    <button :disabled="prontoParaCadastrar" class="button is-success" type="button" @click="cadastrarUsuario">Cadastrar</button>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import router from '@/router';
import { mapGetters } from 'vuex';

export default
{
    name: "CadastrarUsrView",
    data: function()
    {
        return {
            nome: "",
            senha: "",
            copiaSenha: "",
            email: "",
            listaEmailCadastrado: "",
        }
    },
    computed: {
        ...mapGetters({apiPath: "getApiPath"}),
        estiloCaixaNome: function()
        {
            return {
                input: true,
                "is-danger": this.nome.length > 0 && this.nome.length < 3,
                "is-success": this.nome.length >= 3,
            };
        },
        iconeCaixaNomeOK: function()
        {
            return this.nome.length >= 3;
        },
        estiloAjudaPreenchNome: function(){
            return {
                help: true,
                "is-danger": this.nome.length > 0 && this.nome.length < 3,
                "is-success": this.nome.length >= 3,
            };
        },
        textoAjuda: function(){
            return this.nome.length >= 3 ? "Está OK." : "Preencha com 3 caracteres.";
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
        estiloCaixaCopiaSenha: function(){
            return {
                input: true,
                "is-danger": this.senha.length != 8 || this.senha != this.copiaSenha,
                "is-success": this.senha.length == 8 && this.senha == this.copiaSenha,
            }
        },
        estiloAjudaPreenchCopiaSenha: function(){
            return {
                help: true,
                "is-danger": this.senha.length != 8 || this.senha != this.copiaSenha,
                "is-success": this.senha.length == 8 && this.senha == this.copiaSenha,
            };
        },
        textoAjudaCopiaSenha: function(){
            if(this.senha.length == 8 && this.senha == this.copiaSenha) 
                return "Está OK.";
            else 
                return "Preencha com 8 caracteres iguais a senha.";
        },
        iconeCaixaCopiaSenhaOK: function(){
            return this.senha.length == 8 && this.senha == this.copiaSenha;
        },
        estiloCaixaEmail: function()
        {
            return {
                input: true,
                "is-danger": this.email.length > 0 && (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email) || this.listaEmailCadastrado.length > 0),
                "is-success": /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email) && this.listaEmailCadastrado.length == 0,
            }
        },
        estiloAjudaPreenchEmail: function(){
            return {
                help: true,
                "is-danger": this.email.length > 0 && (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email) || this.listaEmailCadastrado.length > 0),
                "is-success": /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email) && this.listaEmailCadastrado.length == 0,
            };
        },
        textoAjudaEmail: function(){
            if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email) && this.listaEmailCadastrado.length == 0) 
                return "Está OK.";
            else if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email) && this.listaEmailCadastrado.length != 0)
                return "Este email já está cadastrado.";
            else 
                return "Preencha com email válido.";
        },
        iconeCaixaEmailOK: function(){
            return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email) && this.listaEmailCadastrado.length == 0;
        },
        prontoParaCadastrar: function(){
            return !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email) 
                && this.listaEmailCadastrado.length == 0 &&
                this.nome.length >= 3 &&
                this.senha.length == 8 && 
                this.senha.length == 8 && 
                this.senha == this.copiaSenha);
        }
    },
    methods: {
        cancelar: function()
        {
            this.nome = "";
            this.senha = "";
            this.copiaSenha = "";
            this.email = "";
            this.listaEmailCadastrado = "";
            router.push({name: "login"});
        },
        resourceConsultaEmail: async function(basePath, email)
        {
            return await fetch(basePath + "/consultar_email",{
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email: email})
            })
                .then(function(response){
                    return response.json();
                })
                .catch(function(error){
                    console.log(error);
                    alert("falha no aplicativo");
                });
        },
        consultarEmail: async function()
        {
            this.listaEmailCadastrado = await this.resourceConsultaEmail(this.apiPath, this.email);
        },
        resourceCadastrarUsr: async function(basePath, objDados)
        {
            await fetch(basePath + "/create_user",{
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: objDados.email,
                    senha: objDados.senha,
                    copia_senha: objDados.copiaSenha,
                    nome: objDados.nome
                })
            })
                .then(function(response){
                    if(response.status != 201)
                        throw "Falha no cadastro!";
                })
                .catch(function(error){
                    console.log(error);
                    throw error;
                });
        },
        cadastrarUsuario: async function()
        {
            try 
            {
                await this.resourceCadastrarUsr(this.apiPath, this);
                router.push({name: "Cadastro Realizado"});
            }
            catch(error)
            {
                alert(error);
            }
        }
    }
}
</script>