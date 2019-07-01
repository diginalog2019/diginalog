import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Creator {

    @PrimaryGeneratedColumn()
    CID: number;

    @Column({
        length: 10
    })
    C_Nickname: string;

    @Column({
        length: 50
    })
    C_Email: string;

    @Column({
        length: 50
    })
    C_Page: string;
}