import { UserEntityType } from '../../domain/type/entity-type/user.entity-type';
import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { stringLength } from '../../domain/utils/data.format';

@Entity('user_tb')
export class User implements UserEntityType {

  @PrimaryGeneratedColumn('uuid')
  userUUID : string;

  @Column({unique : true, length: stringLength.MEDIUM })
  userEmailId : string;

  @Column({length :stringLength.LONG })
  userPassword : string;

  @Column({nullable:true, length :stringLength.LONGLONG })
  userJWTRefreshToken : string;

  @CreateDateColumn()
  lastActivate : Date;

  @Column({default:3})
  accessLevel : number
}