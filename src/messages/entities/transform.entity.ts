import { AbstractEntity } from 'src/common/database/abstract.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Message extends AbstractEntity<Message> {
  @Column({ default: 'GPT' })
  to: string;

  @Column()
  from: User;
}
