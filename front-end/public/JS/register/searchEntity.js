
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
          this.hideItems(this.searchList.getElementsByTagName("li"));
        });
        console.log(li);
        console.log(this.searchList);
        this.searchList.appendChild(li);
    });
  }

  hideItems(arrayItems) {
    for(let item of arrayItems) {
      item.style.display = "none";
    }
  }
}

const searchInstance = new DinamicSearch("http://localhost:8080/provider/All",
                                         document.querySelector(".order #provider"), 
                                         document.querySelector(".order .search_provider"));
searchInstance.init(searchInstance.url);

const searchInstance2 = new DinamicSearch("http://localhost:8080/client/All",
                                          document.querySelector(".order #client"),
                                          document.querySelector(".order .search_client"));
searchInstance2.init(searchInstance2.url);

const searchInstance3 = new DinamicSearch("http://localhost:8080/provider/All",
                                          document.querySelector(".product #provider"),
                                          document.querySelector(".product .search_provider"));
searchInstance3.init(searchInstance3.url);