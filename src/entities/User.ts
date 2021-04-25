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
  readonly id!: UserId;

  @Column({ type: "text", unique: true })
  token!: string;

  @Column({ name: "name" })
  name!: string;

  @Column({ name: "email" })
  email!: string;

  @Column({ name: "avatar_url" })
  avatarUrl?: string;

  @OneToMany(() => Friend, (friend) => friend.user)
  friends?: Friend[];

  @ManyToMany(() => Room)
  @JoinTable()
  rooms?: Room[];
}

export type UserId = string & {
  _UserIdBrand: never;
};
