document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault(); // impede o envio padrão do formulário

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Login simples: usuário fixo
  if (username === "admin" && password === "1234") {
    alert("Login realizado com sucesso!");
    // Aqui vamos redirecionar para a tela de cadastro
    window.location.href = "cadastro.html";
  } else {
    alert("Usuário ou senha incorretos!");
  }
});

// Cadastro de pessoas
document.getElementById("cadastroForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;

  const tabela = document.getElementById("tabelaPessoas").getElementsByTagName("tbody")[0];
  const novaLinha = tabela.insertRow();

  novaLinha.insertCell(0).innerText = nome;
  novaLinha.insertCell(1).innerText = email;
  novaLinha.insertCell(2).innerText = telefone;

  // Botões de ação
  const acoes = novaLinha.insertCell(3);
  acoes.innerHTML = `
    <button onclick="editar(this)">Editar</button>
    <button onclick="excluir(this)">Excluir</button>
  `;

  // Limpar formulário
  document.getElementById("cadastroForm").reset();
});

// Função excluir
function excluir(botao) {
  const linha = botao.parentNode.parentNode;
  linha.remove();
}

// Função editar
function editar(botao) {
  const linha = botao.parentNode.parentNode;
  document.getElementById("nome").value = linha.cells[0].innerText;
  document.getElementById("email").value = linha.cells[1].innerText;
  document.getElementById("telefone").value = linha.cells[2].innerText;

  linha.remove(); // remove a linha antiga para cadastrar de novo
}

// Função para carregar dados salvos
function carregarPessoas() {
  const pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];
  const tabela = document.getElementById("tabelaPessoas").getElementsByTagName("tbody")[0];
  tabela.innerHTML = ""; // limpa antes de carregar

  pessoas.forEach(pessoa => {
    const novaLinha = tabela.insertRow();
    novaLinha.insertCell(0).innerText = pessoa.nome;
    novaLinha.insertCell(1).innerText = pessoa.email;
    novaLinha.insertCell(2).innerText = pessoa.telefone;

    const acoes = novaLinha.insertCell(3);
    acoes.innerHTML = `
      <button onclick="editar(this)">Editar</button>
      <button onclick="excluir(this)">Excluir</button>
    `;
  });
}

// Cadastro de pessoas com LocalStorage
document.getElementById("cadastroForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;

  const pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];
  pessoas.push({ nome, email, telefone });
  localStorage.setItem("pessoas", JSON.stringify(pessoas));

  carregarPessoas();
  document.getElementById("cadastroForm").reset();
});

// Excluir pessoa
function excluir(botao) {
  const linha = botao.parentNode.parentNode;
  const nome = linha.cells[0].innerText;

  let pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];
  pessoas = pessoas.filter(p => p.nome !== nome);
  localStorage.setItem("pessoas", JSON.stringify(pessoas));

  carregarPessoas();
}

// Editar pessoa
function editar(botao) {
  const linha = botao.parentNode.parentNode;
  document.getElementById("nome").value = linha.cells[0].innerText;
  document.getElementById("email").value = linha.cells[1].innerText;
  document.getElementById("telefone").value = linha.cells[2].innerText;

  excluir(botao); // remove a antiga para cadastrar de novo
}

// Carregar ao abrir a página
window.onload = carregarPessoas;

document.addEventListener("DOMContentLoaded", function () {
  const formLogin = document.querySelector("form");

  formLogin.addEventListener("submit", function (event) {
    event.preventDefault(); // impede o envio padrão do formulário

    // Aqui você pode validar usuário e senha, se quiser
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    // Exemplo simples: qualquer login leva para o cadastro
    if (usuario && senha) {
      window.location.href = "cadastro.html";
    } else {
      alert("Preencha usuário e senha!");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const formCadastro = document.getElementById("formCadastro");
  const lista = document.getElementById("lista");

  if (formCadastro) {
    formCadastro.addEventListener("submit", function (event) {
      event.preventDefault();

      const nome = document.getElementById("nome").value;
      const idade = document.getElementById("idade").value;
      const email = document.getElementById("email").value;

      // Criar elemento para mostrar os dados
      const pessoa = document.createElement("p");
      pessoa.textContent = `Nome: ${nome}, Idade: ${idade}, Email: ${email}`;

      lista.appendChild(pessoa);

      // Limpar formulário
      formCadastro.reset();
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const formCadastro = document.getElementById("formCadastro");
  const lista = document.getElementById("lista");

  if (formCadastro) {
    formCadastro.addEventListener("submit", function (event) {
      event.preventDefault();

      const nome = document.getElementById("nome").value;
      const idade = document.getElementById("idade") ? document.getElementById("idade").value : "";
      const email = document.getElementById("email").value;
      const telefone = document.getElementById("telefone") ? document.getElementById("telefone").value : "";

      // Criar uma nova linha na lista
      const linha = document.createElement("tr");

      linha.innerHTML = `
        <td>${nome}</td>
        <td>${idade || telefone}</td>
        <td>${email}</td>
        <td><button class="remover">Remover</button></td>
      `;

      lista.appendChild(linha);

      // Limpar formulário
      formCadastro.reset();

      // Adicionar ação de remover
      linha.querySelector(".remover").addEventListener("click", function () {
        linha.remove();
      });
    });
  }
});

document.getElementById("cadastroForm").addEventListener("submit", function(event) {
    event.preventDefault(); // impede envio automático

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();

    const tabela = document.getElementById("tabelaPessoas").getElementsByTagName("tbody")[0];
    const mensagemDiv = document.getElementById("mensagem");

    let erros = [];

    if (nome === "") {
        erros.push("O campo Nome é obrigatório.");
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "" || !regexEmail.test(email)) {
        erros.push("Informe um e-mail válido.");
    }

    if (telefone === "") {
        erros.push("O campo Telefone é obrigatório.");
    }

    if (erros.length > 0) {
        mensagemDiv.style.color = "red";
        mensagemDiv.innerHTML = erros.join("<br>");
    } else {
        mensagemDiv.style.color = "green";
        mensagemDiv.innerHTML = "Cadastro realizado com sucesso!";

        // Adiciona a nova pessoa na tabela
        const novaLinha = tabela.insertRow();
        novaLinha.insertCell(0).innerText = nome;
        novaLinha.insertCell(1).innerText = email;
        novaLinha.insertCell(2).innerText = telefone;
        novaLinha.insertCell(3).innerHTML = "<button>Remover</button>";
    }
});

<div id="mensagem"></div>



