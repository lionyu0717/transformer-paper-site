import React from 'react';

export default function CodeBlock({ code, language }) {
  return (
    <div className="code-block">
      <pre>
        <code className={language ? `language-${language}` : ''}>
          {code}
        </code>
      </pre>
      
      <style jsx>{`
        .code-block {
          margin: 1.5rem 0;
          border-radius: 6px;
          overflow: hidden;
        }
        
        pre {
          background-color: #1e293b;
          color: #e2e8f0;
          padding: 1.25rem;
          overflow-x: auto;
          font-size: 0.9rem;
          line-height: 1.6;
          margin: 0;
        }
        
        code {
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
          background: transparent;
          padding: 0;
        }
      `}</style>
    </div>
  );
} 