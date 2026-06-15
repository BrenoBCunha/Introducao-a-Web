// ==========================
// ELEMENTOS DO DOM
// ==========================

const nomePerfil = document.getElementById("nomePerfil");
const cursoPerfil = document.getElementById("cursoPerfil");
const fotoPerfil = document.getElementById("fotoPerfil");
const biografiaPerfil = document.getElementById("biografiaPerfil");
const perfil = document.getElementById("perfil");

const temaSelect = document.getElementById("temaSelect");
const fonteRange = document.getElementById("fonteRange");
const valorFonte = document.getElementById("valorFonte");
const mostrarBio = document.getElementById("mostrarBio");

const emailInput = document.getElementById("emailInput");
const telefoneInput = document.getElementById("telefoneInput");

const emailExibido = document.getElementById("emailExibido");
const telefoneExibido = document.getElementById("telefoneExibido");

const contadorAcoes = document.getElementById("contadorAcoes");
const ultimaAcao = document.getElementById("ultimaAcao");

const btnAlterarNome = document.getElementById("btnAlterarNome");
const btnAlterarCurso = document.getElementById("btnAlterarCurso");
const btnAlterarFoto = document.getElementById("btnAlterarFoto");
const btnDestacarPerfil = document.getElementById("btnDestacarPerfil");
const btnRestaurar = document.getElementById("btnRestaurar");
const btnAtualizarContato = document.getElementById("btnAtualizarContato");

// ==========================
// DADOS ORIGINAIS
// ==========================

const nomeOriginal = nomePerfil.textContent;
const cursoOriginal = cursoPerfil.textContent;
const fotoOriginal = fotoPerfil.src;

// ==========================
// CONTADOR DE AÇÕES
// ==========================

let totalAcoes = 0;

function registrarAcao(descricao) {
    totalAcoes++;
    contadorAcoes.textContent = totalAcoes;
    ultimaAcao.textContent = descricao;
}

// ==========================
// ALTERAR NOME
// ==========================

btnAlterarNome.addEventListener("click", () => {

    const novoNome = prompt(
        "Digite o novo nome:",
        nomePerfil.textContent
    );

    if (novoNome && novoNome.trim() !== "") {
        nomePerfil.textContent = novoNome;
        registrarAcao("Alteração de nome");
    }

});

// ==========================
// ALTERAR CURSO
// ==========================

btnAlterarCurso.addEventListener("click", () => {

    const novoCurso = prompt(
        "Digite o novo curso:",
        cursoPerfil.textContent
    );

    if (novoCurso && novoCurso.trim() !== "") {
        cursoPerfil.textContent = novoCurso;
        registrarAcao("Alteração de curso");
    }

});

// ==========================
// ALTERAR FOTO
// ==========================

const fotos = [
    "imagens/perfil1.jpg",
    "imagens/perfil2.jpg",
    "imagens/perfil3.jpg"
];

let indiceFoto = 0;

btnAlterarFoto.addEventListener("click", () => {

    indiceFoto++;

    if (indiceFoto >= fotos.length) {
        indiceFoto = 0;
    }

    fotoPerfil.src = fotos[indiceFoto];

    registrarAcao("Alteração de foto");

});


// ==========================
// DESTACAR PERFIL
// ==========================

btnDestacarPerfil.addEventListener("click", () => {

    perfil.classList.add("perfil-destaque");

    registrarAcao("Perfil destacado");

});

// ==========================
// RESTAURAR PERFIL
// ==========================

btnRestaurar.addEventListener("click", () => {

    nomePerfil.textContent = nomeOriginal;
    cursoPerfil.textContent = cursoOriginal;
    fotoPerfil.src = fotoOriginal;

    perfil.classList.remove("perfil-destaque");

    fotoAlternada = false;

    indiceFoto = 0;

    registrarAcao("Perfil restaurado");

});

// ==========================
// ALTERAR TEMA
// ==========================

temaSelect.addEventListener("change", () => {

    document.body.classList.remove(
        "tema-escuro",
        "tema-azul"
    );

    if (temaSelect.value === "escuro") {
        document.body.classList.add("tema-escuro");
    }

    if (temaSelect.value === "azul") {
        document.body.classList.add("tema-azul");
    }

    registrarAcao("Tema alterado");

});

// ==========================
// TAMANHO DA FONTE
// ==========================

fonteRange.addEventListener("input", () => {

    const tamanho = fonteRange.value;

    biografiaPerfil.style.fontSize = tamanho + "px";

    valorFonte.textContent = tamanho + "px";

    registrarAcao("Tamanho da fonte alterado");

});

// ==========================
// MOSTRAR / OCULTAR BIOGRAFIA
// ==========================

mostrarBio.addEventListener("change", () => {

    if (mostrarBio.checked) {
        biografiaPerfil.style.display = "block";
    } else {
        biografiaPerfil.style.display = "none";
    }

    registrarAcao("Exibição da biografia alterada");

});

// ==========================
// ATUALIZAR CONTATO
// ==========================

btnAtualizarContato.addEventListener("click", () => {

    const email = emailInput.value;
    const telefone = telefoneInput.value;

    emailExibido.textContent =
        "E-mail: " + (email || "não informado");

    telefoneExibido.textContent =
        "Telefone: " + (telefone || "não informado");

    registrarAcao("Contato atualizado");

});