---
name: react-performance-optimizer
description: "Optimize React/Vite/TypeScript web app performance. Use when profiling, improving load speed, reducing bundle size, or improving rendering performance."
---

# React Performance Optimizer for EduViet

## Use this skill when
- Reducing bundle size or JavaScript payload
- Improving component re-render performance
- Lazy loading routes or components
- Optimizing Vite build configuration
- Fixing slow list rendering or heavy computations

## Do not use this skill when
- The task is a UI/design change unrelated to performance
- The project uses Next.js (different optimizations apply)

## Instructions

1. **Audit bundle size**: Check `vite build --report` for large chunks
2. **Lazy load routes**: Use `React.lazy()` + `Suspense` for tab components
3. **Memoize heavy computations**: Use `useMemo` for filtered/sorted lists
4. **Avoid unnecessary re-renders**: Use `React.memo` on pure components
5. **Optimize images**: Use WebP, add `loading="lazy"` on below-fold images
6. **Split code**: Dynamic imports for large dependencies

## EduViet-Specific Optimizations

### Lazy load tab views
```tsx
const DocumentList = React.lazy(() => import('./components/DocumentList'));
const ExamView = React.lazy(() => import('./components/ExamView'));
```

### Memoize exam/document filtering
```tsx
const filteredDocs = useMemo(() =>
  documents.filter(d => subject === 'Tất cả môn' || d.subject === subject),
  [documents, subject]
);
```

### Vite chunk splitting
```ts
// vite.config.ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom'],
        icons: ['lucide-react'],
      }
    }
  }
}
```
