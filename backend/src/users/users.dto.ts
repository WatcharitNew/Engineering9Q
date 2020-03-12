import { Major } from 'src/entities/user.entity';

export class CreateUserDto {
  userId: string;
  sumScore?: number;
  name: string;
  major: Major;
  scores: number[];
  help: string;
  createdTime?: Date;
}
