import React, { useState, useEffect, useMemo } from 'react';

declare global {
  interface Window {
    katex?: {
      renderToString: (tex: string, options?: any) => string;
    };
  }
}

interface MathViewProps {
  text: string;
  className?: string;
  inline?: boolean;
}

/**
 * MathView: Render công thức Toán, Lý, Hóa chuẩn KaTeX
 * - Hỗ trợ công thức trong cặp $...$ (inline) hoặc $$...$$ (display block)
 * - Tự động phát hiện và render các đoạn LaTeX thô: \frac, \sqrt, \Delta, \alpha, \beta, \Omega, \vec, \cdot, v.v.
 * - Tự động phản ứng re-render ngay khi KaTeX CDN tải xong
 * - Bảo vệ font chữ tiếng Việt, không bị vỡ font hay mất dấu
 */
export const MathView: React.FC<MathViewProps> = ({ text, className = '', inline = false }) => {
  const [katexLoaded, setKatexLoaded] = useState<boolean>(() => {
    return typeof window !== 'undefined' && typeof window.katex?.renderToString === 'function';
  });

  // Tự động lắng nghe và cập nhật khi KaTeX CDN tải hoàn tất
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (typeof window.katex?.renderToString === 'function') {
      if (!katexLoaded) setKatexLoaded(true);
      return;
    }

    const interval = setInterval(() => {
      if (typeof window.katex?.renderToString === 'function') {
        setKatexLoaded(true);
        clearInterval(interval);
      }
    }, 150);

    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [katexLoaded]);

  const renderedHtml = useMemo(() => {
    if (!text || typeof text !== 'string') return '';

    // Chuẩn hóa chuỗi đầu vào
    let processed = text;

    // Helper render KaTeX an toàn
    const renderKatexSafe = (mathStr: string, isBlock: boolean): string => {
      const cleanMath = mathStr.trim();
      if (!cleanMath) return '';

      if (typeof window !== 'undefined' && window.katex && typeof window.katex.renderToString === 'function') {
        try {
          return window.katex.renderToString(cleanMath, {
            displayMode: isBlock,
            throwOnError: false,
            strict: false,
            trust: true
          });
        } catch {
          // Fallback typography nếu KaTeX gặp lỗi cú pháp
          return `<span class="font-mono text-sky-800 dark:text-sky-300 font-semibold px-1">${cleanMath}</span>`;
        }
      }

      // Fallback khi KaTeX chưa tải xong: hiển thị font mono sạch đẹp không vỡ trang
      const prettyMath = cleanMath
        .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2)')
        .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
        .replace(/\\cdot/g, '·')
        .replace(/\\times/g, '×')
        .replace(/\\le/g, '≤')
        .replace(/\\ge/g, '≥')
        .replace(/\\neq/g, '≠')
        .replace(/\\approx/g, '≈')
        .replace(/\\rightarrow/g, '→')
        .replace(/\\Delta/g, 'Δ')
        .replace(/\\Omega/g, 'Ω')
        .replace(/\\pi/g, 'π')
        .replace(/\\alpha/g, 'α')
        .replace(/\\beta/g, 'β')
        .replace(/\\gamma/g, 'γ')
        .replace(/\\lambda/g, 'λ')
        .replace(/\\mu/g, 'μ')
        .replace(/\\text\{([^}]+)\}/g, '$1');

      return `<span class="font-mono text-sky-800 dark:text-sky-300 font-semibold px-0.5">${prettyMath}</span>`;
    };

    // 1. Render $$...$$ (block math)
    processed = processed.replace(/\$\$([\s\S]*?)\$\$/g, (_, math) => {
      return `<div class="my-2.5 overflow-x-auto py-1 text-center">${renderKatexSafe(math, true)}</div>`;
    });

    // 2. Render $...$ (inline math)
    processed = processed.replace(/\$([^\$\n\r]+?)\$/g, (_, math) => {
      return renderKatexSafe(math, false);
    });

    // 3. Xử lý các biểu thức LaTeX chưa được bọc $...$ (thường gặp khi sao chép từ đề thi thô)
    if (/\\(frac|sqrt|vec|Delta|Phi|Omega|pi|alpha|beta|gamma|lambda|mu|times|cdot|le|ge|neq|approx|rightarrow)/.test(processed)) {
      processed = processed.replace(/(\\(?:frac|sqrt)\{[^}]+\}(?:\{[^}]+\})?)/g, (match) => {
        return renderKatexSafe(match, false);
      });
    }

    // 4. Chuyển đổi xuống dòng thành <br/>
    processed = processed.replace(/\n/g, '<br/>');

    return processed;
  }, [text, katexLoaded]);

  if (inline) {
    return (
      <span 
        className={`math-rendered-content ${className}`}
        dangerouslySetInnerHTML={{ __html: renderedHtml }} 
      />
    );
  }

  return (
    <div 
      className={`math-rendered-content ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }} 
    />
  );
};
