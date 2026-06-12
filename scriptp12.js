class Search {
    constructor(data) {
      this.data = data;
    }
    equal(text, keyword) {
      return text.toLowerCase().indexOf(keyword.toLowerCase()) == -1;
    }
    byCriteria(keyword, filterType, targetYear = "") {
      for (let i = 0; i < this.data.length; i++) {
        let book = this.data[i];
        let matchText = "";
        let yearMatch = true;
  
        if (filterType === "title") {
          matchText = book.querySelector(".title").innerText;
        } else if (filterType === "author") {
          matchText = book.querySelector(".author").innerText;
        } else if (filterType === "publisher") {
          matchText = book.querySelector(".publisher").innerText;
        } else if (filterType === "title_year") {
          matchText = book.querySelector(".title").innerText;
          let bookYear = book.querySelector(".year").innerText;
          yearMatch = (bookYear === targetYear);
        }
        if (filterType === "title_year") {
          if (!this.equal(matchText, keyword) && yearMatch) {
            this.data[i].style.display = "";
          } else {
            this.data[i].style.display = "none";
          }
        } else {
          if (this.equal(matchText, keyword)) {
            this.data[i].style.display = "none";
          } else {
            this.data[i].style.display = "";
          }
        }
      }
    }
  }
  
  let keywordInput = document.querySelector("#keyword");
  let yearInput = document.querySelector("#year_input");
  
  function searching() {
    let books = document.querySelectorAll(".book");
    let search = new Search(books);
  
    let activeRadio = document.querySelector('input[name="filter"]:checked').value;
    let selectedYear = yearInput.value;
    search.byCriteria(keywordInput.value, activeRadio, selectedYear);
  }
  keywordInput.addEventListener("keyup", searching);
  
  yearInput.addEventListener("input", searching);
  
  let radioButtons = document.querySelectorAll('input[name="filter"]');
  radioButtons.forEach(radio => {
      radio.addEventListener("change", searching);
  });