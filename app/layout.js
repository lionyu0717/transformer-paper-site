import '../styles/globals.css';

export const metadata = {
  title: 'Transformer论文解析',
  description: '《Attention Is All You Need》论文详细解析，了解Transformer架构的核心创新和工作原理',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
} 