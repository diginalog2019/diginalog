import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable} from "typeorm";
import {Product} from "./Product"
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    UID : number;

    @Column({
        nullable:false
    })
    admin : boolean;

    @Column({
        length : 20,
        nullable:true
    })
    U_ID : string;

    @Column({
        length : 50,
    })
    U_PW : string;

    @Column({
        length : 50,
        nullable:true
    })
    U_Email : string;

    @Column({
        length : 10,
        nullable:true
    })
    U_Name : string;

    @Column({
        length : 15,
        nullable:true
    })
    U_Tel : string;

    @Column({nullable:true})
    U_Date : Date;

    @Column({
        nullable:true,
        length : 11
    })
    U_Birth : string;

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