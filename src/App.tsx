import React, { useRef, useEffect } from 'react';
import axios from 'axios';
import { Layout } from './components/Layout';
import { CodeSection } from './components/CodeSection';
import { ResultsSection } from './components/ResultsSection';
import { CODE_EXAMPLES } from './constants/codeExamples';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { CodeRunRequest, CodeRunResponse } from './types';

function App() {
  const [language, setLanguage] = useLocalStorage('code-language', 'python');
  const [code, setCode] = useLocalStorage('code-content', CODE_EXAMPLES.python);
  const [input, setInput] = useLocalStorage('code-input', '10');
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<CodeRunResponse | null>(null);
  const [error, setError] = React.useState('');
  
  // Ref for the bottom of the screen
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    setCode(CODE_EXAMPLES[newLanguage as keyof typeof CODE_EXAMPLES]);
  };

  const runCode = async () => {
    setLoading(true);
    setError('');
    try {
      const payload: CodeRunRequest = {
        language,
        code,
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
          language={language}
          code={code}
          input={input}
          loading={loading}
          onLanguageChange={handleLanguageChange}
          onCodeChange={(value) => setCode(value || '')}
          onInputChange={setInput}
          onRun={runCode}
        />
        <ResultsSection result={result} error={error} />
      </div>
      {/* Invisible element to mark the bottom of the screen */}
      <div ref={bottomRef} />
    </Layout>
  );
}

export default App;
