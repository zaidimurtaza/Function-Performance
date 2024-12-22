import { ExecutionResults } from './ExecutionResults';
import { PerformanceChart } from './PerformanceChart';
import type { CodeRunResponse } from '../types';

interface ResultsSectionProps {
  result: CodeRunResponse | null;
  error: string;
}

export function ResultsSection({ result, error }: ResultsSectionProps) {
  return (
    <div className="space-y-4">
      <div className="bg-gray-800/50 h-full backdrop-blur-sm rounded-lg border border-gray-700/50 p-4">
        <ExecutionResults result={result} error={error} />
        {result && (
          <div className="mt-6">
            <PerformanceChart data={result.execution_time_ms} />
          </div>
        )}
      </div>
    </div>
  );
}