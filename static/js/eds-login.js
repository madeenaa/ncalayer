function extractIIN(subjectDN) {
    const match = subjectDN.match(/SERIALNUMBER=IIN(\d{12})/);
    return match ? match[1] : null;
  }

function sendIINToBackend(iin) {
    fetch("/api/ncalayer-login/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ iin: iin })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            window.location.href = data.redirect_url || "/dashboard/";
        } else {
            alert("Ошибка входа: " + (data.error || "Неизвестная ошибка"));
        }
    })
    .catch(err => alert("Ошибка запроса: " + err));
}

function signAndLogin() {
    const dataToSign = btoa(unescape(encodeURIComponent("Login to site")));
    const socket = new WebSocket("wss://127.0.0.1:13579/");

    socket.onopen = () => {
        const request = {
            module: "kz.gov.pki.knca.commonUtils",
            method: "createCMSSignatureFromBase64",
            args: ["PKCS12", "SIGNATURE", dataToSign, true]
        };
        socket.send(JSON.stringify(request));
    };

    socket.onmessage = (event) => {
        const result = JSON.parse(event.data);

        if (result.code !== "200") {
            alert("Ошибка подписи от NCALayer: " + (result.message || "Неизвестная ошибка"));
            return;
        }

        const subjectDN = result.responseObject?.subjectDn;
        const iin = extractIIN(subjectDN);

        if (!iin) {
            alert("Не удалось извлечь ИИН из subjectDN");
            return;
        }

        sendIINToBackend(iin);
    };

    socket.onerror = () => {
        alert("Ошибка подключения к NCALayer. Убедитесь, что он запущен.");
    };
}