document.addEventListener('DOMContentLoaded', () => {
    const titleInput = document.getElementById('titleInput');
    const saveButton = document.getElementById('saveButton');
    const message = document.getElementById('message');
  
    saveButton.addEventListener('click', () => {
      const inputTitle = titleInput.value.trim();
      if (inputTitle) {
        chrome.storage.local.get('savedTitles', (data) => {
          const savedTitles = data.savedTitles || [];
          
          if (savedTitles.includes(inputTitle)) {
            message.textContent = 'You have already seen this content.';
          } else {
            savedTitles.push(inputTitle);
            chrome.storage.local.set({ savedTitles: savedTitles }, () => {
              message.textContent = 'Title saved.';
            });
          }
        });
      } else {
        message.textContent = 'Please enter a title.';
      }
    });
  });