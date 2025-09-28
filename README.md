# Excursion Studio Personal Homepage (ESPH) Template

English Version | [中文版](README_zh.md)

ESPH Template is a comprehensive personal academic homepage template with bilingual support (English/Chinese) and light/dark theme switching, perfect for academics, researchers, or anyone looking to showcase their personal experience and achievements.

The sample page can be previewed by clicking [here](https://excursion-studio.github.io/Personal-Homepage-Template/).

## Features

- 🌐 **Multilingual Support**: Full English/Chinese language switching with all content available in both languages
- 🎨 **Theme Switching**: Light/dark theme toggle with settings saved in local storage
- 📱 **Responsive Design**: Optimized for both desktop and mobile devices
- 📄 **PDF CV Generation**: Dynamic PDF resume generation with watermark and custom font support
- 🔧 **Modular Design**: Each functional module has independent files for easy maintenance and extension
- 📊 **Data-Driven**: All content loaded from JSON configuration files, no code changes needed for updates

## Project Structure

```
Personal-Homepage-Template/
├── README.md                 # English documentation
├── README_zh.md              # Chinese documentation
├── components/               # Third-party components
│   ├── all_min.css           # Font Awesome icon library
│   ├── chart.js              # Chart.js library
│   ├── font/                 # Font files
│   ├── fontkit.umd.js        # Font processing library
│   └── pdf-lib.min.js        # PDF generation library
├── configs/                  # Configuration files
│   ├── config.json           # Main configuration file
│   ├── en/                   # English configurations
│   └── zh/                   # Chinese configurations
├── images/                   # Image resources
│   ├── experience/           # Experience-related images
│   ├── homepage/             # Homepage-related images
│   └── publication/          # Publication-related images
└── src/                      # Source code
    ├── index_origin.html     # Main page
    ├── base.css              # Basic styles
    ├── light.css             # Light theme styles
    ├── mobile.css            # Mobile device styles
    ├── language.js           # Language switching functionality
    ├── theme.js              # Theme switching functionality
    ├── nav.js                # Navigation bar functionality
    ├── home.js               # Homepage functionality
    ├── experiences.js        # Experience section functionality
    ├── publications.js       # Publications section functionality
    ├── cv.js                 # CV section functionality
    ├── cv_generator.js       # PDF CV generation functionality
    ├── module-container.js   # Module container component
    ├── cacheclearing.js      # Cache clearing functionality
    └── distribution.js       # Page layout functionality
```

## Installation and Deployment

### Local Running

1. Download or clone the project to your local machine
2. Run the project using a local server (due to the use of Fetch API, directly opening the HTML file may cause cross-origin issues)
3. Access `http://localhost:8000` in your browser

### Deployment to Web Server

1. Upload all files to your web server
2. Ensure the server supports MIME types (especially for .otf font files)
3. Access the corresponding URL to view the homepage

Common web providers include GitHub Pages, Google Sites, etc. You can choose any one that suits your needs.

## Configuration Guide

### Main Configuration File (configs/config.json)

This file is used to configure available languages, default language, and single language mode.

```json
{
    "availableLanguages": ["en", "zh"],
    "defaultLanguage": "en",
    "singleLanguageMode": false
}
```

- `availableLanguages`: List of available languages
- `defaultLanguage`: Default language
- `singleLanguageMode`: Whether to enable single language mode (if set to true, the language switch button will be hidden)

If set to false, not only will the language switch button be displayed, but both English and Chinese configuration files need to be set. Conversely, only the corresponding language configuration file needs to be set.

### Personal Information Configuration

#### English Configuration (configs/en/info.json)

```json
{
    "name": "Your Name",
    "address": "Your Address",
    "institution": "Your Institution",
    "googlescholar": "Google Scholar Profile",
    "github": "GitHub Profile",
    // If you don't have (or don't want to display) Google Scholar and/or GitHub accounts, the corresponding fields can be deleted
    "email": "Email Address",
    "UTC": "+8"
}
```

#### Chinese Configuration (configs/zh/info_zh.json)

```json
{
    "name": "您的姓名",
    "address": "您的地址",
    "institution": "您的机构",
    "googlescholar": "Google Scholar 个人主页",
    "github": "GitHub 个人主页",
    // If you don't have (or don't want to display) Google Scholar and/or GitHub accounts, the corresponding fields can be deleted
    "email": "邮件地址",
    "UTC": "+8"
}
```

### Other Configuration Files

Each section has corresponding configuration files, including:

- `education.json` / `education_zh.json`: Education experience
- `employment.json` / `employment_zh.json`: Work experience
- `honors.json` / `honors_zh.json`: Honors and awards
- `news.json` / `news_zh.json`: News updates
- `papers.json` / `papers_zh.json`: Academic papers
- `patents.json` / `patents_zh.json`: Patents
- `reviewer.json` / `reviewer_zh.json`: Reviewer experience
- `teaching.json` / `teaching_zh.json`: Teaching experience
- `intro.txt` / `intro_zh.txt`: Personal introduction

## Customizing Content

### Modifying Personal Information

Personal information is displayed in the left information bar of the Home section. Edit the `configs/en/info.json` and/or `configs/zh/info_zh.json` files to update your personal information. Specific fields are shown in the examples above.

### Adding Education Experience

Education experience is displayed in the first tab of the Experiences section. Add your education experience in `configs/en/education.json` and/or `configs/zh/education_zh.json`.

```json
[
    {
        "logoSrc": "school_logo.png", // School logo image path, placed in images/experiences
        "school": "School Name",
        "details": [
            {
                "degree": "Degree",
                "department": "Department",
                "time": "Start Year - End Year (or current)",
                "tutor": "Supervisor Name",
                "dissertation": "Thesis Title",
                // If you don't have (or don't want to display) supervisor and/or thesis, the corresponding fields can be deleted
            },
            // If you have multiple experiences at the same institution, you can continue to add here...
        ]
    },
    // If you have experiences at other schools, you can also continue to add here...
]
```

### Adding Work Experience

Work experience is displayed in the second tab of the Experiences section. Add your work experience in `configs/en/employment.json` and/or `configs/zh/employment_zh.json`. If you don't have work experience, you can delete or leave empty the corresponding json file, and the corresponding section will not be displayed.

```json
[
    {
        "logoSrc": "company_logo.png", // Company logo image path, placed in images/experiences
        "company": "Company Name",
        "details": [
            {
                "position": "Position",
                "department": "Department",
                "time": "Start Year - End Year",
                "project": "Project Name",
                // If you don't have (or don't want to display) projects, the corresponding fields can be deleted
            },
            // If you have multiple experiences at the same company, you can continue to add here...
        ]
    },
    // If you have experiences at other companies, you can also continue to add here...
]
```

### Adding Academic Papers

Academic papers are displayed in the first tab of the Publications section. Add your academic papers in `configs/en/papers.json` and/or `configs/zh/papers_zh.json`.

```json
{
    "Year": [
        {
            "title": "Paper Title",
            "authors": "<u>Author 1</u>, Author 2, Author 3",
            // You can use the <u> tag to underline yourself
            "type": "Paper type, such as Conference / Journal / Workshop / In submission",
            "journal": "Journal Name", // If it's a conference or workshop, replace this line with "conference": "Conference Name"
            "abbr": "Journal/Conference abbreviation",
            "volume": "Volume", // If it's a conference or workshop, replace this line with "location": "Conference location", for In submission, don't fill this line
            "image": "paper_image.png", // Paper image path, supports .png, .jpg, .gif and other formats, placed in images/publications
            "paperLink": "Paper link",
            "codeLink": "Code link",
            "videoLink": "Video link",
            "siteLink": "Project website link",
            // If there is no code/video/project website, the corresponding fields can be deleted
        },
        // If you have multiple different papers in the same year, you can continue to add here...
    ],
    // If you have different papers in other years, you can also continue to add here...
}
```

### Adding Patents

Patents are displayed in the second tab of the Publications section. Add your patents in `configs/en/patents.json` and/or `configs/zh/patents_zh.json`. If you don't have patent information, you can delete or leave empty the corresponding json file, and the corresponding section will not be displayed.

```json
{
    "patents": [
        {
            "type": "Patent Type",
            "title": "Patent Title",
            "authors": "<u>Inventor 1</u>, Inventor 2, Inventor 3",
            // You can use the <u> tag to underline yourself
            "number": "Patent Number",
            "date": "Date",
            "link": "https://patent.link"
        },
        // If you have different patents, you can also continue to add here...
    ]
}
```

### Adding Honors and Awards

Honors and awards are displayed in the third tab of the Experiences section. Add your honors and awards in `configs/en/honors.json` and/or `configs/zh/honors_zh.json`. If you don't have honors and awards, you can delete or leave empty the corresponding json file, and the corresponding section will not be displayed.

```json
[
    {
        "time": "Year",
        "award": "Award Name",
        "unit": "Awarding Unit"
    },
    // If you have different honors and awards, you can also continue to add here...
]
```

### Adding News Updates

News updates are displayed in the second column on the right side of the Home section. Add your news updates in `configs/en/news.json` and/or `configs/zh/news_zh.json`.

```json
[
    {
        "time": "YYYY-MM-DD",
        "content": "News content with <span style='font-style: italic'>italic text</span> if needed"
    },
    // If you have different news updates, you can also continue to add here...
]
```
You can use HTML tags to format the content of news updates. Here are some tags that might be useful:

- `<em>italic text</em>`: Italic text
- `<u>underline text</u>`: Underlined text
- `<strong>bold text</strong>`: Bold text
- `<br>`: Line break
- `<a href="website/address" target="_blank">super link</a>`: Insert a super link

### Adding Teaching Experience

Teaching experience is displayed in the fourth tab of the Experiences section. Add your teaching experience in `configs/en/teaching.json` and/or `configs/zh/teaching_zh.json`. If you don't have teaching experience, you can delete or leave empty the corresponding json file, and the corresponding section will not be displayed.

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
    // If you have different teaching experiences, you can also continue to add here...
]
```

### Adding Reviewer Experience

Reviewer experience is displayed in the fifth tab of the Experiences section. Add your reviewer experience in `configs/en/reviewer.json` and/or `configs/zh/reviewer_zh.json`. If you don't have reviewer experience, you can delete or leave empty the corresponding json file, and the corresponding section will not be displayed.

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
    // If you have different reviewer experiences, you can also continue to add here...
]
```

