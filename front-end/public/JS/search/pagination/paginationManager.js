
export default class PaginationManager {
   
  constructor(container, functionChangePage) {
      this.container = container;
      this.functionChangePage = functionChangePage;
      this.list = document.createElement("ul");
      this.list.className = "index-buttons list flexCenter";
      this.maxItens = 1;
      this.currentPage = 1;
   }

   setMaxItens(maxItems) {
      this.maxItems = Math.max(1, Math.ceil(maxItems / 10));
   }

   createButtom(content, className, onClick) {
      const li = document.createElement("li");
      const btn = Object.assign(document.createElement("button"), {className: className, textContent: content});
      btn.addEventListener("click", onClick);
      li.append(btn);
      return li;
   }

   recreatePagination(index) {
      if(index < 1 || index > this.maxItems) return;
      
      this.currentPage = index;
      this.list.innerHTML = "";

      this.list.append(this.createButtom("<", "btn-primary", () => this.changePage(Math.max(0, this.currentPage))));

      let start = Math.max(1, index - 1);
      let end = Math.min(this.maxItems, index + 1);

      if (start > 1) this.list.append(this.createButtom("1", "btn-primary", () => this.changePage(1)));
      if (start > 2) this.list.append(this.createButtom("...", "btn-primary", () => {}));

      for (let i = start; i <= end; i++) 
        this.list.append(this.createButtom(i, "btn-primary", () => this.changePage(i)));

      if (end < this.maxItems - 1) this.list.append(this.createButtom("...", "btn-primary", () => {}));
      if (end < this.maxItems) this.list.append(this.createButtom(this.maxItems, "btn-primary", () => this.changePage(this.maxItems)));

      this.list.append(this.createButtom(">", "btn-primary", () => this.changePage(Math.min(this.maxItems, this.currentPage + 1))));

      this.container.append(this.list);
   }

   changePage(page) {
    if (page >= 1 && page <= this.maxItems) {
      this.functionChangePage(Math.max(0, page-1));
      this.recreatePagination(page);
    }
  }
}