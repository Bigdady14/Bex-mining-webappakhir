
const wallet = "0xc3A9211b16c73A4f2C516b20658eC17c1D69d635";

function mine() {
    document.getElementById("status").innerText = "Mining in progress...";
    fetch('http://127.0.0.1:5000/mine', {
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
    fetch('http://127.0.0.1:5000/balance?address=' + wallet)
    .then(res => res.json())
    .then(data => {
        document.getElementById("balance").innerText = "BEX Balance: " + data.balance;
    });
}

// Initial balance load
updateBalance();
