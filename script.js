// ==========================================
// 1. 滑鼠滾輪 轉 橫向翻頁 (結合 CSS Scroll Snap)
// ==========================================
const scrollContainer = document.querySelector('.horizontal-scroll-container');
let isScrolling = false; // 翻頁鎖定開關，避免一次滾動跳太多頁

window.addEventListener('wheel', (e) => {
  e.preventDefault(); 
  
  // 如果正在翻頁中，就不理會新的滾動動作
  if (isScrolling) return;

  // 判斷滾動方向：往下滾 (deltaY > 0)，往上滾 (deltaY < 0)
  // 設定一個閥值 (例如 30)，避免碰到滑鼠觸控板太敏感
  if (e.deltaY > 30) {
    // 往右翻一整頁 (螢幕寬度)
    scrollContainer.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
    lockScroll();
  } else if (e.deltaY < -30) {
    // 往左翻一整頁
    scrollContainer.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
    lockScroll();
  }
}, { passive: false });

// 翻頁鎖定計時器
function lockScroll() {
  isScrolling = true;
  // 鎖定 600 毫秒 (等待平滑滾動動畫結束)，再開放下一次滾動
  setTimeout(() => {
    isScrolling = false;
  }, 600); 
}

// ==========================================
// 2. 導覽列點擊平滑跳轉
// ==========================================
const navLinks = document.querySelectorAll('.fixed-nav a');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // 阻止 <a> 標籤預設的跳轉行為
    
    // 取得目標分類的 id (例如 #category-packaging)
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      // 計算目標區塊距離最左邊的距離
      const targetOffset = targetSection.offsetLeft;
      
      // 讓容器平滑滾動到該距離
      scrollContainer.scrollTo({
        left: targetOffset,
        behavior: 'smooth'
      });
    }
  });
});
