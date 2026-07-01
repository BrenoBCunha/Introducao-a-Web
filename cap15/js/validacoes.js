function emailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function telefoneValido(telefone) {
    return /^\(82\) 9\d{4}-\d{4}$/.test(telefone);
}

function idadeMinima(data, idade) {
    const nascimento = new Date(data);
    const hoje = new Date();
    let anos = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        anos--;
    }

    return anos >= idade;
}

function senhaValida(senha) {
    return senha.length >= 8 && /[A-Z]/.test(senha) && /\d/.test(senha);
}

function calcularForcaSenha(senha) {
    let pontos = 0;

    if (senha.length >= 8) pontos++;
    if (/[A-Z]/.test(senha)) pontos++;
    if (/\d/.test(senha)) pontos++;

    if (pontos === 3) return "Forte";
    if (pontos === 2) return "Média";
    return senha ? "Fraca" : "";
}

function fotoValida(foto) {
    if (!foto) return true;
    return ["image/jpeg", "image/png"].includes(foto.type) && foto.size <= 2 * 1024 * 1024;
}
