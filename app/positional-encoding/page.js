"use client";

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Image from 'next/image';
import Link from 'next/link';
import CodeBlock from '../../components/CodeBlock';

export default function PositionalEncoding() {
  return (
    <div className="layout">
      <Sidebar />
      <Header />
      
      <main className="main-content">
        <div className="container">
          <article className="encoding-content">
            <h1>位置编码详解</h1>
            
            <section>
              <h2>位置编码的作用</h2>
              <p>
                由于Transformer不使用循环和卷积结构，它无法感知输入序列中的位置信息。
                为了让模型了解序列中的位置信息，Transformer引入了位置编码（Positional Encoding）。
                位置编码将位置信息编码到输入的词向量中，使得模型能够学习和利用序列的顺序信息。
              </p>
            </section>
            
            <section>
              <h2>正弦和余弦函数位置编码</h2>
              <p>
                Transformer使用了基于正弦和余弦函数的位置编码方法，其公式如下：
              </p>
              
              <CodeBlock code={`PE(pos, 2i) = sin(pos/10000^(2i/d_model))
PE(pos, 2i+1) = cos(pos/10000^(2i/d_model))`} language="python" />
              
              <p>其中：</p>
              <ul>
                <li><strong>pos</strong>：表示单词在序列中的位置</li>
                <li><strong>i</strong>：表示位置编码的维度索引</li>
                <li><strong>d_model</strong>：模型的隐藏层维度，与词嵌入维度相同</li>
              </ul>
              
              <div className="image-container">
                <Image
                  src="/positional-encoding.svg"
                  alt="位置编码可视化"
                  width={700}
                  height={400}
                  priority
                />
                <p className="image-caption">图1：位置编码矩阵可视化（颜色表示不同维度的值）</p>
              </div>
            </section>
            
            <section>
              <h2>位置编码的特性</h2>
              <p>
                论文选择正弦和余弦函数作为位置编码的原因主要有：
              </p>
              <ol>
                <li>
                  <strong>相对位置感知能力</strong>：对于固定偏移k，PE(pos+k)可以表示为PE(pos)的线性函数，
                  这使得模型可以轻松学习关注相对位置。
                </li>
                <li>
                  <strong>无限长度外推</strong>：正弦和余弦函数可以外推到训练时未见过的序列长度。
                </li>
                <li>
                  <strong>唯一性</strong>：每个位置对应一个唯一的编码向量。
                </li>
              </ol>
              
              <p>
                在实际应用中，位置编码向量被添加到输入的词嵌入中：
              </p>
              <CodeBlock code={`输入表示 = 词嵌入 + 位置编码`} language="python" />
            </section>
            
            <section>
              <h2>位置编码的变体</h2>
              <p>
                除了原始论文中使用的固定正弦位置编码外，还有其他类型的位置编码方法：
              </p>
              <ul>
                <li>
                  <strong>可学习的位置嵌入</strong>：与词嵌入类似，直接学习每个位置的向量表示。
                  论文的消融实验中提到，可学习的位置嵌入与固定的正弦位置编码效果相当。
                </li>
                <li>
                  <strong>相对位置编码</strong>：后续改进的Transformer模型如Transformer-XL引入了相对位置编码，
                  仅考虑词与词之间的相对距离，而非绝对位置。
                </li>
              </ul>
            </section>
            
            <div className="navigation-links">
              <Link href="/" className="nav-link">
                返回首页
              </Link>
              <Link href="/self-attention" className="nav-link">
                自注意力机制
              </Link>
            </div>
          </article>
        </div>
      </main>
      
      <style jsx>{`
        .encoding-content {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem 0;
        }
        
        h1 {
          margin-bottom: 2rem;
          color: var(--primary-color);
        }
        
        section {
          margin-bottom: 3rem;
        }
        
        .image-container {
          margin: 2rem 0;
          text-align: center;
        }
        
        .image-caption {
          margin-top: 1rem;
          font-size: 0.9rem;
          color: #64748b;
          text-align: center;
        }
        
        .navigation-links {
          margin-top: 3rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-color);
          display: flex;
          justify-content: space-around;
        }
        
        .nav-link {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          background-color: var(--primary-color);
          color: white;
          border-radius: 6px;
          font-weight: 500;
          transition: background-color 0.2s;
        }
        
        .nav-link:hover {
          background-color: var(--link-hover-color);
          color: white;
        }
      `}</style>
    </div>
  );
} 