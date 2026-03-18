import { Code2,  Trash2 } from 'lucide-react';
import type { CodeFile } from '../hooks/useCodeFiles';

const LANGUAGES = [
  { id: 'python', name: 'Python' },
  { id: 'javascript', name: 'JavaScript' },
];

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  files: CodeFile[];
  activeId: string;
  canDelete: boolean;
  onFileSelect: (id: string) => void;
  onFileAdd: () => void;
  onFileDelete: (id: string) => void;
}

export function LanguageSelector({
  value,
  onChange,
  files,
  activeId,
  canDelete,
  onFileSelect,
  onFileAdd,
  onFileDelete,
}: LanguageSelectorProps) {
  const onFileChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value;
    if (v === '__new__') onFileAdd();
    else onFileSelect(v);
  };

  return (
    <div className="flex items-center space-x-3">
      <Code2 className="h-5 w-5 text-indigo-400" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block rounded-md border-gray-600 bg-gray-800/50 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm transition-colors"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.id} value={lang.id}>
            {lang.name}
          </option>
        ))}
      </select>
      {/* <FileTerminal className="h-5 w-5 text-indigo-400" />
      + */}
      <div className="relative group flex items-center gap-1">
        <select
          value={activeId}
          onChange={onFileChange}
          className="block rounded-md border-gray-600 bg-gray-800/50 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm transition-colors"
        >
          <option value="__new__">New File+</option>
          {files.map((file) => (
            <option key={file.id} value={file.id}>
              {file.name}
            </option>
          ))}
        </select>
        {canDelete && (
          <button
            type="button"
            onClick={() => onFileDelete(activeId)}
            className="p-1.5 rounded text-red-500 hover:bg-red-500/20 transition-colors"
            title="Delete file"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
        <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          Add File
        </span>
      </div>
    </div>
  );
}
