// main.js

/* ==================================================== */
/* 1. 데이터 정의 (메인 페이지용) */
/* ==================================================== */

// 1-1. 단일 이벤트 데이터 (할인 코드 이벤트로 변경)
const mainEvent = {
  title: '🔥 3월 신규 등록 할인 코드 이벤트!',
  icon: '🔑',
  // 🌟 원래대로 돌아감: 할인 코드 ('X-mas')를 제거하고 일반적인 문구로 변경
  details:
    '등록 시 **공지사항**에 있는 할인 코드를 제시하면 **모든 프로그램 10% 추가 할인!** (선착순 50명)',
  duration: '2025년 3월 1일 ~ 3월 31일',
};

// 1-2. 헬스장 이용권 모집 안내 데이터 (변경 없음)
const recruitmentNotice = {
  title: '헬스장 이용권 & PT 모집 안내',
  content:
    '학생/교직원 대상! 3개월, 6개월 이용권 및 1:1 퍼스널 트레이닝 상시 모집 중입니다. 자세한 내용은 센터 소개 또는 고객센터를 확인해주세요.',
  contact: '문의: 041-555-1234',
};

// 1-3. 간략 트레이너 데이터 (변경 없음)
const trainers = [
  {
    id: 'seunghyun', // ID를 사용하여 introduce.html로 링크
    name: '이승현 트레이너',
    photo: 'seunghyun.jpg',
    tagline: '🔥 웨이트 트레이닝 전문',
    description:
      '올바른 자세는 곧 부상 방지입니다. 체계적인 프로그램으로 당신의 잠재력을 깨워드리겠습니다.',
    certs: ['🏆 생활스포츠지도사 2급', '🏋️ 근력 강화/'],
  },
  {
    id: 'junseo', // ID를 사용하여 introduce.html로 링크
    name: '윤준서 트레이너',
    photo: 'junseo.jpg',
    tagline: '🏃‍♀️ 다이어트 및 체형 교정 전문',
    description:
      '무리 없는 다이어트와 바른 자세를 위한 맞춤 코칭을 제공합니다. 건강한 라이프스타일을 함께 만들어가요.',
    certs: ['🏅 스포츠 마사지 전문가', '🍎 식단 관리 컨설턴트'],
  },
];

/* ==================================================== */
/* 2. 함수 정의 */
/* ==================================================== */

// 2-1. 이벤트 섹션을 동적으로 렌더링하는 함수
function renderEvents() {
  const eventContainer = document.querySelector('.event-list');
  if (!eventContainer) return;

  const eventHTML = `
        <a href="notice.html" class="event-card-link">
            <div class="event-card">
                <h4>${mainEvent.icon} ${mainEvent.title}</h4>
                <p>${mainEvent.details}</p>
                <p class="duration">${mainEvent.duration}</p>
                <span class="click-to-check">자세히 보기 (공지사항으로 이동) &raquo;</span>
            </div>
        </a>
        <div class="recruitment-notice">
            <h4>${recruitmentNotice.title}</h4>
            <p>${recruitmentNotice.content}</p>
            <p class="contact-info">${recruitmentNotice.contact}</p>
        </div>
    `;

  eventContainer.innerHTML = eventHTML;
}

// 2-2. 트레이너 목록을 동적으로 렌더링하는 함수 (변경 없음)
function renderTrainers() {
  const trainerListContainer = document.querySelector('.trainer-list');
  if (!trainerListContainer) return;

  const trainerHTML = trainers
    .map(
      (trainer) => `
        <a href="introduce.html#trainer-${
          trainer.id
        }" class="trainer-card-link">
            <div class="trainer-card">
                <div class="trainer-photo" style="background-image: url('${
                  trainer.photo
                }');"></div>
                <h4>${trainer.name}</h4>
                <p class="tagline">${trainer.tagline}</p>
                <p>${trainer.description}</p>
                <ul>
                    ${trainer.certs
                      .map((cert) => `<li><i class="icon"></i>${cert}</li>`)
                      .join('')}
                </ul>
            </div>
        </a>
    `
    )
    .join('');

  trainerListContainer.innerHTML = trainerHTML;
}

/* ==================================================== */
/* 3. 페이지 로드 실행 */
/* ==================================================== */
document.addEventListener('DOMContentLoaded', () => {
  renderEvents();
  renderTrainers();
});
