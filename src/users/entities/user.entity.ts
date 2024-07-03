import { AbstractEntity } from 'src/common/database/abstract.entity';
import { USER_ROLE } from 'src/common/enums/user.role.enum';
import { Message } from 'src/messages/entities/message.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends AbstractEntity<User> {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  phone: string;

  @Column({ type: 'enum', enum: USER_ROLE, default: USER_ROLE.USER })
  role: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Message, (mes) => mes.from)
  messages: Message[];
}
