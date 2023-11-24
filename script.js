// Declarando variáveis globais
let alunos = [];

// Evento disparado quando o DOM é carregado
document.addEventListener("DOMContentLoaded", function () {
    // Função para carregar dados na tabela
    carrega();

    // Elementos do modal novo cliente
    let btnNovoAluno = document.getElementById("btnNovoAluno");
    let modalNovoAluno = document.getElementById("modalNovoAluno");
    let spanNovoAluno = modalNovoAluno.querySelector(".close");

    // Configurando eventos do modal novo cliente
    btnNovoAluno.onclick = function () {
        modalNovoAluno.style.display = "block";
    };

    spanNovoAluno.onclick = function () {
        modalNovoAluno.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modalNovoAluno) {
            modalNovoAluno.style.display = "none";
        }
    };

    // Adicionando eventos aos botões da tabela
    let botoes = document.querySelectorAll('.btn-info');
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].onclick = function () {
            modal(this);
        };
    }
});

// Função para identificar cliente por placa
function identifica(nome) {
    for (let aluno of alunos) {
        if (aluno.nome === nome.id) {
            return aluno;
        }
    }
    return null;
}

// Função para exibir modal de informações do cliente
function modal(button) {
    let aluno = identifica(button);

    let modal = document.getElementById("myModal");

    if (!modal) {
        console.error("Elemento 'myModal' não encontrado no DOM");
        return;
    }

    let span = modal.querySelector(".close");
    if (!span) {
        console.error("Elemento 'close' não encontrado no DOM");
        return;
    }

    // Elementos do modal de informações do cliente
    let nomeModal = modal.querySelector("#nomeModal");
    let idadeModal = modal.querySelector("#idadeModal");
    let serieModal = modal.querySelector("#serieModal");
    let turmaModal = modal.querySelector("#turmaModal");
    let escolaModal = modal.querySelector("#escolaModal");
    let possuiDeficienciaModal = modal.querySelector("#possuiDeficienciaModal");
    let btnExcluirAluno = modal.querySelector("#btnExcluirAluno");

    if (!nomeModal || !idadeModal || !serieModal || !turmaModal || !escolaModal || !possuiDeficienciaModal || !btnExcluirAluno) {
        console.error("Elementos não encontrados no DOM");
        return;
    }

    // Preenchendo informações no modal
    nomeModal.innerHTML = aluno.nome;
    idadeModal.innerHTML = aluno.idade;
    serieModal.innerHTML = aluno.serie;
    turmaModal.innerHTML = aluno.turma;
    escolaModal.innerHTML = aluno.escola;
    possuiDeficienciaModal.innerHTML = aluno.possuiDeficiencia;

    // Configurando o botão de excluir
    btnExcluirAluno.onclick = function () {
        excluirAluno(aluno.nome);
        modal.style.display = "none";
    };

    span.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    modal.style.display = "block";
}

// Função para excluir cliente
function excluirAluno(nome) {
    alunos = alunos.filter(aluno => aluno.nome !== nome);
    localStorage.setItem("alunos", JSON.stringify(alunos));
    carrega();
}

// Função para carregar dados na tabela
function carrega() {
    let tabela = document.getElementById("alunos");
    alunos = JSON.parse(localStorage.getItem("alunos")) || [];

    tabela.innerHTML = "";

    for (let aluno of alunos) {
        let botaoid = `<td><button id='${aluno.nome}' class='btn-info'>Mais info</button></td>`;
        let linha = `<tr>
            <td>${aluno.nome}</td>
            <td>${aluno.idade}</td>
            <td>${aluno.serie}</td>
            <td>${aluno.turma}</td>
            <td>${aluno.escola}</td>
            <td>${aluno.possuiDeficiencia}</td>            
            ${botaoid}</tr>`;
        tabela.innerHTML += linha;
    }

    // Adicionando eventos aos botões da tabela
    let botoes = document.querySelectorAll('.btn-info');
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].onclick = function () {
            modal(this);
        };
    }
}

// Função para cadastrar novo cliente
function cadastrarAluno() {
    let nome = document.getElementById("nome").value;
    let idade = document.getElementById("idade").value;
    let serie = document.getElementById("serie").value;
    let turma = document.getElementById("turma").value;
    let escola = document.getElementById("escola").value;
    let possuiDeficiencia = document.getElementById("possuiDeficiencia").value;

    // Verifica se a placa já está cadastrada
    if (alunoExistente(nome)) {
        alert("Nome já cadastrado. Insira outro nome.");
        return;
    }

    let novoAluno = {
        nome: nome,
        idade: idade,
        serie: serie,
        turma: turma,
        escola: escola,
        possuiDeficiencia: possuiDeficiencia
    };

    alunos = JSON.parse(localStorage.getItem("alunos")) || [];
    alunos.push(novoAluno);

    // Salva no localStorage
    localStorage.setItem("alunos", JSON.stringify(alunos));

    // Recarrega a tabela após cadastrar um novo cliente
    carrega();

    // Esconde o modal de novo cliente
    modalNovoAluno.style.display = "none";
}

// Função para verificar se o cliente já existe
function alunoExistente(nome) {
    return alunos.some(aluno => aluno.nome === nome);
}