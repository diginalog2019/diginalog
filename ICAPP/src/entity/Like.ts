import {Entity, Column} from "typeorm";

@Entity()
export class Like {
    @Column()
    PID: number;

    @Column()
    UID: number;

}