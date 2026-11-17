import { describe, it, expect } from 'vitest';
import { markdownToHtml } from 'satteri';
import { safeContent } from '../src/lib/remark-safe-content.mjs';

const run = (md, file = 'src/content/posts/x/en.md') =>
  markdownToHtml(md, { mdastPlugins: [safeContent], fileURL: new URL(`file:///repo/${file}`) }).html;

describe('safeContent plugin', () => {
  it('allows ordinary markdown and safe link schemes', () => {
    expect(() =>
      run('# T\n\n[a](https://x.com) [b](http://x.com) [c](mailto:a@b.co) [d](/blog/en/) [e](./f) [f](#top)\n\n![i](./img.png)'),
    ).not.toThrow();
  });
  it('rejects raw html blocks and inline html naming the file', () => {
    expect(() => run('<script>alert(1)</script>')).toThrow(/x\/en\.md.*html/i);
    expect(() => run('text <img src=x onerror=alert(1)> more')).toThrow(/html/i);
    expect(() => run('<iframe src="https://evil"></iframe>')).toThrow(/html/i);
  });
  it('rejects unsafe link, image and definition urls', () => {
    expect(() => run('[x](javascript:alert(1))')).toThrow(/javascript:/);
    expect(() => run('![x](data:text/html;base64,AAAA)')).toThrow(/data:/);
    expect(() => run('[x][r]\n\n[r]: vbscript:foo')).toThrow(/vbscript:/);
  });
});
