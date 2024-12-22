export interface CodeRunRequest {
  language: string;
  code: string;
  input_data: string;
  mean: number;
}

export interface CodeRunResponse {
  error: string;
  execution_time_ms: string[];
  output: string;
  success: boolean;
}