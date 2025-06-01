const urls = [
  { url: "https://www.paypa1.com", isPhish: true },
  { url: "https://www.paypal.com", isPhish: false }
];
let index = 0, score = 0;
function loadUrl() {
  const current = urls[index];
  document.getElementById("urlGame").innerHTML = `
      <p>Is this URL Safe or Phishing?</p>
      <h3>${current.url}</h3>
      <button onclick="check(true)">Phishing</button>
      <button onclick="check(false)">Safe</button>
    `;
}
function check(answer) {
  if (answer === urls[index].isPhish) score++;
  index++;
  if (index < urls.length) loadUrl();
  else document.getElementById("urlScore").innerText = `Final Score: ${score}/${urls.length}`;
}
function nextUrl() {
  loadUrl();
}
window.onload = loadUrl;
