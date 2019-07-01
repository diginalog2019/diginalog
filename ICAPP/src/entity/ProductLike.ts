import {Entity, Column} from "typeorm";

@Entity()
export class ProductLike {
    @Column()
    PID: number;

    @Column()
    UID: number;

}