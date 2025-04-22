"use client";

import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function Home() {
  const [sections, setSections] = useState([]);
  const [introduction, setIntroduction] = useState("");
  
  useEffect(() => {
    async function fetchContent() {
      try {
        // 从公共API端点获取Markdown内容
        const response = await fetch('/api/content');
        if (!response.ok) {
          throw new Error('Failed to fetch content');
        }
        const data = await response.json();
        setIntroduction(data.introduction);
        setSections(data.sections);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    }
    
    fetchContent();
  }, []);

  return (
    <div className="layout">
      <Sidebar />
      <Header />
      
      <main className="main-content">
        <div className="container">
          <article className="paper-content">
            <section className="introduction">
              <div dangerouslySetInnerHTML={{ __html: introduction }} />
            </section>
            
            {sections.map((section) => (
              <section key={section.id} id={section.id}>
                <div dangerouslySetInnerHTML={{ __html: section.html }} />
              </section>
            ))}
          </article>
        </div>
      </main>
      
      <style jsx>{`
        .paper-content {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem 0;
        }
        
        .paper-content section {
          margin-bottom: 3rem;
          scroll-margin-top: calc(var(--header-height) + 2rem);
        }
        
        @media (max-width: 768px) {
          .paper-content {
            padding: 1rem 0;
          }
        }
      `}</style>
    </div>
  );
} 