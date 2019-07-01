import {Entity, Column,PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Basket {
    @PrimaryGeneratedColumn()
    PID: number;

    @Column()
    UID: number;

    //@Column()
    //PID: number;
}