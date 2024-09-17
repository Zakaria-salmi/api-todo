const express = require('express');
const app = express();
 

app.get('/tasks', (req, res) => {
    
});

app.post('/tasks', (req, res) => {
  
});

app.put('/tasks/:id', (req, res) => {
  
});

app.delete('/tasks/:id', (req, res) => {
  
});
 
app.listen(8000, () => {
  console.log(`Server is listening at http://localhost:8000`);
});