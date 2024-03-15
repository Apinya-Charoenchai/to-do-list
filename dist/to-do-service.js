"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(body_parser_1.default.json());
let todoItems = [];
app.get('/all/todo', (req, res) => {
    res.json(todoItems);
});
app.post('/todo', (req, res) => {
    const { title, description } = req.body;
    const newTodo = { id: todoItems.length + 1, title, description };
    todoItems.push(newTodo);
    res.status(201).json({ title, description });
});
app.delete('/todo/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todoItems = todoItems.filter(todo => todo.id !== id);
    res.sendStatus(204);
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
