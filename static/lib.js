const host = "http://127.0.0.1:8000";

// 텍스트 영역의 높이를 자동으로 조정하는 함수
function adjustTextareaHeight(textarea) {
    textarea.style.height = "auto"; // 높이를 자동으로 조정하기 전에 초기화
    textarea.style.height = textarea.scrollHeight + "px"; // 스크롤 높이로 높이 설정
}

// 방명록 팝업을 토글하는 함수
function toggleGuestbook() {
    const guestbookPopup = document.getElementById('guestbook-popup');
    guestbookPopup.style.display = guestbookPopup.style.display === 'block' ? 'none' : 'block';

    if (guestbookPopup.style.display === 'block') {
        const messageTextarea = document.getElementById('message');
        messageTextarea.style.height = 'auto'; // 초기화
        messageTextarea.style.height = '40px'; // 최소 높이 2줄 설정 (적절한 값으로 조정 가능)
    }
}

// 서버에 메시지 추가하는 함수
function addMessageToServer(author, message) {
    return axios.post(`${host}/guestbook/`, {
        author: author,
        message: message
    })
    .then(response => response.data)
    .catch(function(error) {
        console.error('Error:', error);
    });
}

// 메시지 추가 함수
function addMessage() {
    const authorInput = document.getElementById('author');
    const messageInput = document.getElementById('message');
    const messagesContainer = document.getElementById('messages');

    const author = authorInput.value.trim();
    const message = messageInput.value.trim();

    if (author && message) {
        addMessageToServer(author, message).then(data => {
            if (data) {
                // 새로운 메시지 요소 생성
                const messageElement = createMessageElement(data.id, author, message, data.created_at);
                messagesContainer.appendChild(messageElement);

                // textarea 높이 조절
                adjustTextareaHeight(messageInput);

                // 입력란 초기화
                authorInput.value = '';
                messageInput.value = '';
            }
        });
    } else {
        alert('작성자와 내용을 모두 입력해주세요.');
    }
}

// 새로운 메시지 요소를 생성하는 함수
function createMessageElement(id, author, message, createdAt) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    // 메시지 컨텐츠 부분
    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.innerHTML = message.replace(/\n/g, '<br>'); // 개행 문자를 <br>로 변환

    // 메시지 메타 정보 부분
    const messageMeta = document.createElement('div');
    messageMeta.classList.add('message-meta');

    // 메시지 추가 시
    const currentDate = new Date().toLocaleString();
    messageMeta.textContent = `${author}, ${currentDate}`;

    // 데이터 로드 시
    const date = new Date(createdAt);
    messageMeta.textContent = `${author}, ${date.toLocaleString()}`;

    // 삭제 버튼 생성
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'X';
    deleteBtn.onclick = () => {
        axios.delete(`${host}/guestbook/${id}`)
        .then(() => {
            messageElement.remove();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    // 각 요소를 메시지 요소에 추가
    messageElement.appendChild(messageContent);
    messageElement.appendChild(messageMeta);
    messageElement.appendChild(deleteBtn);

    return messageElement;
}

// 서버에서 데이터 가져오기
function fetchDataFromServer() {
    axios.get(`${host}/guestbook/`)
        .then(response => {
            const messagesContainer = document.getElementById('messages');
            messagesContainer.innerHTML = '';
            response.data.forEach(item => {
                const messageElement = createMessageElement(item.id, item.author, item.message, item.created_at);
                messagesContainer.appendChild(messageElement);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// textarea의 입력 이벤트에 대응하여 높이 자동 조절
document.getElementById('message').addEventListener('input', function() {
    adjustTextareaHeight(this); // 'this'는 현재 textarea 요소를 가리킵니다.
});

// 페이지 로드 시 
document.addEventListener('DOMContentLoaded', () => {
    // textarea 높이 조절 및 서버에서 데이터 가져오기
    const messageTextarea = document.getElementById('message');
    adjustTextareaHeight(messageTextarea);
    fetchDataFromServer();

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
