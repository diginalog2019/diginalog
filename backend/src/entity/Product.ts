import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn} from "typeorm";
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

    @Column({nullable:true})
    State: number;

    @Column({nullable:true})
    P_Date: Date;

    @Column({nullable:true})
    P_Price: number;

    @Column({
        length: 10,
        nullable:true
    })
    P_Extension: string;

    @Column({
        length: 20,
        nullable:true
    })
    P_Size: string;

    @Column({nullable:true})
    P_StarPoint: number;

    @Column({nullable:true})
    P_DetailIMG: number;

    @Column({nullable:true})
    P_TitleIMG: number;

    @Column({nullable:true})
    P_File: number;

    @Column({nullable:true})
    categoryCateID: number;

    @Column({nullable:true})
    creatorCID: number;

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
