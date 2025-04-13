let feedback = document.getElementById('feedback-btn');

function sendFeedback() {
    const nameInput = document.getElementById('name');
    const messageInput = document.getElementById('message');
    const responseField = document.getElementById('response');

    if (!responseField) {
        console.error('Элемент с id="response" не найден!');
        return;
    }

    const name = nameInput.value;
    const message = messageInput.value;

    if (!name || !message) {
        responseField.style.color = 'red';
        responseField.innerText = 'Заполните все поля!';
        return;
    }

    const botToken = 'your bot token'; 
    const chatId = 'your telegram id';

    const text = `
<b>Пришло новое уведомление с сайта</b> 🔔
<code>·····················</code>
<b>Имя:</b> <code>${name}</code>
<b>Текст сообщения:</b> <code>${message}</code>
    `;

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text: text,
            parse_mode: 'HTML'
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            responseField.style.color = 'green';
            responseField.innerText = 'Сообщение отправлено!';
            nameInput.value = '';
            messageInput.value = '';
        } else {
            responseField.style.color = 'red';
            responseField.innerText = 'Ошибка отправки!';
        }
    })
    .catch(error => {
        responseField.style.color = 'red';
        responseField.innerText = 'Сетевая ошибка!';
    });
}

feedback.onclick = sendFeedback;
