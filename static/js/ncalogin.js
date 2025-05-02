function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');

// Now in your fetch:
fetch('/api/ncalayer-login/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
    },
    body: JSON.stringify({ subject_dn: "..." })
});

function signAndLogin() {
    const socket = new WebSocket("wss://127.0.0.1:13579/");

    socket.onopen = function () {
        const request = {
            module: "kz.gov.pki.knca.commonUtils",
            method: "getSubjectDN",
            args: []
        };
        socket.send(JSON.stringify(request));
    };

    socket.onmessage = async function (event) {
        const data = JSON.parse(event.data);
        const subject_dn = data.responseObject?.subjectDn;
        if (!subject_dn) {
            alert("Ошибка: subjectDN не получен");
            return;
        }

        const response = await fetch("/api/ncalayer-login/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({subject_dn})
        });

        const result = await response.json();
        if (result.success) {
            window.location.href = result.redirect_url || "/dashboard/";
        } else {
            alert("Ошибка: " + result.error);
        }
    };

    socket.onerror = function () {
        alert("Ошибка подключения к NCALayer");
    };
}