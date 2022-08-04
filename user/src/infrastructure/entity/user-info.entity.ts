import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserInfoEntityType } from '../../domin/type/entity-type/user.entity-type';

@Entity('user_info_tb')
export class UserInfo implements UserInfoEntityType {
  @PrimaryGeneratedColumn('uuid')
  userUUID: string;
}
