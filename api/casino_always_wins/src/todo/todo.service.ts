import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  findAll() {
    return this.todoRepository.find();
  }
  create(title: string, body: string) {
    const todo = new Todo();
    (todo.title = title), (todo.body = body);
    return this.todoRepository.save(todo);
  }
  async update(id: number, title: string, body: string) {
    const todo = await this.todoRepository.findOne({ where: { id: id } });
    if (todo) {
      (todo.title = title), (todo.body = body);
      return this.todoRepository.save(todo);
    }
    return null;
  }
  async delete(id: number) {
    const todo = await this.todoRepository.findOne({ where: { id: id } });
    if (todo) {
      return this.todoRepository.delete(todo);
    }
    return null;
  }
}
