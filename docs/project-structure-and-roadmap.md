# 项目结构与项目规划

## 1. 项目定位

本项目是一个个人工具与知识资产门户，当前由三部分组成：

1. Vue 前端应用：承载主页、摄影档案、电子设备/项目、笔记入口、信息面板、周报生成器、决策转盘等功能。
2. Express + SQLite 后端：当前主要提供随机片段接口，后续可扩展为笔记、项目、摄影日志等动态数据服务。
3. 静态 org-roam 知识库：由 org-roam 导出的静态 HTML、索引和图谱数据，作为独立静态站点挂在 `public/roam/`。

项目当前更适合按 feature-based 架构维护：每个业务功能有自己的页面、数据、组件和后续服务边界，避免所有页面堆在 `views/` 或所有数据堆在 `src/` 根目录。

## 2. 技术栈

### 前端

- Vue 3
- Vue Router 4
- Vite
- Element Plus
- Element Plus Icons
- 原生 CSS + scoped CSS

### 后端

- Node.js ESM
- Express 5
- better-sqlite3
- SQLite
- cors

### 静态知识库

- org-roam 导出 HTML
- 静态 JSON 索引：`nodes.json`、`links.json`、`search-index.json`
- 独立页面：`/roam/index.html`

## 3. 顶层目录结构

```txt
vue-project/
├─ docs/                         # 项目说明、结构文档、规划文档
├─ public/                       # Vite public 静态资源，原样复制到构建产物
│  ├─ favicon.ico
│  ├─ org-theme.css              # org 导出页面主题样式
│  ├─ org-theme.js               # org 导出页面脚本
│  └─ roam/                      # 静态 org-roam 笔记网络
├─ server/                       # 本地后端服务
├─ src/                          # Vue 前端源码
├─ dist/                         # 前端构建产物，不作为源码维护重点
├─ node_modules/                 # 前端依赖
├─ index.html                    # Vite HTML 入口
├─ vite.config.js                # Vite 配置
├─ package.json                  # 前端依赖与脚本
├─ package-lock.json
├─ jsconfig.json                 # alias / IDE 配置
└─ README.md                     # 基础项目说明
```

## 4. 前端源码结构

```txt
src/
├─ app/                          # 应用入口层
│  ├─ App.vue                    # 应用壳：导航、侧边栏、RouterView
│  ├─ main.js                    # Vue app 创建、插件注册、全局样式引入
│  └─ router/
│     └─ index.js                # 路由表，页面懒加载
├─ assets/                       # 前端打包资源
│  └─ images/
│     └─ sachiko-stage.jpg       # 首页 hero 背景图
├─ components/                   # 跨业务复用组件
│  └─ layout/
│     ├─ AppNavbar.vue           # 顶部导航
│     └─ AppSidebar.vue          # 侧边抽屉
├─ config/                       # 前端配置
│  └─ env.js                     # API_BASE_URL 等运行配置
├─ features/                     # 业务模块
├─ services/                     # API 请求封装
│  └─ fragmentsApi.js            # fragments 相关接口
└─ styles/                       # 全局样式系统
   ├─ index.css                  # 全局样式入口
   ├─ tokens.css                 # 设计变量
   ├─ base.css                   # reset / body / 基础元素
   ├─ utilities.css              # 工具类
   └─ effects.css                # 通用视觉效果
```

### 4.1 `src/app/`

`app/` 只放应用启动与全局装配逻辑，不放具体业务。

```txt
src/app/
├─ main.js
├─ App.vue
└─ router/index.js
```

职责说明：

- `main.js`：创建 Vue 实例，注册 router，按需注册 Element Plus 组件，引入全局样式。
- `App.vue`：组合全局 layout，包括顶部导航、侧边栏和 `<RouterView />`。
- `router/index.js`：定义所有页面路由，当前使用懒加载降低首屏包体积。

当前路由：

```txt
/                         -> HomePage
/info                     -> InfoPage
/electronics              -> ElectronicsPage
/electronics/:id          -> ElectronicsDetailPage
/notes                    -> NotesPage
/projects                 -> ProjectsPage
/projects/photography     -> PhotographyPage
/weekly                   -> WeeklyReportPage
/fkApex                   -> WheelPage
```

### 4.2 `src/components/`

`components/` 只放跨 feature 复用的组件。

当前组件：

```txt
src/components/layout/
├─ AppNavbar.vue
└─ AppSidebar.vue
```

约定：

- 全局布局组件放 `components/layout/`。
- 通用 UI 组件后续可放 `components/ui/`。
- 只被某个业务模块使用的组件不要放这里，应放到对应 `features/*/components/`。

