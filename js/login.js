"use strict";

const loginForm = document.querySelector(".login__form");
const submitBtn = document.querySelector(".login__submit");
const inputs = document.querySelectorAll(".login__form > div > input");

submitBtn.addEventListener("click", () => {
  const id = loginForm.querySelector(".id");
  const password = loginForm.querySelector(".password");
  if (id.value.trim().length === 0 || password.value.trim().length === 0) {
    alert("아이디와 비밀번호를 확인해주세요.");
    if (id.value.trim().length === 0) {
      id.focus();
    } else if (password.value.trim().length === 0) {
      password.focus();
    }
  } else {
    alert("로그인 되었습니다.");
    id.value = "";
    password.value = "";
    id.focus();
  }
});

// transform: translate(-10%, -108%) scale(0.9);

inputs.forEach((input, index) => {
  const placeholders = document.querySelectorAll(".placeholder");

  input.addEventListener("focus", () => {
    placeholders[index].style.transform = `translate(-5%, -108%) scale(0.9)`;
  });
  input.addEventListener("blur", () => {
    if (input.value.trim().length <= 0) {
      placeholders[index].style.transform = `translate(0%, 0%) scale(1)`;
    }
  });
});
