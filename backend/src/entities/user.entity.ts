import { Entity, Column, PrimaryColumn } from 'typeorm';

export enum Major {
  cp = 'cp',
  chem = 'chem',
  ne = 'ne',
  me = 'me',
  ee = 'ee',
  ce = 'ce',
  metal = 'metal',
  sv = 'sv',
  env = 'env',
  mining = 'mining',
  water = 'water',
  ie = 'ie',
  adme = 'adme',
  aero = 'aero',
  ice = 'ice',
  nano = 'nano',
  robotic = 'robotic',
  bme = 'bme',
  other = 'other',
}

@Entity()
export class User {
  @PrimaryColumn('varchar', { length: 100 })
  userId: string;

  @Column('integer')
  sumScore: number;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  createdTime: Date;

  @Column('simple-array')
  scores: number[];

  @Column('varchar', { length: 100 })
  major: Major;

  //10'th question
  @Column('text', { nullable: true })
  helpStudy: string;

  @Column('text', { nullable: true })
  helpHealth: string;

  @Column('text',{ nullable: true})
  helpFamily: string;

  @Column('text', { nullable: true })
  helpOther: string;

  //comment (after submit 10 question)
  @Column('text', { nullable: true })
  comment: string;
}
