import {Entity, Column, PrimaryGeneratedColumn,OneToMany} from "typeorm";
import {Product} from "./Product"
@Entity()
export class Creator {

    @PrimaryGeneratedColumn()
    CID: number;

    @Column({
        length:10
    })
    C_ID:string;

    @Column({
        length: 10
    })
    C_Nickname: string;

    @Column({
        length: 50,
        nullable:true
    })
    C_Email: string;

    @Column({
        length: 50,
        nullable:true
    })
    C_Page: string;

    @OneToMany(type => Product, products => products.creator)
    products: Product[];
}
