import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

console.log('🚀 Đang chạy build cho GitHub Pages & Vercel...');
execSync('npm run build', { cwd: rootDir, stdio: 'inherit' });

console.log('📦 Đang đồng bộ bản build lên nhánh gh-pages...');
const distGitDir = path.resolve(distDir, '.git');
if (fs.existsSync(distGitDir)) {
  fs.rmSync(distGitDir, { recursive: true, force: true });
}

execSync('git init', { cwd: distDir, stdio: 'pipe' });
execSync('git checkout -B gh-pages', { cwd: distDir, stdio: 'pipe' });
execSync('git add -A', { cwd: distDir, stdio: 'pipe' });
execSync('git commit -m "deploy: update live web build [skip ci]"', { cwd: distDir, stdio: 'pipe' });
execSync('git remote add origin https://github.com/quochuytran065-bot/gaylolgbt.git', { cwd: distDir, stdio: 'pipe' });
execSync('git push -u origin gh-pages --force', { cwd: distDir, stdio: 'inherit' });

// Cleanup
if (fs.existsSync(distGitDir)) {
  fs.rmSync(distGitDir, { recursive: true, force: true });
}

console.log('✅ Đã deploy thành công lên GitHub Pages: https://quochuytran065-bot.github.io/gaylolgbt/');
