import { useState, useEffect } from 'react';
import { CODE_EXAMPLES } from '../constants/codeExamples';

export interface CodeFile {
  id: string;
  name: string;
  code: string;
  language: string;
}

const KEY = 'code-files';
const ACTIVE_KEY = 'code-active-file';

function uid() {
  return `file-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function load(): CodeFile[] {
  try {
    const s = localStorage.getItem(KEY);
    if (s) {
      const p = JSON.parse(s);
      if (Array.isArray(p) && p.length) return p;
    }
    const code = localStorage.getItem('code-content');
    const lang = localStorage.getItem('code-language');
    if (code != null && lang != null) {
      return [{ id: uid(), name: 'Untitled 1', code: JSON.parse(code), language: JSON.parse(lang) }];
    }
  } catch (e) {
    console.error(e);
    }
  return [{ id: uid(), name: 'Untitled 1', code: CODE_EXAMPLES.python, language: 'python' }];
}

export function useCodeFiles() {
  const [files, setFiles] = useState(load);
  const [activeId, setActiveId] = useState(() => {
    const s = localStorage.getItem(ACTIVE_KEY);
    const f = load();
    return (s && f.some((x) => x.id === s)) ? s : f[0]?.id ?? '';
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(files));
  }, [files]);

  useEffect(() => {
    if (files.some((f) => f.id === activeId)) localStorage.setItem(ACTIVE_KEY, activeId);
  }, [activeId, files]);

  const active = files.find((f) => f.id === activeId) ?? files[0];

  const add = (lang: string) => {
    const sameLang = files.filter((f) => f.language === lang);
    const n = { id: uid(), name: `Untitled ${sameLang.length + 1}`, code: '', language: lang };
    setFiles((p) => [...p, n]);
    setActiveId(n.id);
  };

  const switchLang = (lang: string) => {
    const first = files.find((f) => f.language === lang);
    if (first) setActiveId(first.id);
    else add(lang);
  };

  const del = (id: string) => {
    if (files.length <= 1) return;
    setFiles((p) => {
      const next = p.filter((f) => f.id !== id);
      if (activeId === id) {
        const idx = p.findIndex((f) => f.id === id);
        const sameLang = next.filter((f) => f.language === p[idx]?.language);
        const fallback = sameLang[0] ?? next[0];
        setActiveId(fallback.id);
      }
      return next;
    });
  };

  const update = (u: Partial<Pick<CodeFile, 'code'>>) => {
    if (!activeId) return;
    setFiles((p) => p.map((f) => (f.id === activeId ? { ...f, ...u } : f)));
  };

  const byLang = (lang: string) => files.filter((f) => f.language === lang);

  return { files, active, activeId, add, del, switchLang, selectFile: setActiveId, update, byLang };
}
