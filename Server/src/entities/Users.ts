import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Freelancers_Projects } from "./Freelancers_Projects";
import { Projects } from "./Projects";


@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  mobile_number: string;

  @Column()
  email_address: string;

  @Column()
  skills: string;

  @Column()
  experience: string;

  @OneToMany(() => Projects, (Projects) => Projects.projectOwner)
  publishedProjects: Projects[];

  @OneToMany(
    () => Freelancers_Projects,
    (Freelancers_Projects) => Freelancers_Projects.freelancer
  )
  projectRequests: Freelancers_Projects[];

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
