import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

type Operator = '+' | '-' | '*' | '/';
const OPERATORS: Operator[] = ['+', '-', '*', '/'];

interface Input {
  readonly a: number;
  readonly op: Operator;
  readonly b: number;
}

function parseExpression(input: string): Input {
  const parts = input.trim().split(/\s+/);
  if (parts.length !== 3) {
    throw new Error('Error: invalid input')
  }
  const [a, op, b] = parts;
  const aNum = Number(a);
  const bNum = Number(b);
  if (!OPERATORS.includes(op as Operator)) {
    throw new Error(`Error: unknown operator ${op}`);
  }
  if (!Number.isFinite(aNum) || !Number.isFinite(bNum)) {
    throw new Error('Error: number is NaN!');
  }
  return {
    a: aNum,
    op: op as Operator,
    b: bNum,
  };
}

function calculate(input: Input): number {
  if (Number.isNaN(input.a) || Number.isNaN(input.b)) {
    throw new Error('Error: number is NaN!');
  }
  if (input.op === '/' && input.b === 0) {
    throw new Error('Error: division by zero!');
  }
  if (input.op === '+') return input.a + input.b;
  if (input.op === '-') return input.a - input.b;
  if (input.op === '*') return input.a * input.b;
  if (input.op === '/') return input.a / input.b;
  const _exhaustive: never = input.op;
  throw new Error(`Error: unknown operator ${input.op}`);
}

function main() {
  console.log('Calculator is running. Enter expression (for example "5 + 3") or "exit"')
  const askQuestion = () => {
    rl.question('>', (input: string) => {
      const trimmedInput = input.trim();

      if (trimmedInput.toLowerCase() === 'exit') {
        console.log('Goodbye!');
        rl.close;
        return;
      }
    
      try {
        console.log(parseExpression(trimmedInput));
      } catch (error) {

      }

      askQuestion();
    });
  };

  askQuestion();
}

main();