// ===== DOM Elements =====
const form = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const loginBtn = document.getElementById('loginBtn');
const togglePwd = document.getElementById('togglePwd');

// Register form elements
const registerForm = document.getElementById('registerForm');
const regUsernameInput = document.getElementById('regUsername');
const regEmailInput = document.getElementById('regEmail');
const regPasswordInput = document.getElementById('regPassword');
const regConfirmPasswordInput = document.getElementById('regConfirmPassword');
const regAgreeCheckbox = document.getElementById('regAgree');
const regUsernameError = document.getElementById('regUsernameError');
const regEmailError = document.getElementById('regEmailError');
const regPasswordError = document.getElementById('regPasswordError');
const regConfirmPasswordError = document.getElementById('regConfirmPasswordError');
const regAgreeError = document.getElementById('regAgreeError');
const registerBtn = document.getElementById('registerBtn');

// Switch elements
const loginTitle = document.getElementById('loginTitle');
const registerTitle = document.getElementById('registerTitle');
const loginSubtitle = document.getElementById('loginSubtitle');
const registerSubtitle = document.getElementById('registerSubtitle');
const toRegister = document.getElementById('toRegister');
const toLogin = document.getElementById('toLogin');
const goRegister = document.getElementById('goRegister');
const goLogin = document.getElementById('goLogin');
const socialTitle = document.getElementById('socialTitle');

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

function validateRegUsername() {
  const val = regUsernameInput.value.trim();
  if (!val) {
    setError(regUsernameInput, regUsernameError, '请输入用户名');
    return false;
  }
  if (val.length < 2) {
    setError(regUsernameInput, regUsernameError, '用户名长度不能少于 2 个字符');
    return false;
  }
  clearError(regUsernameInput, regUsernameError);
  return true;
}

function validateRegEmail() {
  const val = regEmailInput.value.trim();
  if (!val) {
    setError(regEmailInput, regEmailError, '请输入邮箱');
    return false;
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(val)) {
    setError(regEmailInput, regEmailError, '请输入有效的邮箱地址');
    return false;
  }
  clearError(regEmailInput, regEmailError);
  return true;
}

function validateRegPassword() {
  const val = regPasswordInput.value;
  if (!val) {
    setError(regPasswordInput, regPasswordError, '请输入密码');
    return false;
  }
  if (val.length < 6) {
    setError(regPasswordInput, regPasswordError, '密码长度不能少于 6 位');
    return false;
  }
  clearError(regPasswordInput, regPasswordError);
  return true;
}

function validateRegConfirmPassword() {
  const val = regConfirmPasswordInput.value;
  if (!val) {
    setError(regConfirmPasswordInput, regConfirmPasswordError, '请再次输入密码');
    return false;
  }
  if (val !== regPasswordInput.value) {
    setError(regConfirmPasswordInput, regConfirmPasswordError, '两次输入的密码不一致');
    return false;
  }
  clearError(regConfirmPasswordInput, regConfirmPasswordError);
  return true;
}

function validateRegAgree() {
  if (!regAgreeCheckbox.checked) {
    regAgreeError.textContent = '请阅读并勾选同意服务条款';
    return false;
  }
  regAgreeError.textContent = '';
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

regUsernameInput.addEventListener('input', () => {
  if (regUsernameInput.closest('.input-group').classList.contains('error')) {
    validateRegUsername();
  }
});

regEmailInput.addEventListener('input', () => {
  if (regEmailInput.closest('.input-group').classList.contains('error')) {
    validateRegEmail();
  }
});

regPasswordInput.addEventListener('input', () => {
  if (regPasswordInput.closest('.input-group').classList.contains('error')) {
    validateRegPassword();
  }
});

regConfirmPasswordInput.addEventListener('input', () => {
  if (regConfirmPasswordInput.closest('.input-group').classList.contains('error')) {
    validateRegConfirmPassword();
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

// Register submit
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const isUsernameValid = validateRegUsername();
  const isEmailValid = validateRegEmail();
  const isPasswordValid = validateRegPassword();
  const isConfirmValid = validateRegConfirmPassword();
  const isAgreeValid = validateRegAgree();

  if (!isUsernameValid || !isEmailValid || !isPasswordValid || !isConfirmValid || !isAgreeValid) {
    const card = document.querySelector('.login-card');
    card.style.animation = 'none';
    card.offsetHeight;
    card.style.animation = 'shake 0.4s ease';
    return;
  }

  const btnText = registerBtn.querySelector('.btn-text');
  const btnLoader = registerBtn.querySelector('.btn-loader');
  const btnSuccess = registerBtn.querySelector('.btn-success');

  registerBtn.disabled = true;
  btnText.style.display = 'none';
  btnLoader.style.display = 'flex';

  await new Promise(resolve => setTimeout(resolve, 2000));

  btnLoader.style.display = 'none';
  btnSuccess.style.display = 'flex';
  registerBtn.classList.add('success');

  showToast('注册成功！已自动为你登录');

  setTimeout(() => {
    registerBtn.disabled = false;
    btnSuccess.style.display = 'none';
    btnText.style.display = 'flex';
    registerBtn.classList.remove('success');

    // 自动切回登录态并预填账号
    usernameInput.value = regEmailInput.value || regUsernameInput.value;
    setMode('login');
  }, 2200);
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

// ===== Mode Switch =====
function setMode(mode) {
  const isLogin = mode === 'login';

  form.style.display = isLogin ? 'block' : 'none';
  registerForm.style.display = isLogin ? 'none' : 'block';

  loginTitle.style.display = isLogin ? 'block' : 'none';
  loginSubtitle.style.display = isLogin ? 'block' : 'none';
  toRegister.style.display = isLogin ? 'block' : 'none';

  registerTitle.style.display = isLogin ? 'none' : 'block';
  registerSubtitle.style.display = isLogin ? 'none' : 'block';
  toLogin.style.display = isLogin ? 'none' : 'block';

  socialTitle.textContent = isLogin ? '或使用以下方式登录' : '注册也支持以下方式';
}

goRegister.addEventListener('click', (e) => {
  e.preventDefault();
  setMode('register');
});

goLogin.addEventListener('click', (e) => {
  e.preventDefault();
  setMode('login');
});

// 默认模式
setMode('login');

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
