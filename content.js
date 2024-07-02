// content.js
document.addEventListener('DOMContentLoaded', () => {
    let title = document.title;  // 기본 제목은 <title> 태그로부터
  
    // Open Graph 제목 확인
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && ogTitle.content) {
      title = ogTitle.content;
    }
  
    // 트위터 카드 제목 확인
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle && twitterTitle.content) {
      title = twitterTitle.content;
    }
  
    // h1 태그 확인
    const h1Tag = document.querySelector('h1');
    if (h1Tag && h1Tag.textContent.trim() !== '') {
      title = h1Tag.textContent.trim();
    } else {
      // h1, h2, h3 태그에 특정 클래스가 있는지 확인
      const titleTag = document.querySelector('h1.title, h2.title, h3.title');
      if (titleTag && titleTag.textContent.trim() !== '') {
        title = titleTag.textContent.trim();
      } else {
        // h2, h3 태그 확인
        const h2Tag = document.querySelector('h2');
        const h3Tag = document.querySelector('h3');
        if (h2Tag && h2Tag.textContent.trim() !== '') {
          title = h2Tag.textContent.trim();
        } else if (h3Tag && h3Tag.textContent.trim() !== '') {
          title = h3Tag.textContent.trim();
        }
      }
    }
  
    console.log(`Detected page title: ${title}`);
  
    // Send the title to the popup script
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'getTitle') {
        sendResponse({ title: title });
      }
    });
  });
  