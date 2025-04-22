import Image from 'next/image';

export default function ImageWithCaption({ src, alt, caption, width, height }) {
  return (
    <figure className="image-container">
      <Image 
        src={src} 
        alt={alt || 'Image'} 
        width={width || 800} 
        height={height || 600}
        className="image"
      />
      {caption && <figcaption>{caption}</figcaption>}
      
      <style jsx>{`
        .image-container {
          margin: 2rem 0;
          text-align: center;
        }
        
        .image {
          max-width: 100%;
          height: auto;
          border-radius: 6px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        figcaption {
          margin-top: 0.75rem;
          font-size: 0.95rem;
          color: #64748b;
          text-align: center;
        }
      `}</style>
    </figure>
  );
} 