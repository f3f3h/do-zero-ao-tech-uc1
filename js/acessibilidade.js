const botaoAcessibilidade = document.getElementById("botaoAcessibilidade");
const menuAcessibilidade = document.getElementById("menuAcessibilidade");
const fecharAcessibilidade = document.getElementById("fecharAcessibilidade");

let tamanhoFonte = 100;
let leituraAoPassar = false;
let elementoAnterior = null;

botaoAcessibilidade.addEventListener("click", function() {
    const aberto = menuAcessibilidade.classList.toggle("aberto");

    botaoAcessibilidade.setAttribute("aria-expanded", aberto);
    menuAcessibilidade.setAttribute("aria-hidden", !aberto);
});

fecharAcessibilidade.addEventListener("click", function() {
    menuAcessibilidade.classList.remove("aberto");

    botaoAcessibilidade.setAttribute("aria-expanded", "false");
    menuAcessibilidade.setAttribute("aria-hidden", "true");
});

document.getElementById("aumentarTexto").addEventListener("click", function() {
    if (tamanhoFonte < 140) {
        tamanhoFonte += 10;
        document.documentElement.style.fontSize = tamanhoFonte + "%";
    }
});

document.getElementById("diminuirTexto").addEventListener("click", function() {
    if (tamanhoFonte > 80) {
        tamanhoFonte -= 10;
        document.documentElement.style.fontSize = tamanhoFonte + "%";
    }
});

document.getElementById("altoContraste").addEventListener("click", function() {
    document.body.classList.toggle("alto-contraste");
    this.classList.toggle("ativo");
});

document.getElementById("contrasteNegativo").addEventListener("click", function() {
    document.body.classList.toggle("contraste-negativo");
    this.classList.toggle("ativo");
});

document.getElementById("destacarLinks").addEventListener("click", function() {
    document.body.classList.toggle("destacar-links");
    this.classList.toggle("ativo");
});

document.getElementById("lerAoPassar").addEventListener("click", function() {
    leituraAoPassar = !leituraAoPassar;

    this.classList.toggle("ativo", leituraAoPassar);

    if (!leituraAoPassar) {
        speechSynthesis.cancel();
        elementoAnterior = null;
    }
});

function lerElemento(elemento) {
    if (!leituraAoPassar) {
        return;
    }

    if (elemento === elementoAnterior) {
        return;
    }

    const texto = elemento.innerText || elemento.getAttribute("aria-label");

    if (!texto || texto.trim() === "") {
        return;
    }

    elementoAnterior = elemento;

    speechSynthesis.cancel();

    const fala = new SpeechSynthesisUtterance(texto.trim());

    fala.lang = "pt-BR";
    fala.rate = 0.9;
    fala.pitch = 1;

    speechSynthesis.speak(fala);
}

document.addEventListener("mouseover", function(event) {
    const elemento = event.target.closest("h1, h2, h3, h4, p, li, button, a, label");

    if (elemento) {
        lerElemento(elemento);
    }
});

document.addEventListener("focusin", function(event) {
    const elemento = event.target.closest("h1, h2, h3, h4, p, li, button, a, label");

    if (elemento) {
        lerElemento(elemento);
    }
});

document.getElementById("restaurarAcessibilidade").addEventListener("click", function() {
    tamanhoFonte = 100;
    leituraAoPassar = false;
    elementoAnterior = null;

    document.documentElement.style.fontSize = "100%";

    document.body.classList.remove(
        "alto-contraste",
        "contraste-negativo",
        "destacar-links"
    );

    document.querySelectorAll(".opcao-acessibilidade").forEach(function(botao) {
        botao.classList.remove("ativo");
    });

    speechSynthesis.cancel();
});