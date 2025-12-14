// payment.js

/* ==================================================== */
/* 0. 상수 정의 */
/* ==================================================== */
const REGISTERED_USERS_KEY = 'registeredUsers';
const CURRENT_USER_KEY = 'currentUser';

/* ==================================================== */
/* 1. 상수 정의 (수정됨: COUPON_CODE_VALID) */
/* ==================================================== */
const MONTHLY_PRICE = 10000; // 1개월 = 10,000원
const BUNDLE_DISCOUNT = 1000; // 3개월 묶음당 1,000원 할인
const COUPON_CODE_VALID = 'X-MAS'; // ⭐ 쿠폰 코드를 'X-MAS'로 수정했습니다. ⭐
const COUPON_DISCOUNT_RATE = 0.2; // 20% 할인

/* ==================================================== */
/* 2. 금액 계산 함수 */
/* ==================================================== */

/**
 * 개월 수에 따른 기본 가격과 기간 할인을 계산합니다.
 * @param {number} months 선택 개월 수
 * @returns {{basePrice: number, periodDiscount: number}}
 */
function calculatePeriodPrice(months) {
  if (months < 1) return { basePrice: 0, periodDiscount: 0 };

  const basePrice = months * MONTHLY_PRICE;
  // 3개월 묶음당 1000원 할인 계산
  const bundleCount = Math.floor(months / 3);
  const periodDiscount = bundleCount * BUNDLE_DISCOUNT;

  return { basePrice, periodDiscount };
}

/* ==================================================== */
/* 3. UI 업데이트 및 이벤트 핸들러 */
/* ==================================================== */

let totalDiscount = 0; // 누적 할인 금액
let isCouponApplied = false;

function updatePaymentInfo() {
  const monthsSelect = document.getElementById('months');
  const selectedMonths = parseInt(monthsSelect.value || '0', 10);

  // 1. 기간 및 할인 계산
  const { basePrice, periodDiscount } = calculatePeriodPrice(selectedMonths);

  // 2. 쿠폰 할인 계산 (쿠폰이 적용된 상태라면)
  let couponDiscount = 0;
  if (isCouponApplied) {
    // 쿠폰은 순수 금액에만 적용 (기간 할인은 이미 적용된 금액에서 20%를 할인)
    couponDiscount = Math.floor(
      (basePrice - periodDiscount) * COUPON_DISCOUNT_RATE
    );
  }

  // 3. 최종 금액 계산
  totalDiscount = periodDiscount + couponDiscount;
  const totalPrice = basePrice - totalDiscount;

  // 4. UI에 반영
  document.getElementById('base-price').textContent = (
    basePrice - periodDiscount
  ).toLocaleString(); // 기간 할인 적용된 금액
  document.getElementById('discount-amount').textContent =
    totalDiscount.toLocaleString();
  document.getElementById('total-price').textContent =
    totalPrice.toLocaleString();
}

function handleCouponApply() {
  // 입력값을 trim()으로 공백을 제거하고 toUpperCase()로 대문자로 변환하여 비교합니다.
  const couponCode = document
    .getElementById('coupon-code')
    .value.trim()
    .toUpperCase();
  const couponMessage = document.getElementById('coupon-message');

  if (couponCode === COUPON_CODE_VALID) {
    isCouponApplied = true;
    couponMessage.textContent =
      '🎉 쿠폰이 성공적으로 적용되었습니다! (20% 할인)';
    couponMessage.style.color = 'green';
    // 금액을 즉시 업데이트
    updatePaymentInfo();
  } else if (couponCode === '') {
    isCouponApplied = false;
    couponMessage.textContent = '쿠폰 코드를 입력하세요.';
    couponMessage.style.color = '#555';
    updatePaymentInfo();
  } else {
    isCouponApplied = false;
    // 디버깅을 위해 입력된 값과 유효한 값을 메시지에 포함합니다.
    couponMessage.textContent = `유효하지 않은 쿠폰 코드입니다. (입력: ${couponCode}, 유효: ${COUPON_CODE_VALID})`;
    couponMessage.style.color = 'red';
    updatePaymentInfo();
  }
}

