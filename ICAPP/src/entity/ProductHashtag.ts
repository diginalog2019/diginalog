import {Entity, Column,PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class ProductHashtag {
    //@Column()
    //PID: number;

    @Column()
    HID: number;
    @PrimaryGeneratedColumn()
    PID: number;
}