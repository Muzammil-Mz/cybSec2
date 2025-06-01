function scanURL() {
  const url = document.getElementById("urlInput").value;
  fetch('/api/scan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("result").innerText = `Score: ${data.score}% – ${data.message}`;
      loadHistory();
    });
}
function loadHistory() {
  fetch('/api/scan/history')
    .then(res => res.json())
    .then(data => {
      const ul = document.getElementById("scanHistory");
      ul.innerHTML = '';
      data.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.url} – ${item.score}%`;
        ul.appendChild(li);
      });
    });
}



