export default class Table {
  constructor(table) {
    this.table = table;
    this.initTable();
  }

  initTable() {    
    const tbLength = this.table.rows[0].cells.length; 
    for(let i = 0; i < 10; i++) {
      const array = new Array(tbLength).fill('-');
      this.insertRow(array);
    }
  }
  
  insertRow(data) {
    const tbody = this.table.tBodies[0];
    const tbLength = this.table.rows[0].cells.length;
    const theadnames = this.table.tHead;
    let row = tbody.insertRow();
    const dataProduct = Array.isArray(data) ? data : Object.values(data);

    for(let j = 0; j < tbLength; j++) {
      const dataColumn = row.insertCell();
      dataColumn.textContent = dataProduct[j];
      dataColumn.setAttribute('data-label', theadnames.rows[0].cells[j].textContent);
    }
  }

  insertRows(jsonArray) {

    const tbody = this.table.tBodies[0];
    const header = this.table.tHead;

    jsonArray.forEach(json => {
      const row = tbody.insertRow();
      const tbLength = this.table.rows[0].cells.length;

      for(let j = 0; j < tbLength; j++) {
        const dataColumn = row.insertCell();
        dataColumn.textContent = json[header.rows[0].cells[j].id];
        dataColumn.setAttribute('data-label', header.rows[0].cells[j].textContent);
      }
    });
  }

  gettbody() {
    return this.table.tBodies[0];
  }

  getTable() {
    return this.table;
  }

}