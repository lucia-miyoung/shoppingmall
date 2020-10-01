"use strict";

const slidesBox = document.querySelector(".slides__box");
const slidesList = document.querySelector(".slides__list");
const slides = document.querySelector(".slides"); //ul
const slide = document.querySelectorAll(".slide"); //li
const slideCount = slide.length;
const slideWidth = slide[0].getBoundingClientRect().width;
// console.log(slideWidth);
const slidesAllsize = slideWidth * slide.length;
slides.style.width = slidesAllsize + "px";
const prevBtn = document.querySelector(".prev__button");
const nextBtn = document.querySelector(".next__button");
const slidesPage = document.querySelector(".slides__page >ul");
let currentIdx = 0;
slides.style.transition = "0s";
let firstChild = slides.firstElementChild; //li => background-1
let lastChild = slides.lastElementChild; //li => background-5
let cloneFirst = firstChild.cloneNode(true); //li => background-1 복사본
let cloneLast = lastChild.cloneNode(true); //li => background-5 복사본
let autoTimer = undefined;
slides.appendChild(cloneFirst);
slides.insertBefore(cloneLast, firstChild);

//다음 버튼 누를때, 슬라이드 이동
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

//이전 버튼 누를때, 슬라이드 이동
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

// 슬라이드 하단 페이저버튼 누를시 해당 슬라이드로 이동
slidesPage.addEventListener("click", (e) => {
  if (!(e.target.nodeName == "LI")) {
    return;
  }
  const pageNumber = e.target.dataset.id;
  onMoveSlide(pageNumber);
});

// ul자식요소로 슬라이드 갯수만큼 li 생성하기
let pageNum = 1;
let pageBtn;
for (let i = 0; i < slideCount; i++) {
  pageBtn = document.createElement("li");
  pageBtn.setAttribute("class", "page__button");
  pageBtn.setAttribute("data-id", pageNum++);
  slidesPage.appendChild(pageBtn);
}

// 슬라이드 이동하는 함수 & 페이저도 순서 맞게 함께 이동
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

//버튼 누르지 않고, 자동으로 슬라이드 넘기기
function startAutoSlide() {
  autoTimer = setInterval(() => {
    nextBtn.click();
    // const nextIdx = (currentIdx + 1) % slideCount;
    // onMoveSlide(nextIdx);
  }, 4000);
}

startAutoSlide();

const controllBtn = document.querySelector(".slides__button");

//슬라이드에 마우스 올라갈시 자동 슬라이드 멈춤
slidesBox.addEventListener("mouseenter", () => {
  controllBtn.style.visibility = "visible";
  onStopTimer();
});

//슬라이드에서 마우스 빠져나올시, 자동 슬라이드 다시 시작
slidesBox.addEventListener("mouseleave", () => {
  controllBtn.style.visibility = "hidden";
  startAutoSlide();
});

//자동 슬라이드 멈추는 함수
function onStopTimer() {
  clearInterval(autoTimer);
}

// clearInterval(autoTimer);

const menubarMenu = document.querySelector(".menubar__menu");
const menubarMenuRect = menubarMenu.getBoundingClientRect();

document.addEventListener("scroll", () => {
  if (window.scrollY > menubarMenuRect.top) {
    menubarMenu.classList.add("active");
  } else {
    menubarMenu.classList.remove("active");
  }
});
