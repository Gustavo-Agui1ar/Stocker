class InfiniteScroll {
  constructor(slider) {
    this.slider = slider;
    this.isDown = false;
    this.startX = 0;
    this.scrollLeft = 0;
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.init();
  }

  init() {
    this.slider.addEventListener('mousedown', this.handleMouseDown);
    this.slider.addEventListener('mouseleave', this.handleMouseLeave);
    this.slider.addEventListener('mouseup', this.handleMouseUp);
    this.slider.addEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseDown (e) {
    this.isDown = true;
    this.startX = e.pageX - this.slider.offsetLeft;
    this.scrollLeft = this.slider.scrollLeft;
  }
  
  handleMouseLeave () {
    this.isDown = false;
  }
  
  handleMouseUp () {
    this.isDown = false;
  }

  handleMouseMove (e) {
    if(!this.isDown) return;
    e.preventDefault();
    const x = e.pageX - this.slider.offsetLeft;
    const walk = (x - this.startX);
    this.slider.scrollLeft = this.scrollLeft - walk;
  }
}

const slider = document.querySelector('.container-order');
const infiniteScroll = new InfiniteScroll(slider);
