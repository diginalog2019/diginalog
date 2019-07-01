import {Entity,Column,PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Section{
    @PrimaryGeneratedColumn()
    Sec_ID : number;

    @Column({
        length : 10
    })
    Sec_Name : string;
}