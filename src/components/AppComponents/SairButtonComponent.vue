<template>
    <button v-if="exibirSair" type="button" class="button is-primary" @click="sairApp">Sair</button>
    <!--<router-link v-if="exibirSair" class="button is-primary" to="/sair">
        Sair
    </router-link>-->
</template>
<script>
import router from '@/router';
import { mapGetters,mapActions } from 'vuex';
export default {
    name: "SairButtonComponent",
    computed:{
        ...mapGetters({getJwt: "getJwt"}),
        exibirSair: function()
        {
            return this.getJwt != null;
        },
    },
    methods:{
        ...mapActions({setJwt: "setJwt"}),
        sairApp: function()
        {
            this.setJwt(null);
            router.push({name: "Sair"})
        },
    }
}
</script>