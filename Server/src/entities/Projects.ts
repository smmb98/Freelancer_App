import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Freelancers_Projects } from "./Freelancers_Projects";
import { Users } from "./Users";

export enum Status {
  ASSIGNED = "assigned",
  UNASSIGNED = "unassigned",
  COMPLETED = "completed",
  REJECTED = "rejected",
}

@Entity()
export class Projects extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  mobileNumber: string;

  @Column()
  emailAddress: string;

  @Column()
  category: string;

  @Column()
  budget: string;

  @Column()
  deadline: Date;

  @Column({ nullable: true })
  rejectionReason: String;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.UNASSIGNED,
  })
  status: Status;

  @ManyToOne(() => Users, (Users) => Users.publishedProjects)
  projectOwner: Users;

  @OneToMany(
    () => Freelancers_Projects,
    (Freelancers_Projects) => Freelancers_Projects.projects
  )
  requests: Freelancers_Projects[];

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
