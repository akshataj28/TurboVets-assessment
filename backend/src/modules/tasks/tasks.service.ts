import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto, UpdateTaskDto } from './dto';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private tasks: Repository<Task>) {}

  async listForUser(user: any) {
    if (user.role === 'ADMIN' || user.role === 'MANAGER') return this.tasks.find();
    return this.tasks.find({ where: { owner: { id: user.id } } });
  }

  async create(user: any, dto: CreateTaskDto) {
    const task = this.tasks.create({ ...dto, owner: { id: user.id } as any });
    return this.tasks.save(task);
  }

  async update(user: any, id: string, dto: UpdateTaskDto) {
    const task = await this.tasks.findOne({ where: { id } });
    if (!task) throw new NotFoundException();
    if (!(user.role === 'ADMIN' || user.role === 'MANAGER' || task.owner.id == user.id)) {
      throw new ForbiddenException();
    }
    Object.assign(task, dto);
    return this.tasks.save(task);
  }

  async remove(user: any, id: string) {
    const task = await this.tasks.findOne({ where: { id } });
    if (!task) throw new NotFoundException();
    if (!(user.role === 'ADMIN' || user.role === 'MANAGER' || task.owner.id == user.id)) {
      throw new ForbiddenException();
    }
    await this.tasks.remove(task);
    return { deleted: true };
  }
}
