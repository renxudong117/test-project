// ===== DOM Elements =====
const form = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const loginBtn = document.getElementById('loginBtn');
const togglePwd = document.getElementById('togglePwd');

// ===== Toggle Password Visibility =====
togglePwd.addEventListener('click', () => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  togglePwd.querySelector('.eye-open').style.display = isPassword ? 'none' : 'block';
  togglePwd.querySelector('.eye-closed').style.display = isPassword ? 'block' : 'none';
});

// ===== Validation Helpers =====
function clearError(inputEl, errorEl) {
  inputEl.closest('.input-group').classList.remove('error');
  errorEl.textContent = '';
}

function setError(inputEl, errorEl, msg) {
  inputEl.closest('.input-group').classList.add('error');
  errorEl.textContent = msg;
}

function validateUsername() {
  const val = usernameInput.value.trim();
  if (!val) {
    setError(usernameInput, usernameError, '请输入用户名或邮箱');
    return false;
  }
  clearError(usernameInput, usernameError);
  return true;
}

function validatePassword() {
  const val = passwordInput.value;
  if (!val) {
    setError(passwordInput, passwordError, '请输入密码');
    return false;
  }
  if (val.length < 6) {
    setError(passwordInput, passwordError, '密码长度不能少于 6 位');
    return false;
  }
  clearError(passwordInput, passwordError);
  return true;
}

// ===== Real-time Validation =====
usernameInput.addEventListener('input', () => {
  if (usernameInput.closest('.input-group').classList.contains('error')) {
    validateUsername();
  }
});

passwordInput.addEventListener('input', () => {
  if (passwordInput.closest('.input-group').classList.contains('error')) {
    validatePassword();
  }
});

// ===== Toast Notification =====
function showToast(message) {
  // Remove existing toasts
  document.querySelectorAll('.toast').forEach(t => t.remove());

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
    ${message}
  `;
  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// ===== Form Submit =====
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const isUsernameValid = validateUsername();
  const isPasswordValid = validatePassword();

  if (!isUsernameValid || !isPasswordValid) {
    // Shake the card
    const card = document.querySelector('.login-card');
    card.style.animation = 'none';
    card.offsetHeight; // trigger reflow
    card.style.animation = 'shake 0.4s ease';
    return;
  }

  // Start loading
  const btnText = loginBtn.querySelector('.btn-text');
  const btnLoader = loginBtn.querySelector('.btn-loader');
  const btnSuccess = loginBtn.querySelector('.btn-success');

  loginBtn.disabled = true;
  btnText.style.display = 'none';
  btnLoader.style.display = 'flex';

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1800));

  // Show success
  btnLoader.style.display = 'none';
  btnSuccess.style.display = 'flex';
  loginBtn.classList.add('success');

  showToast('登录成功！正在跳转...');

  // Reset after delay
  setTimeout(() => {
    loginBtn.disabled = false;
    btnSuccess.style.display = 'none';
    btnText.style.display = 'flex';
    loginBtn.classList.remove('success');
  }, 3000);
});

// ===== Shake Animation (inject into head) =====
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%      { transform: translateX(-8px); }
    40%      { transform: translateX(8px); }
    60%      { transform: translateX(-6px); }
    80%      { transform: translateX(6px); }
  }
`;
document.head.appendChild(shakeStyle);

// ===== Social Login Buttons =====
document.querySelectorAll('.social-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const platform = btn.classList.contains('wechat') ? '微信'
      : btn.classList.contains('github') ? 'GitHub'
      : 'Google';
    showToast(`正在跳转到 ${platform} 登录...`);
  });
});

// ===== Forgot Password =====
document.querySelector('.forgot-link').addEventListener('click', (e) => {
  e.preventDefault();
  showToast('密码重置链接已发送至您的邮箱');
});
