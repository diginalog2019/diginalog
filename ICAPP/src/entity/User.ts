import {Entity,Column,PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    UID : number;

    @Column({
        length : 20
    })
    U_ID : string;

    @Column({
        length : 20
    })
    U_PW : string;

    @Column({
        length : 50
    })
    U_Email : string;

    @Column({
        length : 10
    })
    U_Name : string;

    @Column({
        length : 10
    })
    U_Tel : string;

    @Column()
    U_Date : Date;

    @Column()
    U_Birth : string;

}