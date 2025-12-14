// login.js

const LOGIN_KEY = 'isLoggedIn';
const CURRENT_USER_KEY = 'currentUser';
const REGISTERED_USERS_KEY = 'registeredUsers';

// ⭐ 요청하신 기본 사용자 데이터 (mypage에서 사용될 상세 정보 포함) ⭐
const DEFAULT_USER_DATA = {
  id: 'smgym',
  pw: 'sm1234',
  name: '홍길동',
  phone: '010-1234-5678',
  joinDate: '2025.03.01',
  // 회원권과 사물함 정보를 포함하는 객체로 구성
  membership: {
    endDate: '2026-01-01',
    lockerCode: '1234',
    status: '유효',
    // (참고: 남은 일수는 mypage.js에서 동적으로 계산하는 것이 좋습니다.)
  },
};

/**
 * localStorage에 등록된 사용자가 없을 경우 기본 사용자 데이터를 초기화합니다.
 */
function initializeDefaultUser() {
  const users = JSON.parse(localStorage.getItem(REGISTERED_USERS_KEY));
  if (!users || users.length === 0) {
    // 기본 사용자 데이터를 배열에 담아 저장합니다.
    localStorage.setItem(
      REGISTERED_USERS_KEY,
      JSON.stringify([DEFAULT_USER_DATA])
    );
    console.log('기본 사용자(smgym) 데이터가 localStorage에 초기화되었습니다.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // 페이지 로드 시 기본 사용자 데이터 초기화 시도
  initializeDefaultUser();

  const loginForm = document.getElementById('login-form');

  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault(); // 폼 기본 제출 방지

      const userId = document.getElementById('user-id').value;
      const userPw = document.getElementById('user-pw').value;

      // 1. localStorage에서 등록된 사용자 데이터 로드
      const users =
        JSON.parse(localStorage.getItem(REGISTERED_USERS_KEY)) || [];

      // 2. 사용자 인증: ID와 PW가 모두 일치하는 사용자 찾기
      const foundUser = users.find(
        (user) => user.id === userId && user.pw === userPw
      );

      if (foundUser) {
        // 3. 로그인 성공 처리
        localStorage.setItem(LOGIN_KEY, 'true');

        // 비밀번호를 제외한 현재 사용자 정보만 localStorage에 저장 (세션 역할)
        const userDataToStore = {
          id: foundUser.id,
          name: foundUser.name,
          phone: foundUser.phone,
          joinDate: foundUser.joinDate,
          membership: foundUser.membership || null, // 기본 사용자 정보는 null이 아닐 수 있음
        };
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userDataToStore));

        alert(`${foundUser.name}님, 로그인에 성공했습니다.`);
        // 개인 페이지로 리다이렉트
        window.location.href = 'mypage.html';
      } else {
        alert('아이디 또는 비밀번호가 올바르지 않습니다. 다시 확인해주세요.');
      }
    });
  }
});
