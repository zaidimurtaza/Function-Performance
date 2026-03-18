import { CodeEditor } from './CodeEditor';
import { LanguageSelector } from './LanguageSelector';
import { ExecutionControls } from './ExecutionControls';
import type { CodeFile } from '../hooks/useCodeFiles';

interface CodeSectionProps {
  language: string;
  code: string;
  input: string;
  loading: boolean;
  onLanguageChange: (lang: string) => void;
  onCodeChange: (code: string | undefined) => void;
  onInputChange: (value: string) => void;
  onRun: () => void;
  files: CodeFile[];
  activeId: string;
  canDelete: boolean;
  onFileSelect: (id: string) => void;
  onFileAdd: () => void;
  onFileDelete: (id: string) => void;
}

export function CodeSection({
  language,
  code,
  input,
  loading,
  onLanguageChange,
  onCodeChange,
  onInputChange,
  onRun,
  files,
  activeId,
  canDelete,
  onFileSelect,
  onFileAdd,
  onFileDelete,
}: CodeSectionProps) {
  return (
    <div className="space-y-4">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-4">
          <LanguageSelector
            value={language}
            onChange={onLanguageChange}
            files={files}
            activeId={activeId}
            canDelete={canDelete}
            onFileSelect={onFileSelect}
            onFileAdd={onFileAdd}
            onFileDelete={onFileDelete}
          />
          <ExecutionControls
            onRun={onRun}
            loading={loading}
            input={input}
            onInputChange={onInputChange}
          />
        </div>
        <div className="h-[400px] sm:h-[500px] rounded-lg overflow-hidden border border-gray-700/50 shadow-lg">
          <CodeEditor
            language={language}
            value={code}
            onChange={onCodeChange}
          />
        </div>
      </div>
    </div>
  );
}