建议未来扩展：

```txt
src/components/
├─ layout/
├─ ui/
│  ├─ EmptyState.vue
│  ├─ LoadingState.vue
│  └─ ConfirmDialog.vue
└─ feedback/
   └─ ToastMessage.vue
```

### 4.3 `src/features/`

这是项目主体。每个业务模块独立维护页面、局部组件、静态数据和后续 composable。

```txt
src/features/
├─ home/
├─ electronics/
├─ notes/
├─ projects/
├─ info/
├─ weekly/
└─ wheel/
```

#### `home/`

```txt
src/features/home/
├─ pages/
│  └─ HomePage.vue
└─ components/
   └─ HomeHero.vue
```

职责：

- 个人门户首页。
- 展示 hero、功能入口卡片。
- 调用 `getRandomFragments()` 拉取随机片段，失败时使用 fallback。

后续建议：

- 将首页模块卡片拆为 `HomeModuleCard.vue`。
- 将随机片段展示独立为 `HomeRandomFragments.vue`。
- 首页模块配置可迁移到 `home/data/modules.js`。

#### `electronics/`

```txt
src/features/electronics/
├─ data/
│  └─ electronics.js
└─ pages/
   ├─ ElectronicsPage.vue
   └─ ElectronicsDetailPage.vue
```

职责：

- 管理电子设备、项目、学习条目。
- 支持分类筛选。
- 支持详情页展示规格、标签、链接和状态。

当前数据来源：

- `data/electronics.js` 静态数组。

后续建议：

- 拆出 `components/ElectronicsCard.vue`。
- 拆出 `components/ElectronicsFilter.vue`。
- 将静态数据迁移到后端 API，例如 `GET /api/electronics`。
- 增加管理入口用于新增/编辑设备条目。

#### `notes/`

```txt
src/features/notes/
├─ data/
│  └─ notes.js
└─ pages/
   └─ NotesPage.vue
```

职责：

- 展示外部笔记服务链接。
- 支持分类、搜索、前端临时新增。

当前限制：

- 新增笔记只存在于前端内存，刷新后丢失。
- 链接目标硬编码为远端笔记服务路径拼接。

后续建议：

- 将 notes 数据迁移为后端表。
- 新增、编辑、删除通过 API 持久化。
- 与 `public/roam/search-index.json` 建立统一搜索入口。
- 将外部笔记服务地址放入环境配置。

#### `projects/`

```txt
src/features/projects/
├─ pages/
│  └─ ProjectsPage.vue
└─ photography/
   ├─ data/
   │  └─ photography.js
   └─ pages/
      └─ PhotographyPage.vue
```

职责：

- 项目总览页。
- 当前主要项目为摄影成长档案。

`photography/` 职责：

- 拍摄日志。
- 问题追踪。
- 物种档案。
- 器材笔记。
- 灵感思考。

当前数据来源：

- `photography/data/photography.js` 静态数组。

后续建议：

- 拆出 `ShootingLogList.vue`、`IssueTracker.vue`、`SpeciesGrid.vue`、`GearNotes.vue`、`ThoughtList.vue`。
- 将摄影数据后端化，支持增删改查。
- 图片资产归档到 `public/photos/` 或对象存储，并在数据中保存元数据。
- 建立摄影条目与 org-roam 笔记之间的关联。

#### `info/`

```txt
src/features/info/
└─ pages/
   └─ InfoPage.vue
```

职责：

- 展示服务器状态感、时间、网络学习路径、快捷工具、常用命令、IP 备忘、待办。

当前限制：

- 内容全部写死在页面内部。
- 待办只在当前页面状态中切换，不持久化。

后续建议：

- 将命令、工具、IP、roadmap 拆到 `info/data/`。
- 待办迁移到后端。
- 如果要真实展示服务器状态，可增加 `/api/health`。

#### `weekly/`

```txt
src/features/weekly/
└─ pages/
   └─ WeeklyReportPage.vue
```

职责：

- 周报生成器。
- 基于本地词库、废话浓度、段落数量生成文本。
- 支持复制结果。

后续建议：

- 将生成逻辑迁移到 `weekly/lib/reportGenerator.js`。
- 将词库迁移到 `weekly/data/reportLexicon.js`。
- 增加模板管理。
- 增加导出 Markdown / TXT。

#### `wheel/`

```txt
src/features/wheel/
└─ pages/
   └─ WheelPage.vue
```

职责：

- 决策大转盘。
- 支持选项编辑、转盘动画、结果展示。

后续建议：

