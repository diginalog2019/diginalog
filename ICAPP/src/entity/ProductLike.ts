import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class ProductLike {
    //@Column()
    //PID: number;

    @Column()
    UID: number;
    @PrimaryGeneratedColumn()
    PID: number;
}