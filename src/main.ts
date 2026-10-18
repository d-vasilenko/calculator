import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

interface Input {
  a: number;
  op: string;
  b: number;
}

function parseExpression(input: string): Input {
  const [a, op, b] = input.split(' ');
  return {
    a: Number(a),
    op: String(op),
    b: Number(b),
  };
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