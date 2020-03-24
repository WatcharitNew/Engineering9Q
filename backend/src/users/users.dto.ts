import { Major } from 'src/entities/user.entity';

export class CreateUserDto {
  userId: string;
  sumScore?: number;
  name: string;
  major: Major;
  scores: number[];
  helpStudy?: string;
  helpHealth?: string;
  helpFamily?: string;
  helpOther?: string;
  createdTime?: Date;
  comment?: string;
}
