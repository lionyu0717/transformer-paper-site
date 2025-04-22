"use client";

import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import transformerData from '../data/transformer-data.json';

export default function Home() {
  const [sections, setSections] = useState([]);
  const [introduction, setIntroduction] = useState("");
  
  useEffect(() => {
    // 使用静态导入的数据
    setIntroduction(transformerData.introduction);
    setSections(transformerData.sections);
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