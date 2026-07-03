export const items = [
  {
    id: 'sisyphus-server',
    name: 'sisyphus 服务器',
    icon: '🖥️',
    type: 'device',
    status: 'active',
    desc: '自建 Linux 服务器，托管笔记、Git 中枢、Tailscale 节点',
    tags: ['Ubuntu 24', 'Tailscale', 'Nginx', 'Self-hosted'],
    detail: `个人基础设施核心节点，通过 Tailscale 实现跨网络访问。
托管服务包括 Nginx 静态笔记服务、Git 裸仓库、HTTP 文件服务器。
家庭网络通过路由器端口转发实现部分直连，工作网络通过 DERP 中继。`,
    links: [
      { label: '笔记服务', url: 'http://101.37.12.221:8080' },
      { label: 'Tailscale 控制台', url: 'https://login.tailscale.com' },
    ],
    specs: [
      { label: '系统', value: 'Ubuntu 24.04 LTS' },
      { label: '主机名', value: 'sisyphus' },
      { label: '远程访问', value: 'Tailscale + SSH' },
      { label: '托管服务', value: 'Nginx / Git / HTTP' },
    ]
  },
  {
    id: 'nikon-z7ii',
    name: 'Nikon Z7 II',
    icon: '📷',
    type: 'device',
    status: 'active',
    desc: '全画幅无反相机，主拍昆虫、风景与微距题材',
    tags: ['24-70mm f/4 S', '微距', '野生动物'],
    detail: `全画幅无反相机，4500万像素 BSI-CMOS 传感器。
主要拍摄方向为昆虫微距、自然风景与野生动物。
配备 NIKKOR Z 24-70mm f/4 S 标准变焦镜头。`,
    links: [],
    specs: [
      { label: '传感器', value: '45.7MP BSI-CMOS' },
      { label: '镜头', value: 'Z 24-70mm f/4 S' },
      { label: '主题', value: '昆虫 / 风景 / 微距' },
    ]
  },
  {
    id: 'stm8-testbench',
    name: 'STM8 测试台',
    icon: '⚙️',
    type: 'project',
    status: 'done',
    desc: 'UART 指令解析器 + LCD 显示控制，基于 74HC595 移位寄存器',
    tags: ['STM8', 'C', 'UART', 'IAR'],
    detail: `汽车零件测试台系统，基于 STM8 微控制器开发。
实现了 UART 串口指令集解析与执行，LCD 显示通过 74HC595 移位寄存器控制。
开发环境为 IAR + STVD，处理了多个硬件与编译器兼容问题。`,
    links: [],
    specs: [
      { label: '芯片', value: 'STM8' },
      { label: '语言', value: 'C / C++' },
      { label: 'IDE', value: 'IAR + STVD' },
      { label: '接口', value: 'UART / SPI' },
    ]
  },
  {
    id: 'uart-interpreter',
    name: 'UART 指令解释器',
    icon: '📡',
    type: 'project',
    status: 'done',
    desc: '受 CSAPP ISA 概念启发，实现串口指令集解析与执行',
    tags: ['嵌入式', 'C', 'ISA'],
    detail: `读完 CSAPP Y86-64 架构章节后的实践项目。
将 ISA 的指令集概念移植到嵌入式串口通信中，设计了一套简单的指令格式与解析器。
验证了体系结构概念在实际硬件上的可行性。`,
    links: [],
    specs: [
      { label: '灵感来源', value: 'CSAPP Y86-64' },
      { label: '语言', value: 'C' },
      { label: '通信', value: 'UART' },
    ]
  },
  {
    id: 'file-finder',
    name: 'Interactive File Finder',
    icon: '🔍',
    type: 'project',
    status: 'wip',
    desc: '命令行交互式文件检索工具，LeetCode 练习的 C 项目延伸',
    tags: ['C', 'CLI', '算法'],
    detail: `LeetCode C 练习的延伸项目，目标是把算法练习与实际工程结合。
实现命令行下的交互式文件搜索，支持模糊匹配与结果导航。
当前处于开发阶段。`,
    links: [],
    specs: [
      { label: '语言', value: 'C' },
      { label: '平台', value: 'Linux CLI' },
      { label: '状态', value: '开发中' },
    ]
  },
  {
    id: 'csapp',
    name: 'CSAPP',
    icon: '📘',
    type: 'study',
    status: 'wip',
    desc: '深入理解计算机系统，当前 Ch.8 异常控制流',
    tags: ['Y86-64', 'ECF', '操作系统'],
    detail: `系统性学习计算机底层原理，目标是深入理解操作系统与体系结构。
已完成章节涵盖数据表示、汇编、Y86-64 架构，当前学习异常控制流。
每章做 org-mode 笔记，导出为带语法高亮的 HTML 页面托管在 sisyphus 服务器。`,
    links: [
      { label: 'Ch.8 ECF 笔记', url: 'http://101.37.12.221:8080/notes/USR/System/CSAPP/NO.8%20ECF/note.html' },
    ],
    specs: [
      { label: '当前进度', value: 'Ch.8 ECF' },
      { label: '笔记工具', value: 'Doom Emacs / org-mode' },
      { label: '目标', value: '操作系统 / 实时调度' },
    ]
  },
]
