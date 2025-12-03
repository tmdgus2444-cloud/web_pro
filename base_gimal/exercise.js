// exercise.js

/* ==================================================== */
/* 1. 데이터 정의 (3종의 운동 기구) */
/* ==================================================== */

const equipmentData = [
  {
    id: 'bench-press',
    name: '벤치 프레스',
    icon: '', // ⚠️ 수정: 덤벨 아이콘을 제거하고 빈 문자열로 변경
    description: '상체 근력을 키우는 대표적인 운동 기구입니다.',
    // 🚩 벤치 프레스 영상 URL (이전 요청의 최종 URL)
    videoUrl: 'https://www.youtube.com/embed/A2kHURY746E',
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
      // 🚩 벤치 프레스 이미지 (유지)
      tag: '<img src="bench_press1.jpg" alt="벤치 프레스 타겟 근육 이미지" class="muscle-model-image">',
      explanation: `
        <h5>대흉근, 삼각근 (전면), 삼두근</h5>
        <p>벤치 프레스는 **대흉근(가슴 근육)**을 주 타겟으로 하며, 팔을 펴는 동작에 **삼두근**이, 안정과 보조에 **전면 삼각근**이 사용됩니다. 이 운동은 상체 미는 힘(Pushing Power)을 극대화하는 데 가장 효과적입니다.</p>
      `,
    },
    // ✅ 새 속성 추가: 배경 이미지 파일명
    backgroundImage: 'bench-press-bg',
  },
  {
    id: 'squat', // ID 변경
    name: '스쿼트', // 이름 변경
    icon: '', // 아이콘 제거 유지
    description: '하체 근력과 코어를 동시에 강화하는 운동의 왕입니다.', // 설명 변경
    // 🚩 수정: 스쿼트 영상 URL 변경
    videoUrl: 'https://www.youtube.com/embed/MWjKQGoNW0U',
    instructions: `
      <ol>
        <li>바벨을 승모근 상부에 견착하고, 발은 어깨너비 또는 그보다 약간 넓게 벌립니다.</li>
        <li>가슴을 펴고 시선은 전방을 유지하며, 무릎과 엉덩이를 동시에 굽혀 앉습니다.</li>
        <li>무릎은 발끝과 같은 방향으로 벌리고, 허리가 말리지 않도록 코어에 힘을 줍니다.</li>
        <li>허벅지가 바닥과 평행이 되거나 가능한 깊이까지 내려갑니다.</li>
        <li>**주의:** 일어설 때 무릎이 안쪽으로 모이지 않도록 하며, 허리를 곧게 유지하는 것이 핵심입니다.</li>
      </ol>
      <p class="highlight-text">주요 타겟 근육: 대퇴사두근, 둔근 (허벅지 앞, 엉덩이)</p>
    `, // 내용 변경
    muscleModel: {
      // 🚩 스쿼트 이미지 추가 (유지)
      tag: '<img src="squat1.jpg" alt="스쿼트 타겟 근육 이미지" class="muscle-model-image">',
      explanation: `
        <h5>대퇴사두근, 둔근, 햄스트링</h5>
        <p>스쿼트는 **대퇴사두근(허벅지 앞쪽)**과 **둔근(엉덩이)**을 주 타겟으로 합니다. 전신 근육의 70% 이상을 사용하는 전신 운동이며, 강력한 하체 근력과 기초 대사량 증진에 가장 효과적인 운동입니다.</p>
      `, // 내용 변경
    },
    // ✅ 새 속성 추가
    backgroundImage: 'squat-bg',
  },
  {
    id: 'deadlift', // ID 변경
    name: '데드리프트', // 이름 변경
    icon: '', // 아이콘 제거 유지
    description: '전신 후면 근육을 강화하는 최고의 전신 운동입니다.', // 설명 변경
    // 🚩 수정: 데드리프트 영상 URL 변경
    videoUrl: 'https://www.youtube.com/embed/XIxSN7OewtA',
    instructions: `
      <ol>
        <li>바벨 앞에 서서 발은 골반 너비로 벌리고 정강이에 가깝게 붙입니다.</li>
        <li>허리를 곧게 펴고(신전 유지), 엉덩이를 뒤로 빼면서 바를 잡습니다.</li>
        <li>가슴을 펴고 광배근에 힘을 주어 바벨을 몸에 붙인다는 느낌으로 수직으로 들어 올립니다.</li>
        <li>최고 지점에서 엉덩이를 조이고 어깨를 뒤로 젖히지 않도록 주의합니다.</li>
        <li>**주의:** 허리가 굽어지지 않도록 자세를 완벽하게 유지하는 것이 중요하며, 무리한 중량은 피해야 합니다.</li>
      </ol>
      <p class="highlight-text">주요 타겟 근육: 둔근, 햄스트링, 광배근, 척추기립근</p>
    `, // 내용 변경
    muscleModel: {
      // 🚩 데드리프트 이미지 추가 (유지)
      tag: '<img src="dead_lift1.jpg" alt="데드리프트 타겟 근육 이미지" class="muscle-model-image">',
      explanation: `
        <h5>둔근, 햄스트링, 광배근, 척추기립근</h5>
        <p>데드리프트는 **둔근, 햄스트링, 척추기립근** 등 후면 근육 사슬을 강화하며, **광배근**과 코어 근육도 사용됩니다. 전신 근력과 파워를 기르는 데 필수적인 운동이며, 올바른 자세는 부상 방지에 매우 중요합니다. </p>
      `, // 내용 변경
    },
    // ✅ 새 속성 추가
    backgroundImage: 'deadlift-bg',
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
        <div class="equipment-card ${eq.backgroundImage}" data-id="${eq.id}">
            <div class="icon-placeholder"><i class="${eq.icon || ''}"></i></div>
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
    ${selectedEquipment.muscleModel.tag} 
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
