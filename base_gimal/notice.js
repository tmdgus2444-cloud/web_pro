// notice.js

/* ==================================================== */
/* 1. 데이터 정의 */
/* ==================================================== */

// 게시글 데이터 배열 (모집, 이벤트, 일반 공지 유형 포함)
const notices = [
  {
    id: 1,
    type: '모집',
    title: '📢 12월 헬스장 이용권 모집 안내',
    date: '2025.11.25',
    content: `
      <div class="notice-content-section recruitment-detail">
        <p class="highlight-text">
          안녕하세요, 상명대 K동 헬스장입니다. 다가오는 12월 신규 이용권 모집을 시작합니다!
        </p>
        
        <h3>✨ 모집 상세 내용</h3>
        <p>추운 겨울, 실내에서 꾸준히 건강을 관리하세요. 학생 및 교직원 여러분의 많은 관심 부탁드립니다.</p>

        <h4>💪 이용권 구성 및 가격 안내</h4>
        <table class="price-table">
          <thead>
            <tr>
              <th>구분</th>
              <th>정가 (할인 전)</th>
              <th>할인 적용 가격</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1개월 이용권</td>
              <td>100,000원</td>
              <td>100,000원</td>
              <td>정상가</td>
            </tr>
            <tr>
              <td class="discount-item">3개월 묶음 이용권</td>
              <td>300,000원</td>
              <td>270,000원</td>
              <td>10% 할인</td>
            </tr>
            <tr>
              <td class="discount-item">6개월 묶음 이용권</td>
              <td>600,000원</td>
              <td>510,000원</td>
              <td>15% 할인</td>
            </tr>
          </tbody>
        </table>
        
        <h4>🌟 PT 프로그램 안내</h4>
        <p>1:1 퍼스널 트레이닝 상시 모집 중입니다. 자세한 내용은 센터 소개 또는 고객센터를 확인해주세요.</p>
      </div>
    `,
  },
  {
    id: 2,
    type: '이벤트',
    title: '🔥 3월 신규 등록 10% 추가 할인 이벤트!',
    date: '2025.02.28',
    // 🌟 할인 코드를 'X-mas'로 고정
    coupon: 'X-mas',
    content: `
      <div class="notice-content-section event-detail">
        <p class="highlight-text">
          새 학기를 맞이하여 신규 등록 고객에게 특별한 할인 혜택을 드립니다!
        </p>
        
        <h3>🎁 이벤트 상세 내용</h3>
        <ul>
          <li>**대상**: 2025년 3월 중 신규 등록하는 모든 학생/교직원 (선착순 50명)</li>
          <li>**혜택**: 모든 이용권 및 PT 프로그램 **10% 추가 할인**</li>
          <li>**참여 방법**: 결제 시 아래 **할인 코드**를 직원에게 제시해주세요.</li>
        </ul>
        
        <button id="show-coupon-btn" class="coupon-btn">
          ✨ 할인 코드 확인하기
        </button>

        <p class="event-note">
          * 선착순 50명 마감 시 이벤트가 조기 종료될 수 있습니다.
        </p>
      </div>
    `,
  },
  {
    id: 3,
    type: '공지',
    title: '🚨 설 연휴 운영 시간 변경 안내',
    date: '2025.01.10',
    content: `
      <div class="notice-content-section general-notice">
        <p>
          안녕하세요. 상명대 K동 헬스장입니다. 설 연휴 기간 동안 운영 시간이 아래와 같이 변경되오니, 이용에 불편이 없으시길 바랍니다.
        </p>

        <h4>⏰ 운영 시간 변경</h4>
        <ul class="time-list">
          <li>**2025년 2월 8일 (금)**: 정상 운영 (06:00 ~ 24:00)</li>
          <li>**2025년 2월 9일 (토) ~ 2월 11일 (월)**: **정기 휴무**</li>
          <li>**2025년 2월 12일 (화)**: 정상 운영 (06:00 ~ 24:00)</li>
        </ul>

        <p class="closing-note">
          즐거운 명절 보내시고, 안전하게 운동하세요! 감사합니다.
        </p>
      </div>
    `,
  },
];

/* ==================================================== */
/* 2. DOM 요소 참조 */
/* ==================================================== */

