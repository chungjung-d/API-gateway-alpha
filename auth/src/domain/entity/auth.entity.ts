import { AuthEntityType } from '../type/entity-type/auth.entity-type';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { stringLength } from '../utils/data.format';

@Entity('auth_tb')
export class Auth implements AuthEntityType {

  @PrimaryColumn('uuid')
  userUUID : string;

  @Column({unique : true, length: stringLength.MEDIUM })
  userEmailId : string;

  @Column({length :stringLength.LONG })
  userPassword : string;

  @Column({length :stringLength.LONGLONG })
  userJWTRefreshToken : string;

  @Column({type :'timestamptz', nullable:true })
  lastActivate : string;

  @Column({default:3})
  accessLevel : number
}