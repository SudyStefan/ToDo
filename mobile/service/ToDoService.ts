import axios from 'axios';
import { ToDoEntry, ToDoEntryDTO, toDTO, fromDTO } from '../../shared/types/ToDoEntry';

export const getToDos = (): Promise<ToDoEntry[]> => {
  return axios.get("http://localhost:4000/todo")
    .then(res => res.data.map((dto: ToDoEntryDTO) => fromDTO(dto)) as ToDoEntry[])
    .catch(err => {
      console.error(err);
      throw err;
    });
};

export const postToDo = (todo: ToDoEntry): Promise<ToDoEntry> => {
  return axios.post("http://localhost:4000/todo", toDTO(todo))
    .then(res => fromDTO(res.data as ToDoEntryDTO))
    .catch(err => {
      console.error(err);
      throw err;
    });
};

export const putToDo = (todo: ToDoEntry): Promise<ToDoEntry> => {
  return axios.put(`http://localhost:4000/todo/${todo.id}`, toDTO(todo))
    .then(res => fromDTO(res.data as ToDoEntryDTO))
    .catch(err => {
      console.error(err);
      throw err;
    });
};

export const deleteToDo = (id: number): Promise<void> => {
  return axios.delete(`http://localhost:4000/todo/${id}`)
    .then(() => console.log(`Deleted todo with id ${id}`))
    .catch(err => {
      console.error(err);
      throw err;
    });
};