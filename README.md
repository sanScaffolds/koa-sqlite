# Koa + SQLite 后端项目

## 项目简介

这是一个基于 Koa 和 SQLite 的后端项目骨架，使用 TypeScript 开发，提供了基础的用户管理功能。

## 技术栈

- Node.js
- Koa
- SQLite (better-sqlite3)
- Knex.js (ORM)
- TypeScript
- Joi (数据验证)
- Winston (日志)

## 安装步骤

1. 克隆项目

2. 安装依赖
   ```bash
   npm install
   ```

3. 配置环境变量
   - 复制 `.env.example` 文件为 `.env`
   - 根据需要修改 `.env` 文件中的配置

## 运行方式

### 开发环境
```bash
npm run dev
```

### 生产环境
```bash
# 构建项目
npm run build

# 启动项目
npm run start
```

## 数据库迁移

### 创建迁移文件
```bash
npx knex migrate:make migration_name
```

### 运行迁移
```bash
npm run migrate
```

### 回滚迁移
```bash
npm run migrate:rollback
```

### 创建种子文件
```bash
npx knex seed:make seed_name
```

### 运行种子文件
```bash
npm run seed
```

## 项目结构

```
src/
├── config/         # 配置文件
├── controllers/    # 控制器
├── db/            # 数据库相关
│   ├── migrations/ # 数据库迁移文件
│   └── connection.ts # 数据库连接
├── middlewares/    # 中间件
├── models/         # 数据模型
├── routes/         # 路由
├── schemas/        # 数据验证模式
├── services/       # 业务逻辑
├── types/          # TypeScript 类型定义
├── utils/          # 工具函数
├── app.ts          # 应用主文件
└── index.ts        # 应用入口
```

## API 接口

### 健康检查
- `GET /api/health` - 检查服务是否正常

### 用户管理
- `POST /api/users` - 创建用户
- `GET /api/users` - 获取用户列表
- `GET /api/users/:id` - 获取单个用户
- `PUT /api/users/:id` - 更新用户
- `DELETE /api/users/:id` - 删除用户

## 环境变量

- `PORT` - 服务器端口，默认 3000
- `DB_PATH` - 数据库文件路径，默认 `data/app.db`
- `NODE_ENV` - 环境变量，默认 `development`
