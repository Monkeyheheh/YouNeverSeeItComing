(function() {
  // Don't inject twice
  if (document.getElementById('fc-gui')) return;

  const style = document.createElement('style');
  style.textContent = `
    #fc-gui {
      position: fixed;
      top: 20px;
      right: 20px;
      width: 280px;
      background: #0f0f0f;
      border: 1px solid #ff6600;
      border-radius: 10px;
      font-family: monospace;
      font-size: 12px;
      color: #f0f0f0;
      z-index: 999999;
      box-shadow: 0 0 30px rgba(255,100,0,0.3);
      user-select: none;
    }
    #fc-gui-header {
      background: linear-gradient(135deg, #ff2200, #ff6600);
      padding: 10px 14px;
      border-radius: 9px 9px 0 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: move;
      font-weight: bold;
      letter-spacing: 1px;
      font-size: 13px;
    }
    #fc-gui-close {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
      padding: 0;
    }
    #fc-gui-body {
      padding: 12px;
    }
    .fc-section {
      margin-bottom: 12px;
    }
    .fc-section-title {
      color: #ff6600;
      font-size: 10px;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 6px;
      padding-bottom: 4px;
      border-bottom: 1px solid #222;
    }
    .fc-row {
      display: flex;
      gap: 6px;
      margin-bottom: 6px;
      align-items: center;
    }
    .fc-btn {
      flex: 1;
      background: #1a1a1a;
      border: 1px solid #333;
      color: #f0f0f0;
      padding: 6px 8px;
      border-radius: 5px;
      cursor: pointer;
      font-family: monospace;
      font-size: 11px;
      transition: all 0.15s;
      text-align: center;
    }
    .fc-btn:hover {
      border-color: #ff6600;
      color: #ff6600;
    }
    .fc-btn.fire {
      background: linear-gradient(135deg, #ff2200, #ff6600);
      border-color: #ff6600;
      color: white;
      font-weight: bold;
    }
    .fc-input {
      flex: 1;
      background: #1a1a1a;
      border: 1px solid #333;
      color: #f0f0f0;
      padding: 6px 8px;
      border-radius: 5px;
      font-family: monospace;
      font-size: 11px;
      width: 100%;
    }
    .fc-input:focus {
      outline: none;
      border-color: #ff6600;
    }
    .fc-status {
      background: #0a0a0a;
      border: 1px solid #222;
      border-radius: 5px;
      padding: 6px 8px;
      font-size: 10px;
      color: #666;
      margin-bottom: 10px;
      min-height: 24px;
    }
    .fc-label {
      color: #888;
      font-size: 10px;
      white-space: nowrap;
    }
    .fc-toggle {
      position: relative;
      width: 34px;
      height: 18px;
      flex-shrink: 0;
    }
    .fc-toggle input { display: none; }
    .fc-toggle-slider {
      position: absolute;
      inset: 0;
      background: #222;
      border-radius: 9px;
      cursor: pointer;
      transition: 0.2s;
      border: 1px solid #333;
    }
    .fc-toggle-slider::before {
      content: '';
      position: absolute;
      width: 12px;
      height: 12px;
      left: 2px;
      top: 2px;
      background: #555;
      border-radius: 50%;
      transition: 0.2s;
    }
    .fc-toggle input:checked + .fc-toggle-slider {
      background: rgba(255,102,0,0.3);
      border-color: #ff6600;
    }
    .fc-toggle input:checked + .fc-toggle-slider::before {
      transform: translateX(16px);
      background: #ff6600;
    }
  `;
  document.head.appendChild(style);

  // Create GUI
  const gui = document.createElement('div');
  gui.id = 'fc-gui';
  gui.innerHTML = `
    <div id="fc-gui-header">
      🔥 FIRE CLICKER — CC CHEATS
      <button id="fc-gui-close">✕</button>
    </div>
    <div id="fc-gui-body">
      <div class="fc-status" id="fc-status">Ready. Detected Cookie Clicker.</div>

      <div class="fc-section">
        <div class="fc-section-title">🍪 Cookies</div>
        <div class="fc-row">
          <input class="fc-input" id="fc-cookie-amt" type="number" value="1000000000" placeholder="Amount">
        </div>
        <div class="fc-row">
          <button class="fc-btn fire" onclick="fcAddCookies()">Add Cookies</button>
          <button class="fc-btn" onclick="fcSetCookies()">Set Cookies</button>
        </div>
        <div class="fc-row">
          <button class="fc-btn" onclick="fcMaxCookies()">Max (1 Trillion)</button>
          <button class="fc-btn" onclick="fcReset()">Reset</button>
        </div>
      </div>

      <div class="fc-section">
        <div class="fc-section-title">⚡ Autoclicker</div>
        <div class="fc-row">
          <span class="fc-label">Autoclicker</span>
          <label class="fc-toggle">
            <input type="checkbox" id="fc-autoclick-toggle" onchange="fcToggleAutoclick(this)">
            <span class="fc-toggle-slider"></span>
          </label>
          <input class="fc-input" id="fc-autoclick-speed" type="number" value="50" min="1" max="1000" style="max-width:70px">
          <span class="fc-label">ms</span>
        </div>
      </div>

      <div class="fc-section">
        <div class="fc-section-title">🏪 Buildings</div>
        <div class="fc-row">
          <button class="fc-btn" onclick="fcMaxBuildings()">Max All Buildings</button>
          <button class="fc-btn" onclick="fcUnlockUpgrades()">Unlock Upgrades</button>
        </div>
      </div>

      <div class="fc-section">
        <div class="fc-section-title">✨ Misc Cheats</div>
        <div class="fc-row">
          <button class="fc-btn" onclick="fcUnlockAchievements()">All Achievements</button>
          <button class="fc-btn" onclick="fcGoldenCookie()">Spawn Golden Cookie</button>
        </div>
        <div class="fc-row">
          <span class="fc-label">Milk</span>
          <label class="fc-toggle">
            <input type="checkbox" id="fc-milk-toggle" onchange="fcToggleMilk(this)">
            <span class="fc-toggle-slider"></span>
          </label>
          <span class="fc-label" style="margin-left:4px">CpS Multiplier</span>
          <label class="fc-toggle">
            <input type="checkbox" id="fc-cps-toggle" onchange="fcToggleCpSHack(this)">
            <span class="fc-toggle-slider"></span>
          </label>
        </div>
      </div>

    </div>
  `;
  document.body.appendChild(gui);

  // Helper
  function status(msg) {
    document.getElementById('fc-status').textContent = msg;
  }
  function Game() { return window.Game; }

  // Close
  document.getElementById('fc-gui-close').onclick = () => gui.remove();

  // Draggable
  const header = document.getElementById('fc-gui-header');
  let dragging = false, ox = 0, oy = 0;
  header.addEventListener('mousedown', e => {
    dragging = true;
    ox = e.clientX - gui.offsetLeft;
    oy = e.clientY - gui.offsetTop;
  });
  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    gui.style.left = (e.clientX - ox) + 'px';
    gui.style.top = (e.clientY - oy) + 'px';
    gui.style.right = 'auto';
  });
  document.addEventListener('mouseup', () => dragging = false);

  // Cookie functions
  window.fcAddCookies = function() {
    const amt = parseFloat(document.getElementById('fc-cookie-amt').value) || 0;
    if (!Game()) return status('Game not found!');
    Game().cookies += amt;
    Game().cookiesEarned += amt;
    Game().Earn(0);
    status(`Added ${amt.toLocaleString()} cookies!`);
  };
  window.fcSetCookies = function() {
    const amt = parseFloat(document.getElementById('fc-cookie-amt').value) || 0;
    if (!Game()) return status('Game not found!');
    Game().cookies = amt;
    Game().cookiesEarned = Math.max(Game().cookiesEarned, amt);
    Game().Earn(0);
    status(`Set cookies to ${amt.toLocaleString()}!`);
  };
  window.fcMaxCookies = function() {
    if (!Game()) return status('Game not found!');
    Game().cookies = 1e12;
    Game().cookiesEarned = Math.max(Game().cookiesEarned, 1e12);
    Game().Earn(0);
    status('Set to 1 trillion cookies!');
  };
  window.fcReset = function() {
    if (!Game()) return status('Game not found!');
    if (confirm('Reset all cookies?')) { Game().cookies = 0; status('Reset cookies.'); }
  };

  // Autoclicker
  let acInterval = null;
  window.fcToggleAutoclick = function(el) {
    if (el.checked) {
      const ms = parseInt(document.getElementById('fc-autoclick-speed').value) || 50;
      acInterval = setInterval(() => {
        const bigCookie = document.getElementById('bigCookie');
        if (bigCookie) bigCookie.click();
      }, ms);
      status(`Autoclicker running every ${ms}ms`);
    } else {
      clearInterval(acInterval);
      status('Autoclicker stopped.');
    }
  };

  // Buildings
  window.fcMaxBuildings = function() {
    if (!Game()) return status('Game not found!');
    Object.values(Game().Objects).forEach(obj => { obj.amount = 500; obj.bought = 500; obj.refresh(); });
    Game().recalculateGains = 1;
    status('All buildings maxed to 500!');
  };
  window.fcUnlockUpgrades = function() {
    if (!Game()) return status('Game not found!');
    Object.values(Game().Upgrades).forEach(u => { u.bought = 1; u.unlocked = 1; });
    Game().recalculateGains = 1;
    status('All upgrades unlocked!');
  };

  // Achievements
  window.fcUnlockAchievements = function() {
    if (!Game()) return status('Game not found!');
    Object.values(Game().Achievements).forEach(a => { a.won = 1; });
    Game().recalculateGains = 1;
    status('All achievements unlocked!');
  };

  // Golden Cookie
  window.fcGoldenCookie = function() {
    if (!Game()) return status('Game not found!');
    new Game().shimmer('golden');
    status('Spawned a golden cookie!');
  };

  // Milk toggle (max milk)
  window.fcToggleMilk = function(el) {
    if (!Game()) return;
    Game().milkProgress = el.checked ? 900 : Game().milkProgress;
    Game().recalculateGains = 1;
    status(el.checked ? 'Max milk set!' : 'Milk reset.');
  };

  // CpS hack
  let cpsHackInterval = null;
  window.fcToggleCpSHack = function(el) {
    if (el.checked) {
      cpsHackInterval = setInterval(() => {
        if (Game()) {
          Game().cookies += Game().cookiesPs * 100;
          Game().cookiesEarned += Game().cookiesPs * 100;
        }
      }, 1000);
      status('CpS x100 hack active!');
    } else {
      clearInterval(cpsHackInterval);
      status('CpS hack disabled.');
    }
  };

  status('🔥 Fire Clicker loaded! Have fun cheating.');
})();