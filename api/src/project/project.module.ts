import { Module } from '@nestjs/common';

import { drizzleProvider } from '../drizzle/drizzle.provider';
import { ProjectRepository } from './project.repository';

@Module({
  providers: [drizzleProvider, ProjectRepository],
  exports: [ProjectRepository],
})
export class ProjectModule {}