### Adding Personal Introduction

Personal introduction is displayed in the first column on the right side of the Home section. Edit the `configs/en/intro.txt` and/or `configs/zh/intro_zh.txt` files to add your personal introduction. You can use HTML tags to format the text, commonly used tags are mentioned in the "News Updates" section above.

### Adding Image Resources

1. Add school/company logos to the `images/experience/` directory
2. Add paper-related images to the `images/publication/` directory
3. Add personal photos to the `images/homepage/photo/` directory
4. Add watermark images for PDF generation to the `images/homepage/watermark/` directory (optional)

## Feature Guide

### Language Switching

- Click the language switch button (中/EN) in the navigation bar to switch languages
- Language settings are saved in local storage and will be remembered on your next visit
- Cache is cleared when switching languages to ensure content loads correctly

### Theme Switching

- Click the theme switch button (sun/moon icon) in the navigation bar to switch themes
- Theme settings are saved in local storage and will be remembered on your next visit
- All page elements have corresponding theme styles

### PDF CV Generation

- Click the "Generate and Download Full CV" button in the CV section to preview the PDF resume, you can download it as needed
- The PDF CV automatically retrieves content from configuration files
- Supports adding watermarks and custom fonts

### Responsive Design

- The template is optimized for both desktop and mobile devices
- On mobile devices, the navigation bar adjusts to a vertical layout
- All content automatically adjusts layout based on screen size

