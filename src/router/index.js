import Vue from 'vue'
import store from '../store'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import CadastrarUsrView from '../views/CadastrarUsrView.vue'
import ListarContatosView from '../views/ListarContatosView.vue'
import IncluirContatoView from '../views/IncluirContatoView.vue'
import ExcluirContatoView from '../views/ExcluirContatoView.vue'
import SairView from '../views/SairView.vue'
import ContatoIncluidoView from '../views/ContatoIncluidoView.vue'
import ContatoExcluidoView from '../views/ContatoExcluidoView.vue'
import CadastroRealizadoView from '../views/CadastroRealizadoView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView
  },
  {
    path: "/CadastrarUsr",
    name: "Cadastrar Usuário",
    component: CadastrarUsrView
  },
  {
    path: "/listarContatos",
    name: "Listar Contatos",
    component: ListarContatosView
  },
  {
    path: "/incluirContato",
    name: "Incluir Contato",
    component: IncluirContatoView
  },
  {
    path: "/excluirContato/:id",
    name: "Excluir Contato",
    component: ExcluirContatoView
  },
  {
    path: "/contatoExcluido",
    name: "Contato Excluido",
    component: ContatoExcluidoView
  },
  {
    path: "/contatoIncluido",
    name: "Contato Incluido",
    component: ContatoIncluidoView
  },
  {
    path: "/cadastroRealizado",
    name: "Cadastro Realizado",
    component: CadastroRealizadoView
  },
  {
    path: "/sair",
    name: "Sair",
    component: SairView
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeResolve(async function(to, from, next)
{
  var getJwt = store.getters['getJwt'];
  if(getJwt == null && ["login", "Cadastrar Usuário", "Cadastro Realizado", "Sair"].indexOf(to.name) == -1)
    next ({ name: 'login' });
  else 
    next();
});

export default router
