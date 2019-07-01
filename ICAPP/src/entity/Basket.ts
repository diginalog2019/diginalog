import {Entity, Column} from "typeorm";

@Entity()
export class Basket {

    @Column()
    UID: number;

    @Column()
    PID: number;
}