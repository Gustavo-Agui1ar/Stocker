import Verificacao from "./verificações.js";

const verificacao = new Verificacao();
const botao = document.getElementById("btn");

botao.onclick = async function(event) {
  
  //temporario
  window.location.href = "../Main/products.html";

  event.preventDefault();
  let username = document.getElementById("usuario");
  let senha = document.getElementById("senha_login");
  
  verificacao.limparErros(username, senha);
  
  let valido = true;
  
  if (!username.value) {
    verificacao.adicionarEstadoErro(username, "Por favor, insira um nome de usuário.");
    valido = false;
  }
  
  if (!senha.value) {
    verificacao.adicionarEstadoErro(senha,"Por favor, insira uma senha.");
    valido = false;
  }
  
  if(valido) {
    const dadosUsuario = {
      username: username.value,
      email: "",  // Ou null se preferir
      password: senha.value
    };
    
    console.log(dadosUsuario);

    const response = await fetch(`http://localhost:8080/User/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dadosUsuario)
    });
    
    if(response.ok) {
      window.location.href = "./index.html";
    } else {
      verificacao.adicionarEstadoErro(username, "Usuário ou senha inválidos.");
      verificacao.adicionarEstadoErro(senha, "Usuário ou senha inválidos.");
    }
  }
};