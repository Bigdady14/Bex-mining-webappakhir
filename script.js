let tg = window.Telegram.WebApp;
let user_id = tg.initDataUnsafe?.user?.id || null;

if (user_id) {
  console.log("Telegram ID:", user_id);
}
const wallet = "0xc3A9211b16c73A4f2C516b20658eC17c1D69d635";

function mine() {
    document.getElementById("status").innerText = "Mining in progress...";
    fetch('https://bd6caf04d2eb94c8c8b6954709f5c072.serveo.net/mine', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ address: wallet })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("status").innerText = "Mined Block #" + data.index;
        updateBalance();
    })
    .catch(() => {
        document.getElementById("status").innerText = "Error mining block.";
    });
}

function updateBalance() {
    fetch('https://bd6caf04d2eb94c8c8b6954709f5c072.serveo.net/balance?address=' + wallet)
    .then(res => res.json())
    .then(data => {
        document.getElementById("balance").innerText = "BEX Balance: " + data.balance;
    });
}

// Initial balance load
updateBalance();
