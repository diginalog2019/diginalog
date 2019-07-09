import {Entity, Column, PrimaryGeneratedColumn,ManyToMany,JoinTable,ManyToOne} from "typeorm";
import {Hashtag} from "./Hashtag"
import {User} from "./User"
import {Creator} from "./Creator"
import {Category} from "./Category";
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

    @ManyToMany(type => Hashtag , hashtags => hashtags.HID , {
        cascade : true
    })
    @JoinTable({
        name: 'ProductHashtag'
    })
    hashtags : Hashtag[];

    @ManyToMany(type => User , users => users.UID , {
        cascade : true
    })
    users : User[];

    @ManyToOne(type => Creator, creator => creator.products , {onDelete: 'CASCADE', onUpdate: "CASCADE"})
    creator: Creator;

    @ManyToOne(type => Category, category => category.products , {onDelete: 'CASCADE', onUpdate: "CASCADE"})
    category: Category;
}