import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import { NextResponse } from 'next/server';

// 将Markdown转换为HTML
async function markdownToHtml(markdown) {
  const result = await remark()
    .use(html, { sanitize: false })
    .process(markdown);
  return result.toString();
}

// 获取Markdown内容
function getMarkdownContent() {
  const filePath = path.join(process.cwd(), 'transformer-explanation.md');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return fileContents;
}

export async function GET() {
  try {
    const markdownContent = getMarkdownContent();
    
    // 分解Markdown内容为各部分，添加ID便于导航
    const parts = markdownContent.split('\n## ');
    
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
        default: id = `section-${index}`;
      }
      return { id, content: part };
    });
    
    const introduction = await markdownToHtml(firstPart);
    
    const sections = await Promise.all(
      otherParts.map(async (part) => {
        const htmlContent = await markdownToHtml(`## ${part.content}`);
        return { 
          id: part.id, 
          html: htmlContent 
        };
      })
    );
    
    // 返回处理后的内容
    return NextResponse.json({ introduction, sections });
  } catch (error) {
    console.error('Error processing content:', error);
    return NextResponse.json({ error: 'Failed to process content' }, { status: 500 });
  }
} 