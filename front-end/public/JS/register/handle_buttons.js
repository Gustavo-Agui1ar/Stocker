
import DataForm from "./dataForm.js";

class BtnSendData {
  constructor(form, btn, url, textAlert) {
    this.dataForm = new DataForm(form);
    this.textAlert = textAlert;
    this.btn = btn;
    this.url = url;
    this.basicUrl = "http://localhost:8080/register/";
    this.init();
  }

  init() {
    this.btn.addEventListener('click', () => {
      if(this.url === "client")
        this.sendDataClient();
      else
        this.sendData();
    });
  }
  
  async sendData() {
    console.log('Sending data...');
    const response = await this.postData();
    this.responseLog(response);
    return response;
  }

  async postData() {
    const response = await fetch(`${this.basicUrl}${this.url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.dataForm.getData()),
    });
    return response;
  }

  async sendDataClient() {

    console.log('Sending data client...');
    const responseClient = await this.postData();
    this.responseLog(responseClient);
    
    console.log('Sending data image...');
    const id = await responseClient.json();
    let datafile = new FormData();
    datafile.append("file", this.dataForm.getFile());
    datafile.append('id', id);

    const responseImage = await fetch(`${this.basicUrl}image`, {
      method: 'POST',
      body: datafile,
    });
    this.responseLog(responseImage);
  }

  async responseLog(response) {
    this.textAlert.style.display = "block";
    
    if (response.ok) {
        this.dataForm.clearForm();
        this.textAlert.style.color = "green";
        this.textAlert.textContent = await response.text();

        setTimeout(() => {
            this.textAlert.style.animation = "fadeOut 1s forwards";
            setTimeout(() => {
                this.textAlert.style.display = "none";
                this.textAlert.style.animation = "";
            }, 1000);
        }, 2000);

        console.log('Data sent successfully');
    } else {
        this.textAlert.style.color = "red";
        this.textAlert.textContent = await response.text();
        
        this.textAlert.classList.remove("success");

        console.log('Failed to send data');
    }
  }
}


const btnProduct = new BtnSendData(document.querySelector('.product form'), document.querySelector('#btn-product'), "product", document.querySelector(".product .info-text"));
const btnProvider = new BtnSendData(document.querySelector('.provider form'), document.querySelector('#btn-provider'), "provider", document.querySelector(".order .info-text"));
const btnClient = new BtnSendData(document.querySelector('.client form'), document.querySelector('#btn-client'), "client", document.querySelector(".order .info-text"));
const btnOrder = new BtnSendData(document.querySelector('.order form'), document.querySelector('#btn-order'), "order", document.querySelector(".order .info-text"));