// mypage.js

document.addEventListener('DOMContentLoaded', () => {
  const LOGIN_KEY = 'isLoggedIn';
  const CURRENT_USER_KEY = 'currentUser';

  // 1. 로그인 상태 확인 및 사용자 정보 로드
  const isLoggedIn = localStorage.getItem(LOGIN_KEY) === 'true';
  const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));

  // 2. 로그인되지 않았거나 사용자 정보가 없을 경우 로그인 페이지로 리다이렉트
  if (!isLoggedIn || !currentUser) {
    alert('로그인이 필요합니다.');
    // 현재 페이지가 mypage.html이라고 가정하고, login.html로 이동시킵니다.
    window.location.href = 'login.html';
    return;
  }

  // 3. 페이지 렌더링 함수
  function renderMyPage(user) {
    // 3-1. 이름 업데이트
    const userNameElements = document.querySelectorAll(
      '#mypage-main h2, #user-name-info'
    );
    userNameElements.forEach((el) => {
      // "👋 (이름)님, 환영합니다!" 업데이트
      if (el.id === 'user-name-info') {
        el.textContent = user.name;
      } else if (el.tagName === 'H2') {
        el.innerHTML = `👋 ${user.name}님, 환영합니다!`;
      }
    });

    // 3-2. 개인 정보 업데이트
    document.getElementById('user-phone-info').textContent = user.phone;
    document.getElementById('user-join-date-info').textContent = user.joinDate;

    // 3-3. 회원권 상태 업데이트
    const membership = user.membership;

    if (membership && membership.endDate) {
      // 오늘 날짜와 종료일의 시간 부분을 00:00:00으로 설정하여 정확한 일수 차이 계산
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const endDate = new Date(membership.endDate);
      endDate.setHours(0, 0, 0, 0);

      const timeDiff = endDate.getTime() - today.getTime();
      // Math.ceil을 사용하여 오늘 이후 하루라도 남아있으면 1일로 계산
      const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

      const statusElement = document.getElementById('membership-status');
      const remainingElement = document.getElementById('remaining-days');

      // startDate가 없으면 user.joinDate를 사용 (기존 사용자 대비)
      const startDateString = membership.startDate || user.joinDate;

      if (daysRemaining > 0) {
        statusElement.textContent = `유효 기간: ${startDateString} ~ ${membership.endDate}`;
        remainingElement.textContent = `${daysRemaining}일 남았습니다.`;
        remainingElement.style.color =
          daysRemaining < 7 ? '#ff5722' : '#007bff'; // 7일 미만이면 주황색 강조
      } else if (daysRemaining === 0) {
        // 만료일이 오늘인 경우
        statusElement.textContent = `유효 기간: ${startDateString} ~ ${membership.endDate}`;
        remainingElement.textContent = '오늘 만료됩니다.';
        remainingElement.style.color = 'orange';
      } else {
        // daysRemaining이 음수이면 만료됨
        statusElement.textContent = `유효 기간이 만료되었습니다.`;
        remainingElement.textContent = '만료됨';
        remainingElement.style.color = 'red';
      }

      // 3-4. 사물함 정보 업데이트
      if (membership.lockerCode) {
        document.getElementById('locker-code').textContent =
          membership.lockerCode;
      } else {
        // 회원권은 있으나 사물함 코드가 없는 경우
        document.getElementById('locker-info').innerHTML =
          '<p>등록된 사물함이 없습니다.</p><p class="days-remaining"><strong style="color: gray;">사물함을 등록하세요.</strong></p>'; // ⭐ 수정된 부분 1: days-remaining 클래스와 gray 색상 적용
      }
    } else {
      // 회원권 정보가 없을 경우 처리 (회원가입만 한 경우)
      document.getElementById('membership-status').textContent =
        '등록된 회원권이 없습니다.';
      document.getElementById('remaining-days').textContent = '등록 필요';
      document.getElementById('remaining-days').style.color = 'gray'; // 이 부분이 '등록 필요'의 색상을 설정합니다.
      document.getElementById('locker-info').innerHTML =
        '<p>사물함 정보 없음</p><p class="days-remaining"><strong style="color: gray;">사물함을 등록하세요.</strong></p>'; // ⭐ 수정된 부분 2: days-remaining 클래스와 gray 색상 적용
    }
  }

  // 4. 페이지 렌더링 실행
  renderMyPage(currentUser);

  // 5. 로그아웃 기능
  const logoutButton = document.getElementById('logout-button');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      // 로그인 상태 및 현재 사용자 정보 삭제
      localStorage.removeItem(LOGIN_KEY);
      localStorage.removeItem(CURRENT_USER_KEY);

      alert('로그아웃 되었습니다.');
      window.location.href = 'login.html'; // 로그인 페이지로 리다이렉트
    });
  }
});
