# 🔐 Login Page — 用户登录页面

一个现代化、美观的用户登录页面，采用毛玻璃（Glassmorphism）设计风格。

## ✨ 功能特性

- **现代化 UI 设计** — 渐变动态背景 + 毛玻璃卡片效果
- **响应式布局** — 完美适配桌面端、平板和手机
- **表单验证** — 实时空值检测 + 密码长度校验 + 错误抖动动画
- **密码可见性切换** — 点击眼睛图标显示/隐藏密码
- **登录按钮动画** — 加载 Spinner → 成功对勾 + Toast 提示
- **记住我** — 自定义复选框样式
- **忘记密码** — 模拟发送重置链接
- **第三方登录** — 微信、GitHub、Google 一键登录
- **注册链接** — 引导新用户注册

## 📁 项目结构

```
test-project/
├── index.html    # 页面结构
├── style.css     # 样式（渐变、毛玻璃、动画、响应式）
├── script.js     # 交互逻辑（验证、动画、Toast）
└── README.md     # 说明文档
```

## 🚀 快速开始

直接在浏览器中打开 `index.html` 即可预览：

```bash
open index.html
# 或
python3 -m http.server 8080
```

## 🎨 设计亮点

| 特性 | 实现方式 |
|------|---------|
| 渐变背景 | CSS `linear-gradient` + `animation` 动态流动 |
| 毛玻璃效果 | `backdrop-filter: blur(24px)` |
| 表单验证 | 原生 JS，实时反馈 + 错误高亮 |
| 加载动画 | CSS `@keyframes spin` 旋转 Spinner |
| 图标 | 内联 SVG，无外部依赖 |
| 响应式 | `@media` 断点适配 480px / 360px |

## 📱 浏览器兼容

- ✅ Chrome / Edge 76+
- ✅ Safari 14+
- ✅ Firefox 103+
- ✅ 移动端 Safari / Chrome

## 📄 License

MIT
