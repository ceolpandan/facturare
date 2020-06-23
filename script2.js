
window.onload = function(){
      displayClients();
      clearInput();
    if(readClientsFromLocalStorage().length != 0) {

        var bc = document.querySelectorAll(".clickClient");
        for (var i = 0; i < bc.length; i++) {
            bc[i].addEventListener("click", function (e) {
                if(this.textContent[1] == " "){
                    var index = parseInt(this.textContent[0]) - 1;
                    var clientCurent = readClientsFromLocalStorage()[index];
                    console.log(index);
                    fillRec(clientCurent);
                    document.getElementById('ordineFactura').value = "";
                    document.getElementById('ordineChitanta').value = "";
                    document.getElementById('totalChitanta').value = "";
                    document.getElementById('totalFactura').value = "";
                }else{
                    var index = parseInt(this.textContent[0] +this.textContent[1])-1;
                    var clientCurent = readClientsFromLocalStorage()[index];
                    console.log(index);
                    fillRec(clientCurent);
                    document.getElementById('ordineFactura').value = "";
                    document.getElementById('ordineChitanta').value = "";
                    document.getElementById('totalChitanta').value = "";
                    document.getElementById('totalFactura').value = "";
                }
            });
        }
    }
};

document.getElementById("btn-new").addEventListener("click", function(){

	var client = {nume: " ", nrregcom: " ", cif: " ", sediu:" ", judet:" ", cont:" ", banca:" "};
	
      client.nume = document.getElementById("customer-name").value;
      client.nrregcom = document.getElementById("customer-nrc").value;
      client.cif = document.getElementById("customer-cif").value;
      client.sediu = document.getElementById("customer-sed").value;
      client.judet = document.getElementById("customer-jud").value;
      client.cont = document.getElementById("customer-cont").value;
      client.banca = document.getElementById("customer-bank").value;

    var clients = readClientsFromLocalStorage();

      clients.push(client);
      localStorage.setItem("tabelClienti", JSON.stringify(clients));
      appendClient(client, clients.length);
      clearInput();
});
document.getElementById("btn-del").addEventListener("click", function(){
    clienti.pop();
    localStorage.setItem("tabelClienti", JSON.stringify(clienti));
    appendClient(client);
    location.reload();
});


function appendClient(client, index){

  var s =index + " " + client.nume + ", " + client.judet;
  var txt = document.createTextNode(s);
  var btn = document.createElement("button");
  btn.className = "clickClient";
  btn.appendChild(txt);

  document.getElementById("customers-table").appendChild(btn);
}
function fillRec(client){
      document.getElementById("numeClient").value = client.nume;
      document.getElementById("numeClientC").value = client.nume;
      document.getElementById("nrRegClient").value = client.nrregcom;
      document.getElementById("nrRegClientC").value = client.nrregcom;
      document.getElementById("cifClient").value = client.cif;
      document.getElementById("cifClientC").value = client.cif;
      document.getElementById("sediuClient").value = client.sediu;
      document.getElementById("sediuClientC").value = client.sediu + ", " + client.judet;
      document.getElementById("judClient").value = client.judet;
      document.getElementById("contClient").value = client.cont;
      document.getElementById("bankClient").value = client.banca;
}

function readClientsFromLocalStorage(){
    clientsString = localStorage.getItem("tabelClienti");
    clients = JSON.parse(clientsString);
    if (clients == null) {
        console.log("Nu exista clienti (readClFLS).");
        return [];
    } else {
        return clients;
    }
}

function displayClients(){
    var clients = readClientsFromLocalStorage();
    if(clients == null)
        console.log("Nu exista clienti(displayClients() )");
    else{
        for( x=0; x<clients.length; x++)
        appendClient(clients[x], x+1);
    }
}

function screenshot(){
    var nume = document.getElementById('numeClient').value;
    var data = new Date();
    var HTML_Width = $("#factura").width();
    var HTML_Height = $("#factura").height();
    var top_left_margin = 15;
    var PDF_Width = HTML_Width + (top_left_margin * 2);
    var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;

    var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

    html2canvas($("#factura")[0]).then(function (canvas) {
        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
        pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
        for (var i = 1; i <= totalPDFPages; i++) {
            pdf.addPage(PDF_Width, PDF_Height);
            pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
        }
        pdf.save(`${nume}_${data.getDay()}${data.getMonth()}${data.getFullYear()}`);
    });
}

function clearInput(){
    document.getElementById("customer-name").value = " ";
    document.getElementById("customer-nrc").value = " ";
    document.getElementById("customer-cif").value = " ";
    document.getElementById("customer-sed").value = " ";
    document.getElementById("customer-jud").value = " ";
    document.getElementById("customer-cont").value = " ";
    document.getElementById("customer-bank").value = " ";
}

function screenshotFS(){
    var nume = document.getElementById('numeClient').value;
    var data = new Date();
    var HTML_Width = $("#factura-chitanta").width();
    var HTML_Height = $("#factura-chitanta").height();
    var top_left_margin = 15;
    var PDF_Width = HTML_Width + (top_left_margin * 2);
    var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;

    var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

    html2canvas($("#factura-chitanta")[0]).then(function (canvas) {
        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
        pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
        for (var i = 1; i <= totalPDFPages; i++) {
            pdf.addPage(PDF_Width, PDF_Height);
            pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
        }
        pdf.save(`${nume}_${data.getDay()}${data.getMonth()}${data.getFullYear()}`);
    });
}

document.getElementById('dataChitanta').value = document.getElementById('dataFactura').value;
document.getElementById('ordineChitanta').value = document.getElementById('ordineFactura').value;

document.getElementById('totalChitanta').value = document.getElementById('totalFactura').value;
