
import InputImage from './inputImage.js';

class DataForm {
    constructor(form) {
      this.form = form;
      this.dataFile = {};
      this.data = {};
      this.init();
      this.img = new InputImage(document.querySelector(".label-file"));
    }

    init() {
      this.updateData();
      this.form.addEventListener('input', () => {
        this.updateData();
      });
    }

    getData() {
      return this.data;
    }

    getFile() {
      return this.dataFile;
    }

    updateData() {
      const elements = this.form.querySelectorAll(`.form-group input`);

      elements.forEach((input) => {
        if(input.type === 'file') {
          this.dataFile = (input.files[0]);
        } else
            this.data[input.name] = input.value;
      });
    }

    clearForm() {
      const elements = this.form.querySelectorAll(`.form-group input`);

      elements.forEach((input) => {
        input.value = '';
      });

      this.img.clearFile();
    }
}

export default DataForm;