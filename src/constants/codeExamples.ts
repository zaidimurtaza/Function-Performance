export const CODE_EXAMPLES = {
  python: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)
input_value = int(input())
result = fibonacci(input_value)
print(result)`,
  
  javascript: `function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
const input = require('fs').readFileSync(0, 'utf-8').trim();
const result = fibonacci(input);
console.log(result);`,
  
  java: `public class Main {
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    public static void main(String[] args) {
        java.util.Scanner scanner = new java.util.Scanner(System.in);
        int n = scanner.nextInt();
        System.out.println(fibonacci(n));
    }
}`
};