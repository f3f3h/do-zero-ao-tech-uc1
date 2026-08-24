// 1. Definição das perguntas e das categorias (A, B, C, D)
const perguntasOriginais = [
    {
        pergunta: "Em um trabalho em grupo, qual parte você prefere?",
        opcoes: [
            { texto: "Transformar a ideia em algo que possa ser usado.", categoria: "A" },
            { texto: "Organizar as informações para entender melhor o assunto.", categoria: "B" },
            { texto: "Conferir os detalhes e evitar possíveis problemas.", categoria: "C" },
            { texto: "Imaginar uma maneira diferente de facilitar o trabalho.", categoria: "D" }
        ]
    },
    {
        pergunta: "Quando um aplicativo recomenda uma música ou um filme, o que mais desperta sua curiosidade?",
        opcoes: [
            { texto: "Como ele consegue descobrir o que você pode gostar.", categoria: "D" },
            { texto: "Como o aplicativo foi criado e como tudo funciona.", categoria: "A" },
            { texto: "O que suas escolhas têm em comum.", categoria: "B" },
            { texto: "Se suas informações estão realmente protegidas.", categoria: "C" }
        ]
    },
    {
        pergunta: "Se pudesse ajudar a melhorar sua escola, bairro ou trabalho, o que faria?",
        opcoes: [
            { texto: "Faria perguntas às pessoas e organizaria as respostas.", categoria: "B" },
            { texto: "Procuraria possíveis riscos e formas de evitá-los.", categoria: "C" },
            { texto: "Imaginaria uma ferramenta que desse sugestões automaticamente.", categoria: "D" },
            { texto: "Criaria uma página para organizar pedidos e ideias.", categoria: "A" }
        ]
    },
    {
        pergunta: "Quando algo estranho acontece na internet, qual seria sua reação?",
        opcoes: [
            { texto: "Tentaria descobrir se alguém quis enganar ou prejudicar outra pessoa.", categoria: "C" },
            { texto: "Procuraria informações para entender o que aconteceu.", categoria: "B" },
            { texto: "Refaria cada passo até encontrar o que deu errado.", categoria: "A" },
            { texto: "Pensaria em uma forma de avisar as pessoas antes que acontecesse novamente.", categoria: "D" }
        ]
    },
    {
        pergunta: "Qual destes projetos você teria mais vontade de experimentar?",
        opcoes: [
            { texto: "Criar uma página ou um aplicativo a partir de uma ideia.", categoria: "A" },
            { texto: "Criar um assistente que ajudasse em tarefas do dia a dia.", categoria: "D" },
            { texto: "Fazer um guia para ajudar as pessoas a proteger suas contas.", categoria: "C" },
            { texto: "Fazer uma pesquisa e apresentar as descobertas.", categoria: "B" }
        ]
    },
    {
        pergunta: "Quando recebe muitas informações, o que costuma fazer?",
        opcoes: [
            { texto: "Organizo e comparo tudo para encontrar uma explicação.", categoria: "B" },
            { texto: "Penso em como transformar aquilo em uma solução prática.", categoria: "A" },
            { texto: "Imagino uma forma de separar ou responder tudo automaticamente.", categoria: "D" },
            { texto: "Verifico o que pode ser compartilhado e o que deve ficar protegido.", categoria: "C" }
        ]
    },
    {
        pergunta: "Qual destas situações deixaria você mais satisfeito?",
        opcoes: [
            { texto: "Perceber que ajudou alguém a evitar um problema.", categoria: "C" },
            { texto: "Ver uma ferramenta aprender com exemplos e melhorar.", categoria: "D" },
            { texto: "Descobrir uma informação importante que ninguém havia percebido.", categoria: "B" },
            { texto: "Ver uma ideia se transformar em algo que realmente funciona.", categoria: "A" }
        ]
    },
    {
        pergunta: "Qual frase mais combina com você?",
        opcoes: [
            { texto: "Gosto de imaginar maneiras mais inteligentes de fazer as coisas.", categoria: "D" },
            { texto: "Presto atenção aos riscos e gosto de manter tudo seguro.", categoria: "C" },
            { texto: "Gosto de criar e transformar ideias em realidade.", categoria: "A" },
            { texto: "Gosto de comparar informações antes de chegar a uma conclusão.", categoria: "B" }
        ]
    }
];

// 2. Resultados mapeados
const paginasResultado = {
    A: "resultado_dev.html",
    B: "resultado_dados.html",
    C: "resultado_seguranca.html",
    D: "resultado_ia.html"
};

const opcoesDesempate = {
    A: "Desenvolvimento de Software",
    B: "Área de Dados",
    C: "Segurança da Informação",
    D: "Inteligência Artificial"
};

