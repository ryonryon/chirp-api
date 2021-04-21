import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import User from "./User";

@Entity("friends")
export default class Friend {
  @PrimaryGeneratedColumn("uuid", { name: "friend_id" })
  id!: string;

  @ManyToOne(() => User, (user) => user.friends, { cascade: true })
  user!: User;
}
