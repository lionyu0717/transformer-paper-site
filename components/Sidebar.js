"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sections = [
    { id: 'overview', title: '论文概述' },
    { id: 'innovations', title: '关键创新点' },
    { id: 'architecture', title: 'Transformer架构详解' },
    { id: 'components', title: '核心组件详解' },
    { id: 'advantages', title: 'Transformer的优势' },
    { id: 'results', title: '实验结果' },
    { id: 'variants', title: '模型变体实验' },
    { id: 'impact', title: 'Transformer的影响与应用' },
    { id: 'conclusion', title: '总结' },
  ];

  return (
    <>
      <button 
        className="sidebar-toggle" 
        onClick={toggleSidebar} 
        aria-label={isOpen ? '关闭菜单' : '打开菜单'}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>目录</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <Link 
                  href={`#${section.id}`}
                  onClick={() => setIsOpen(false)}
                >
                  {section.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="sidebar-footer">
          <a 
            href="https://arxiv.org/abs/1706.03762" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            原论文链接
          </a>
        </div>
      </aside>
      
      <style jsx>{`
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: var(--sidebar-width);
          height: 100vh;
          background-color: white;
          border-right: 1px solid var(--border-color);
          padding: 1.5rem;
          overflow-y: auto;
          z-index: 100;
          transition: transform 0.3s ease;
        }
        
        .sidebar-header {
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
        }
        
        .sidebar-header h2 {
          margin: 0;
          font-size: 1.5rem;
          color: var(--primary-color);
        }
        
        .sidebar-nav ul {
          list-style: none;
          padding: 0;
        }
        
        .sidebar-nav li {
          margin-bottom: 0.8rem;
        }
        
        .sidebar-nav a {
          display: block;
          padding: 0.5rem 0;
          color: var(--text-color);
        }
        
        .sidebar-nav a:hover {
          color: var(--primary-color);
        }
        
        .sidebar-footer {
          margin-top: 2rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }
        
        .sidebar-footer a {
          display: block;
          padding: 0.5rem 0;
          color: var(--primary-color);
          font-weight: 500;
        }
        
        .sidebar-toggle {
          position: fixed;
          top: 1rem;
          left: 1rem;
          z-index: 101;
          display: none;
          flex-direction: column;
          justify-content: space-around;
          width: 2rem;
          height: 2rem;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
        }
        
        .sidebar-toggle span {
          width: 2rem;
          height: 0.25rem;
          background: var(--primary-color);
          border-radius: 10px;
          transition: all 0.3s linear;
          position: relative;
          transform-origin: 1px;
        }
        
        @media (max-width: 768px) {
          .sidebar-toggle {
            display: flex;
          }
        }
      `}</style>
    </>
  );
} 