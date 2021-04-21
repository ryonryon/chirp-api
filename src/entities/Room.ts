import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import Chat from "./Chat";
import User from "./User";

@Entity("rooms")
export default class Room {
  @PrimaryGeneratedColumn("uuid", { name: "room_id" })
  id!: string;

  @Column({ name: "name" })
  name!: string;

  @OneToMany(() => Chat, (chat) => chat.room)
  chats?: Room[];

  @ManyToMany(() => User)
  @JoinTable()
  users?: User[];
}
