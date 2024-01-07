const express = require('express');
const tasksRouter = require('./routes/tasks');
const indexRouter = require('./routes/index');

const app = express();
app.use(express.json());

app.use('/', indexRouter);
app.use('/tasks', tasksRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
