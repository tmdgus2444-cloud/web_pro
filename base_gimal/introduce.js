// introduce.js

/* ==================================================== */
/* 1. 데이터 정의 (소개 페이지용) */
/* ==================================================== */

// 상세 트레이너 데이터 (✅ 경범준, 엄희수 트레이너 삭제됨)
const detailedTrainers = [
  {
    id: 'seunghyun', // ID를 사용하여 링크 타겟 설정
    name: '이승현 트레이너',
    photo: 'lee.jpg', // 🌟 이승현 트레이너 이미지: lee.jpg
    specialty: '근력 증진 및 재활 트레이닝',
    tagline: '🔥 잠재력을 깨우는 체계적인 웨이트 전문 코칭!',
    intro:
      '수년간의 전문 트레이닝 경험을 바탕으로, 단순한 근육 성장을 넘어 올바른 움직임과 부상 방지에 중점을 둔 개인 맞춤 프로그램을 제공합니다. 운동을 처음 시작하는 초보자부터 전문적인 피크 성능을 원하는 숙련자까지, 모두의 목표 달성을 돕습니다.',
    certifications: [
      '🏆 생활스포츠지도사 2급 (보디빌딩)',
      '🦴 스포츠 재활 마스터',
      '📊 FMS (기능적 움직임 평가) 전문가',
      '💊 공인 영양 코치',
    ],
    career: [
      'XX 피트니스 센터 수석 트레이너 (5년)',
      'XX 대학 스포츠 과학 연구소 협력 코치',
      '바디 프로필 전문 코치 100회 이상 지도',
    ],
  },
  {
    id: 'yoon', // 🌟 윤준서 트레이너
    name: '윤준서 트레이너',
    photo: 'yoon.jpg', // 🌟 이미지 파일: yoon.jpg
    specialty: '다이어트 및 기능성 운동',
    tagline: '✨ 즐겁고 꾸준한 운동 습관을 위한 최적의 파트너!',
    intro:
      '회원님들의 라이프스타일에 맞춘 현실적인 다이어트 계획과 기능성 트레이닝을 결합하여, 체중 감량은 물론 일상생활의 활력을 되찾아 드립니다. 동기 부여와 꾸준함이 중요한 만큼, 친절하고 재미있는 코칭으로 함께 목표를 이뤄 나갑니다.',
    certifications: [
      '🏋️‍♂️ 공인 퍼스널 트레이너 (CPT)',
      '🏃‍♀️ 그룹 운동 전문가 (GX)',
      '💪 요가 및 필라테스 지도자 과정 수료',
    ],
    career: [
      'YY 피트니스 스튜디오 PT팀 리더 (3년)',
      '생활 체육 동호회 전담 트레이너',
      '온라인 PT 및 식단 코칭 전문',
    ],
  },
  {
    id: 'youngwoo', // 🌟 최영우 트레이너
    name: '최영우 트레이너',
    photo: 'choi.jpg', // 🌟 이미지 파일: choi.jpg
    specialty: '체형 교정 및 근육 불균형 해소',
    tagline: '📐 과학적인 접근으로 몸의 중심을 잡아드립니다!',
    intro:
      '잘못된 자세로 인한 통증과 불균형을 해결하는 데 특화되어 있습니다. 최신 체형 분석 시스템을 활용하여 문제점을 정확히 진단하고, 개인의 몸 상태에 맞는 교정 운동과 강화 훈련을 제공하여 지속 가능한 건강을 목표로 합니다.',
    certifications: [
      '🧑‍⚕️ 운동 처방사 (CES)',
      '🧘‍♂️ 소마틱스 및 기능 해부학 전문가',
      '🏆 보디빌딩 대회 피지크 부문 입상',
    ],
    career: [
      'ZZ 재활 운동 센터 수석 치료사 (4년)',
      '프로 운동선수 퍼포먼스 향상 코칭',
      '일반인을 위한 바른 자세 워크샵 진행',
    ],
  },
  {
    id: 'moongi', // 🌟 박문기 트레이너
    name: '박문기 트레이너',
    photo: 'park.jpg', // 🌟 이미지 파일: park.jpg
    specialty: '단기 집중 다이어트 및 식단 컨설팅',
    tagline: '⏱️ 단기간 변화를 위한 확실하고 안전한 솔루션!',
    intro:
      '결혼식, 바디 프로필 등 단기적인 목표를 가진 회원들에게 최적화된 고강도 프로그램과 영양 관리를 제공합니다. 무리하지 않으면서도 최대의 결과를 낼 수 있도록 멘탈 케어와 동기 부여를 끊임없이 제공합니다.',
    certifications: [
      '🍎 공인 스포츠 영양 코치',
      '🏃‍♀️ HIIT 및 서킷 트레이닝 전문가',
      '📚 스포츠 심리학 과정 수료',
    ],
    career: [
      'AA 프리미엄 PT샵 공동 대표 (2년)',
      '다이어트 비포/애프터 챌린지 다수 성공 지도',
      '피트니스 잡지 칼럼니스트 활동',
    ],
  },
];