- 路由从 `/fkApex` 改为更语义化的 `/wheel`，保留旧路径重定向。
- 支持 localStorage 保存选项。
- 拆出 `WheelCanvas.vue` 或 `DecisionWheel.vue`。

### 4.4 `src/services/`

```txt
src/services/
└─ fragmentsApi.js
```

职责：

- 统一封装 API 请求。
- 页面不直接拼接远端 URL。

当前接口：

```js
getRandomFragments(limit = 3)
```

建议约定：

- 一个资源一个 service 文件，例如 `notesApi.js`、`electronicsApi.js`、`photographyApi.js`。
- service 只处理 HTTP 和错误边界，不处理页面 UI 状态。
- 复杂的业务状态可使用 composable，例如 `useRandomFragments()`。

### 4.5 `src/config/`

```txt
src/config/
└─ env.js
```

当前配置：

```js
API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://101.37.12.221:3001'
```

建议：

- 增加 `.env.example`。
- 本地开发使用 `VITE_API_BASE_URL=http://localhost:3001`。
- 生产环境通过部署平台注入真实 API 地址。

### 4.6 `src/styles/`

```txt
src/styles/
├─ index.css
├─ tokens.css
├─ base.css
├─ utilities.css
└─ effects.css
```

职责：

- `index.css`：统一入口，只在 `main.js` 中引入。
- `tokens.css`：颜色、字体、圆角、阴影、动效变量。
- `base.css`：基础 reset、body、元素默认样式。
- `utilities.css`：可复用工具类。
- `effects.css`：通用视觉效果。

约定：

- 页面专属样式保留在 `.vue` 的 `<style scoped>`。
- 全局 CSS 不写具体页面布局。
- 设计变量优先在 `tokens.css` 增加，而不是在每个页面重复定义。

## 5. 静态 org-roam 知识库

```txt
public/roam/
├─ index.html
├─ style.css
├─ nodes.json
├─ links.json
├─ search-index.json
└─ notes/
   └─ <note-id>/index.html
```

访问路径：

```txt
/roam/index.html
```

职责：

- 独立静态知识网络。
- 搜索标题、标签、别名。
- 保留笔记之间跳转关系。

注意事项：

- `public/roam/` 不经过 Vue 编译，文件会原样复制。
- 该目录应视为导出产物，最好有明确生成脚本或同步流程。
- 如果未来想纳入 Vue 应用，可以只读取 `search-index.json`，不要直接改导出的 HTML。

后续建议：

- 增加导出脚本说明，例如 `scripts/export-roam.sh`。
- 将 `notes/` 大量 HTML 和索引文件的更新流程文档化。
- 在 Vue `NotesPage` 中增加“搜索 roam 笔记”入口。

## 6. 后端结构

当前结构：

```txt
server/
├─ index.js
├─ db.js
├─ seed.js
├─ data.db
├─ fragments.csv
├─ import_fragments.sql
├─ package.json
└─ package-lock.json
```

当前职责：

- `index.js`：Express 服务入口，注册中间件和 API。
- `db.js`：SQLite 连接与 `fragments` 表初始化。
- `seed.js`：写入初始 fragments 数据。
- `data.db`：SQLite 数据库文件。
- `import_fragments.sql`：从 CSV 导入 fragments。

当前 API：

```txt
GET  /api/fragments/random?limit=3
POST /api/fragments
```

建议目标结构：

```txt
server/
├─ src/
│  ├─ index.js
│  ├─ app.js
│  ├─ db/
│  │  ├─ connection.js
│  │  └─ schema.js
│  ├─ routes/
│  │  ├─ fragments.routes.js
│  │  ├─ notes.routes.js
│  │  ├─ electronics.routes.js
│  │  └─ photography.routes.js
│  ├─ repositories/
│  │  ├─ fragments.repository.js
│  │  └─ notes.repository.js
│  └─ middleware/
│     └─ errorHandler.js
├─ data/
│  └─ data.db
├─ scripts/
│  ├─ seed.js
│  └─ import-fragments.sql
└─ package.json
```

迁移原则：

- API 路由、数据库访问、启动逻辑分离。
- SQLite 文件放 `server/data/`。
- 脚本放 `server/scripts/`。
- 先迁移结构，不急着引入复杂框架。

## 7. 数据流说明

### 首页随机片段

```txt
HomePage.vue
  -> getRandomFragments(limit)
    -> services/fragmentsApi.js
      -> config/env.js API_BASE_URL
        -> server GET /api/fragments/random
          -> SQLite fragments 表
```

### 静态数据页面

