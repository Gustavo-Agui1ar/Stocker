
class DinamicSearch {
  constructor(url, input, searchList) {
    this.input = input;
    this.searchList = searchList;
    this.data = [];
    this.url = url;
  }

  async fetchData(url) {
    const response = await fetch(url, {
      method: "GET",
    });

    const data = await response.json();
    this.data = data;
    console.log(this.data);
  }

  async init() {
    await this.fetchData(this.url);
    this.initListValues();

    this.input.addEventListener("keyup", () => {
      const filter = this.input.value.toUpperCase();
      const arrayItems = this.searchList.getElementsByTagName("li");

      if(filter === "") {
        this.hideItems(arrayItems);
        return;
      }

      for(let item of arrayItems) {
        const textValue = item.textContent || item.innerText;
        if (textValue.toUpperCase().indexOf(filter) > -1) {
          item.style.display = "";
          item.innerHTML = textValue.replace(new RegExp(filter, "gi"), (match) => `<strong>${match}</strong>`);
        } else {
          item.style.display = "none";
        }
      }
    });
  }

  initListValues() {
    this.data.forEach(element => {
        const li = document.createElement("li");
        li.textContent = element;
        li.style.display = "none";
        li.addEventListener("click", () => {
          this.input.value = li.textContent;
          
          const inputEvent = new Event('input', { bubbles: true });
          this.input.dispatchEvent(inputEvent);   

          this.hideItems(this.searchList.getElementsByTagName("li"));
        });
        this.searchList.appendChild(li);
    });
  }

  hideItems(arrayItems) {
    for(let item of arrayItems) {
      item.style.display = "none";
    }
  }
}

class SearchProduct extends DinamicSearch {
  constructor(url, input, searchList, categoryContainer) {
    super(url, input, searchList);
    this.categoryContainer = categoryContainer;
  }

  initListValues() {
    this.data.forEach(element => {
        const li = document.createElement("li");
        li.textContent = element[0];
        li.style.display = "none";
        li.id = element[1];
        li.addEventListener("click", () => {
          this.input.value = li.textContent;
          this.categoryContainer.value = li.id;
          
          const inputEvent = new Event('input', { bubbles: true });
          this.input.dispatchEvent(inputEvent);
          this.categoryContainer.dispatchEvent(inputEvent);

          this.hideItems(this.searchList.getElementsByTagName("li"));
        });
        this.searchList.appendChild(li);

    });
  }
} 

const searchInstances = [
  new DinamicSearch("http://localhost:8080/provider/All", document.querySelector(".order #provider"), document.querySelector(".order .search_provider")),
  new DinamicSearch("http://localhost:8080/client/All", document.querySelector(".order #client"), document.querySelector(".order .search_client")),
  new DinamicSearch("http://localhost:8080/provider/All", document.querySelector(".product #provider"), document.querySelector(".product .search_provider"))
];

searchInstances.forEach(instance => instance.init());

const dinamicSearchProducts = new SearchProduct("http://localhost:8080/products/All", 
                                                document.querySelector(".order #product"),
                                                document.querySelector(".order .search_product"),
                                                document.querySelector(".order #category"));
dinamicSearchProducts.init();
