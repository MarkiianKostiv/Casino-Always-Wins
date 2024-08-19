import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get()
  findAll() {
    return this.todoService.findAll();
  }
  @Post()
  create(@Body() body: { title: string; body: string }) {
    return this.todoService.create(body.title, body.body);
  }
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() body: { title: string; body: string },
  ) {
    return this.todoService.update(id, body.title, body.body);
  }
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.todoService.delete(id);
  }
}
