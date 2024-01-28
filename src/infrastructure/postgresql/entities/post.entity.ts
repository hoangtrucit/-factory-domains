// Libs importing
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { AbstractEntity } from './abstract.entity';

@Entity({ name: 'post' })
export class PostEntity extends AbstractEntity<PostEntity> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', name: 'title' })
  title: string;

  @Column({ type: 'uuid', name: 'created_by' })
  createdBy: string;

  @ManyToMany(() => UserEntity, (item) => item.posts)
  @JoinTable({
    name: 'post_like',
    joinColumn: {
      name: 'post_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: UserEntity[];
}
