import { Code2 } from 'lucide-react';

const LANGUAGES = [
  { id: 'python', name: 'Python' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'java', name: 'Java' },
];

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
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
    </div>
  );
}