import { Editor } from '@monaco-editor/react';

interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (value: string | undefined) => void;
}

export function CodeEditor({ language, value, onChange }: CodeEditorProps) {
  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden border border-gray-700 bg-gray-900">
      <Editor
        height="100%"
        defaultLanguage={language.toLowerCase()}
        value={value}
        onChange={onChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          fontFamily: 'JetBrains Mono, monospace',
          fontLigatures: true,
          padding: { top: 16, bottom: 16 },
          scrollbar: {
            vertical: 'visible',
            horizontal: 'visible',
            verticalScrollbarSize: 12,
            horizontalScrollbarSize: 12,
          },
          lineHeight: 1.6,
        }}
      />
    </div>
  );
}