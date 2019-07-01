import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    PID: number;

    @Column({
        length: 20
    })
    P_Name: string;

    @Column()
    P_Date: Date; //datetime?

    @Column()
    P_Price: number;

    @Column({
        length: 10
    })
    P_Extension: string;

    @Column({
        length: 20
    })
    P_Size: string;

    @Column()
    P_StarPoint: number;

    @Column("text")
    P_DetailIMG: string;

    @Column("text")
    P_TitleIMG: string;

    @Column()
    Cate_ID: number;

    @Column()
    Div_ID: number;

    @Column()
    Sec_ID: number;

    @Column()
    CID: number;
}