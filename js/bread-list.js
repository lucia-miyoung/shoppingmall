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
});

const searchInput = document.querySelector(".search__input");

searchInput.addEventListener("input", () => {
  console.log(searchInput.value.length);
});
