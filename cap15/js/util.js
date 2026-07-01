function mostrarErro(campo, erro, mensagem) {
    erro.textContent = mensagem;
    campo.classList.toggle("invalido", Boolean(mensagem));
    campo.classList.toggle("valido", !mensagem && campo.value.trim() !== "");
}

function aplicarMascaraTelefone(valor) {
    const numeros = valor.replace(/\D/g, "").slice(0, 11);

    if (numeros.length <= 2) return numeros;
    if (numeros.length <= 7) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
}

function camposSalvos(form) {
    return {
        nome: form.nome.value,
        email: form.email.value,
        telefone: form.telefone.value,
        nascimento: form.nascimento.value,
        curso: form.curso.value,
        turno: form.turno.value,
        interesses: [...form.querySelectorAll("[name='interesses']:checked")].map(campo => campo.value),
        mensagem: form.mensagem.value,
        termos: form.termos.checked
    };
}

function salvarDados(form) {
    localStorage.setItem("cadastroAluno", JSON.stringify(camposSalvos(form)));
}

function restaurarDados(form) {
    const dados = JSON.parse(localStorage.getItem("cadastroAluno") || "{}");

    Object.keys(dados).forEach(nome => {
        if (nome === "interesses") {
            dados.interesses.forEach(valor => {
                const campo = form.querySelector(`[name='interesses'][value='${valor}']`);
                if (campo) campo.checked = true;
            });
        } else if (nome === "termos") {
            form.termos.checked = dados.termos;
        } else if (form[nome]) {
            form[nome].value = dados[nome];
        }
    });
}
