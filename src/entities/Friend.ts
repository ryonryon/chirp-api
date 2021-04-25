import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import User, { UserId } from "./User";

@Entity("friends")
export default class Friend {
  @PrimaryGeneratedColumn("uuid", { name: "friend_id" })
  id!: string;

  @ManyToOne(() => User, (user) => user.friends, { cascade: true })
  user!: User | UserId;

  @Column({ name: "friend_user" })
  friendUser!: UserId;
}
