const fs = require('fs');
const path = require('path');
// ESM imports for remark
const { execSync } = require('child_process');

// 生成临时脚本以使用 ESM 模块
const createTempScript = () => {
  const tempScriptContent = `
    import { remark } from 'remark';
    import html from 'remark-html';
    import fs from 'fs';
    import path from 'path';
    import { fileURLToPath } from 'url';
    
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    
    // 将Markdown转换为HTML
    async function markdownToHtml(markdown) {
      const result = await remark()
        .use(html)
        .process(markdown);
      return result.toString();
    }
    
    // 获取Markdown内容
    function getMarkdownContent() {
      const filePath = path.join(process.cwd(), 'transformer-explanation.md');
      const fileContents = fs.readFileSync(filePath, 'utf8');
      return fileContents;
    }
    
    async function generateData() {
      try {
        const markdownContent = getMarkdownContent();
        
        // 分解Markdown内容为各部分，添加ID便于导航
        const parts = markdownContent.split('\\n## ');
        
        // 首部分（# 开头的标题和内容）
        const firstPart = parts[0].replace('# ', '');
        
        // 其他部分（## 开头的各节）
        const otherParts = parts.slice(1).map((part, index) => {
          let id = '';
          switch(index) {
            case 0: id = 'overview'; break;
            case 1: id = 'innovations'; break;
            case 2: id = 'architecture'; break;
            case 3: id = 'components'; break;
            case 4: id = 'advantages'; break;
            case 5: id = 'results'; break;
            case 6: id = 'variants'; break;
            case 7: id = 'impact'; break;
            case 8: id = 'conclusion'; break;
            default: id = \`section-\${index}\`;
          }
          return { id, content: part };
        });
        
        const introduction = await markdownToHtml(firstPart);
        
        const sections = await Promise.all(
          otherParts.map(async (part) => {
            const htmlContent = await markdownToHtml(\`## \${part.content}\`);
            return { 
              id: part.id, 
              html: htmlContent 
            };
          })
        );
        
        const outputData = { introduction, sections };
        
        // 写入到data/transformer-data.json
        const outputDir = path.join(process.cwd(), 'data');
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }
        
        fs.writeFileSync(
          path.join(outputDir, 'transformer-data.json'),
          JSON.stringify(outputData, null, 2)
        );
        
        console.log('数据生成完成：data/transformer-data.json');
      } catch (error) {
        console.error('生成数据时出错:', error);
        process.exit(1);
      }
    }
    
    generateData();
  `;

  fs.writeFileSync('scripts/temp-esm-script.mjs', tempScriptContent);
};

// 创建目录并生成临时脚本
const generateTempScript = () => {
  if (!fs.existsSync('scripts')) {
    fs.mkdirSync('scripts', { recursive: true });
  }
  createTempScript();
};

// 运行临时脚本
const runTempScript = () => {
  try {
    generateTempScript();
    execSync('node scripts/temp-esm-script.mjs', { stdio: 'inherit' });
    
    // 清理临时脚本
    fs.unlinkSync('scripts/temp-esm-script.mjs');
  } catch (error) {
    console.error('执行临时脚本时出错:', error);
    process.exit(1);
  }
};

runTempScript(); 