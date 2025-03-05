
import DataForm from "./dataForm.js";

class BtnSendData {
  constructor(form, btn, url) {
    this.dataForm = new DataForm(form);
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
    console.log(this.dataForm.getData());

    const response = await fetch(`${this.basicUrl}${this.url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.dataForm.getData()),
    });

    this.responseLog(response);
  }

  async sendDataClient() {

    console.log('Sending data client...');
    const responseClient = await fetch(`${this.basicUrl}${this.url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.dataForm.getData()),
    });
    
    this.responseLog(responseClient);
    
    console.log('Sending data image...');
    const id = await responseClient.json();
    console.log(id);
    let datafile = new FormData();
    datafile.append("file", this.dataForm.getFile());
    datafile.append('id', id);

    const responseImage = await fetch(`${this.basicUrl}image`, {
      method: 'POST',
      body: datafile,
    });

    this.responseLog(responseImage);
  }

  responseLog(response) {
    if (response.ok) {
      this.dataForm.clearForm();
      console.log('Data sent successfully');
    } else {
      console.log('Failed to send data');
    }
  }
}


const btnProduct = new BtnSendData(document.querySelector('.product form'), document.querySelector('#btn-product'), "product");
const btnProvider = new BtnSendData(document.querySelector('.provider form'), document.querySelector('#btn-provider'), "provider");
const btnClient = new BtnSendData(document.querySelector('.client form'), document.querySelector('#btn-client'), "client");
const btnOrder = new BtnSendData(document.querySelector('.order form'), document.querySelector('#btn-order'), "order");