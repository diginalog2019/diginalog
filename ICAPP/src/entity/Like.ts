import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Like {
    //@Column()
    //PID: number;

    @Column()
    UID: number;

    @PrimaryGeneratedColumn()
    PID: number;
}