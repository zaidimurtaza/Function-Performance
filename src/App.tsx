import React, { useRef, useEffect } from 'react';
import axios from 'axios';
import { Layout } from './components/Layout';
import { CodeSection } from './components/CodeSection';
import { ResultsSection } from './components/ResultsSection';
import { useCodeFiles } from './hooks/useCodeFiles';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { CodeRunRequest, CodeRunResponse } from './types';

function App() {
  const { files, active, activeId, add, del, switchLang, selectFile, update, byLang } = useCodeFiles();
  const [input, setInput] = useLocalStorage('code-input', '10');
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<CodeRunResponse | null>(null);
  const [error, setError] = React.useState('');
  
  const bottomRef = useRef<HTMLDivElement>(null);

  const runCode = async () => {
    if (!active) return;
    setLoading(true);
    setError('');
    try {
      const payload: CodeRunRequest = {
        language: active.language,
        code: active.code,
        input_data: input,
        mean: 5,
      };
      
      const response = await axios.post('https://murtaza102.pythonanywhere.com/run_code', payload);
      setResult(response.data);
    } catch (err) {
      setError('Failed to run code. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Scroll to the bottom whenever result or error changes
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [result, error]);

  return (
    <Layout>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <CodeSection
          language={active?.language ?? 'python'}
          code={active?.code ?? ''}
          input={input}
          loading={loading}
          onLanguageChange={switchLang}
          onCodeChange={(c) => update({ code: c ?? '' })}
          onInputChange={setInput}
          onRun={runCode}
          files={byLang(active?.language ?? 'python')}
          activeId={activeId}
          canDelete={files.length > 1}
          onFileSelect={selectFile}
          onFileAdd={() => add(active?.language ?? 'python')}
          onFileDelete={del}
        />
        <ResultsSection result={result} error={error} />
      </div>
      {/* Invisible element to mark the bottom of the screen */}
      <div ref={bottomRef} />
    </Layout>
  );
}


export default App;