## Frequently Asked Questions

### Q: Why doesn't the HTML file work properly when opened directly?

A: Due to the use of Fetch API to load configuration files, directly opening the HTML file may cause cross-origin issues. Please run the project using a local server.

### Q: How do I add support for a new language?

A: 
1. Add the new language code to the `availableLanguages` array in `configs/config.json`
2. Create a `configs/[language_code]/` directory
3. Copy and translate all configuration files
4. Add the new language text to the `languageTexts` object in `src/language.js`

### Q: How do I modify the website's color theme?

A: Edit the CSS variables in the `src/base.css` file:

```css
:root {
  --primary: #2a6bc6;     /* Primary color */
  --secondary: #1a3a7a;   /* Secondary color */
  --accent: #34cceb;      /* Accent color */
  --dark: #0a1429;        /* Dark background */
  --light: #f0f8ff;       /* Light background */
  --gray: #5a708a;        /* Gray text */
}
```

### Q: How do I add a new content module?

A: 
1. Create a corresponding JavaScript file in the `src/` directory to load content, and reference it in `index.html`
2. Create corresponding configuration files in the `configs/en/` and `configs/zh/` directories
3. Add new block creation logic in `src/nav.js`
4. Add new style definitions in `src/base.css`
5. Add new text definitions in `src/language.js`

### Q: How do I customize the PDF CV style?

A: Edit the relevant functions in the `src/cv_generator.js` file to modify fonts, colors, layout, etc. The PDF generator in this project is implemented based on the pdf-Lib library, so before that, you need to learn the corresponding development knowledge.

## Contact

For any questions or suggestions, please contact:

- GitHub: [https://github.com/Excursion-Studio](https://github.com/Excursion-Studio)
- Email: [conshein_yuanxing@outlook.com](mailto:conshein_yuanxing@outlook.com) (Personal email of Yuanxing, owner of this studio)