// 휴무일 데이터 (월은 0부터 시작, 즉 3월은 2)
const holidays = [
  // 2025년
  { month: 2, date: 1, info: '삼일절 휴무' }, // 3월 1일
  { month: 4, date: 5, info: '어린이날 대체 휴무' }, // 5월 5일
  { month: 5, date: 6, info: '현충일 휴무' }, // 6월 6일
  { month: 7, date: 15, info: '광복절 휴무' }, // 8월 15일
  { month: 9, date: 3, info: '개천절 휴무' }, // 10월 3일
  { month: 9, date: 9, info: '한글날 휴무' }, // 10월 9일
  { month: 11, date: 25, info: '성탄절 휴무' }, // 12월 25일
  // 2026년
  { year: 2026, month: 0, date: 1, info: '신정 휴무' },
  { year: 2026, month: 1, date: 18, info: '설날 연휴' },
  { year: 2026, month: 1, date: 19, info: '설날 연휴' },
  { year: 2026, month: 1, date: 20, info: '설날 연휴' },
];

/* ==================================================== */
/* 2. 트레이너 상세 정보 렌더링 */
/* ==================================================== */

/**
 * 2-1. 상세 트레이너 목록을 렌더링하는 함수 (변경 없음)
 */
function renderDetailedTrainers() {
  const trainerListContainer = document.getElementById('trainer-detail-list');
  if (!trainerListContainer) return;

  const trainerHTML = detailedTrainers
    .map(
      (trainer) => `
        <div class="trainer-detail-card" id="trainer-${trainer.id}">
            <div class="photo-area">
                <img src="${trainer.photo}" alt="${
        trainer.name
      } 트레이너 사진" class="trainer-full-photo">
                <p class="photo-placeholder">※ 예시 이미지입니다.</p>
            </div>
            <div class="text-area">
                <span class="specialty-tag">${trainer.specialty}</span>
                <h4>${trainer.name}</h4>
                <p class="detail-tagline">${trainer.tagline}</p>
                <p class="intro-text">${trainer.intro}</p>

                <div class="detail-info-grid">
                    <div class="detail-list">
                        <h5>🏆 자격 및 교육</h5>
                        <ul>
                            ${trainer.certifications
                              .map((cert) => `<li>${cert}</li>`)
                              .join('')}
                        </ul>
                    </div>
                    <div class="detail-list">
                        <h5>📊 주요 경력</h5>
                        <ul>
                            ${trainer.career
                              .map((c) => `<li>${c}</li>`)
                              .join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `
    )
    .join('');

  trainerListContainer.innerHTML = trainerHTML;
}

/* ==================================================== */
/* 3. 달력 기능 구현 (✅ 복구된 핵심 기능) */
/* ==================================================== */

// 달력 상태 변수
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth(); // 0부터 11 (1월 ~ 12월)

// DOM 요소
const calendarDatesContainer = document.querySelector('.calendar-dates');
const monthYearTitle = document.getElementById('current-month-year');
const prevButton = document.getElementById('prev-month-btn');
const nextButton = document.getElementById('next-month-btn');

/**
 * 3-1. 특정 연/월의 달력을 렌더링하는 함수
 * @param {number} year - 표시할 연도 (YYYY)
 * @param {number} month - 표시할 월 (0-11)
 */
