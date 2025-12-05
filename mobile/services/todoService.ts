import axios from 'axios';
import { Todo, TodoDTO, TodoStatus, TodoType } from '../types/todo';

class TodoService {
  private fromDTO = (dto: TodoDTO): Todo => {
    return {
      ...dto,
      status: dto.status as TodoStatus,
      type: dto.type as TodoType,
      creationDate: new Date(dto.creationDate),
      lastChecked: dto.lastChecked ? new Date(dto.lastChecked) : undefined,
    }
  };

  private toDTO = (entry: Todo): TodoDTO => {
    return {
      ...entry,
      creationDate: entry.creationDate.toISOString(),
      lastChecked: entry.lastChecked ? entry.lastChecked.toISOString() : undefined,
    }
  };

  public fetchTodos = (): Promise<Todo[]> => {
    return axios.get("http://localhost:4000/todo")
      .then(res => {
        const todos = res.data.map((dto: TodoDTO) => this.fromDTO(dto)) as Todo[]
        console.info(`Fetched ${todos.length} todos`);
        return todos;
      })
      .catch(err => {
        console.error("Error fetching todos:", err);
        throw err;
      });
  };

  public postTodo = (todo: Todo): Promise<Todo> => {
    return axios.post("http://localhost:4000/todo", this.toDTO(todo))
      .then(res => {
        const todo = this.fromDTO(res.data as TodoDTO);
        console.info(`Created todo with id ${todo.id}`);
        return todo;
      })
      .catch(err => {
        console.error(`Error creating todo: ${err}`);
        throw err;
      })
  };

  public putTodo = (todo: Todo): Promise<void> => {
    return axios.put(`http://localhost:4000/todo/${todo.id}`, this.toDTO(todo))
      .then(res => console.info(`Updated todo: ${res}`))
      .catch(err => {
        console.error(`Error updating todo: ${err}`);
        throw err;
      });
  };
}

export const todoService = new TodoService();