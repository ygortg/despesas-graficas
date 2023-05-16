let loadingScreen = document.querySelector(".loading");
let logoLoadingScreen = document.querySelector(".logo");

//Habilita uma função assim que a tela for carregada de uma animação de fade out
window.onload = function () {
  setTimeout(function () {
    loadingScreen.classList.add("desactive");
  }, 2000);
};

let divGraficoBarras = document.querySelector("#grafico-barras");
let chart; // Declaração da variável de gráfico

fetch("data.json").then((response) => {
  response.json().then((data) => {
    let dias = [];
    let montantes = [];
    data.financas.forEach((financa) => {
      dias.push(financa.dia);
      montantes.push(financa.montante);
    });

    chart = new Chart(divGraficoBarras, { // Atribuição do objeto de gráfico à variável
      type: "bar",
      data: {
        labels: dias,
        datasets: [
          {
            label: "Gastos da Semana",
            backgroundColor: "hsl(10, 79%, 65%)",
            borderColor: "hsl(10, 79%, 65%)",
            hoverBackgroundColor: "hsl(186, 34%, 60%)",
            hoverBorderColor: "hsl(186, 34%, 60%)",
            borderWidth: 1,
            data: montantes,
          },
        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  });
});

const openModalBtn = document.getElementById("open-modal-btn");
const modal = document.getElementById("modal");
const closeBtn = document.getElementsByClassName("close")[0];
const modalForm = document.getElementById("modal-form");

// Abre o modal quando o botão é clicado
openModalBtn.onclick = function() {
  modal.style.display = "block";
}

// Fecha o modal quando o botão "X" é clicado
closeBtn.onclick = function() {
  modal.style.display = "none";
}

// Fecha o modal quando o usuário clica fora da área do modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Função para atualizar os dados do gráfico
function atualizarGrafico() {
  chart.update();
}

// Função para atualizar os dados do gráfico com base nos valores do formulário
function atualizarDados() {
  let saldo = document.getElementById('saldo');
  let saldoImpresso = document.querySelector("#saldoImpresso");
  let semana1 = parseFloat(document.getElementById('sem1').value);
  let semana2 = parseFloat(document.getElementById('sem2').value);
  let semana3 = parseFloat(document.getElementById('sem3').value);
  let semana4 = parseFloat(document.getElementById('sem4').value);
  let semana5 = parseFloat(document.getElementById('sem5').value);
  let divida = document.querySelector("#divida");

  // Atualiza os dados no gráfico
  chart.data.datasets[0].data = [semana1, semana2, semana3, semana4, semana5];
  
  //Somas Gasto
  soma = semana1 + semana2 + semana3 + semana4 + semana5;

  //valor do saldo
  subtraiSaldo = saldo.value - soma;
  saldoImpresso.textContent = "R$ " + subtraiSaldo;
  
  //Contas da dívida
  divida.textContent = "R$ " + soma;
  atualizarGrafico();
    closeModal();
  }
    
    