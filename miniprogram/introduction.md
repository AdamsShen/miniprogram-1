# 微信小程序项目概述

## 项目目录结构

```
├── miniprogram/           // 小程序主要代码目录
│   ├── pages/             // 页面文件夹
│   │   ├── index/         // 首页
│   │   ├── logs/          // 日志页面
│   │   └── aiChat/        // AI聊天页面
│   ├── components/        // 组件文件夹
│   │   └── navigation-bar/ // 导航栏组件
│   ├── utils/             // 工具函数
│   │   └── util.ts        // 通用工具函数
│   ├── app.ts             // 应用程序逻辑
│   ├── app.json           // 应用程序配置
│   ├── app.less           // 应用程序样式
│   └── sitemap.json       // 小程序sitemap配置
├── project.config.json    // 项目配置文件
├── project.private.config.json // 项目私有配置
├── typings/               // TypeScript类型定义
├── tsconfig.json          // TypeScript配置
└── package.json           // 项目依赖配置
```

## 功能概述

该微信小程序是一个基础模板项目，具有以下主要功能：

### 1. 用户信息获取
- 支持用户头像选择和上传
- 提供昵称输入功能
- 实现用户信息展示

### 2. 页面导航
- 自定义导航栏组件
- 页面之间的跳转功能

### 3. AI聊天功能
- 提供文本输入界面
- 支持调用Coze大模型API
- 展示AI返回的文本和图片内容
- 图片支持预览功能

### 4. 技术特性
- 使用TypeScript进行开发
- 采用Component构建模式
- 使用LESS进行样式管理
- 支持最新的微信小程序特性（如getUserProfile API）
- 启用了Skyline渲染引擎
- 使用glass-easel组件框架
- 支持按需加载组件（lazyCodeLoading）

### 5. 工具函数
- 提供日期格式化功能

## 开发指南

### 运行环境
- 需要微信开发者工具
- 基础库版本支持3.0.0及以上

### 页面说明
- **首页(index)**: 展示用户信息，提供交互功能
- **日志页(logs)**: 可用于展示日志信息
- **AI聊天页(aiChat)**: 提供与AI模型交互的界面，用户可以输入问题并获取AI回复及相关图片

### 组件说明
- **navigation-bar**: 自定义导航栏，支持标题显示和返回功能