const listContainer = document.querySelector('.notice-list-container');
const detailContainer = document.querySelector('.notice-detail-container');
const backButton = document.getElementById('back-to-list-btn');

// 상세 페이지 요소
const detailTitle = document.getElementById('detail-title');
const detailDate = document.getElementById('detail-date');
const detailBody = document.getElementById('detail-body');

// 커스텀 모달 요소
const modalOverlay = document.getElementById('message-modal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalOkBtn = document.getElementById('modal-ok-btn');

/* ==================================================== */
/* 3. 핵심 함수 */
/* ==================================================== */

/**
 * 3-1. 공지사항 목록을 동적으로 렌더링하는 함수
 */
function renderNoticeList() {
  if (!listContainer) return;

  const noticeHTML = notices
    .map(
      (notice) => `
        <div class="notice-card" data-id="${notice.id}">
            <span class="notice-type notice-type-${notice.type.toLowerCase()}">${
        notice.type
      }</span>
            <h4 class="notice-title">${notice.title}</h4>
            <p class="notice-date">${notice.date}</p>
        </div>
    `
    )
    .join('');

  listContainer.innerHTML = noticeHTML;

  // 게시글 클릭 이벤트 리스너 연결
  document.querySelectorAll('.notice-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      // data-id 속성에서 ID 가져오기
      const noticeId = parseInt(e.currentTarget.getAttribute('data-id'));
      showNoticeDetail(noticeId);
    });
  });
}

/**
 * 3-2. 특정 게시글의 상세 내용을 표시하는 함수
 * @param {number} id - 게시글의 ID
 */
function showNoticeDetail(id) {
  const notice = notices.find((n) => n.id === id);

  if (!notice) {
    showCustomMessage('오류', '해당 게시글을 찾을 수 없습니다.');
    return;
  }

  // 상세 내용 업데이트
  detailTitle.textContent = notice.title;
  detailDate.textContent = notice.date;
  detailBody.innerHTML = notice.content;

  // 화면 전환 (목록 숨기기, 상세 표시)
  listContainer.style.display = 'none';
  detailContainer.style.display = 'block';

  // 스크롤을 최상단으로 이동 (상세 내용을 볼 수 있도록)
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // **이벤트 게시글 전용 기능 연결**
  // DOM에 내용이 삽입된 후 버튼을 찾아 이벤트를 연결합니다.
  if (notice.type === '이벤트' && notice.coupon) {
    const couponButton = document.getElementById('show-coupon-btn');
    if (couponButton) {
      couponButton.addEventListener('click', () => {
        // 🌟 'X-mas' 코드를 포함하여 모달에 할인 코드 표시
        showCustomMessage(
          '🎉 할인 코드',
          `할인 코드: <strong>${notice.coupon}</strong><br><br>결제 시 직원에게 제시해주세요!`
        );
      });
    }
  }
}

// 3-3. 목록으로 돌아가는 함수
function showNoticeList() {
  listContainer.style.display = 'block';
  detailContainer.style.display = 'none';
  // 목록으로 돌아갈 때 스크롤을 초기화 (선택 사항)
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * 3-4. 커스텀 메시지 모달을 표시하는 함수 (alert() 대체)
 * @param {string} title - 모달 제목
 * @param {string} message - 모달 내용 (HTML 허용)
 */
function showCustomMessage(title, message) {
  modalTitle.innerHTML = title;
  modalMessage.innerHTML = message;
  modalOverlay.style.display = 'flex'; // 모달 표시
}

/**
 * 3-5. 커스텀 메시지 모달을 닫는 함수
 */
function closeCustomMessage() {
  modalOverlay.style.display = 'none';
}

/* ==================================================== */
/* 4. 이벤트 리스너 및 초기화 */
/* ==================================================== */

// 목록으로 돌아가기 버튼 이벤트
backButton.addEventListener('click', showNoticeList);

// 모달 닫기 버튼 이벤트
closeModalBtn.addEventListener('click', closeCustomMessage);
modalOkBtn.addEventListener('click', closeCustomMessage);

// 페이지 로드 시 목록 렌더링
document.addEventListener('DOMContentLoaded', renderNoticeList);
