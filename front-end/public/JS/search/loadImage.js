class LoadImage {

  constructor(imgObject, defaultImg, addIn) {
    this.imgObject = imgObject;
    this.defaultImg = defaultImg;
    this.img = null;
    this.addIn = addIn;
  }

  CreateImage() {
    this.img = new Image();
    this.img.src = `data:image/png;base64,${this.imgObject.bytesImage}`;
    this.img.classList.add("img-logo")
  }

  Load() {
    this.img.onload = () => {
      console.log("Imagem carregada com sucesso:");
      document.querySelector(`${this.addIn}`).prepend(this.img);
    };
  }

  Error() {
    this.img.onerror = () => {
      console.error("Erro ao carregar a imagem:");
      this.img.src = this.defaultImg; 
    };
  }

  Init() {
    if( document.querySelector(`${this.addIn} img`) !== null) {
      document.querySelector(`${this.addIn} img`).remove();
    }    
    
    this.CreateImage();
    this.Error();
    this.Load();
  }
}

export default LoadImage; 