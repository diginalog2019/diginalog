import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    Cate_ID: number;

    @Column({
        length: 10
    })
    Cate_Name: string;

}