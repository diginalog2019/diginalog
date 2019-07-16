import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import {Product} from "./Product";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    Cate_ID: number;

    @Column({
        length: 50
    })
    Cate_Name: string;

    @Column()
    depth: number;

    @Column()
    upper_cate_ID: number;

    @OneToMany(type => Product, products => products.category, {
        cascade : true
    })
    products: Product[];
}