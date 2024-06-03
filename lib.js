function adjustTextareaHeight(textarea) {
    textarea.style.height = "auto"; // 높이를 자동으로 조정하기 전에 초기화
    textarea.style.height = textarea.scrollHeight + "px"; // 스크롤 높이로 높이 설정
}

function toggleGuestbook() {
    const guestbookPopup = document.getElementById('guestbook-popup');
    guestbookPopup.style.display = guestbookPopup.style.display === 'block' ? 'none' : 'block';
}

function addMessage() {
    const authorInput = document.getElementById('author');
    const messageInput = document.getElementById('message');
    const messagesContainer = document.getElementById('messages');

    const author = authorInput.value.trim();
    const message = messageInput.value.trim();

    if (author && message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');

        // 메시지 컨텐츠 부분
        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        messageContent.innerHTML = message.replace(/\n/g, '<br>'); // 개행 문자를 <br>로 변환


        const messageMeta = document.createElement('div');
        messageMeta.classList.add('message-meta');
        const currentDate = new Date().toLocaleString();
        messageMeta.textContent = `${author}, ${currentDate}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'X';
        deleteBtn.onclick = () => messagesContainer.removeChild(messageElement);

        messageElement.appendChild(messageContent);
        messageElement.appendChild(messageMeta);
        messageElement.appendChild(deleteBtn);

        messagesContainer.appendChild(messageElement);

        adjustTextareaHeight(messageInput); // 메시지 추가 후 textarea 높이 조절

        // 입력란 초기화
        authorInput.value = '';
        messageInput.value = '';
    } else {
        alert('작성자와 내용을 모두 입력해주세요.');
    }
}

// textarea의 입력 이벤트에 대응하여 높이 자동 조절
document.getElementById('message').addEventListener('input', function() {
    adjustTextareaHeight(this); // 'this'는 현재 textarea 요소를 가리킵니다.
});


// 페이지 로드 시 textarea 높이 조절
document.addEventListener('DOMContentLoaded', () => {
    const messageTextarea = document.getElementById('message');
    adjustTextareaHeight(messageTextarea);
});

// Initial adjustment in case of any default text
window.onload = adjustTextareaHeight;