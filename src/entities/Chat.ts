import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import Room from "./Room";
import User from "./User";

@Entity("chats")
export default class Chat {
  @PrimaryGeneratedColumn("uuid", { name: "chat_id" })
  id!: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp without time zone" })
  createdAt!: Date;

  @Column({ name: "message" })
  message!: string;

  @ManyToOne(() => Room, (room) => room.chats, { cascade: true })
  room!: Room;

  @ManyToOne(() => User)
  user?: User;
}
