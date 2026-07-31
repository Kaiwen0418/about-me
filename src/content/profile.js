export const profile = {
  name: "Kaiwen Liu",
  email: "kaiwenliu0811@outlook.com",
  phone: "07864873860",
  location: "London, UK",
  github: "https://github.com/Kaiwen0418",
  linkedin: "https://www.linkedin.com/in/kaiwen-liu-5237911b9",
  cv: "cv/KaiwenLiu-cv-2026.pdf",
  hero: {
    en: {
      eyebrow: "Software Engineer",
      title: "Building reliable product systems from interfaces down to infrastructure.",
      summary:
        "Software engineer focused on backend systems, AI tooling, and blockchain infrastructure.",
      status: "Open to software engineering opportunities",
    },
    "zh-CN": {
      eyebrow: "软件工程师",
      title: "从交互界面到基础设施，专注构建稳定可靠的产品系统。",
      summary:
        "专注后端系统、AI 工具与区块链基础设施的软件工程师。",
      status: "开放软件工程相关机会",
    },
  },
  metrics: [
    { value: "2+", label: { en: "Years Shipping", "zh-CN": "年交付经验" } },
    { value: "200K+", label: { en: "Users Reached", "zh-CN": "服务用户" } },
    { value: "50%", label: { en: "API Latency Cut", "zh-CN": "接口耗时下降" } },
  ],
  nav: {
    en: ["Experience", "Projects", "Skills", "Education", "Contact"],
    "zh-CN": ["经历", "项目", "技能", "教育", "联系"],
  },
  sections: {
    en: {
      experience: "Experience",
      projects: "Selected Projects",
      skills: "Technical Stack",
      education: "Education",
      contact: "Contact",
      highlights: "Highlights",
      modules: "Relevant Modules",
      technologies: "Technologies",
      languages: "Languages",
      locale: "Locale",
      viewGithub: "View GitHub",
      sendEmail: "Send Email",
      callMe: "Call",
    },
    "zh-CN": {
      experience: "经历",
      projects: "项目精选",
      skills: "技术栈",
      education: "教育背景",
      contact: "联系",
      highlights: "重点内容",
      modules: "相关课程",
      technologies: "技术工具",
      languages: "编程语言",
      locale: "语言",
      viewGithub: "查看 GitHub",
      sendEmail: "发送邮件",
      callMe: "拨打电话",
    },
  },
  experience: [
    {
      company: "Techblox Limited",
      location: "London",
      period: "06.2024 - 04.2026",
      role: {
        en: "Software Development Engineer",
        "zh-CN": "软件开发工程师",
      },
      bullets: {
        en: [
          "Built backend services for transactions on EVM and Solana networks using TypeScript, Python, FastAPI, and PostgreSQL, covering on-chain wallet orchestration and transaction status tracking.",
          "Improved API response times by 20% through PostgreSQL query optimisation and Redis caching, and built BullMQ-based asynchronous workflows to improve reliability and reduce RPC calls and costs.",
          "Developed more than 50 RESTful API endpoints secured with JWT authentication, role-based access control, request validation, and consistent error handling to support secure, scalable service integration.",
          "Built unit and integration test suites covering APIs, database operations, queue processing, and transaction workflows, harnessing autonomous AI coding agents with a test-oriented workflow for implementation validation, debugging, and regression verification prior to GitHub Actions and GCP deployment pipelines.",
        ],
        "zh-CN": [
          "为 EVM 与 Solana 生态的区块链交易处理开发分布式后端服务，覆盖链上事件监控、钱包编排与自动结算流程。",
          "基于 TypeScript、FastAPI、PostgreSQL、Redis 与 BullMQ 设计容错微服务，通过幂等执行与状态管理保障高吞吐交易处理稳定性。",
        ],
      },
    },
    {
      company: "Imperial College London",
      location: "London",
      period: "02.2024 - 05.2024",
      role: {
        en: "Embedded System Teaching Assistant",
        "zh-CN": "嵌入式系统助教",
      },
      bullets: {
        en: [
          "Supported third-year students on an STM32-based music synthesiser project, advising on C++ development, real-time debugging, code optimisation, testing, and hardware integration.",
        ],
        "zh-CN": [
          "指导三年级学生完成基于 STM32 音乐合成器项目的高级 C++ 与实时嵌入式开发。",
          "在设计、实现与测试阶段提供调试、性能优化及硬件集成支持。",
        ],
      },
    },
    {
      company: "SimpleTex Education Technology",
      location: "Remote",
      period: "06.2023 - 12.2023",
      role: {
        en: "Software Development Intern",
        "zh-CN": "软件开发实习生",
      },
      bullets: {
        en: [
          "Built cross-platform AI education applications using Vue.js, Electron.js, and FastAPI, serving more than 200,000 users across mobile, desktop, and web platforms.",
          "Developed a LaTeX-to-Braille translator supporting China's national mathematical Braille standard, implementing notation rules distinct from Nemeth and Unified English Braille for use by teachers and students at Zhangjiakou Special Education School.",
        ],
        "zh-CN": [
          "使用 Vue.js 与 Electron.js 开发响应式网页和跨平台应用，服务超 20 万用户。",
          "与机器学习团队协作实现 Flask API，将响应时间降低 50%，并减少 20% 的计算资源消耗。",
        ],
      },
    },
  ],
  projects: [
    {
      name: "Agent Benchmarking Platform",
      playlistName: "Agent Benchmark",
      stack: "TypeScript, Next.js, Docker",
      github: "https://github.com/Kaiwen0418/agent-benchmark",
      liveUrl: "https://bench.project-echo.xyz/",
      image: "project-images/agent-benchmark.gif",
      summary: {
        en: "An interactive real-time evaluation platform for autonomous AI agents.",
        "zh-CN": "用于自治 AI Agent 的实时交互式评测平台。",
      },
      bullets: {
        en: [
          "Enabled live observability for tool use, browser workflows, and task execution across isolated benchmark environments.",
          "Designed deterministic validation and session-scored hosted benchmarks to improve iteration speed and measurement consistency.",
        ],
        "zh-CN": [
          "为工具调用、浏览器工作流与任务执行提供实时可观测性，并支持隔离 benchmark 环境。",
          "设计确定性校验与带会话评分的托管式 benchmark，提升迭代效率与评测一致性。",
        ],
      },
    },
    {
      name: "Prediction Market Intelligence Dashboard",
      playlistName: "Prediction Market",
      stack: "NumPy, FastAPI, React.js",
      github: "https://github.com/Kaiwen0418/prediction-market-dashboard",
      liveUrl: "https://prediction-market-intelligence-dash.vercel.app/",
      image: "project-images/prediction-market.gif",
      summary: {
        en: "A market intelligence dashboard for tracking and interpreting live prediction market signals.",
        "zh-CN": "用于追踪和解读实时预测市场信号的情报看板。",
      },
      bullets: {
        en: [
          "Built comparative views and live monitoring pipelines for pricing movement and market activity.",
          "Focused the interface on compact, decision-oriented components for fast signal reading.",
        ],
        "zh-CN": [
          "构建价格波动与市场活跃度的实时监控与对比视图。",
          "通过紧凑、面向决策的组件设计提升关键信号读取效率。",
        ],
      },
    },
    {
      name: "Object Echo",
      playlistName: "Object Echo",
      stack: "TypeScript, Next.js, React.js",
      github: "https://github.com/Kaiwen0418/object-echo",
      liveUrl: "https://object-echo.vercel.app",
      image: "project-images/object-echo.gif",
      summary: {
        en: "A focused web project for exploring object memory, interaction, and echo-style interface feedback.",
        "zh-CN": "一个探索对象记忆、交互反馈与 echo 式界面体验的 Web 项目。",
      },
      bullets: {
        en: [
          "Built a compact interaction loop for object-centered exploration and response feedback.",
          "Focused on responsive UI structure and fast deployment through a modern frontend stack.",
        ],
        "zh-CN": [
          "构建围绕对象探索与响应反馈的紧凑交互流程。",
          "聚焦响应式 UI 结构，并通过现代前端栈快速部署。",
        ],
      },
    },
    {
      name: ".NET Circuit Simulator",
      playlistName: ".NET Circuit Sim",
      stack: ".NET, Avalonia UI, F#, Electron.js",
      github: "http://github.com/Kaiwen0418/issie-avalonia",
      image: "project-images/circuit-simulator.gif",
      summary: {
        en: "A modern reimplementation of a circuit simulator using functional programming and MVU UI architecture.",
        "zh-CN": "基于函数式编程与 MVU 架构重构的现代电路模拟器。",
      },
      bullets: {
        en: [
          "Reimplemented a widely used circuit simulator on .NET with F# and Avalonia UI.",
          "Reduced package size by 80% and improved memory efficiency by moving away from Electron.",
        ],
        "zh-CN": [
          "使用 F# 与 Avalonia UI 在 .NET 平台重构常用电路模拟器。",
          "脱离 Electron 后将包体缩小 80%，并显著改善内存占用。",
        ],
      },
    },
  ],
  skills: {
    languages: ["JavaScript", "TypeScript", "Python", "F#", "Verilog", "HTML", "CSS", "SQL"],
    technologies: [
      "React.js",
      "Vue.js",
      "Next.js",
      "Node.js",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "Docker",
      "Electron.js",
      ".NET",
      "SQLite",
      "PyTorch",
      "Selenium",
      "Git",
    ],
  },
  education: {
    degree: {
      en: "Electronic and Information Engineering (MEng)",
      "zh-CN": "电子与信息工程（MEng）",
    },
    school: "Imperial College London",
    period: "09.2020 - 06.2024",
    modules: [
      "Computer Vision",
      "Machine Learning",
      "Distributed Algorithm",
      "Digital and Computer Architecture",
      "Programming for Engineers",
      "Discrete Math (Data Structure)",
      "Communication Networks",
      "Embedded System",
    ],
  },
};
