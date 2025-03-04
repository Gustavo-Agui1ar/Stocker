
import Table  from './table.js';

const MAX_SIZE = 10;

export default class Search {
  constructor(searchButton, clearButton, table) {
    this.searchButton = searchButton;
    this.clearButton = clearButton;
    this.table = new Table(table);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.init();
  }

  handleClear() {
    this.clearTable();
    this.table.initTable();
  }
  
  clearTable() {
    // Clear the table
    const tbody = this.table.gettbody();

    while(tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  }

  handleSearch() {

    const dataForm = document.querySelector('.form');
    const formData = {};

    Array.from(dataForm.elements).forEach(element => {
      if(element.name && element.trim !== '') {
        formData[element.name] = element.value;
      }
    });

    return formData;
  }

  init() {
    this.clearButton.addEventListener('click', this.handleClear);
  }

  insertPageData(data, size) {
    this.clearTable();
    if(data.length != 0) {
      this.table.insertRows(data);
    }
    if(size < MAX_SIZE) {
      for(let i = size; i < MAX_SIZE; i++) {
        this.table.insertRow(new Array(this.table.getTable().rows[0].cells.length).fill('-'));
     }
    }
  }
}