```txt
ElectronicsPage.vue
  -> features/electronics/data/electronics.js

NotesPage.vue
  -> features/notes/data/notes.js

PhotographyPage.vue
  -> features/projects/photography/data/photography.js
```

### 静态 roam 页面

```txt
浏览器访问 /roam/index.html
  -> public/roam/index.html
    -> fetch('/roam/search-index.json')
    -> 渲染模块、搜索结果、笔记链接
```

## 8. 开发命令

### 前端

```sh
npm install
npm run dev
npm run build
npm run preview
```

### 后端

```sh
cd server
npm install
npm run dev
npm run seed
```

### 推荐本地联调

```sh
# 终端 1
cd server
npm run dev

# 终端 2
VITE_API_BASE_URL=http://localhost:3001 npm run dev
```

## 9. 当前已完成的工程化改造

- 前端入口迁移到 `src/app/`。
- 路由迁移到 `src/app/router/`。
- 页面按 feature 拆分。
- 业务静态数据跟随对应 feature。
- 顶部导航与侧边栏拆为 layout 组件。
- API 地址从页面中抽离到 `config/env.js`。
- fragments API 抽离到 `services/fragmentsApi.js`。
- 全局样式入口统一为 `src/styles/index.css`。
- Element Plus 改为按需注册，降低主包体积。
- 清理 Vue 模板遗留组件、空组件、未路由测试页。

## 10. 工程规范建议

### 命名规范

- 页面组件：`XxxPage.vue`
- 业务组件：`XxxCard.vue`、`XxxPanel.vue`、`XxxList.vue`
- composable：`useXxx.js`
- API service：`xxxApi.js`
- 静态数据：`xxx.js` 或 `xxx.data.js`
- 路由 name：使用 kebab-case，例如 `electronics-detail`

### 文件归属规则

- 只被某个功能使用：放到对应 `features/<feature>/`。
- 多个功能共享：放到 `components/`、`services/`、`styles/`。
- 与启动、路由、应用壳有关：放到 `app/`。
- 与远端接口有关：放到 `services/`。
- 与环境变量有关：放到 `config/`。

### 样式规则

- 页面布局优先写在页面 scoped style。
- 全局 token 统一写 `styles/tokens.css`。
- 避免组件内重复 `@import Google Fonts`。
- 新增主题色先判断是否应进入 token。

### API 规则

- Vue 页面不直接写完整 API URL。
- service 文件负责 HTTP 请求和响应解析。
- 页面负责 loading、error、empty 状态。
- 后续统一错误处理可抽 `http.js`。

## 11. 项目规划

### 阶段 1：工程基础稳固

目标：让项目结构稳定、可持续维护。

任务：

- 增加 `.env.example`。
- 增加 `docs/` 文档体系。
- 在 README 中链接本文件。
- 增加 ESLint / Prettier 或 Oxlint。
- 增加基础格式化命令。
- 增加 `npm run lint`。
- 明确 Node 版本和本地启动步骤。

验收标准：

- 新开发者能通过 README 和 docs 在 10 分钟内跑起前后端。
- 所有主要目录都有明确职责。
- 常用命令统一在 package scripts 中。

### 阶段 2：组件拆分与页面瘦身

目标：降低单文件复杂度，让每个页面只负责组织。

优先拆分：

- `HomePage.vue`
  - `HomeModuleCard.vue`
  - `HomeModuleGrid.vue`
  - `HomeRandomFragments.vue`
- `PhotographyPage.vue`
  - `ShootingLogList.vue`
  - `IssueList.vue`
  - `SpeciesGrid.vue`
  - `GearNotes.vue`
  - `ThoughtList.vue`
- `NotesPage.vue`
  - `NotesToolbar.vue`
  - `CategoryTabs.vue`
  - `NoteCard.vue`
  - `AddNoteDialog.vue`
- `ElectronicsPage.vue`
  - `ElectronicsFilter.vue`
  - `ElectronicsCard.vue`
- `InfoPage.vue`
  - `RoadmapPanel.vue`
  - `ToolsPanel.vue`
  - `CommandsPanel.vue`
  - `TodoPanel.vue`

验收标准：

- 主要页面文件控制在 200-250 行以内。
- 重复 UI 状态抽成组件。
- 数据、计算逻辑、视图展示边界更清楚。

### 阶段 3：数据持久化

目标：将当前静态数据逐步迁移到后端。

优先级：

1. fragments：已有后端，补完整管理能力。
2. notes：支持新增、编辑、删除、分类。
3. electronics：支持设备/项目条目管理。
4. photography：支持拍摄日志、问题、物种、器材、思考分表管理。
5. info todos：待办持久化。

