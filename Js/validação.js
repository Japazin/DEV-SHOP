class ValidaFormula {
  constructor() {
    this.formulario = document.querySelector(".formulario");
    this.eventos();
  }
  eventos() {
    this.formulario.addEventListener('submit', (e) => {
      this.handleSubmit(e);
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const camposValidoss = this.camposValidos();
    const senhasValidass = this.senhasValidas();

    if(camposValidoss && senhasValidass){
      alert('Fromulário enviado');
      this.formulario.submit();
      //inserir salvar dados aqui
      this.salvarUsuario();
    }
  }
//  salvarUsuario(){
//   const usuario= {
    // this.nome=nome;
    // this.sobreNome=nome;
    // this.cpf=cpf;
    // this.nomeUsuario=usuario;
    // this.senha=senha;


//   }
  
//     const usuario0 = JSON.stringify(usuariodatabase);
//     localStorage.setItem("tarefas", usuario0);
//     console.log(usuario0)
//  }

  senhasValidas() {
    let valid =true;
    const senha = this.formulario.querySelector('.Senha');
    const repetirSenha =this.formulario.querySelector('.Repetir-senha');

    if(senha.value !== repetirSenha.value){
      valid = false;
      this.criaerro(senha,'Campos senha e repetir senha precisam ser iguais.');
      this.criaerro(repetirSenha,'Campos senha e repetir senha precisam ser iguais.');
    }
    if(senha.value.length < 6 || senha.value.length > 12){
      valid = false;
      this.criaerro(senha, 'Senha precisa estar entre 6 e 12 caracteres.')
    }
    return valid;
  }
  camposValidos() {
    let valid = true;

    for (let erroText of this.formulario.querySelectorAll(".erro-text")) {
      erroText.remove();
    }

    for (let campo of this.formulario.querySelectorAll(".validar")) {
      const label = campo.previousElementSibling.innerText;

      if (!campo.value) {
        this.criaerro(campo, `campo "${label}" não pode estar vazio.`);
        valid = false;
      }
      if (campo.classList.contains("CPF")) {
        if (!this.validacpf(campo)) valid = false;
      }
      if (campo.classList.contains("Usuário")) {
        if (!this.validaUsuario(campo)) valid = false;
      }
    }
    return valid;
  }

  validaUsuario(campo) {
    const usuario = campo.value;
    let valid = true;

    if (usuario.length < 3 || usuario.length > 12) {
      this.criaerro(campo, "Usuário precisa ter entre 3 e 12 caracteres.");
      valid = false;
    }
    if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
      this.criaerro(
        campo,
        "Nome do usuário precisa conter apenas letras e/ou números."
      );
      valid = false;
    }
    return valid;
  }

  validacpf(campo) {
    const cpf = new ValidaCPF(campo.value);

    if (!cpf.valida()) {
      this.criaerro(campo, "CPF inválido.");
      return false;
    }
    return true;
  }

  criaerro(campo, msg) {
    const div = document.createElement("div");
    div.innerHTML = msg;
    div.classList.add("erro-text");
    campo.insertAdjacentElement("afterend", div);
  }
}
const valida = new ValidaFormula();

