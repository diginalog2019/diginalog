import {Entity, Column} from "typeorm";

@Entity()
export class ProductHashtag {
    @Column()
    PID: number;

    @Column()
    HID: number;

}