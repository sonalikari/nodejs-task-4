const express = require('express');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 3000;

app.use('/', productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
