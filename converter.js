document.addEventListener("DOMContentLoaded", () => {
  const usdEl = document.querySelector(".price.usd");
  const kztEl = document.querySelector(".price.kzt");

  // Skip if page doesn’t have these elements
  if (!usdEl || !kztEl) return;

  const usdAmount = parseFloat(usdEl.dataset.usd);
  const YOUR_KEY = "183e5e07c65f190c973d83160b8fefa3";
  const apiUrl = `https://api.exchangerate.host/convert?access_key=${YOUR_KEY}&from=USD&to=KZT&amount=${usdAmount}`;

  fetch(apiUrl)
    .then(res => {
      if (!res.ok) throw new Error(`Network error (${res.status})`);
      return res.json();
    })
    .then(data => {
      if (!data.success) throw new Error(`API returned an error`);
      const kztValue = Math.round(data.result);
      kztEl.textContent = `₸${kztValue.toLocaleString()}`;
    })
    .catch(err => {
      console.error("Currency conversion error:", err);
      kztEl.textContent = "₸(N/A)";
    });
});
