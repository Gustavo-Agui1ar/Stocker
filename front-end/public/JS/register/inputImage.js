class InputImage {
  constructor(inputContainer) {
    if (!inputContainer) {
      console.error("Elemento não encontrado!");
      return;
    }

    this.inputContainer = inputContainer;
    this.fileInput = inputContainer.querySelector(".input-file");
    this.textSpan = inputContainer.querySelector("span");

    this.init();
  }

  init() {
    this.inputContainer.addEventListener("dragover", (e) => {
      e.preventDefault();
      this.inputContainer.classList.add("hover");
    });

    this.inputContainer.addEventListener("dragleave", () => {
      this.inputContainer.classList.remove("hover");
    });

    this.inputContainer.addEventListener("drop", (e) => {
      e.preventDefault();
      this.inputContainer.classList.remove("hover");

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        this.fileInput.files = files; 
        this.textSpan.textContent = files[0].name;
      }
    });

    this.inputContainer.addEventListener("click", () => {
      this.fileInput.click();
    });

    this.fileInput.addEventListener("change", () => {
      if (this.fileInput.files.length > 0) {
        this.textSpan.textContent = this.fileInput.files[0].name;
      }
    });
  }

  clearFile() {
    this.fileInput.value = "";
    this.textSpan.textContent = "Choose an image";
  }
}

export default InputImage;