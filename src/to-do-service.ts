// src/server.ts
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

interface ITodo {
  id: number;
  title: string;
  description: string;
}

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let todoItems: ITodo[] = [];

app.get('/all/todo', (req: Request, res: Response<{ title: string; description: string }[]>) => {
  res.json(todoItems);
});

app.post('/todo', (req: Request<{}, {}, { title: string; description: string }>, res: Response<{ title: string; description: string }>) => {
  const { title, description } = req.body;
  const newTodo: ITodo = { id: todoItems.length + 1, title, description };
  todoItems.push(newTodo);
  res.status(201).json({ title, description });
});

app.delete('/todo/:id', (req: Request<{ id: string }>, res: Response<void>) => {
  const id = parseInt(req.params.id);
  todoItems = todoItems.filter(todo => todo.id !== id);
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
