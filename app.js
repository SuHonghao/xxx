/* ====================================================================
   Tab Switcher + Lazy Load per Version (Only one visible at a time)
   ==================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Tabs
  const tab20 = document.getElementById('tab20');
  const tab10 = document.getElementById('tab10');
  const tabEV = document.getElementById('tabEV');

  // Panels
  const panel20 = document.getElementById('panel20');
  const panel10 = document.getElementById('panel10');
  const panelEV = document.getElementById('panelEV');

  const switcher = document.querySelector('.switcher');

  // 每个版本的资源与状态（按你的目录）
  const registry = {
    '20': {
      tab: tab20,
      panel: panel20,
      url: 'generate_cards/Version_2.0/card_v2.0.html',
      loaded: false
    },
    '10': {
      tab: tab10,
      panel: panel10,
      url: 'generate_cards/Version_1.0/card_v1.0.html',
      loaded: false
    },
    'EV': {
      tab: tabEV,
      panel: panelEV,
      url: 'generate_cards/Early_Version/card_ev.html',
      loaded: false
    }
  };

  function setActive(ver) {
    // 只让一个面板可见
    Object.entries(registry).forEach(([key, cfg]) => {
      const on = key === ver;
      cfg.panel.classList.toggle('active', on);
      cfg.tab.classList.toggle('active', on);
      cfg.tab.setAttribute('aria-selected', String(on));
    });

    // 懒加载当前版本
    const cfg = registry[ver];
    if (!cfg.loaded) {
      fetch(cfg.url, { cache: 'no-cache' })
        .then(res => {
          if (!res.ok) throw new Error(`Failed to load ${cfg.url}: ${res.status}`);
          return res.text();
        })
        .then(html => {
          cfg.panel.innerHTML = html;
          cfg.loaded = true;
        })
        .catch(err => {
          cfg.panel.innerHTML = `<p class="load-error">无法加载卡片：${cfg.url}<br>${err.message}</p>`;
        });
    }

    // 滚回切换条（移动端体验）
    if (switcher) {
      const y = switcher.getBoundingClientRect().top + window.scrollY - 12;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  // 事件
  tab20.addEventListener('click', () => setActive('20'));
  tab10.addEventListener('click', () => setActive('10'));
  tabEV.addEventListener('click',  () => setActive('EV'));

  // 默认仅显示并加载 2.0
  setActive('20');
});
