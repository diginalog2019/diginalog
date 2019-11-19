import {Entity, Column, PrimaryGeneratedColumn, ManyToMany,JoinTable} from "typeorm";
import {Product} from "./Product"
@Entity()
export class Hashtag {
    @PrimaryGeneratedColumn()
    HID: number;

    @Column({
        length: 10
    })
    H_Name: string;

    @ManyToMany(type => Product , products => products.PID ,  {
        cascade : true
    })
    @JoinTable({
        name: 'ProductHashtag'
    })
    products : Product[];
}