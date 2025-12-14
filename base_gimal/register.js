// register.js

document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');
  const REGISTERED_USERS_KEY = 'registeredUsers';

  if (registerForm) {
    registerForm.addEventListener('submit', function (event) {
      event.preventDefault(); // 폼 기본 제출 방지

      // 1. 입력된 값 가져오기
      const name = document.getElementById('new-user-name').value;
      const id = document.getElementById('new-user-id').value;
      const pw = document.getElementById('new-user-pw').value;
      const phone = document.getElementById('new-user-phone').value;

      // 2. 기본 유효성 검사
      if (id.length < 6) {
        alert('아이디는 6자 이상이어야 합니다.');
        return;
      }
      if (pw.length < 8) {
        alert('비밀번호는 8자 이상이어야 합니다.');
        return;
      }

      // 3. 기존 사용자 데이터 로드
      let users = JSON.parse(localStorage.getItem(REGISTERED_USERS_KEY)) || [];

      // 4. 아이디 중복 확인
      const isDuplicate = users.some((user) => user.id === id);
      if (isDuplicate) {
        alert('이미 존재하는 아이디입니다. 다른 아이디를 사용해주세요.');
        return;
      }

      // 5. 새로운 사용자 객체 생성
      const newUser = {
        id: id,
        pw: pw,
        name: name,
        phone: phone,
        joinDate: new Date().toLocaleDateString('ko-KR'),
        membership: null, // 초기 회원권 정보 (가입 후 마이페이지에서 등록)
      };

      // 6. 사용자 목록에 추가 및 localStorage에 저장
      users.push(newUser);
      localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));

      // 7. 성공 알림 및 로그인 페이지로 이동
      alert(
        `${name}님, 회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.`
      );
      window.location.href = 'login.html';
    });
  }
});
