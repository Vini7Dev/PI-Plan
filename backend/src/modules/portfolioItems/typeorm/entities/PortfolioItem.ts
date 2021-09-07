import {
  Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('portfolio_item')
class PortfolioItem {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  image_reference: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  constructor() {
    // Gerando o ID automáticamente se o objeto
    // instanciando ainda não estiver salvo no banco
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export default PortfolioItem;
