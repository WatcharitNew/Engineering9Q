import { Major } from 'src/entities/user.entity';

export class CreateUserDto {
  userId: string;
  sumScore?: number;
  name: string;
  major: Major;
  scores: number[];
  createdTime?: Date;
}

export class EditUserDto {
  userId?: string;
  helpStudy?: string;
  helpHealth?: string;
  helpOther?: string;
}
