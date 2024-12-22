import { Timer, AlertCircle } from 'lucide-react';
import type { CodeRunResponse } from '../types';

interface ExecutionResultsProps {
  result: CodeRunResponse | null;
  error: string;
}

export function ExecutionResults({ result, error }: ExecutionResultsProps) {
  if (error) {
    return (
      <div className="rounded-md bg-red-900/50 border border-red-700 p-4">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 mr-2" />
          <div className="text-sm text-red-400">{error}</div>
        </div>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h3 className="text-lg font-medium text-gray-100 flex items-center">
          <Timer className="h-5 w-5 mr-2 text-indigo-400" />
          Execution Results
        </h3>
        <div className="mt-4">
          <p className="text-sm text-gray-400">Output:</p>
          <pre className="mt-1 bg-gray-900 p-3 rounded-md text-gray-300 font-mono overflow-x-auto">
            {result.output || result.error}
          </pre>
        </div>
      </div>
    </div>
  );
}