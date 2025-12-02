// signup.js

const form = document.getElementById('signup-form');
const idInput = document.getElementById('reg-id');
const passwordInput = document.getElementById('reg-password');
const passwordConfirmInput = document.getElementById('reg-password-confirm');

const idMsg = document.getElementById('id-msg');
const passwordMsg = document.getElementById('password-msg');
const passwordConfirmMsg = document.getElementById('password-confirm-msg');
const errorMsg = document.getElementById('error-msg');
const successMsg = document.getElementById('success-msg');

/* ==================================================== */
/* 1. 유효성 검사 함수 */
/* ==================================================== */

/**
 * ID(학번/교번) 유효성 검사 (8~10자리 숫자)
 * @returns {boolean} 유효성 통과 여부
 */
function validateId() {
  const idValue = idInput.value.trim();
  const isValid = /^\d{8,10}$/.test(idValue); // 8자리 또는 10자리 숫자인지 확인

  if (!isValid) {
    idInput.classList.add('error');
    idMsg.style.display = 'block';
  } else {
    idInput.classList.remove('error');
    idMsg.style.display = 'none';
  }
  return isValid;
}

/**
 * 비밀번호 유효성 검사 (6자 이상)
 * @returns {boolean} 유효성 통과 여부
 */
function validatePassword() {
  const isValid = passwordInput.value.length >= 6;

  if (!isValid) {
    passwordInput.classList.add('error');
    passwordMsg.style.display = 'block';
  } else {
    passwordInput.classList.remove('error');
    passwordMsg.style.display = 'none';
  }
  return isValid;
}

/**
 * 비밀번호 확인 검사 (비밀번호와 일치하는지)
 * @returns {boolean} 유효성 통과 여부
 */
function validatePasswordConfirm() {
  const isMatch =
    passwordInput.value === passwordConfirmInput.value &&
    passwordConfirmInput.value.length > 0;

  if (!isMatch) {
    passwordConfirmInput.classList.add('error');
    passwordConfirmMsg.style.display = 'block';
  } else {
    passwordConfirmInput.classList.remove('error');
    passwordConfirmMsg.style.display = 'none';
  }
  return isMatch;
}

/**
 * 모든 필드 유효성 검사
 * @returns {boolean} 전체 유효성 통과 여부
 */
function validateAll() {
  // 개별 함수를 모두 실행하여 모든 에러 메시지를 표시하도록 함 (Short-circuit 방지)
  const isIdValid = validateId();
  const isPwValid = validatePassword();
  const isPwConfirmValid = validatePasswordConfirm();

  // HTML5 required 속성 검사 (나머지 필드)
  const isFormValid = form.checkValidity();

  return isIdValid && isPwValid && isPwConfirmValid && isFormValid;
}

/* ==================================================== */
/* 2. 이벤트 리스너 */
/* ==================================================== */

// ID/비밀번호 입력 시 실시간 유효성 검사
idInput.addEventListener('input', validateId);
passwordInput.addEventListener('input', validatePassword);
passwordConfirmInput.addEventListener('input', validatePasswordConfirm);
passwordInput.addEventListener('input', validatePasswordConfirm); // 비번 변경 시 확인도 다시 검사

form.addEventListener('submit', function (event) {
  event.preventDefault();

  // 모든 에러 메시지 초기화
  errorMsg.style.display = 'none';
  successMsg.style.display = 'none';

  if (validateAll()) {
    // --- 가상 회원가입 성공 로직 ---

    // 1. 성공 메시지 표시
    successMsg.style.display = 'block';

    // 2. 가입된 ID와 비밀번호를 가상 저장 (로그인 테스트를 위해)
    // 실제 서버 환경에서는 사용하면 안 됩니다.
    localStorage.setItem('tempSignupId', idInput.value);
    localStorage.setItem('tempSignupPw', passwordInput.value);

    // 3. 3초 후 로그인 페이지로 리다이렉트
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 3000);
  } else {
    // --- 회원가입 실패 로직 ---
    errorMsg.style.display = 'block';
  }
});
