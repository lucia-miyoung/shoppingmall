"use strict";

const loginForm = document.querySelector(".login__form");
const submitBtn = document.querySelector(".login__submit");
const inputs = document.querySelectorAll("input");

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
