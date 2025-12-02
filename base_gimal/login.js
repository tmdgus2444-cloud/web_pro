/* login.js */

/* 가상 로그인 로직 (JS) */
const LOGIN_KEY = 'isLoggedIn'; // 로그인 상태를 저장하는 키

document
  .getElementById('login-form')
  .addEventListener('submit', function (event) {
    event.preventDefault(); // 기본 폼 제출 동작 방지

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');

    // 모든 에러 메시지 초기화
    errorMsg.style.display = 'none';

    // --- 가상 인증 로직 ---
    // 1. 기본 테스트 ID/PW: 'test' / '1234'
    const defaultId = 'test';
    const defaultPw = '1234';

    // 2. 회원가입에서 저장한 임시 ID/PW를 가져옵니다.
    const tempId = localStorage.getItem('tempSignupId');
    const tempPw = localStorage.getItem('tempSignupPw');

    // 로그인 성공 조건:
    // a. 기본 테스트 계정 일치
    // b. 또는 회원가입으로 임시 저장된 계정 일치
    if (
      (username === defaultId && password === defaultPw) ||
      (username === tempId && password === tempPw)
    ) {
      // 로그인 성공: localStorage에 상태 저장
      localStorage.setItem(LOGIN_KEY, 'true');

      // 마이페이지로 이동
      window.location.href = 'mypage.html';
    } else {
      // 로그인 실패
      errorMsg.style.display = 'block';

      // 3초 후 에러 메시지 숨기기
      setTimeout(() => {
        errorMsg.style.display = 'none';
      }, 3000);
    }
  });
