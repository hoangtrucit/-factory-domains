// Libs importing
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from './post.entity';
import { AbstractEntity } from './abstract.entity';

@Entity({ name: 'user' })
export class UserEntity extends AbstractEntity<UserEntity> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', name: 'email' })
  email: string;

  @Column({ type: 'varchar', name: 'username' })
  userName: string;

  @Column({ type: 'date', name: 'dob' })
  dob: Date;

  @Column({ type: 'numeric', name: 'age' })
  age: number;

  @ManyToMany(() => PostEntity, (item) => item.users)
  posts: PostEntity[];
}
