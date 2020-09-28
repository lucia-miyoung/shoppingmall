"use strict";

const inputs = document.querySelectorAll(".form-wrapper > div input");
const completeBtn = document.querySelector(".signup__button");
const cancelBtn = document.querySelector(".signup__cancel");
const emailInput = document.querySelector("#email-input");

inputs.forEach((input, index) => {
  const placeholder = input.nextElementSibling;
  if (!placeholder) {
    return;
  }
  input.addEventListener("focus", () => {
    placeholder.style.transform = `translate(-10%, -102%) scale(0.8)`;
  });
  input.addEventListener("blur", () => {
    if (input.value.trim().length === 0) {
      placeholder.style.transform = `translate(0%, 0%) scale(1)`;
    }
  });
});

const emailDetail = document.querySelector(".email__detail");

emailInput.addEventListener("change", (e) => {
  const data = e.target.options.selectedIndex;
  const options = document.querySelectorAll("#email-input > option");
  const text = options[data].textContent;
  //   console.log(text);
  inputEmailDetail(text);
});

function inputEmailDetail(text) {
  if (text === "직접 입력") {
    emailDetail.removeAttribute("disabled");
    emailDetail.classList.remove("disabled");
    emailDetail.value = "";
    emailDetail.focus();
    return;
  }
  emailDetail.classList.add("disabled");
  emailDetail.setAttribute("disabled", "");
  emailDetail.value = text;
}

const inputFile = document.querySelector("#profile__insert");
const preview = document.querySelector(".profile> img");
const deleteBtn = document.querySelector(".profile__delete");

inputFile.addEventListener("change", (event) => {
  const text = event.target.files[0];
  // console.log(text);
  var reader = new FileReader();
  reader.addEventListener(
    "load",
    function () {
      preview.setAttribute("src", reader.result);
    },
    false
  );
  // console.log(reader.result);
  if (text) {
    reader.readAsDataURL(text);
  }
});

const bagicImgPath = "./images/user.png";
deleteBtn.addEventListener("click", () => {
  const check = confirm("기본이미지로 변경하시겠습니까?");
  if (!check) {
    return;
  }
  preview.setAttribute("src", bagicImgPath);
});

const pw = document.querySelector(".password");
const pwChk = document.querySelector(".password-check");
const warning = document.querySelector(".password-check ~ .warning");

// pwChk.addEventListener("input", (e) => {
//   if (pw.value.trim().length !== pwChk.value.trim().length) {
//     warning.innerHTML = `<i class="fas fa-exclamation"></i>비밀번호가 일치하지 않습니다. `;
//   }
// });

/* id 유효성 검사 */
const id = document.querySelector(".id");
const idValue = id.value;
const warningId = document.querySelector(".id-form .warning");
// /^[a-zA-Z0-9]{4,12}$/; 대문자도 하려면 안에 A-Z 넣어쥬삼

function checkValidate(value) {
  const valid = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
  return valid.test(value);
}

id.addEventListener("keyup", () => {
  console.log(checkValidate(id.value));
  if (id.value.length > 0) {
    if (!checkValidate(id.value)) {
      warningId.innerHTML = `<i class="fas fa-exclamation"></i>
      아이디는 영문 소문자와 숫자 조합하여 8~16자리로 입력가능합니다.`;
      return;
    } else {
      warningId.innerHTML = `<i class="fas fa-check"></i> 성공`;
    }
  } else {
    warningId.innerHTML = `<i class="fas fa-exclamation"></i> 아이디를 입력해주세요.`;
  }
});

const warningPw = document.querySelector(".pw-check-form .warning");
pw.addEventListener("keyup", () => {
  if (!checkValidate(pw.value) || !checkValidate(pwChk.value)) {
    warningPw.innerHTML = `<i class="fas fa-exclamation"></i> 
    비밀번호는 영문 소문자와 숫자 조합하여 8~16자리로 입력가능합니다.`;
    return;
  } else if (checkValidate(pw.value) && !checkValidate(pwChk.value)) {
    if (pw.value.length !== pwChk.value.length) {
      warningPw.innerHTML = `<i class="fas fa-exclamation"></i> 비밀번호가 일치하지 않습니다.`;
    } else if (pw.value.length === 0 || pwChk.value.length === 0) {
      warningPw.innerHTML = `<i class="fas fa-exclamation"></i> 비밀번호를 입력해주세요.`;
    } else {
      warningPw.innerHTML = `<i class="fas fa-check"></i> 성공`;
    }
  }
});

// 휴대폰 유효성 검사
