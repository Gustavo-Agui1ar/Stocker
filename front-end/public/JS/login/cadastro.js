  import Verificacao from "./verificações.js";

  const verificacao = new Verificacao();

  let botao = document.getElementById("btn");

  botao.onclick = async function(event) {
    
    event.preventDefault();
    let email = document.getElementById("email_cadastro");
    let senha = document.getElementById("senha_cadastro");
    let usuario = document.getElementById("usuario");
    let mensagemFeedback = document.getElementById("mensagem_feedback");

    verificacao.limparErrosCadastro(email, senha, usuario);
    
    let valido = true;

    if (!email.value || !verificacao.validarEmail(email.value)) {
      verificacao.adicionarEstadoErro(email, "Por favor, insira um e-mail válido.");
      valido = false;
    }

    if (!senha.value) {
      verificacao.adicionarEstadoErro(senha, "Por favor, insira uma senha.");
      valido = false;
    }

    if (!usuario.value) {
      verificacao.adicionarEstadoErro(usuario,"Por favor, insira um nome.");
      valido = false;
    }

    if(valido) {
      const dadosUsuario = {
        usuario: usuario.value,
        email: email.value,
        senha: senha.value
      };

      //logica para criação de usuario
      const response = await fetch('http://localhost:8080/User/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosUsuario)
      });

      if(response.ok) {
        mensagemFeedback.textContent = "Usuário cadastrado com sucesso!";
        mensagemFeedback.style.color = "green";
        mensagemFeedback.style.display = "block";
        
        setTimeout(() => {
          window.location.href = "./login.html";
        }, 2000);
      }

      else if(response.status == 422) {
        verificacao.adicionarEstadoErro(email, "Email ou usuario já cadastrados.");
        verificacao.adicionarEstadoErro(usuario, "Email ou usuario já cadastrados.");
      }   
    }
};

["email_cadastro", "senha_cadastro", "usuario"].forEach(id => {
  let atribute = document.getElementById(id)
  atribute.addEventListener("input", function() {
    verificacao.removerEstadoErro(this);
  });
  atribute.value = '';
});