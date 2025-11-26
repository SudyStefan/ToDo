import axios from 'axios';
import { ToDoEntry, ToDoEntryDTO, toDTO, fromDTO } from '../../shared/types/ToDoEntry';

class toDoService {
  public getTodos = (): Promise<ToDoEntry[]> => {
    return axios.get("http://localhost:4000/todo")
      .then(res => {
        console.log(res);
        const todos = res.data.map((dto: ToDoEntryDTO) => fromDTO(dto)) as ToDoEntry[]
        console.log(`Fetched ${todos.length} todos`);
        return todos;
      })
      .catch(err => {
        console.error("Error fetching todos:", err);
        throw err;
      });
  };

  public postTodo = (todo: ToDoEntry): Promise<ToDoEntry> => {
    return axios.post("http://localhost:4000/todo", toDTO(todo))
      .then(res => {
        const todo = fromDTO(res.data as ToDoEntryDTO);
        console.log(`Created todo with id ${todo._id}`);
        return todo;
      })
      .catch(err => {
        console.error(`Error creating todo: ${err}`);
        throw err;
      })
  };

  public putTodo = (todo: ToDoEntry): Promise<void> => {
    return axios.put(`http://localhost:4000/todo/${todo._id}`, toDTO(todo))
      .then(res => console.log(`Updated todo: ${res}`))
      .catch(err => {
        console.error(`Error updating todo: ${err}`);
        throw err;
      });
  };
}

export const ToDoService = new toDoService();