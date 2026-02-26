// Fire Clicker - Main JS

// Highlight active nav link
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path || 
        (path === '/' && a.getAttribute('href') === '/') ||
        (path.includes(a.getAttribute('href')) && a.getAttribute('href') !== '/')) {
      a.classList.add('active');
    }
  });
});

// Copy to clipboard utility
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('Copied to clipboard!');
  }).catch(() => {
    // Fallback
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showToast('Copied to clipboard!');
  });
}

// Toast notification
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// Code block click to copy
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.code-block').forEach(block => {
    block.addEventListener('click', () => {
      const text = block.dataset.code || block.textContent;
      copyToClipboard(text);
      block.classList.add('copied');
      setTimeout(() => block.classList.remove('copied'), 2000);
    });
  });
});