class NavBar {
  constructor(menu, navList, navLink) {
    this.menu = document.querySelector(menu);
    this.navLists = document.querySelector(navList);
    this.navLinks = document.querySelectorAll(navLink);
    this.classActive = 'active';
    this.handleClick = this.handleClick.bind(this);
    
  }

  animateLinks() {
    this.navLinks.forEach((link, index) => {
      link.style.animation
        ? (link.style.animation = '')
        : (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.1}s`);
    });
  }

  handleClick() {
    this.navLists.classList.toggle(this.classActive);
    this.menu.classList.toggle(this.classActive);
    this.animateLinks();
  }

  addEventClickMenu() {
    this.menu.addEventListener('click', this.handleClick);
  }

  init() {
    if(this.menu) {
      this.addEventClickMenu();
    }
  }
}

const navbar = new NavBar('.nav-menu', '.nav-list', '.nav-list li');
navbar.init();