import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import Order from '../../../orders/typeorm/entities/Order';
import AssemblerInstallation from './AssemblerInstallation';

@Entity('installation')
class Installation {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  order_id: string;

  @OneToOne(() => Order, (order) => order.installation, { cascade: true })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @OneToMany(
    () => AssemblerInstallation,
    (assembler_installation) => assembler_installation.installation,
    { cascade: true },
  )
  assemblers_installation: AssemblerInstallation[];

  @Column('boolean')
  done: boolean;

  @Column('date')
  start_date: string;

  @Column('date')
  end_date: string;

  @Column('date')
  completion_forecast: string;

  @Column('numeric')
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

export default Installation;
