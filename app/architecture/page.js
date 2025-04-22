"use client";

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Image from 'next/image';
import Link from 'next/link';

export default function Architecture() {
  return (
    <div className="layout">
      <Sidebar />
      <Header />
      
      <main className="main-content">
        <div className="container">
          <article className="architecture-content">
            <h1>Transformer架构详解</h1>
            
            <section className="architecture-overview">
              <h2>模型整体架构</h2>
              <p>
                Transformer采用经典的编码器-解码器架构，但完全基于注意力机制，摒弃了之前主流的RNN和CNN结构。
                下图展示了Transformer的整体架构，包括左侧的编码器和右侧的解码器。
              </p>
              
              <div className="architecture-image">
                <Image
                  src="/transformer-architecture.svg"
                  alt="Transformer架构图"
                  width={800}
                  height={600}
                  priority
                />
                <p className="image-caption">图1：Transformer模型架构</p>
              </div>
              
              <p>
                Transformer的核心特点：
              </p>
              <ul>
                <li><strong>编码器(Encoder)</strong>：由N=6个相同的层堆叠而成</li>
                <li><strong>解码器(Decoder)</strong>：也由N=6个相同的层堆叠而成</li>
                <li><strong>自注意力机制</strong>：允许模型在不增加计算复杂度的情况下捕捉长距离依赖</li>
                <li><strong>多头注意力</strong>：并行关注不同表示子空间的信息</li>
                <li><strong>位置编码</strong>：由于缺少循环结构，使用位置编码提供序列位置信息</li>
              </ul>
            </section>
            
            <section className="encoder-section">
              <h2>编码器详解</h2>
              <p>
                每个编码器层包含两个子层：
              </p>
              <ol>
                <li><strong>多头自注意力层</strong>：允许编码器关注输入序列中的不同位置</li>
                <li><strong>前馈神经网络</strong>：包含两个线性变换和一个ReLU激活函数</li>
              </ol>
              <p>
                每个子层都采用残差连接和层归一化：LayerNorm(x + Sublayer(x))，这有助于训练更深的网络和避免梯度消失问题。
              </p>
            </section>
            
            <section className="decoder-section">
              <h2>解码器详解</h2>
              <p>
                每个解码器层包含三个子层：
              </p>
              <ol>
                <li><strong>掩蔽多头自注意力层</strong>：防止解码器关注后续位置的信息，保持自回归特性</li>
                <li><strong>编码器-解码器注意力层</strong>：让解码器关注输入序列的相关部分</li>
                <li><strong>前馈神经网络</strong>：与编码器中相同的前馈网络</li>
              </ol>
              <p>
                解码器同样使用残差连接和层归一化，但在自注意力层中加入了掩码机制，确保位置i的预测只依赖于位置小于i的已知输出。
              </p>
            </section>
            
            <div className="navigation-links">
              <Link href="/" className="nav-link">
                返回首页
              </Link>
            </div>
          </article>
        </div>
      </main>
      
      <style jsx>{`
        .architecture-content {
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
        
        .architecture-image {
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
          justify-content: center;
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