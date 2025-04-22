import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <Link href="/">
            <span className="logo-text">Transformer论文解析</span>
          </Link>
        </div>
        <nav className="nav">
          <a href="https://github.com/tensorflow/tensor2tensor" target="_blank" rel="noopener noreferrer">
            GitHub源码
          </a>
          <a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noopener noreferrer">
            原论文
          </a>
        </nav>
      </div>
      
      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: var(--header-height);
          background-color: white;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          z-index: 50;
        }
        
        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
          padding: 0 2rem;
          margin-left: var(--sidebar-width);
        }
        
        .logo {
          display: flex;
          align-items: center;
        }
        
        .logo-text {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--primary-color);
        }
        
        .nav {
          display: flex;
          gap: 1.5rem;
        }
        
        .nav a {
          font-weight: 500;
          padding: 0.5rem 0;
        }
        
        @media (max-width: 768px) {
          .header-container {
            margin-left: 0;
            padding: 0 1rem;
          }
          
          .logo-text {
            font-size: 1.1rem;
          }
          
          .nav {
            gap: 1rem;
          }
        }
      `}</style>
    </header>
  );
}