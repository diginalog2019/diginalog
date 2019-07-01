import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Division {
    @PrimaryGeneratedColumn()
    Div_ID: number;

    @Column({
        length: 10
    })
    Div_Name: string;
}