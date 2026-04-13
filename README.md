
### 前置要求

- **Node.js**：v22.0.0 或更高版本
- **npm**：v10.0.0 或更高版本
- **Expo Go**（用于在手机上测试，可选）

### 安装步骤

#### 1. 进入项目目录

cd todo-list-rn

#### 2. 安装项目依赖

npm install

#### 3. 启动开发服务器

npm start

### 运行环境

根据你的需求选择不同的运行方式：

#### **在浏览器中运行 (Web)**

npm run web

访问 `http://localhost:8081` 在浏览器中测试应用。

#### **在 iOS 模拟器中运行**

npm run ios

需要 macOS 和 Xcode 环境。

#### **在 Android 模拟器中运行**

npm run android

需要 Android Studio 和 Android 模拟器。

#### **在手机上运行 (Expo Go)**

1. 在手机上安装 Expo Go 应用
2. 在 iOS 上用相机应用扫描二维码（自动打开 Expo Go）
3. 在 Android 上用 Expo Go 应用扫描二维码
4. Expo Go 会自动加载和运行应用


##  项目结构

todo-list-rn/
├── app/                           # 应用主目录（Expo Router）
│   ├── _layout.tsx               # 根布局，配置路由和状态提供者
│   ├── index.tsx                 # 任务列表页面
│   └── detail/
│       └── [id].tsx              # 任务详情页面（动态路由）
│
├── components/                    # React 组件
│   ├── TodoItem.tsx              # 任务列表项组件
│   └── AddTodoModal.tsx           # 添加任务模态框
│
├── contexts/                      # React Context（全局状态管理）
│   └── TodoContext.tsx            # 任务状态和操作
│
├── types/                         # TypeScript 类型定义
│   └── todo.ts                   # Todo 数据结构
│
├── utils/                         # 工具函数
│   └── storage.ts                # AsyncStorage 数据持久化
│
├── assets/                        # 静态资源
│   └── images/                   # 应用图标和图片
│
├── package.json                   # 项目依赖配置
├── tsconfig.json                  # TypeScript 配置
├── app.json                       # Expo 配置
├── eslint.config.js               # ESLint 配置
└── README.md                      # 项目说明文档

