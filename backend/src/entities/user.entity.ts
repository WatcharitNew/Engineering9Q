import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    @Column('varchar', { length: 100 })
    userId: number;

    @Column('integer')
    score: number;

    @Column('varchar', { length: 100 })
    name: string;
}