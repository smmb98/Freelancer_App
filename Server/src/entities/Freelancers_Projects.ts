import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Projects } from "./Projects";
import { Users } from "./Users";

export enum Status {
  PENDING = "pending",
  WORKING = "working",
  COMPLETED = "completed",
  VERIFIED = "verified",
  REJECTED = "rejected",
}

@Entity()
export class Freelancers_Projects extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  @Column({ nullable: true })
  rejectionReason: String;

  @ManyToOne(() => Projects, (Projects) => Projects.requests)
  projects: Users;

  @ManyToOne(() => Users, (Users) => Users.publishedProjects)
  freelancer: Users;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updated_at: Date;
}
