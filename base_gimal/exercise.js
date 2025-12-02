// exercise.js

/* ==================================================== */
/* 1. 데이터 정의 (3종의 운동 기구) */
/* ==================================================== */

const equipmentData = [
  {
    id: 'bench-press',
    name: '벤치 프레스',
    icon: 'fas fa-dumbbell',
    description: '상체 근력을 키우는 대표적인 운동 기구입니다.',
    videoUrl: 'https://www.youtube.com/embed/gL16Iq6e68I', // 임의의 YouTube 영상 URL
    instructions: `
      <ol>
        <li>벤치에 누워 바벨을 잡고, 발은 바닥에 단단히 고정합니다.</li>
        <li>가슴 중앙(젖꼭지 라인)에 바벨이 오도록 수직으로 내립니다.</li>
        <li>가슴에 긴장(신장)을 느끼며, 팔꿈치 각도는 약 70~90도를 유지합니다.</li>
        <li>가슴의 힘으로 바벨을 들어 올리며 대흉근을 강하게 수축시킵니다.</li>
        <li>**주의:** 어깨가 벤치에서 뜨지 않도록 견갑골을 후인 하강(뒤로 모으고 내림)하여 고정합니다.</li>
      </ol>
      <p class="highlight-text">주요 타겟 근육: 대흉근 (가슴)</p>
    `,
    muscleModel: {
      tag: '[Image of human chest muscles exercise]', // 가슴 근육 운동 모형
      explanation: `
        <h5>대흉근, 삼각근 (전면), 삼두근</h5>
        <p>벤치 프레스는 **대흉근(가슴 근육)**을 주 타겟으로 하며, 팔을 펴는 동작에 **삼두근**이, 안정과 보조에 **전면 삼각근**이 사용됩니다. 이 운동은 상체 미는 힘(Pushing Power)을 극대화하는 데 가장 효과적입니다.</p>
      `,
    },
  },
  {
    id: 'lat-pulldown',
    name: '랫 풀다운',
    icon: 'fas fa-grip-lines-vertical',
    description: '등을 넓게 만드는 데 필수적인 상체 당기기 운동입니다.',
    videoUrl: 'https://www.youtube.com/embed/Z0o4SjA-P9g', // 임의의 YouTube 영상 URL
    instructions: `
      <ol>
        <li>무릎 패드 아래에 허벅지를 단단히 고정하고, 바를 어깨너비보다 넓게 잡습니다.</li>
        <li>가슴을 펴고 상체를 살짝 뒤로 기울입니다.</li>
        <li>팔꿈치를 등 뒤쪽으로 끌어내린다는 느낌으로 바를 쇄골 쪽으로 당깁니다.</li>
        <li>등 근육(광배근)의 수축을 느끼며 천천히 바를 올립니다.</li>
        <li>**주의:** 팔의 힘보다는 등 근육의 수축에 집중하며, 허리가 과도하게 젖혀지지 않도록 복부에 힘을 줍니다.</li>
      </ol>
      <p class="highlight-text">주요 타겟 근육: 광배근 (등)</p>
    `,
    muscleModel: {
      tag: '[Image of human back muscles exercise]', // 등 근육 운동 모형
      explanation: `
        <h5>광배근, 대원근, 이두근</h5>
        <p>랫 풀다운은 **광배근(등 근육)**을 주 타겟으로 합니다. 등 상부를 넓게 만드는 데 기여하며, 팔을 굽히는 동작에 **이두근**이 보조적으로 사용됩니다. 올바른 자세는 넓고 두꺼운 등의 발달에 핵심입니다.</p>
      `,
    },
  },
  {
    id: 'leg-press',
    name: '레그 프레스',
    icon: 'fas fa-running',
    description: '무릎 관절 부담을 줄이면서 하체 근육을 강화합니다.',
    videoUrl: 'https://www.youtube.com/embed/WJ9G7r75-9c', // 임의의 YouTube 영상 URL
    instructions: `
      <ol>
        <li>의자에 앉아 발을 플레이트에 어깨너비로 올립니다. (발 위치에 따라 타겟 근육이 달라짐)</li>
        <li>안전 레버를 풀고, 무릎이 가슴 쪽으로 오도록 천천히 중량을 내립니다.</li>
        <li>무릎이 발끝보다 앞으로 나가지 않도록 주의하며, 허리가 패드에서 뜨지 않는 범위까지만 내립니다.</li>
        <li>허벅지(대퇴사두근)의 힘으로 플레이트를 강하게 밀어 올립니다.</li>
        <li>**주의:** 무릎을 완전히 펴서 관절에 충격이 가지 않도록, 펴기 직전에 멈춥니다.</li>
      </ol>
      <p class="highlight-text">주요 타겟 근육: 대퇴사두근 (허벅지 앞)</p>
    `,
    muscleModel: {
      tag: '[Image of human leg muscles exercise]', // 다리 근육 운동 모형
      explanation: `
        <h5>대퇴사두근, 둔근, 햄스트링</h5>
        <p>레그 프레스는 **대퇴사두근(허벅지 앞쪽)**과 **둔근(엉덩이)**을 집중적으로 단련합니다. 발 위치를 높이면 **햄스트링**과 둔근에 더 집중할 수 있으며, 하체 전반적인 근력과 볼륨을 키우는 데 매우 효과적입니다.</p>
      `,
    },
  },
];

