import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn} from "typeorm";
import {Product} from "./Product"
@Entity()
export class File {
    @PrimaryGeneratedColumn()
    FID: number;

    @Column({
        length: 20
    })
    F_Name: string;

    @Column({
        length: 15,
        nullable:true
    })
    F_Extension: string;

    @Column({
        nullable:true
    })
    F_Type: number;


    @ManyToOne(type => Product, product => product.files , {onDelete: 'CASCADE', onUpdate: "CASCADE"})
    product: Product;

}