// Variáveis de controle
let perguntasEmbaralhadas = [];
let perguntaAtual = 0;
let pontuacao = { A: 0, B: 0, C: 0, D: 0 };
let categoriaSelecionada = null;

function embaralharArray(array) {
    const arrayCopiado = [...array];
    for (let i = arrayCopiado.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrayCopiado[i], arrayCopiado[j]] = [arrayCopiado[j], arrayCopiado[i]];
    }
    return arrayCopiado;
}

function iniciarQuiz() {
    perguntaAtual = 0;
    pontuacao = { A: 0, B: 0, C: 0, D: 0 };
    perguntasEmbaralhadas = embaralharArray(perguntasOriginais);

    document.getElementById("quiz-container").classList.remove("escondido");
    document.getElementById("resultado-container").classList.add("escondido");

    carregarPergunta();
}

function atualizarBarraProgresso() {
    const total = perguntasEmbaralhadas.length;
    const atual = perguntaAtual + 1;
    const porcentagem = Math.round((atual / total) * 100);

    document.getElementById("progresso-texto").innerText = `Pergunta ${atual} de ${total}`;
    document.getElementById("porcentagem-texto").innerText = `${porcentagem}%`;
    document.getElementById("progress-bar-fill").style.width = `${porcentagem}%`;
}

function carregarPergunta() {
    categoriaSelecionada = null;
    const btnProxima = document.getElementById("btn-proxima");
    if (btnProxima) btnProxima.disabled = true;

    atualizarBarraProgresso();

    const q = perguntasEmbaralhadas[perguntaAtual];
    document.getElementById("pergunta").innerText = q.pergunta;

    const containerOpcoes = document.getElementById("opcoes");
    containerOpcoes.innerHTML = "";

    const opcoesEmbaralhadas = embaralharArray(q.opcoes);
    const letras = ["A", "B", "C", "D"];

    opcoesEmbaralhadas.forEach((opcao, index) => {
        const btn = document.createElement("button");
        btn.className = "quiz-option-card";
        btn.innerHTML = `
            <span class="option-badge">${letras[index]}</span>
            <span>${opcao.texto}</span>
        `;
        btn.onclick = () => selecionarOpcao(btn, opcao.categoria);
        containerOpcoes.appendChild(btn);
    });
}

function selecionarOpcao(elemento, categoria) {
    const opcoes = document.querySelectorAll(".quiz-option-card");
    opcoes.forEach(op => op.classList.remove("selected"));

    elemento.classList.add("selected");
    categoriaSelecionada = categoria;
    
    const btnProxima = document.getElementById("btn-proxima");
    if (btnProxima) btnProxima.disabled = false;
}

function confirmarAvanco() {
    if (!categoriaSelecionada) return;

    pontuacao[categoriaSelecionada]++;
    perguntaAtual++;

    if (perguntaAtual < perguntasEmbaralhadas.length) {
        carregarPergunta();
    } else {
        exibirResultado();
    }
}

function exibirResultado() {
    let maiorPontos = -1;
    for (const cat in pontuacao) {
        if (pontuacao[cat] > maiorPontos) {
            maiorPontos = pontuacao[cat];
        }
    }

    const vencedores = Object.keys(pontuacao).filter(
        (cat) => pontuacao[cat] === maiorPontos
    );

    if (vencedores.length === 1) {
        mostrarResultadoFinal(vencedores[0]);
    } else {
        mostrarPerguntaDesempate(vencedores);
    }
}

function mostrarPerguntaDesempate(empatados) {
    document.getElementById("quiz-container").classList.remove("escondido");
    document.getElementById("resultado-container").classList.add("escondido");

    document.getElementById("pergunta").innerText = "Temos um empate! Escolha a opção decisiva:";
    document.getElementById("btn-proxima").classList.add("escondido");

    const containerOpcoes = document.getElementById("opcoes");
    containerOpcoes.innerHTML = "";

    empatados.forEach((cat, index) => {
        const letras = ["A", "B", "C", "D"];
        const btn = document.createElement("button");
        btn.className = "quiz-option-card";
        btn.innerHTML = `
            <span class="option-badge">${letras[index]}</span>
            <span>${opcoesDesempate[cat]}</span>
        `;
        btn.onclick = () => desempatar(cat);
        containerOpcoes.appendChild(btn);
    });
}

function desempatar(categoriaEscolhida) {
    pontuacao[categoriaEscolhida]++;
    mostrarResultadoFinal(categoriaEscolhida);
}

function mostrarResultadoFinal(vencedor) {
    window.location.href = paginasResultado[vencedor];
}

function reiniciarQuiz() {
    iniciarQuiz();
}

// Inicia o quiz após o carregamento da página
document.addEventListener("DOMContentLoaded", function () {
    iniciarQuiz();
});