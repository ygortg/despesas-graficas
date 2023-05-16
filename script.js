let loadingScreen = document.querySelector(".loading");
let logoLoadingScreen = document.querySelector(".logo");
//Habilita uma função assim que a tela for carregada de uma animação de fade out
window.onload = function () {
  setTimeout(function () {
    loadingScreen.classList.add("desactive");
  }, 2000);
};

let divGraficoBarras = document.querySelector("#grafico-barras");
fetch("data.json").then((response) => {
  response.json().then((data) => {
    let dias = [];
    let montantes = [];
    data.financas.forEach((financa) => {
      dias.push(financa.dia);
      montantes.push(financa.montante);
    });

    new Chart(divGraficoBarras, {
      type: "bar",
      data: {
        labels: dias,
        datasets: [
          {
            label: "Gastos do dia",
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

// Processa o envio do formulário
modalForm.addEventListener("submit", function(event) {
  event.preventDefault();
});

function salvarDados() {
    // Obtem os valores dos inputs
    const saldo = parseFloat(document.getElementById("saldo").value);
    const dom = parseFloat(document.getElementById("dom").value);
    const seg = parseFloat(document.getElementById("seg").value);
    const ter = parseFloat(document.getElementById("ter").value);
    const quar = parseFloat(document.getElementById("quar").value);
    const qui = parseFloat(document.getElementById("qui").value);
    const sex = parseFloat(document.getElementById("sex").value);
    const sab = parseFloat(document.getElementById("sab").value);
  
    // Obtem os dados do arquivo JSON
    fetch("data.json")
      .then((response) => response.json())
      .then((data) => {
        // Atualiza os dados do arquivo JSON com os novos valores
        data.financas[0].montante = dom;
        data.financas[1].montante = seg;
        data.financas[2].montante = ter;
        data.financas[3].montante = quar;
        data.financas[4].montante = qui;
        data.financas[5].montante = sex;
        data.financas[6].montante = sab;
  
        // Salva os dados atualizados no arquivo JSON
        fetch("data.json", {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }).then(() => {
          // Exibe uma mensagem de sucesso
          alert("Dados salvos com sucesso!");
        });
      });
      modal.style.display = "none";
  }
  