/* ==================================================== */
/* 2. DOM 요소 및 상태 관리 */
/* ==================================================== */
const listContainer = document.getElementById('equipment-list');
const detailView = document.getElementById('equipment-detail-view');
const backButton = document.getElementById('back-to-list-btn');

/* ==================================================== */
/* 3. 렌더링 함수 */
/* ==================================================== */

/**
 * 3-1. 운동 기구 목록을 렌더링하고 클릭 이벤트를 설정합니다.
 */
function renderEquipmentList() {
  if (!listContainer) return;

  const listHTML = equipmentData
    .map(
      (eq) => `
        <div class="equipment-card" data-id="${eq.id}">
            <div class="icon-placeholder"><i class="${eq.icon}"></i></div>
            <h4>${eq.name}</h4>
            <p>${eq.description}</p>
        </div>
      `
    )
    .join('');

  listContainer.innerHTML = listHTML;

  // 각 카드에 클릭 이벤트 리스너 추가
  document.querySelectorAll('.equipment-card').forEach((card) => {
    card.addEventListener('click', (event) => {
      const id = event.currentTarget.getAttribute('data-id');
      showEquipmentDetail(id);
    });
  });
}

/**
 * 3-2. 선택된 기구의 상세 정보를 표시합니다.
 * @param {string} id - 선택된 기구의 ID
 */
function showEquipmentDetail(id) {
  const selectedEquipment = equipmentData.find((eq) => eq.id === id);

  if (!selectedEquipment) return;

  // 목록 숨기기, 상세 뷰 보이기
  listContainer.parentElement.style.display = 'none';
  detailView.style.display = 'block';

  // 스크롤을 상단으로 이동
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // 1. 제목 업데이트
  document.getElementById('detail-title').textContent = selectedEquipment.name;

  // 2. 사용 방법 (글) 업데이트
  document.getElementById('detail-text-instructions').innerHTML =
    selectedEquipment.instructions;

  // 3. 동영상 업데이트
  document.getElementById('detail-video').src = selectedEquipment.videoUrl;

  // 4. 운동 효과 및 신체 모형 (이미지 태그 및 설명) 업데이트
  const muscleModelArea = document.getElementById('detail-muscle-model');
  muscleModelArea.innerHTML = `
    <p>${selectedEquipment.muscleModel.tag}</p>
    <div class="muscle-group-description">
        ${selectedEquipment.muscleModel.explanation}
    </div>
  `;
}

/**
 * 3-3. 상세 뷰를 숨기고 목록을 다시 표시합니다.
 */
function showEquipmentList() {
  listContainer.parentElement.style.display = 'block';
  detailView.style.display = 'none';
  // 목록으로 돌아갈 때 스크롤 초기화
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ==================================================== */
/* 4. 초기화 및 이벤트 리스너 설정 */
/* ==================================================== */

document.addEventListener('DOMContentLoaded', () => {
  renderEquipmentList();

  // '목록으로 돌아가기' 버튼 이벤트 설정
  if (backButton) {
    backButton.addEventListener('click', showEquipmentList);
  }
});
