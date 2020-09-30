"use strict";

const slidesBox = document.querySelector(".slides__box");
// const slidesList = document.querySelector(".slides__list");
const slides = document.querySelector(".slides"); //ul
const slide = document.querySelectorAll(".slide"); //li
const slideCount = slide.length;
const slideWidth = slide[0].getBoundingClientRect().width;
const slidesAllsize = slideWidth * slide.length;
slides.style.width = slidesAllsize + "px";
const prevBtn = document.querySelector(".prev__button");
const nextBtn = document.querySelector(".next__button");
const slidesPage = document.querySelector(".slides__page >ul");
let currentIdx = 0;
slides.style.transition = "0s";
slides.style.transform = "translateX(" + -1 * slideWidth + "px)";
let firstChild = slides.firstElementChild; //li => background-1
let lastChild = slides.lastElementChild; //li => background-5
let cloneFirst = firstChild.cloneNode(true); //li => background-1 복사본
let cloneLast = lastChild.cloneNode(true); //li => background-5 복사본
let autoTimer = undefined;
slides.appendChild(cloneFirst);
slides.insertBefore(cloneLast, firstChild);

nextBtn.addEventListener("click", () => {
  if (currentIdx < slideCount) {
    onMoveSlide(currentIdx + 1);
  }
  if (currentIdx === slide.length) {
    setTimeout(() => {
      slides.style.transition = "0s";
      slides.style.transform = "translateX(0px)";
    }, 501);
    currentIdx = 0;
  }
});

prevBtn.addEventListener("click", () => {
  if (currentIdx > 0) {
    onMoveSlide(currentIdx - 1);
  }

  if (currentIdx === 0) {
    setTimeout(() => {
      slides.style.transition = "0s";
      slides.style.transform = "translateX(" + -1 * slidesAllsize + "px)";
    }, 501);
    currentIdx = slideCount;
  }
});

slidesPage.addEventListener("click", (e) => {
  if (!(e.target.nodeName == "LI")) {
    return;
  }
  const pageNumber = e.target.dataset.id;
  onMoveSlide(pageNumber);
});

let pageNum = 1;
let pageBtn;
for (let i = 0; i < slideCount; i++) {
  pageBtn = document.createElement("li");
  pageBtn.setAttribute("class", "page__button");
  pageBtn.setAttribute("data-id", pageNum++);
  slidesPage.appendChild(pageBtn);
}

const pager = document.querySelectorAll(".slides__page > ul li");

function onMoveSlide(number) {
  slides.style.transition = "transform 500ms ease-in";
  slides.style.transform = "translateX(" + -1 * number * slideWidth + "px)";
  currentIdx = number;

  pager.forEach((page) => {
    page.classList.remove("active");
  });
  pager[number - 1].classList.add("active");
}
onMoveSlide(1);

function startAutoSlide() {
  autoTimer = setInterval(() => {
    nextBtn.click();
  }, 4000);
}

startAutoSlide();

slidesBox.addEventListener("mouseenter", () => {
  onStopTimer();
});

slidesBox.addEventListener("mouseleave", () => {
  startAutoSlide();
});

function onStopTimer() {
  clearInterval(autoTimer);
}
