const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/calculate', (req, res) => {
  const { operation, num1, num2 } = req.body;
  const a = parseFloat(num1);
  const b = parseFloat(num2);

  if (isNaN(a) || isNaN(b)) {
    return res.json({ error: 'Invalid numbers' });
  }

  let result;
  switch (operation) {
    case 'add':
      result = a + b;
      break;
    case 'sub':
      result = a - b;
      break;
    case 'mul':
      result = a * b;
      break;
    case 'div':
      result = b !== 0 ? a / b : 'Cannot divide by zero';
      break;
    default:
      result = 'Invalid operation';
  }

  res.json({ result });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});