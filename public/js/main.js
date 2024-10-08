const chatForm = document.getElementById('chat-form');
const chatMessage = document.querySelector('.chat-messages');

const socket = io();

// Message from Server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);
    
    // Scroll down
    chatMessage.scrollTop = chatMessage.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', e => {
    e.preventDefault();

    // Get message text
    const msg = e.target.elements.msg.value;

    // Emit message to server
    socket.emit('chatMessage', msg);

    // Clear input
    e.target.elements.msg.value = ''; // Xóa giá trị
    e.target.elements.msg.focus(); // Đặt tiêu điểm
});

// Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.user} <span>${message.time}</span></p>
    <p class="text">
     ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}
