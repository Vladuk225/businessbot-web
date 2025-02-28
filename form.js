let feedback = document.getElementById('feedback-btn');


function sendFeedback() {
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    const responseField = document.getElementById('response');

    if (!name || !message) {
        responseField.style.color = 'red';
        responseField.innerText = 'Заполните все поля!';
        return;
    }

    const botToken = '6588209896:AAE7JyU39wruOlIesAr5UuEDRPoLpwLzrQg'; 
    const chatId = '5960231383';

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
            name.innerText = ''
            message.innerText = ''
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