function renderCalendar(year, month) {
  if (!calendarDatesContainer) return; // 요소가 없으면 실행 중지

  calendarDatesContainer.innerHTML = '';
  monthYearTitle.textContent = `${year}년 ${month + 1}월`;

  const today = new Date();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 해당 월의 첫 날 요일 (0=일, 6=토)
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // 해당 월의 총 일수
  const prevMonthDays = new Date(year, month, 0).getDate(); // 지난 달의 총 일수

  // 1. 지난 달 날짜 채우기 (정렬을 위해 필요)
  for (let i = 0; i < firstDayOfMonth; i++) {
    const date = prevMonthDays - firstDayOfMonth + i + 1;
    const dateElement = document.createElement('li');
    dateElement.classList.add('calendar-date', 'inactive');
    dateElement.textContent = date;
    calendarDatesContainer.appendChild(dateElement);
  }

  // 2. 현재 달 날짜 채우기
  for (let date = 1; date <= daysInMonth; date++) {
    const dateElement = document.createElement('li');
    dateElement.classList.add('calendar-date');
    dateElement.textContent = date;

    // 오늘 날짜 표시
    if (
      date === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dateElement.classList.add('today');
    }

    // 휴무일 데이터 확인 (공휴일)
    const holiday = holidays.find(
      (h) =>
        h.date === date &&
        h.month === month &&
        (h.year === year || h.year === undefined)
    );

    if (holiday) {
      dateElement.classList.add('special-holiday');
      // 휴무일 정보 표시
      const info = document.createElement('span');
      info.classList.add('holiday-info');
      info.textContent = holiday.info;
      dateElement.appendChild(info);
    }

    // 주말(토요일/일요일)은 CSS에서 처리되므로 여기서는 추가적인 로직 불필요

    calendarDatesContainer.appendChild(dateElement);
  }

  // 3. 다음 달 날짜 채우기 (전체 42개 칸을 맞추기 위해)
  const totalCells = calendarDatesContainer.children.length;
  const remainingCells = 42 - totalCells; // 최대 6주 (42칸)까지 표시
  for (let i = 1; i <= remainingCells; i++) {
    const dateElement = document.createElement('li');
    dateElement.classList.add('calendar-date', 'inactive');
    dateElement.textContent = i;
    calendarDatesContainer.appendChild(dateElement);
  }

  // 버튼 비활성화 상태 업데이트
  updateButtonStatus(year, month);
}

/**
 * 3-2. 달력 데이터 범위에 따라 이전/다음 버튼을 비활성화하는 함수
 */
function updateButtonStatus(year, month) {
  if (prevButton && nextButton) {
    // 2025년 1월 이전은 비활성화
    prevButton.disabled = year === 2025 && month === 0;
    // 2027년 12월 이후는 비활성화
    nextButton.disabled = year === 2027 && month === 11;
  }
}

/**
 * 3-3. 월 이동 함수
 */
function changeMonth(delta) {
  let newMonth = currentMonth + delta;
  let newYear = currentYear;

  if (newMonth > 11) {
    newMonth = 0;
    newYear++;
  } else if (newMonth < 0) {
    newMonth = 11;
    newYear--;
  }

  // 데이터 범위 (2025년 ~ 2027년)를 벗어나면 이동하지 않습니다.
  if (newYear > 2027 || newYear < 2025) {
    return;
  }

  currentMonth = newMonth;
  currentYear = newYear;

  renderCalendar(currentYear, currentMonth);
}

// 3-4. 트레이너 상세 섹션으로 스크롤하는 함수 (해시 링크 처리)
function scrollToTrainer() {
  const hash = window.location.hash;

  if (hash && hash.startsWith('#trainer-')) {
    // DOM 콘텐츠가 모두 로드된 후 스크롤을 시도합니다.
    setTimeout(() => {
      const targetElement = document.getElementById(hash.substring(1));
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100); // 렌더링을 기다리기 위해 짧은 지연 시간 설정
  }
}

/* ==================================================== */
/* 4. 이벤트 리스너 및 초기화 */
/* ==================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 트레이너 목록 렌더링
  renderDetailedTrainers();

  // 달력 초기 렌더링
  if (calendarDatesContainer) {
    renderCalendar(currentYear, currentMonth);

    // 달력 버튼 이벤트 리스너 연결
    if (prevButton) {
      prevButton.addEventListener('click', () => changeMonth(-1));
    }
    if (nextButton) {
      nextButton.addEventListener('click', () => changeMonth(1));
    }
  }

  // 트레이너 상세 섹션 스크롤 (해시 링크 처리)
  scrollToTrainer();
});
