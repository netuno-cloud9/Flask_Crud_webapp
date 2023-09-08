// Função para carregar a lista de veículos quando a página é carregada
document.addEventListener("DOMContentLoaded", function () {
    carregarVeiculos();

    // Função para carregar os veículos
    function carregarVeiculos() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/veiculos", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var veiculos = JSON.parse(xhr.responseText);

                console.log("veiculos");

                var listaVeiculos = document.getElementById("veiculos-lista");
                listaVeiculos.innerHTML = "";

                if (veiculos.length === 0) {
                    listaVeiculos.innerHTML = "<p>Nenhum veículo cadastrado.</p>";
                    return;
                }

                // Crie uma tabela para exibir os veículos
                var table = document.createElement("table");
                table.classList.add("table");

                var thead = document.createElement("thead");
                var tr = document.createElement("tr");
                var th1 = document.createElement("th");
                var th2 = document.createElement("th");
                var th3 = document.createElement("th");
                var th4 = document.createElement("th");
                var th5 = document.createElement("th");
                var th6 = document.createElement("th");
                var th7 = document.createElement("th");
                var th8 = document.createElement("th");
                var th9 = document.createElement("th");
                var th10 = document.createElement("th");

                th1.textContent = "ID";
                th2.textContent = "Tipo";
                th3.textContent = "Cor";
                th4.textContent = "Marca";
                th5.textContent = "Modelo";
                th6.textContent = "Ano de Fabricação";
                th7.textContent = "Estado";
                th8.textContent = "Km Rodados";
                th9.textContent = "Leilão";
                th10.textContent = "Formas de Pagamento";

                tr.appendChild(th1);
                tr.appendChild(th2);
                tr.appendChild(th3);
                tr.appendChild(th4);
                tr.appendChild(th5);
                tr.appendChild(th6);
                tr.appendChild(th7);
                tr.appendChild(th8);
                tr.appendChild(th9);
                tr.appendChild(th10);
                thead.appendChild(tr);
                table.appendChild(thead);

                var tbody = document.createElement("tbody");

                for (var i = 0; i < veiculos.length; i++) {
                    var veiculo = veiculos[i];

                    var tr = document.createElement("tr");
                    var td1 = document.createElement("td");
                    var td2 = document.createElement("td");
                    var td3 = document.createElement("td");
                    var td4 = document.createElement("td");
                    var td5 = document.createElement("td");
                    var td6 = document.createElement("td");
                    var td7 = document.createElement("td");
                    var td8 = document.createElement("td");
                    var td9 = document.createElement("td");
                    var td10 = document.createElement("td");

                    td1.textContent = veiculo.id;
                    td2.textContent = veiculo.tipo;
                    td3.textContent = veiculo.cor;
                    td4.textContent = veiculo.marca;
                    td5.textContent = veiculo.modelo;
                    td6.textContent = veiculo.ano_fabricacao;
                    td7.textContent = veiculo.estado;
                    td8.textContent = veiculo.km_rodados;
                    td9.textContent = veiculo.leilao;
                    td10.textContent = veiculo.formas_pagamento;

                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tr.appendChild(td4);
                    tr.appendChild(td5);
                    tr.appendChild(td6);
                    tr.appendChild(td7);
                    tr.appendChild(td8);
                    tr.appendChild(td9);
                    tr.appendChild(td10);
                    tbody.appendChild(tr);
                }

                table.appendChild(tbody);
                listaVeiculos.appendChild(table);
            }
        };
        xhr.send();
    }

    // Função para adicionar um veículo
    document.getElementById("adicionar-form").addEventListener("submit", function (e) {
        e.preventDefault();

        var tipo = document.getElementById("tipo").value;
        var cor = document.getElementById("cor").value;
        var marca = document.getElementById("marca").value;
        var modelo = document.getElementById("modelo").value;
        var anoFabricacao = document.getElementById("ano-fabricacao").value;
        var estado = document.getElementById("estado").value;
        var kmRodados = document.getElementById("km-rodados").value;

        // Verifica se a caixa de seleção "leilao" está marcada
        var leilaoCheckbox = document.getElementById("leilao");
        var leilao = leilaoCheckbox.checked ? 1 : 0; // Envia 1 se marcado, 0 se não marcado

        var formasPagamento = document.getElementById("formas-pagamento").value;

        var veiculo = {
            tipo: tipo,
            cor: cor,
            marca: marca,
            modelo: modelo,
            ano_fabricacao: anoFabricacao,
            estado: estado,
            km_rodados: kmRodados,
            leilao: leilao, 
            formas_pagamento: formasPagamento,
        };

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/veiculos", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    carregarVeiculos();
                    limparCampos();
                } else {
                    console.error("Erro ao adicionar veículo:", xhr.status, xhr.statusText);
                }
            }
        };
        var formData = "tipo=" + encodeURIComponent(veiculo.tipo) + "&cor=" + encodeURIComponent(veiculo.cor) + "&marca=" + encodeURIComponent(veiculo.marca) + "&modelo=" + encodeURIComponent(veiculo.modelo) + "&ano_fabricacao=" + encodeURIComponent(veiculo.ano_fabricacao) + "&estado=" + encodeURIComponent(veiculo.estado) + "&km_rodados=" + encodeURIComponent(veiculo.km_rodados) + "&leilao=" + veiculo.leilao + "&formas_pagamento=" + encodeURIComponent(veiculo.formas_pagamento);
        xhr.send(formData);
    });

    // Função para excluir um veículo
    document.getElementById("excluir-form").addEventListener("submit", function (e) {
        e.preventDefault();

        var idExcluir = document.getElementById("id-excluir").value;

        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", `/veiculos/excluir/${idExcluir}`, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    carregarVeiculos();
                    document.getElementById("id-excluir").value = "";
                } else {
                    console.error("Erro ao excluir veículo:", xhr.status, xhr.statusText);
                }
            }
        };
        xhr.send();
    });

    // Função para limpar os campos do formulário após adicionar um veículo
    function limparCampos() {
        document.getElementById("tipo").value = "";
        document.getElementById("cor").value = "";
        document.getElementById("marca").value = "";
        document.getElementById("modelo").value = "";
        document.getElementById("ano-fabricacao").value = "";
        document.getElementById("estado").value = "";
        document.getElementById("km-rodados").value = "";
        document.getElementById("leilao").checked = false;
        document.getElementById("formas-pagamento").value = "";
    }
});