function handlePaymentSubmit(event) {
  event.preventDefault();

  const monthsSelect = document.getElementById('months');
  const paymentMethodRadios = document.getElementsByName('payment-method');

  // 1. 유효성 검사: 개월 수 선택
  if (parseInt(monthsSelect.value, 10) < 1) {
    alert('회원권 등록 개월 수를 선택해주세요.');
    monthsSelect.focus();
    return;
  }

  // 2. 유효성 검사: 결제 방법 선택
  let selectedMethod = null;
  for (const radio of paymentMethodRadios) {
    if (radio.checked) {
      selectedMethod = radio.value;
      break;
    }
  }

  if (!selectedMethod) {
    alert('결제 방법을 선택해주세요.');
    return;
  }

  // 3. 최종 결제 정보 요약
  const totalPriceString = document.getElementById('total-price').textContent;

  let finalMessage = `
    ✅ 결제 정보 확인
    --------------------
    선택 개월: ${monthsSelect.value}개월
    총 할인 금액: ${document.getElementById('discount-amount').textContent}원
    최종 결제 금액: ${totalPriceString}원
    결제 방법: ${
      selectedMethod === 'card'
        ? '카드'
        : selectedMethod === 'cash'
        ? '현금(계좌 이체)'
        : '쿠폰'
    }
    --------------------
    결제를 진행하시겠습니까?
  `;

  if (confirm(finalMessage)) {
    // ===============================================
    // ⭐ [새로운 회원권 정보 저장 로직] ⭐
    // ===============================================

    const selectedMonths = parseInt(monthsSelect.value, 10);
    const today = new Date();

    // 시작일은 오늘 날짜로 설정 (YYYY.MM.DD 형식)
    const joinDateString = today
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\.\s/g, '.')
      .replace(/\.$/, '');

    // 종료일 계산 (Date 객체를 이용해 개월 수 더하기)
    const endDate = new Date(
      today.getFullYear(),
      today.getMonth() + selectedMonths,
      today.getDate()
    );
    // 종료일 형식: YYYY-MM-DD (mypage에서 Date 객체로 쉽게 변환하기 위해 ISO-like format 사용)
    const endDateFormat = endDate.toISOString().split('T')[0];

    // 1. 현재 사용자 및 전체 사용자 데이터 로드
    let currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
    let users = JSON.parse(localStorage.getItem(REGISTERED_USERS_KEY)) || [];

    if (!currentUser) {
      alert('로그인 정보가 유효하지 않습니다. 로그인 페이지로 돌아갑니다.');
      window.location.href = 'login.html';
      return;
    }

    // 2. 새로운 회원권 객체 생성
    const newMembership = {
      startDate: joinDateString, // 시작일은 현재 날짜
      endDate: endDateFormat,
      status: '유효',
      // 사물함 코드는 간단히 1000부터 시작하는 무작위 4자리로 가정
      lockerCode: (Math.floor(Math.random() * 9000) + 1000).toString(),
    };

    // 3. 전체 사용자 목록에서 현재 사용자 정보 업데이트 및 저장
    const userIndex = users.findIndex((user) => user.id === currentUser.id);
    if (userIndex !== -1) {
      // 기존 사용자 정보 갱신
      users[userIndex].membership = newMembership;
      localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));

      // 4. CURRENT_USER_KEY 갱신 (마이페이지에서 즉시 사용하기 위해)
      currentUser.membership = newMembership;
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));

      alert(
        `[결제 완료] 총 ${totalPriceString}원 (${monthsSelect.value}개월) 회원권이 등록되었습니다.`
      );

      // 5. 개인 페이지로 이동
      window.location.href = 'mypage.html';
    } else {
      alert('오류: 사용자 정보를 찾을 수 없습니다. 다시 로그인해주세요.');
      window.location.href = 'login.html';
    }
    // ===============================================
  }
}

/* ==================================================== */
/* 4. 이벤트 리스너 등록 */
/* ==================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const monthsSelect = document.getElementById('months');
  const applyCouponBtn = document.getElementById('apply-coupon-btn');
  const paymentForm = document.getElementById('payment-form');

  // 개월 수 변경 시 금액 업데이트
  if (monthsSelect) {
    monthsSelect.addEventListener('change', updatePaymentInfo);
  }

  // 쿠폰 적용 버튼 클릭 시
  if (applyCouponBtn) {
    applyCouponBtn.addEventListener('click', handleCouponApply);
  }

  // 폼 제출 시 유효성 검사 및 최종 결제 처리
  if (paymentForm) {
    paymentForm.addEventListener('submit', handlePaymentSubmit);
  }

  // 초기 금액 계산
  updatePaymentInfo();
});
