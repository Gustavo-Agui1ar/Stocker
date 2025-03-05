
const header = document.createElement('header');

header.innerHTML = `<header class="header defaultBgColor">
                      <nav class="flexNav">
                        <a class="logo" href="/">Stocker</a>
                        <div class="nav-menu">
                          <div class="line1"></div>
                          <div class="line2"></div>
                          <div class="line3"></div>
                        </div>
                        <ul class="nav-list simpleFlex">
                          <li><a href="./home.html">Inicio</a></li>
                          <li><a href="./products.html">Produtos</a></li>
                          <li><a href="./clients.html">Clientes</a></li>
                          <li><a href="./clients.html">Fornecedores</a></li>
                          <li><a href="./register.html">Cadastrar</a></li>
                          <li><a href="./account.html">Conta</a></li>
                        </ul>
                      </nav>
                    </header>`

document.body.insertBefore(header, document.body.firstChild);