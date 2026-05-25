async function calculate(operation) {
  const num1 = document.getElementById('num1').value;
  const num2 = document.getElementById('num2').value;
  const resultDiv = document.getElementById('result');
  
  const operationNames = {
    add: 'Addition',
    sub: 'Subtraction', 
    mul: 'Multiplication',
    div: 'Division'
  };

  try {
    const response = await fetch('/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ operation, num1, num2 })
    });
    
    const data = await response.json();
    
    if (data.error) {
      resultDiv.textContent = `Error: ${data.error}`;
      resultDiv.classList.remove('success');
    } else {
      resultDiv.textContent = `${operationNames[operation]} Result: ${data.result}`;
      resultDiv.classList.add('success');
    }
  } catch (error) {
    resultDiv.textContent = 'Error connecting to server';
    resultDiv.classList.remove('success');
  }
}