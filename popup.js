document.addEventListener('DOMContentLoaded', () => {
  const titleInput = document.getElementById('titleInput');
  const saveButton = document.getElementById('saveButton');
  const message = document.getElementById('message');
  const showButton = document.getElementById('showButton');
  const titleContainer = document.getElementById('titleContainer');
  const titleList = document.getElementById('titleList');

  // 저장된 제목 목록을 새로고침하는 함수
  function refreshTitleList() {
    chrome.storage.local.get('savedTitles', (data) => {
      const savedTitles = data.savedTitles || [];
      titleList.innerHTML = '';
      savedTitles.forEach((title, index) => {
        const li = document.createElement('li');
        const titleSpan = document.createElement('span');
        titleSpan.textContent = title;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
          savedTitles.splice(index, 1);
          chrome.storage.local.set({ savedTitles: savedTitles }, () => {
            refreshTitleList();
          });
        });
        li.appendChild(titleSpan);
        li.appendChild(deleteButton);
        titleList.appendChild(li);
      });
    });
  }

  // 제목을 저장하는 함수
  function saveTitle() {
    const inputTitle = titleInput.value.trim().toLowerCase().replace(/\s+/g, ' ');
    if (inputTitle) {
      chrome.storage.local.get('savedTitles', (data) => {
        const savedTitles = data.savedTitles || [];
        const normalizedSavedTitles = savedTitles.map(title => title.toLowerCase().replace(/\s+/g, ' '));

        if (normalizedSavedTitles.includes(inputTitle)) {
          message.textContent = 'You have already seen this content.';
        } else {
          savedTitles.push(inputTitle);
          chrome.storage.local.set({ savedTitles: savedTitles }, () => {
            message.textContent = 'Title saved.';
            refreshTitleList();
          });
        }
      });
    } else {
      message.textContent = 'Please enter a title.';
    }
  }

  // 저장 버튼 클릭 시 제목 저장
  saveButton.addEventListener('click', saveTitle);

  // Enter 키 입력 시 제목 저장
  titleInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      saveTitle();
    }
  });

  // Show Titles 버튼 클릭 시 저장된 목록 표시
  showButton.addEventListener('click', () => {
    if (titleContainer.classList.contains('hidden')) {
      refreshTitleList();
      titleContainer.classList.remove('hidden');
      showButton.textContent = 'Hide Titles';
    } else {
      titleContainer.classList.add('hidden');
      showButton.textContent = 'Show Titles';
    }
  });

  // 확장 프로그램이 열릴 때 저장된 제목 목록을 숨김
  titleContainer.classList.add('hidden');
});
