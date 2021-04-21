import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import Friend from "./Friend";
import Room from "./Room";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid", { name: "user_id" })
  id!: string;

  @Column({ name: "name" })
  name!: string;

  @Column({ name: "avatar_url" })
  avatarUrl?: string;

  @OneToMany(() => Friend, (friend) => friend.user)
  friends?: Friend[];

  @ManyToMany(() => Room)
  @JoinTable()
  rooms?: Room[];
}
