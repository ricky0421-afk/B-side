# B-SIDE · 音乐背后的故事

一个用 AI 挖掘音乐创作背景的网站。

## 部署步骤

### 第一步：上传到 GitHub

1. 打开 [github.com](https://github.com)，注册/登录账号
2. 点右上角 **+** → **New repository**
3. 名字填 `bside`，选 **Public**，点 **Create repository**
4. 点 **uploading an existing file**，把这个文件夹里的所有文件拖进去
5. 点 **Commit changes**

### 第二步：部署到 Vercel

1. 打开 [vercel.com](https://vercel.com)，用 GitHub 账号登录
2. 点 **Add New Project** → 选择你的 `bside` 仓库
3. 点 **Deploy**（不需要改任何设置）

### 第三步：设置 API Key（重要！）

1. 在 Vercel 项目页面，点 **Settings** → **Environment Variables**
2. 添加一个变量：
   - Name: `ANTHROPIC_API_KEY`
   - Value: 你的 Anthropic API Key（在 console.anthropic.com 获取）
3. 点 **Save**，然后回到 **Deployments** 点 **Redeploy**

### 完成！

你会得到一个 `xxx.vercel.app` 的网址，任何设备都能访问。

## 获取 API Key

1. 打开 [console.anthropic.com](https://console.anthropic.com)
2. 注册账号，新用户有免费额度
3. 点 **API Keys** → **Create Key**
4. 复制这个 key，填到 Vercel 的环境变量里

## 项目结构

```
bside/
├── api/
│   └── story.js        # 后端 API（Vercel Serverless Function）
├── public/
│   └── index.html      # 前端页面
├── vercel.json         # Vercel 配置
└── README.md
```
