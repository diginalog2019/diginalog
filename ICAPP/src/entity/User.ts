import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable} from "typeorm";
import {Product} from "./Product"
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    UID : number;

    // @Column({
    //     length : 20
    // })
    // U_ID : string;
    //
    // @Column({
    //     length : 20
    // })
    // U_PW : string;
    //
    // @Column({
    //     length : 50
    // })
    // U_Email : string;

    @Column({
        length : 10
    })
    U_Name : string;

    // @Column({
    //     length : 10
    // })
    // U_Tel : string;
    //
    // @Column()
    // U_Date : Date;
    //
    // @Column()
    // U_Birth : string;

    @ManyToMany(type => Product , products => products.PID , {
        cascade : true
    })
    @JoinTable({
        name: 'Basket'
    })
    products : Product[];

    @ManyToMany(type => Product , likeProducts => likeProducts.PID , {
        cascade : true
    })
    @JoinTable({
        name: 'Like'
    })
    likeProducts : Product[];
}