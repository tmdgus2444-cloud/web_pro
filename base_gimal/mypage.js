// mypage.js

/* ==================================================== */
/* 1. 데이터 정의 (Mock Data) 및 로컬 스토리지 관리 함수 */
/* ==================================================== */

// 현재 날짜를 YYYY-MM-DD 형식으로 반환
function getFormattedDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// 만료일 (현재 날짜 기준 30일 후로 설정)
const today = new Date();
const endDateObj = new Date(today);
endDateObj.setDate(today.getDate() + 30);
const endDateStr = getFormattedDate(endDateObj);

// 기본 Mock User Data (최초 앱 사용 시 사용)
const DEFAULT_USER_DATA = {
  id: '20221234',
  name: '홍길동',
  phone: '010-1234-5678',
  email: 'hong.gildong@sm.ac.kr',
  membership: {
    type: '3개월 이용권',
    startDate: getFormattedDate(today),
    endDate: endDateStr,
  },
  profilePhoto: 'https://placehold.co/120x120/007bff/white?text=User',
};

// 🌟 [추가/수정] localStorage에서 데이터를 로드하거나 기본 데이터를 사용합니다.
let userData = loadUserData();

/**
 * 1-1. localStorage에서 사용자 데이터를 로드합니다.
 * 저장된 데이터가 없으면 기본 데이터를 반환하고 저장합니다.
 */
function loadUserData() {
  const storedData = localStorage.getItem('mypageUserData');
  if (storedData) {
    return JSON.parse(storedData);
  } else {
    // 저장된 데이터가 없으면 기본 데이터를 저장하고 반환
    saveUserData(DEFAULT_USER_DATA);
    return DEFAULT_USER_DATA;
  }
}

/**
 * 1-2. 현재 사용자 데이터를 localStorage에 저장합니다.
 * @param {object} data - 저장할 사용자 데이터 객체
 */
function saveUserData(data) {
  localStorage.setItem('mypageUserData', JSON.stringify(data));
  userData = data; // 전역 userData 변수도 업데이트
}

/* ==================================================== */
/* 2. DOM 요소 및 전역 변수 */
/* ==================================================== */

// ... (이 부분은 이전과 동일하며 생략합니다)

const profileForm = document.getElementById('profile-form');
const editBtn = document.getElementById('edit-btn');
const saveBtn = document.getElementById('save-btn');
const cancelBtn = document.getElementById('cancel-btn');
const changePhotoBtn = document.getElementById('change-photo-btn');

/* ==================================================== */
/* 3. 함수 정의 */
/* ==================================================== */

/**
 * 3-1. 사용자 정보를 입력 필드에 렌더링하고 멤버십 정보를 표시합니다.
 */
function renderUserInfo() {
  // 멤버십 정보 표시
  document.getElementById('membership-type').textContent =
    userData.membership.type;
  document.getElementById(
    'membership-period'
  ).textContent = `${userData.membership.startDate} ~ ${userData.membership.endDate}`;

  // 프로필 이미지 업데이트
  document.getElementById('profile-image').src = userData.profilePhoto;

  // 개인 정보 입력 필드 업데이트
  document.getElementById('user-id').value = userData.id;
  document.getElementById('user-name').value = userData.name;
  document.getElementById('user-phone').value = userData.phone;
  document.getElementById('user-email').value = userData.email;
}

// ... (toggleEditMode, handleEditClick, handleCancelClick, handleChangePhotoClick 함수는 이전과 동일하며 생략합니다)

/**
 * 3-4. '저장' 버튼 클릭 핸들러: 변경된 정보를 저장하고 모드를 토글합니다.
 * 🌟 [수정] 변경된 데이터를 localStorage에 저장하는 로직이 추가되었습니다.
 */
profileForm.addEventListener('submit', function (event) {
  event.preventDefault();

  // 1. 폼 데이터 읽기
  const newPhone = document.getElementById('user-phone').value;
  const newEmail = document.getElementById('user-email').value;
  const newName = document.getElementById('user-name').value;

  // 2. 데이터 유효성 검사 (간단한 예시)
  if (!newPhone || !newEmail || !newName) {
    alert('모든 필드를 입력해주세요.');
    return;
  }

  // 3. 🌟 새로운 객체를 생성하고 userData를 업데이트합니다.
  const newUserData = {
    ...userData, // 기존 데이터 유지 (id, membership 등)
    name: newName,
    phone: newPhone,
    email: newEmail,
  };

  // 4. 🌟 localStorage에 저장
  saveUserData(newUserData);

  // 5. 편집 모드 종료
  toggleEditMode(false);

  // 6. 사용자에게 알림
  alert('✅ 개인 정보가 성공적으로 저장되었습니다!');
});

/* ==================================================== */
/* 4. 초기화 및 이벤트 리스너 설정 */
/* ==================================================== */

document.addEventListener('DOMContentLoaded', () => {
  renderUserInfo(); // 페이지 로드 시 로컬 스토리지 또는 기본 데이터로 정보 렌더링

  // 이벤트 리스너 설정
  editBtn.addEventListener('click', handleEditClick);
  cancelBtn.addEventListener('click', handleCancelClick);
  changePhotoBtn.addEventListener('click', handleChangePhotoClick);
});

// 나머지 함수 (toggleEditMode 등)는 그대로 유지

/**
 * 3-2. 편집 모드와 보기 모드를 전환합니다.
 * @param {boolean} isEditing - 편집 모드인지 여부 (true/false)
 */
function toggleEditMode(isEditing) {
  const inputFields = profileForm.querySelectorAll('input:not(#user-id)');

  // 1. 입력 필드 readonly 속성 토글
  inputFields.forEach((input) => {
    input.readOnly = !isEditing;
  });

  // 2. 버튼 가시성 토글
  editBtn.style.display = isEditing ? 'none' : 'block';
  saveBtn.style.display = isEditing ? 'block' : 'none';
  cancelBtn.style.display = isEditing ? 'block' : 'none';

  // 3. 사진 변경 버튼 가시성 토글
  changePhotoBtn.style.display = isEditing ? 'block' : 'none';
}

/**
 * 3-5. '수정' 버튼 클릭 핸들러: 편집 모드 시작
 */
function handleEditClick() {
  if (editBtn.style.display !== 'none') {
    toggleEditMode(true);
  }
}

/**
 * 3-6. '취소' 버튼 클릭 핸들러: 편집 모드 종료 및 원본 데이터 복원
 */
function handleCancelClick() {
  // 원본 데이터로 입력 필드 복원
  renderUserInfo();
  toggleEditMode(false);
}

/**
 * 3-7. '사진 변경' 버튼 클릭 핸들러 (Mock 기능)
 */
function handleChangePhotoClick() {
  // 실제 파일 업로드 기능 대신 임의의 사진으로 변경
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0');
  const newPhotoUrl = `https://placehold.co/120x120/${randomColor}/white?text=New`;

  // userData 객체와 DOM 모두 업데이트
  userData.profilePhoto = newPhotoUrl;
  document.getElementById('profile-image').src = newPhotoUrl;

  alert('프로필 사진이 임시로 변경되었습니다. 저장을 눌러 적용하세요.');
}
