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