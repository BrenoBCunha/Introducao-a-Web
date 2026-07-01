const form = document.getElementById("formCadastro");
const foto = document.getElementById("foto");
const previewFoto = document.getElementById("previewFoto");
const contadorMensagem = document.getElementById("contadorMensagem");
const indicadorForca = document.getElementById("forcaSenha");
const sucesso = document.getElementById("sucesso");
const erros = {
    nome: document.getElementById("erroNome"),
    email: document.getElementById("erroEmail"),
    telefone: document.getElementById("erroTelefone"),
    nascimento: document.getElementById("erroNascimento"),
    curso: document.getElementById("erroCurso"),
    turno: document.getElementById("erroTurno"),
    interesses: document.getElementById("erroInteresses"),
    senha: document.getElementById("erroSenha"),
    confirmarSenha: document.getElementById("erroConfirmarSenha"),
    foto: document.getElementById("erroFoto"),
    mensagem: document.getElementById("erroMensagem"),
    termos: document.getElementById("erroTermos")
};

restaurarDados(form);
contadorMensagem.textContent = form.mensagem.value.length;

function validarNome() {
    const mensagem = form.nome.value.trim().length < 3 ? "Digite pelo menos 3 caracteres." : "";
    mostrarErro(form.nome, erros.nome, mensagem);
    return !mensagem;
}

function validarEmail() {
    const mensagem = emailValido(form.email.value) ? "" : "Digite um e-mail válido.";
    mostrarErro(form.email, erros.email, mensagem);
    return !mensagem;
}

function validarSenha() {
    const forca = calcularForcaSenha(form.senha.value);
    const mensagem = senhaValida(form.senha.value) ? "" : "Use 8 caracteres, uma letra maiúscula e um número.";

    indicadorForca.textContent = forca ? `Força: ${forca}` : "";
    mostrarErro(form.senha, erros.senha, mensagem);
    return !mensagem;
}

function validarConfirmarSenha() {
    const mensagem = form.confirmarSenha.value === form.senha.value ? "" : "As senhas devem ser iguais.";
    mostrarErro(form.confirmarSenha, erros.confirmarSenha, mensagem);
    return !mensagem;
}

function validarMensagem() {
    const tamanho = form.mensagem.value.trim().length;
    const mensagem = tamanho < 50 || tamanho > 500 ? "A mensagem deve ter entre 50 e 500 caracteres." : "";

    contadorMensagem.textContent = form.mensagem.value.length;
    mostrarErro(form.mensagem, erros.mensagem, mensagem);
    return !mensagem;
}

function validarFormulario() {
    const telefoneOk = telefoneValido(form.telefone.value);
    const idadeOk = form.nascimento.value && idadeMinima(form.nascimento.value, 16);
    const turnoOk = Boolean(form.turno.value);
    const interessesOk = form.querySelectorAll("[name='interesses']:checked").length >= 2;
    const fotoOk = fotoValida(foto.files[0]);
    const termosOk = form.termos.checked;

    mostrarErro(form.telefone, erros.telefone, telefoneOk ? "" : "Use o formato (82) 99999-9999.");
    mostrarErro(form.nascimento, erros.nascimento, idadeOk ? "" : "O aluno deve ter pelo menos 16 anos.");
    mostrarErro(form.curso, erros.curso, form.curso.value ? "" : "Selecione um curso.");
    erros.turno.textContent = turnoOk ? "" : "Escolha um turno.";
    erros.interesses.textContent = interessesOk ? "" : "Selecione no mínimo 2 opções.";
    erros.foto.textContent = fotoOk ? "" : "Envie apenas JPG ou PNG com até 2 MB.";
    erros.termos.textContent = termosOk ? "" : "Aceite os termos.";

    return [validarNome(), validarEmail(), telefoneOk, idadeOk, Boolean(form.curso.value), turnoOk, interessesOk, validarSenha(), validarConfirmarSenha(), validarMensagem(), fotoOk, termosOk].every(Boolean);
}

form.nome.addEventListener("input", validarNome);
form.email.addEventListener("input", validarEmail);
form.senha.addEventListener("input", () => {
    validarSenha();
    validarConfirmarSenha();
});
form.confirmarSenha.addEventListener("input", validarConfirmarSenha);
form.mensagem.addEventListener("input", validarMensagem);

form.telefone.addEventListener("input", () => {
    form.telefone.value = aplicarMascaraTelefone(form.telefone.value);
});

foto.addEventListener("change", () => {
    const arquivo = foto.files[0];
    previewFoto.style.display = arquivo ? "block" : "none";
    if (arquivo) previewFoto.src = URL.createObjectURL(arquivo);
});

form.addEventListener("input", () => salvarDados(form));
form.addEventListener("change", () => salvarDados(form));

form.addEventListener("submit", event => {
    event.preventDefault();
    sucesso.textContent = validarFormulario() ? "Cadastro realizado com sucesso!" : "";
    if (sucesso.textContent) salvarDados(form);
});

form.addEventListener("reset", () => {
    localStorage.removeItem("cadastroAluno");
    document.querySelectorAll(".erro").forEach(erro => erro.textContent = "");
    document.querySelectorAll(".valido, .invalido").forEach(campo => campo.classList.remove("valido", "invalido"));
    indicadorForca.textContent = "";
    previewFoto.style.display = "none";
    sucesso.textContent = "";
    setTimeout(() => contadorMensagem.textContent = "0");
});
