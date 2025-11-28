import axios from 'axios';
import { TodoItem, TodoEntryDTO, TodoStatus, TodoType } from '../models/todoItem';

class todoService {

  private fromDTO = (dto: TodoEntryDTO): TodoItem => {
    return {
      ...dto,
      status: dto.status as TodoStatus,
      type: dto.type as TodoType,
      creationDate: new Date(dto.creationDate),
      lastChecked: dto.lastChecked ? new Date(dto.lastChecked) : undefined,
    }
  };

  private toDTO = (entry: TodoItem): TodoEntryDTO => {
    return {
      ...entry,
      creationDate: entry.creationDate.toISOString(),
      lastChecked: entry.lastChecked ? entry.lastChecked.toISOString() : undefined,
    }
  };


  public getTodos = (): Promise<TodoItem[]> => {
    return axios.get("http://localhost:4000/todo")
      .then(res => {
        console.log(res);
        const todos = res.data.map((dto: TodoEntryDTO) => this.fromDTO(dto)) as TodoItem[]
        console.log(`Fetched ${todos.length} todos`);
        return todos;
      })
      .catch(err => {
        console.error("Error fetching todos:", err);
        throw err;
      });
  };

  public postTodo = (todo: TodoItem): Promise<TodoItem> => {
    return axios.post("http://localhost:4000/todo", this.toDTO(todo))
      .then(res => {
        const todo = this.fromDTO(res.data as TodoEntryDTO);
        console.log(`Created todo with id ${todo.id}`);
        return todo;
      })
      .catch(err => {
        console.error(`Error creating todo: ${err}`);
        throw err;
      })
  };

  public putTodo = (todo: TodoItem): Promise<void> => {
    return axios.put(`http://localhost:4000/todo/${todo.id}`, this.toDTO(todo))
      .then(res => console.log(`Updated todo: ${res}`))
      .catch(err => {
        console.error(`Error updating todo: ${err}`);
        throw err;
      });
  };
}

export const TodoService = new todoService();