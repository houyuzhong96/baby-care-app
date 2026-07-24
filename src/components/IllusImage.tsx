
import { useState } from 'react';
import { illustrations } from '../data/illustrations';

interface Props {
  name: keyof typeof illustrations;
  alt?: string;
  style?: React.CSSProperties;
  className?: string;
  fallback?: string; // emoji fallback when image not loaded
  size?: number;
}

// 插画组件：优先显示妻子的插图，未就绪时显示 emoji 占位
export default function IllusImage({ name, alt, style, className, fallback, size = 120 }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const rawSrc = illustrations[name];
  const src = typeof rawSrc === 'function' ? rawSrc(0) : rawSrc as string;

  if (error || !src) {
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: size * 0.5,
          borderRadius: 16,
          background: 'var(--primary-light)',
          opacity: 0.6,
          ...style,
        }}
        title={alt}
      >
        {fallback || '🖼️'}
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {!loaded && (
        <div
          className={className}
          style={{
            width: size,
            height: size,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: size * 0.5,
            borderRadius: 16,
            background: 'var(--primary-light)',
            opacity: 0.6,
            ...style,
          }}
        >
          {fallback || '🖼️'}
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        style={{ ...style, display: loaded ? 'block' : 'none', maxWidth: '100%' }}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
}
