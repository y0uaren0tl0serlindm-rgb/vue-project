document.addEventListener('DOMContentLoaded',function(){
  (function() {
  // 顶栏
  const topbar = document.createElement('div');
  topbar.id = 'org-topbar';
  topbar.innerHTML = `
    <button id="toc-toggle">☰</button>
    <span id="doc-title"></span>
    <button id="search-toggle">⌕ 查找</button>
  `;
  document.body.insertBefore(topbar, document.body.firstChild);

  // 侧边栏
  const sidebar = document.createElement('div');
  sidebar.id = 'org-sidebar';
  sidebar.innerHTML = '<div id="toc-header">目录</div><nav id="org-toc"></nav>';
  document.body.appendChild(sidebar);

  // 把内容包进 layout
  const layout = document.createElement('div');
  layout.id = 'org-layout';
  const contentWrap = document.createElement('div');
  contentWrap.id = 'org-content';
  document.body.appendChild(layout);
  layout.appendChild(contentWrap);

  const toMove = Array.from(document.body.children).filter(
    el => !['org-topbar','org-sidebar','org-layout'].includes(el.id)
  );
  toMove.forEach(el => contentWrap.appendChild(el));

  // 标题显示
  const h1 = contentWrap.querySelector('h1');
  if (h1) document.getElementById('doc-title').textContent = h1.textContent.trim();

  // 目录开关
  let open = false;
  document.getElementById('toc-toggle').addEventListener('click', () => {
    open = !open;
    sidebar.classList.toggle('open', open);
    document.body.classList.toggle('sidebar-open', open);
  });
})();

});
