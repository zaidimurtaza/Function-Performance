import { Play, Timer } from 'lucide-react';

interface ExecutionControlsProps {
  onRun: () => void;
  loading: boolean;
  input: string;
  onInputChange: (value: string) => void;
}

export function ExecutionControls({
  onRun,
  loading,
  input,
  onInputChange,
}: ExecutionControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
      <div className="relative w-full sm:w-32">
        <input
          type="text"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          className="w-full rounded-md border-gray-600 bg-gray-800/50 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm pl-8"
          placeholder="Input..."
        />
        {/* <h1 className="absolute left-13 top-0 h-4 w-4 text-gray-400" >INP</h1> */}
        <Timer className="absolute left-2.5 top-1 h-4 w-4 text-gray-400" />
      </div>
      <button
        onClick={onRun}
        disabled={loading}
        className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 focus:ring-offset-gray-900 transition-colors"
      >
        {loading ? (
          'Running...'
        ) : (
          <>
            <Play className="h-4 w-4 mr-2" />
            Run Code
          </>
        )}
      </button>
    </div>
  );
}