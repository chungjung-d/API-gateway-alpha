import { Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { UserInfoEntityType } from '../../domin/type/entity-type/user-info.entity-type';

@Entity('user_info_tb')
export class UserInfo implements UserInfoEntityType {
  @PrimaryColumn('uuid', { unique: true })
  userUUID: string;
}
