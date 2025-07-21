const balanceEl = document.getElementById("balance");
const mineBtn = document.getElementById("mineBtn");

async function getUser() {
  if (window.Telegram && Telegram.WebApp) {
    await Telegram.WebApp.ready();
    return Telegram.WebApp.initDataUnsafe.user;
  }
  return { id: "test_user", username: "test" };
}

async function updateBalance(userId) {
  const res = await fetch(`https://bex-mining-backend.vercel.app/balance?user_id=${userId}`);
  const data = await res.json();
  balanceEl.textContent = `Saldo: ${data.balance.toFixed(5)} BEX`;
}

mineBtn.addEventListener("click", async () => {
  const user = await getUser();
  const res = await fetch("https://bex-mining-backend.vercel.app/mine", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: user.id, username: user.username })
  });

  const data = await res.json();
  balanceEl.textContent = `Saldo: ${data.balance.toFixed(5)} BEX`;
});

(async () => {
  const user = await getUser();
  await updateBalance(user.id);
})();
