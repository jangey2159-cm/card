(function () {
  'use strict';

  // URL에 ?bg=gradient 있으면 노랑→초록 고급 배경 적용
  if (window.location.search.includes('bg=gradient')) {
    document.body.classList.add('bg-gradient');
  }

  const shareBtn = document.getElementById('shareBtn');
  const card = document.querySelector('.card-inner');

  // Web Share API 지원 시 공유, 아니면 클립보드 복사
  function getShareData() {
    return {
      title: '애플짱 | 디지털 명함',
      text: '애플짱 · 바이브코딩 학습자 · 코딩과 함께 성장하는 하루를 만들어요 🍎',
      url: window.location.href
    };
  }

  function fallbackCopy() {
    const { text, url } = getShareData();
    const toCopy = text + '\n' + url;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(toCopy).then(function () {
        showToast('클립보드에 복사했어요 📋');
      }).catch(function () {
        showToast('복사에 실패했어요. URL을 직접 복사해 주세요.');
      });
    } else {
      showToast('이 페이지 URL을 공유해 주세요: ' + url);
    }
  }

  function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(function () {
      toast.classList.add('show');
    });
    setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(function () { toast.remove(); }, 300);
    }, 2500);
  }

  shareBtn.addEventListener('click', function () {
    if (navigator.share) {
      navigator.share(getShareData()).then(function () {
        showToast('공유했어요 🍎');
      }).catch(function (err) {
        if (err.name !== 'AbortError') fallbackCopy();
      });
    } else {
      fallbackCopy();
    }
  });

  // 카드 살짝 기울이기 (마우스 따라가기)
  if (card) {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = 'perspective(1000px) rotateY(' + (x * 6) + 'deg) rotateX(' + (-y * 6) + 'deg)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
    });
  }
})();
