"use strict";

function loadItem() {
  return fetch("/data/data.json")
    .then((response) => response.json())
    .then((json) => json.products);
}

const breadItem = document.querySelector(".bread__item");
function showProducts(items) {
  const what = items.map((item) => makeProduct(item));
  breadItem.innerHTML = items.map((item) => makeProduct(item)).join("");
}

function makeProduct(items) {
  return `<li class="item__wrap" data-type ="${items.type}">
    <a href="#" class="item">
        <div class="dessert__item">
         <img src="${items.image}"/>
        </div>
        <span class="dessert__explain">${items.name}</span>
    </a>
</li>`;
}
const choiceBtn = document.querySelector(".dessert__choice__list");

function onClickEventProduct(items) {
  choiceBtn.addEventListener("click", (event) => {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;
    onButtonItems(event, value);
  });

  const searchBtn = document.querySelector('.search__button');
  searchBtn.addEventListener('click',(event) =>{
    onSearchProduct(event, items);
    
  });

  const searchInput = document.querySelector(".search__input");
  searchInput.addEventListener('keypress', (event) =>{
    if(event.key ==="Enter") {
      onSearchProduct(event, items);
    }
  });
}

function onButtonItems(event, value) {
  const itemList = document.querySelectorAll(".item__wrap");
  breadItem.classList.add("animation");

  setTimeout(() => {
    itemList.forEach((item) => {
      const itemDataset = item.dataset;
      breadItem.classList.add("animation");
      if (value === "all" || itemDataset.type === value) {
        item.classList.remove("invisible");
      } else {
        item.classList.add("invisible");
      }
    });
    breadItem.classList.remove("animation");
  }, 300);

  const dessertTitle = document.querySelectorAll(".dessert__title");
  dessertTitle.forEach((title) => {
    title.classList.remove("active");
    event.target.classList.add("active");
  });
}

loadItem().then((products) => {
  showProducts(products);
  onClickEventProduct(products);
  onSearchProduct(products);
});

function onSearchProduct(event,items) {
    const itemList =document.querySelectorAll('.item__wrap');
    const searchInput = document.querySelector(".search__input");
    const eachWords = searchInput.value.trim();
    breadItem.classList.remove("animation");
      itemList.forEach(item => {
      breadItem.classList.add("animation");

        const itemTitle=item.querySelector('.dessert__explain').textContent;
        if(itemTitle.indexOf(eachWords)>-1){
          item.classList.remove('invisible');
        }else{
          item.classList.add('invisible');
        }

       });
    breadItem.classList.remove("animation");
    onDeleteItem();
    searchInput.value='';
    searchInput.focus();
}

let idNum =0;
const previewInput = document.querySelector('.preview__input');

function onDeleteItem() {
  const searchInput = document.querySelector(".search__input");
  previewInput.innerHTML+=
  `<li data-id="${idNum}"><span>${searchInput.value}</span>
  <button class="search__delete"><i class="fas fa-times" data-id="${idNum}"></i></button></li>`;
  idNum++;

}

previewInput.addEventListener('click', (e) =>{
  const dataId = e.target.dataset.id;
  if(dataId) {
    const dataDeleted = document.querySelector(`.preview__input > li[data-id='${idNum}']`);
    dataDeleted.remove();
  }
 
});