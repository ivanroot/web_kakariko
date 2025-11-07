/**
 * Calculator Module
 * Módulo de calculadora interactiva
 */

export default {
  name: 'Calculadora',
  description: 'Calculadora simple',
  icon: '🔢',

  init: async function() {
    console.log('Calculator module initialized');
    return {
      display: '0',
      operator: null,
      previousValue: null,
      waitingForOperand: false
    };
  },

  render: async function(container) {
    container.innerHTML = `
      <div class="flex items-center justify-center min-h-full">
        <div class="card w-96 bg-base-200 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">🔢 Calculadora</h2>

            <!-- Display -->
            <div class="bg-base-300 p-4 rounded-lg mb-4">
              <div id="calc-display" class="text-right text-4xl font-mono">0</div>
            </div>

            <!-- Buttons -->
            <div class="grid grid-cols-4 gap-2">
              <button class="btn btn-secondary calc-btn" data-action="clear">C</button>
              <button class="btn btn-secondary calc-btn" data-action="sign">+/-</button>
              <button class="btn btn-secondary calc-btn" data-action="percent">%</button>
              <button class="btn btn-primary calc-btn" data-action="divide">÷</button>

              <button class="btn calc-btn" data-digit="7">7</button>
              <button class="btn calc-btn" data-digit="8">8</button>
              <button class="btn calc-btn" data-digit="9">9</button>
              <button class="btn btn-primary calc-btn" data-action="multiply">×</button>

              <button class="btn calc-btn" data-digit="4">4</button>
              <button class="btn calc-btn" data-digit="5">5</button>
              <button class="btn calc-btn" data-digit="6">6</button>
              <button class="btn btn-primary calc-btn" data-action="subtract">-</button>

              <button class="btn calc-btn" data-digit="1">1</button>
              <button class="btn calc-btn" data-digit="2">2</button>
              <button class="btn calc-btn" data-digit="3">3</button>
              <button class="btn btn-primary calc-btn" data-action="add">+</button>

              <button class="btn calc-btn col-span-2" data-digit="0">0</button>
              <button class="btn calc-btn" data-action="decimal">.</button>
              <button class="btn btn-accent calc-btn" data-action="equals">=</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Calculator logic
    let display = '0';
    let operator = null;
    let previousValue = null;
    let waitingForOperand = false;

    const displayElement = container.querySelector('#calc-display');

    function updateDisplay() {
      displayElement.textContent = display;
    }

    function inputDigit(digit) {
      if (waitingForOperand) {
        display = String(digit);
        waitingForOperand = false;
      } else {
        display = display === '0' ? String(digit) : display + digit;
      }
      updateDisplay();
    }

    function inputDecimal() {
      if (waitingForOperand) {
        display = '0.';
        waitingForOperand = false;
      } else if (display.indexOf('.') === -1) {
        display += '.';
      }
      updateDisplay();
    }

    function clear() {
      display = '0';
      operator = null;
      previousValue = null;
      waitingForOperand = false;
      updateDisplay();
    }

    function performOperation(nextOperator) {
      const inputValue = parseFloat(display);

      if (previousValue === null) {
        previousValue = inputValue;
      } else if (operator) {
        const result = calculate(previousValue, inputValue, operator);
        display = String(result);
        previousValue = result;
      }

      waitingForOperand = true;
      operator = nextOperator;
      updateDisplay();
    }

    function calculate(left, right, op) {
      switch (op) {
        case 'add': return left + right;
        case 'subtract': return left - right;
        case 'multiply': return left * right;
        case 'divide': return left / right;
        default: return right;
      }
    }

    // Event listeners
    container.querySelectorAll('.calc-btn').forEach(button => {
      button.addEventListener('click', () => {
        const digit = button.getAttribute('data-digit');
        const action = button.getAttribute('data-action');

        if (digit !== null) {
          inputDigit(parseInt(digit));
        } else if (action === 'decimal') {
          inputDecimal();
        } else if (action === 'clear') {
          clear();
        } else if (action === 'equals') {
          performOperation(null);
          operator = null;
          previousValue = null;
        } else if (action === 'sign') {
          display = String(parseFloat(display) * -1);
          updateDisplay();
        } else if (action === 'percent') {
          display = String(parseFloat(display) / 100);
          updateDisplay();
        } else {
          performOperation(action);
        }
      });
    });
  },

  destroy: function(instance) {
    console.log('Calculator module destroyed');
  }
};
