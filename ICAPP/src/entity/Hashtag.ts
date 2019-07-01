import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Hashtag {
    @PrimaryGeneratedColumn()
    HID: number;

    @Column({
        length: 10
    })
    H_Name: string;
}