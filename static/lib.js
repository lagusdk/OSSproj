const host = "http://127.0.0.1:8000";

const messagesContainer = document.querySelector('#messages-display');
const authorInput = document.querySelector('#author');
const messageInput = document.querySelector('#message');

// 텍스트 영역의 높이를 자동으로 조정하는 함수
function adjustTextareaHeight(textarea) {
    textarea.style.height = "auto"; // 높이를 자동으로 조정하기 전에 초기화
    textarea.style.height = Math.max(textarea.scrollHeight, 50) + "px"; // 최소 높이를 50px로 설정
}
// 방명록 팝업을 토글하는 함수
function toggleGuestbook() {
    const guestbookPopup = document.getElementById('guestbook-popup');
    guestbookPopup.style.display = guestbookPopup.style.display === 'block' ? 'none' : 'block';

    if (guestbookPopup.style.display === 'block') {
        const messageTextarea = document.getElementById('message');
        messageTextarea.style.height = 'auto'; // 초기화
        messageTextarea.style.height = '50px'; // 최소 높이 2줄 설정 (적절한 값으로 조정 가능)
    }
}

// 메시지 리스트를 가져와 화면에 표시
function getMessages() {
    axios.get(`${host}/guestbook`)
        .then(response => {
            renderMessages(response.data.messages);
        })
        .catch(error => {
            console.error('Error fetching messages:', error);
        });
}

// 메시지를 화면에 렌더링
function renderMessages(messages) {
    messagesContainer.innerHTML = '';
    messages.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');

        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        messageContent.innerHTML = `<strong>✒️${message.author}</strong> ${message.content}<br><small>${new Date(message.timestamp).toLocaleString()}</small>`;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = '❌';
        deleteBtn.addEventListener('click', function() {
            deleteMessage(message.id);
        });

        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(deleteBtn);
        messagesContainer.appendChild(messageDiv);
    });
}

// 새 메시지 추가
function addMessage() {
    const author = authorInput.value.trim();
    const content = messageInput.value.trim();

    if (author === '' || content === '') return;

    const messageData = {
        author: author,
        content: content
    };

    axios.post(`${host}/guestbook`, messageData)
        .then(response => {
            authorInput.value = '';
            messageInput.value = '';
            getMessages();
        })
        .catch(error => {
            console.error('Error adding message:', error);
        });
}

// 엔터키로 메시지 전송
function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        addMessage();
    }
}

// 메시지 삭제
function deleteMessage(messageId) {
    axios.delete(`${host}/guestbook/${messageId}`)
        .then(function(response) {
            console.log('Message deleted:', response.data);
            getMessages();
        })
        .catch(function(error) {
            console.error('Error deleting message:', error);
        });
}

// 페이지 로드 시 메시지 가져오기
window.addEventListener('DOMContentLoaded', function() {
    getMessages();
});

document.addEventListener('DOMContentLoaded', () => {
    // textarea 높이 조절 및 서버에서 데이터 가져오기
    const messageTextarea = document.getElementById('message');
    adjustTextareaHeight(messageTextarea);

    messageInput.addEventListener('keypress', handleKeyPress);

    // QR 코드 링크 클릭 이벤트 설정
    const qrcodeLink = document.getElementById('qrcode-link');
    const overlay = document.getElementById('overlay');

    qrcodeLink.addEventListener('click', (event) => {
        event.preventDefault();
        overlay.style.display = 'flex';
    });

    overlay.addEventListener('click', () => {
        overlay.style.display = 'none';
    });
});

document.getElementsByTagName("video")[0].playbackRate = 0.5;