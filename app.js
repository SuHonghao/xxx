document.addEventListener('DOMContentLoaded', () => {
  const panel20 = document.getElementById('panel20');

  fetch('generate_cards/Version_2.0/card_v2.0.html', { cache: 'no-cache' })
    .then(res => {
      if (!res.ok) throw new Error(`Failed to load: ${res.status}`);
      return res.text();
    })
    .then(html => {
      panel20.innerHTML = html;
    })
    .catch(err => {
      panel20.innerHTML = `<p class="load-error">无法加载卡片<br>${err.message}</p>`;
    });
});
