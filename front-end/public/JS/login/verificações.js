
class Verificacao {

  limparErros(email, senha) {
    email.classList.remove("error");
    senha.classList.remove("error");
    email.placeholder = email.dataset.placeholderOriginal || "";
    senha.placeholder = senha.dataset.placeholderOriginal || "";
  }
 
  limparErrosCadastro(email, senha, usuario) {
    this.limparErros(email, senha);
    usuario.classList.remove("error");
    usuario.placeholder = usuario.dataset.placeholderOriginal || "";
  }

  adicionarEstadoErro(elemento, texto) {
    elemento.classList.add("error");
    elemento.value = "";
    elemento.placeholder = texto;
    elemento.style.color = "black";
  }
  
  validarEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  }
}

export default Verificacao;