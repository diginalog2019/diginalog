import {Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class UserGroup {

    @PrimaryGeneratedColumn()
    GID: number;

}