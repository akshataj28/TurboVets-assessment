import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { Roles } from '../auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tasks')
export class TasksController {
  constructor(private svc: TasksService) {}

  @Get()
  async list(@Req() req: any) { return this.svc.listForUser(req.user); }

  @Post()
  async create(@Body() dto: CreateTaskDto, @Req() req: any) { return this.svc.create(req.user, dto); }

  @Patch(':id')
  @Roles('USER')
  async update(@Param('id') id: string, @Body() dto: UpdateTaskDto, @Req() req: any) {
    return this.svc.update(req.user, id, dto);
  }

  @Delete(':id')
  @Roles('USER')
  async remove(@Param('id') id: string, @Req() req: any) {
    return this.svc.remove(req.user, id);
  }
}
