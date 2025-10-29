# 远行工作室-个人主页 (ESPH) 模板

[English Version](README.md) | 中文版

ESPH 模板是一个功能完整的个人学术主页模板，支持中英文双语切换和亮暗主题切换，适合学术人员、研究人员或任何需要展示个人经历和成果的人士使用。

示例页面可以点击[这里](https://excursion-studio.github.io/Personal-Homepage-Template/)预览。

## 功能特点

- 🌐 **多语言支持**：支持中英文切换，所有内容都有对应的中英文版本
- 🎨 **主题切换**：支持亮暗主题切换，主题设置会保存在本地存储中
- 📱 **响应式设计**：适配桌面和移动设备，提供良好的用户体验
- 🔧 **模块化设计**：每个功能模块都有独立的文件，便于维护和扩展
- 📊 **数据驱动**：所有内容都从JSON配置文件中加载，无需修改代码即可更新内容

## 项目结构

```
Personal-Homepage-Template/
├── README.md                 # 英文说明文档
├── README_zh.md              # 中文说明文档
├── index.html                # 主页面文件
├── components/               # 第三方组件
│   ├── all_min.css           # Font Awesome图标库
│   ├── chart.js              # Chart.js图表库
│   └── font/                 # 字体文件
├── configs/                  # 配置文件
│   ├── config.json           # 主配置文件
│   ├── en/                   # 英文配置
│   └── zh/                   # 中文配置
├── images/                   # 图片资源
│   ├── experience/           # 经历相关图片
│   ├── homepage/             # 主页相关图片
│   │   ├── favicon/          # 网页图标
│   │   ├── info icon/        # 信息图标
│   │   └── photo/            # 个人照片
│   └── publication/          # 出版物相关图片
└── src/                      # 源代码
    ├── base.css              # 基础样式
    ├── light.css             # 亮色主题样式
    ├── mobile.css            # 移动设备样式
    ├── module-container.css  # 模块容器样式
    ├── language.js           # 语言切换功能
    ├── load.js               # 页面加载功能
    ├── nav.js                # 导航栏功能
    ├── home.js               # 主页功能
    ├── experiences.js        # 经历部分功能
    ├── publications.js       # 出版物部分功能
    ├── module-container.js   # 模块容器组件
    └── tab.js                # 选项卡功能
```

## 安装和部署

### 本地运行

1. 下载或克隆项目到本地
2. 使用本地服务器运行项目（由于使用了Fetch API，直接打开HTML文件可能会遇到跨域问题）
3. 在浏览器中访问 `http://localhost:8000`

### 部署到Web服务器

1. 将所有文件上传到您的Web服务器
2. 确保服务器支持MIME类型（特别是.otf字体文件）
3. 访问对应的URL即可

常见的Web提供商有 GitHub Pages、Google Sites等，任君挑选。

## 配置说明

### 主配置文件 (configs/config.json)

这个文件用来配置可用的语言、默认语言和单语言模式。

```json
{
    "availableLanguages": ["en", "zh"],
    "defaultLanguage": "en",
    "singleLanguageMode": false
}
```

- `availableLanguages`: 可用的语言列表
- `defaultLanguage`: 默认语言
- `singleLanguageMode`: 是否启用单语言模式（如果设为true，将隐藏语言切换按钮）

如果设置为false，不仅显示语言切换按钮，而且需要同时设置英文和中文的配置文件。反之，只需设置相应语言的配置文件即可。

### 个人信息配置

#### 英文配置 (以 configs/en/info_en.json 为例)

```json
{
    "name": "Your Name",
    "address": "Your Address",
    "institution": "Your Institution",
    "googlescholar": "Google Scholar Profile",
    "github": "GitHub Profile",
    // 如果没有（或者不愿意展示） google scholar 和/或 github 账号，对应的字段可以删除
    "email": "Email Address",
    "UTC": "+8"
}
```

#### 中文配置 (以 configs/zh/info_zh.json 为例)

```json
{
    "name": "您的姓名",
    "address": "您的地址",
    "institution": "您的机构",
    "googlescholar": "Google Scholar 个人主页",
    "github": "GitHub 个人主页",
    // 如果没有（或者不愿意展示） google scholar 和/或 github 账号，对应的字段可以删除
    "email": "邮件地址",
    "UTC": "+8"
}
```

### 其他配置文件

每个部分都有对应的配置文件，包括：

- `education_en.json` / `education_zh.json`: 教育经历
- `employment_en.json` / `employment_zh.json`: 工作经历
- `honors_en.json` / `honors_zh.json`: 荣誉奖项
- `news_en.json` / `news_zh.json`: 新闻动态
- `papers_en.json` / `papers_zh.json`: 学术论文
- `patents_en.json` / `patents_zh.json`: 专利
- `reviewer_en.json` / `reviewer_zh.json`: 审稿经历
- `teaching_en.json` / `teaching_zh.json`: 教学经历
- `intro_en.txt` / `intro_zh.txt`: 个人简介

## 自定义内容

### 修改个人信息

个人信息会显示在 Home 部分的左侧信息栏中。编辑 `configs/en/info_en.json` 和/或 `configs/zh/info_zh.json` 文件，更新您的个人信息。具体字段如上示例所示。

### 添加教育经历

教育经历会显示在 Experiences 部分的第一个分栏中。在 `configs/en/education_en.json` 和/或 `configs/zh/education_zh.json` 中添加您的教育经历。

```json
[
    {
        "logoSrc": "学校logo.png", // 学校logo图片路径，放在 images/experiences 中
        "school": "学校名称",
        "details": [
            {
                "degree": "学位",
                "department": "部门",
                "time": "开始年份 - 结束年份（或者 current）",
                "tutor": "导师姓名",
                "dissertation": "论文标题",
                // 如果没有（或者不愿意展示）导师和/或论文，对应的字段可以删除
            },
            // 如果在同一所院校有多个不同经历，可以在此处继续添加……
        ]
    },
    // 如果有在其他学校有不同经历，也可以在此处继续添加……
]
```

### 添加工作经历

工作经历会显示在 Experiences 部分的第二个分栏中。在 `configs/en/employment_en.json` 和/或 `configs/zh/employment_zh.json` 中添加您的工作经历。如果没有工作经历，可以将相应的json文件删除或空置，对应的部分不会显示。

```json
[
    {
        "logoSrc": "公司logo.png", // 公司logo图片路径，放在 images/experiences 中
        "company": "公司名称",
        "details": [
            {
                "position": "职务",
                "department": "部门",
                "time": "开始年份 - 结束年份",
                "project": "项目名称",
                // 如果没有（或者不愿意展示）项目，对应的字段可以删除
            },
            // 如果在同一公司有多个不同经历，可以在此处继续添加……
        ]
    },
    // 如果有在其他公司有不同经历，也可以在此处继续添加……
]
```

### 添加学术论文

学术论文会显示在 Publications 部分的第一个分栏中。在 `configs/en/papers_en.json` 和/或 `configs/zh/papers_zh.json` 中添加您的学术论文。

```json
{
    "年份": [
        {
            "title": "论文标题",
            "authors": "<u>作者1</u>, 作者2, 作者3",
            // 可以通过 <u> 标签，通过下划线来标注自己
            "type": "论文类型，比如 Conference / Journal / Workshop / In submission",
            "journal": "期刊名称",  // 如果投的是会议或者参加研讨会，就把本行换成 "conference": "会议名称"
            "abbr": "期刊/会议简称",
            "volume": "卷", // 如果投的是会议或者参加研讨会，就把本行换成 "location": "会议地点"，In submission 就不填这一行
            "image": "论文图片.png", // 论文图片路径，支持 .png, .jpg, .gif等格式，放在 images/publications 中
            "paperLink": "论文链接",
            "codeLink": "代码链接",
            "videoLink": "视频链接",
            "siteLink": "项目网站链接",
            // 如果没有代码/视频/项目网站，对应的字段可以删除
        },
        // 如果在同一年份有多个不同论文，可以在此处继续添加……
    ],
    // 如果有在其他年份有不同论文，也可以在此处继续添加……
}
```

### 添加专利

专利会显示在 Publications 部分的第二个分栏中。在 `configs/en/patents_en.json` 和/或 `configs/zh/patents_zh.json` 中添加您的专利。如果没有专利信息，可以将相应的json文件删除或空置，对应的部分不会显示。

```json
[
    {
        "type": "Patent Type",
        "title": "Patent Title",
        "authors": "<u>Inventor 1</u>, Inventor 2, Inventor 3",
        // 可以通过 <u> 标签，通过下划线来标注自己
        "number": "Patent Number",
        "date": "Date",
        "link": "https://patent.link"
    },
    // 如果有不同的专利，也可以在此处继续添加……
]
```

### 添加荣誉奖项

荣誉奖项会显示在 Experiences 部分的第三个分栏中。在 `configs/en/honors_en.json` 和/或 `configs/zh/honors_zh.json` 中添加您的荣誉奖项。如果没有荣誉奖项，可以将相应的json文件删除或空置，对应的部分不会显示。

```json
[
    {
        "time": "Year",
        "award": "Award Name",
        "unit": "Awarding Unit"
    },
    // 如果有不同的荣誉奖项，也可以在此处继续添加……
]
```

### 添加新闻动态

新闻动态会显示在 Home 部分的右侧第二栏中。在 `configs/en/news_en.json` 和/或 `configs/zh/news_zh.json` 中添加您的新闻动态。

```json
[
    {
        "time": "YYYY-MM-DD",
        "content": "News content with <span style='font-style: italic'>italic text</span> if needed"
    },
    // 如果有不同的新闻动态，也可以在此处继续添加……
]
```
可以通过 HTML 标签来格式化新闻动态的内容，接下来列举一些可能会用得上的标签：

- `<em>italic text</em>`：斜体文本
- `<u>underline text</u>`：下划线文本
- `<strong>bold text</strong>`：加粗文本
- `<br>`：换行
- `<a href="website/address" target="_blank">super link</a>`：插入超链接

### 添加教学经历

教学经历会显示在 Experiences 部分的第四个分栏中。在 `configs/en/teaching_en.json` 和/或 `configs/zh/teaching_zh.json` 中添加您的教学经历。如果没有教学经历，可以将相应的json文件删除或空置，对应的部分不会显示。

```json
[
    {
        "school": "School Name",
        "course": "Course Name",
        "code": "Course Code",
        "identity": "Teaching Role",
        "season": "Season",
        "year": "Year"
    },
    // 如果有不同的教学经历，也可以在此处继续添加……
]
```

### 添加审稿经历

审稿经历会显示在 Experiences 部分的第五个分栏中。在 `configs/en/reviewer_en.json` 和/或 `configs/zh/reviewer_zh.json` 中添加您的审稿经历。如果没有审稿经历，可以将相应的json文件删除或空置，对应的部分不会显示。

```json
[
    {
        "conference": "Conference Name",
        "year": "Year"
    },
    {
        "journal": "Journal Name",
        "year": "Year"
    },
    // 如果有不同的审稿经历，也可以在此处继续添加……
]
```

### 添加个人简介

个人简介会显示在 Home 部分的右侧第一栏中。编辑 `configs/en/intro_en.txt` 和/或 `configs/zh/intro_zh.txt` 文件，添加您的个人简介。可以使用HTML标签来格式化文本，常用的标签在上方“新闻动态”中有所提及。

### 添加图片资源

1. 将学校/公司logo添加到 `images/experience/` 目录
2. 将论文相关图片添加到 `images/publication/` 目录
3. 将个人照片添加到 `images/homepage/photo/` 目录
4. 将网站图标添加到 `images/homepage/favicon/` 目录
5. 将信息图标添加到 `images/homepage/info icon/` 目录

## 功能说明

### 语言切换

- 点击导航栏中的语言切换按钮（中/EN）可以切换语言
- 语言设置会保存在本地存储中，下次访问时会记住您的选择
- 切换语言时会清除缓存，确保内容正确加载

### 主题切换

- 点击导航栏中的主题切换按钮（太阳/月亮图标）可以切换主题
- 主题设置会保存在本地存储中，下次访问时会记住您的选择
- 所有页面元素都有对应的主题样式

### 响应式设计

- 模板适配桌面和移动设备
- 在移动设备上，导航栏会调整为垂直布局
- 所有内容都会根据屏幕大小自动调整布局

## 常见问题

### Q: 为什么直接打开HTML文件无法正常工作？

A: 由于使用了Fetch API加载配置文件，直接打开HTML文件可能会遇到跨域问题。请使用本地服务器运行项目。

### Q: 如何添加新的语言支持？

A: 
1. 在 `configs/config.json` 中的 `availableLanguages` 数组中添加新的语言代码
2. 创建 `configs/[language_code]/` 目录
3. 复制并翻译所有配置文件
4. 在 `src/language.js` 中的 `languageTexts` 对象中添加新语言的文本

### Q: 如何修改网站的颜色主题？

A: 编辑 `src/base.css` 文件中的CSS变量：

```css
:root {
  --primary: #2a6bc6;     /* 主色调 */
  --secondary: #1a3a7a;   /* 次要色调 */
  --accent: #34cceb;      /* 强调色 */
  --dark: #0a1429;        /* 暗色背景 */
  --light: #f0f8ff;       /* 亮色背景 */
  --gray: #5a708a;        /* 灰色文本 */
}
```

### Q: 如何添加新的内容模块？

A: 
1. 在 `src/` 目录下创建对应的JavaScript文件来加载内容，并在 `index.html` 中引用
2. 在 `configs/en/` 和 `configs/zh/` 目录下创建对应的配置文件
3. 在 `src/nav.js` 中添加新的区块创建逻辑
4. 在 `src/base.css` 和 `src/light.css` 中添加新的样式定义
5. 在 `src/language.js` 中添加新的文本定义
6. 在 `src/mobile.css` 中添加响应式样式（如需要）

## 联系方式

如有任何问题或建议，请通过以下方式联系：

- GitHub: [https://github.com/Excursion-Studio](https://github.com/Excursion-Studio)
- Email: [conshein_yuanxing@outlook.com](mailto:conshein_yuanxing@outlook.com) （工作室主理人远行的个人邮箱）