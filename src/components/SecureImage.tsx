import { useEffect, useRef, useState, ImgHTMLAttributes } from 'react';
import styled from 'styled-components';

interface SecureImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  className?: string;
}

const CanvasWrapper = styled.div`
  position: relative;
  display: inline-block;
  /* Prevent pointer events from propagating to the canvas directly if needed,
     but we want to prevent drag anyway */
  user-select: none;
  -webkit-user-drag: none;

  canvas {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none; /* Make canvas unclickable for right clicks */
  }

  /* Invisible overlay to block right clicks on the canvas area itself */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
`;

export const SecureImage = ({ src, alt, className, style, ...props }: SecureImageProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // We create a temporary image to load the src
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Important if loading from external URLs

    img.onload = () => {
      if (!isMounted) return;
      // Set canvas dimensions to match image
      canvas.width = img.width;
      canvas.height = img.height;
      // Draw image to canvas
      ctx.drawImage(img, 0, 0);
      setLoaded(true);
    };

    img.onerror = () => {
      console.error('Failed to load secure image:', src);
    };

    // If it's a relative path starting with '/', we just set it. 
    // Wait, Vite handles imported assets as base64 or absolute URLs usually.
    img.src = src;

    return () => {
      isMounted = false;
    };
  }, [src]);

  return (
    <CanvasWrapper className={className} style={{ ...style, opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease' }}>
      <canvas ref={canvasRef} aria-label={alt} {...(props as any)} />
    </CanvasWrapper>
  );
};

export default SecureImage;