建议 API：

```txt
GET    /api/fragments/random
POST   /api/fragments
GET    /api/notes
POST   /api/notes
PATCH  /api/notes/:id
DELETE /api/notes/:id
GET    /api/electronics
GET    /api/electronics/:id
GET    /api/photography/logs
POST   /api/photography/logs
GET    /api/todos
PATCH  /api/todos/:id
```

验收标准：

- 页面刷新不丢新增数据。
- 所有 API 都有基本错误返回。
- 前端 service 覆盖所有后端接口。

### 阶段 4：后端重构

目标：让后端从单文件服务变成可扩展 API 服务。

任务：

- 迁移到 `server/src/`。
- 拆分 routes、repositories、db schema。
- 增加统一错误处理中间件。
- 增加输入校验。
- 将 SQLite 文件迁移到 `server/data/`。
- 将 seed/import 脚本迁移到 `server/scripts/`。

验收标准：

- 新增一个资源接口不需要修改 `index.js` 主体。
- 数据库访问集中在 repository 层。
- API 返回格式稳定。

### 阶段 5：知识库整合

目标：让 Vue 应用和 org-roam 静态知识库更自然地连接。

任务：

- 在 Vue 中读取 `/roam/search-index.json`。
- `NotesPage` 增加 org-roam 搜索区。
- 建立 notes 与 roam notes 的统一入口。
- 增加图谱入口说明。
- 文档化 org-roam 导出流程。

验收标准：

- 用户可以在 Vue `/notes` 中搜索普通笔记和 roam 笔记。
- `/roam/index.html` 继续作为独立高级浏览入口。
- 导出流程可重复执行，不依赖手工猜测。

### 阶段 6：体验与质量

目标：提升使用体验、稳定性和可维护性。

任务：

- 增加 loading / empty / error 状态组件。
- 增加移动端适配回归检查。
- 增加基础单元测试或组件测试。
- 增加构建产物体积检查。
- 增加部署说明。
- 增加数据备份策略，尤其是 SQLite 和 roam 导出数据。

验收标准：

- `npm run build` 稳定通过。
- 关键页面在移动端和桌面端可用。
- 数据文件和 SQLite 有明确备份方案。

## 12. 优先级路线图

### P0：近期必须做

- 增加 `.env.example`。
- README 更新为当前结构。
- 后端 API 地址本地开发配置化。
- 拆分 `PhotographyPage.vue`。
- 拆分 `NotesPage.vue`。

### P1：重要但可排期

- 后端目录重构。
- notes 持久化。
- electronics 持久化。
- info todos 持久化。
- org-roam 导出流程文档化。

### P2：增强体验

- 统一搜索：普通笔记 + roam 笔记。
- 摄影数据图片化展示。
- 周报模板管理。
- 转盘配置保存。
- 管理后台或轻量编辑界面。

### P3：长期方向

- 将项目变成个人知识操作台。
- 支持多数据源：SQLite、静态 roam、远端笔记服务。
- 支持统一搜索、统一标签、统一项目关联。
- 支持数据备份、导入、导出。

## 13. 风险与注意事项

### 远端地址硬编码风险

当前默认 API 地址仍指向：

```txt
http://101.37.12.221:3001
```

虽然已经集中在 `config/env.js`，但建议尽快增加 `.env.example`，并在本地使用：

```txt
VITE_API_BASE_URL=http://localhost:3001
```

### 静态数据增长风险

摄影、电子、笔记数据目前仍有较多静态 JS。短期维护没问题，但数据增长后会导致：

- 页面 bundle 变大。
- 修改数据必须重新部署前端。
- 无法在线编辑。

建议逐步迁移到后端。

### `public/roam/` 体积风险

`public/roam/notes/` 下 HTML 文件会持续增长。需要明确：

- 这些文件是否纳入 Git。
- 如何生成。
- 如何部署。
- 是否需要清理旧导出。

### 后端数据库备份风险

`server/data.db` 是实际数据文件。后续如果承载更多数据，需要：

- 定期备份。
- 避免误删。
- 明确部署路径。
- 区分开发数据库和生产数据库。

## 14. 推荐下一步

建议按这个顺序继续推进：

1. 更新 README，指向本文档。
2. 增加 `.env.example`。
3. 拆分 `PhotographyPage.vue`。
4. 拆分 `NotesPage.vue`。
5. 重构 `server/` 目录。
6. 将 notes 数据后端化。
7. 整合 org-roam 搜索入口。

这样能先稳住工程可维护性，再处理数据持久化和知识库整合。
