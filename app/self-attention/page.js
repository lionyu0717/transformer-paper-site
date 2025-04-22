"use client";

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Image from 'next/image';
import Link from 'next/link';
import CodeBlock from '../../components/CodeBlock';

export default function SelfAttention() {
  return (
    <div className="layout">
      <Sidebar />
      <Header />
      
      <main className="main-content">
        <div className="container">
          <article className="attention-content">
            <h1>自注意力机制详解</h1>
            
            <section>
              <h2>自注意力的基本原理</h2>
              <p>
                自注意力是Transformer的核心创新，它允许模型在处理序列时关注到序列中的不同位置，
                计算这些位置之间的依赖关系。与RNN不同，自注意力可以直接建立任意两个位置之间的连接，
                因此能够更有效地捕捉长距离依赖。
              </p>
              
              <div className="image-container">
                <Image
                  src="/self-attention.svg"
                  alt="自注意力机制示意图"
                  width={700}
                  height={400}
                  priority
                />
                <p className="image-caption">图1：自注意力机制示意图</p>
              </div>
            </section>
            
            <section>
              <h2>缩放点积注意力</h2>
              <p>
                Transformer使用了缩放点积注意力(Scaled Dot-Product Attention)，其计算公式如下：
              </p>
              
              <CodeBlock code={`Attention(Q, K, V) = softmax(QK^T/√d_k)V`} language="python" />
              
              <p>其中：</p>
              <ul>
                <li><strong>Q (查询)</strong>：由输入序列通过线性投影层生成的查询矩阵</li>
                <li><strong>K (键)</strong>：由输入序列通过线性投影层生成的键矩阵</li>
                <li><strong>V (值)</strong>：由输入序列通过线性投影层生成的值矩阵</li>
                <li><strong>√d_k</strong>：缩放因子，d_k是键向量的维度，这个缩放操作防止点积过大导致softmax梯度消失</li>
              </ul>
              
              <h3>计算步骤详解：</h3>
              <ol>
                <li>计算查询(Q)和键(K)的点积，得到注意力分数矩阵</li>
                <li>将注意力分数除以√d_k进行缩放</li>
                <li>对缩放后的注意力分数应用softmax，得到注意力权重</li>
                <li>将注意力权重与值(V)矩阵相乘，得到加权求和的输出</li>
              </ol>
            </section>
            
            <section>
              <h2>多头注意力机制</h2>
              <p>
                多头注意力(Multi-Head Attention)允许模型同时关注来自不同表示子空间的信息，从而提高模型的表达能力。
                其计算公式如下：
              </p>
              
              <CodeBlock code={`MultiHead(Q, K, V) = Concat(head_1, ..., head_h)W^O

head_i = Attention(QW_i^Q, KW_i^K, VW_i^V)`} language="python" />
              
              <p>
                Transformer使用h=8个注意力头，即同时计算8个不同的自注意力，然后将结果拼接并投影到原始维度。
                每个头的维度d_k = d_v = d_model/h = 64。
              </p>
              
              <p>
                多头注意力的优势：
              </p>
              <ul>
                <li>允许模型关注序列的不同方面</li>
                <li>增强模型的表达能力和特征提取能力</li>
                <li>提高模型的稳定性和泛化能力</li>
              </ul>
            </section>
            
            <section>
              <h2>注意力的直观理解</h2>
              <p>
                可以将自注意力理解为对输入序列中每个元素分配一个"重要性权重"，
                这个权重决定了该元素对当前位置的影响程度。
              </p>
              <p>
                例如，在翻译任务中，解码器生成某个目标单词时，通过注意力机制可以"关注"源句中最相关的单词，
                从而实现更准确的翻译。与传统的RNN相比，这种直接建立的长距离依赖使得模型能更好地处理长句子。
              </p>
            </section>
            
            <div className="navigation-links">
              <Link href="/" className="nav-link">
                返回首页
              </Link>
              <Link href="/architecture" className="nav-link">
                架构详解
              </Link>
            </div>
          </article>
        </div>
      </main>
      
      <style jsx>{`
        .attention-content {
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