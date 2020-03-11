import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryColumn('varchar', { length: 100 })
    userId: string;

    @Column('integer')
    score: number;

    @Column('varchar', { length: 100 })
    name: string;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    createdTime: Date;
}