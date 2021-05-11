import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';
import { uuid } from 'uuidv4';

@Entity('admin')
class Admin {
    @PrimaryColumn('uuid')
    private id: string;

    @Column()
    private name: string;

    @Column()
    private username: string;

    @Column()
    private password: string;

    @CreateDateColumn()
    private created_at: Date;

    @UpdateDateColumn()
    private update_at: Date;

    @Column()
    private cellphone: string;

    constructor() {
        // Gerando o ID automáticamente quando o objeto
        // instanciando ainda não estiver salvo no banco
        if (!this.id) {
            this.id = uuid();
        }
    }

    // Getters
    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getUsername(): string {
        return this.username;
    }

    public getPassword(): string {
        return this.password;
    }

    public getCellphone(): string {
        return this.cellphone;
    }

    public getCreatedAt(): Date {
        return this.created_at;
    }

    public getUpdatedAt(): Date {
        return this.update_at;
    }

    // Setters
    public setId(id: string): void {
        this.id = id;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setUsername(username: string): void {
        this.username = username;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public setCellphone(cellphone: string): void {
        this.cellphone = cellphone;
    }

    public setCreatedAt(created_at: Date): void {
        this.created_at = created_at;
    }

    public setUpdatedAt(updated_at: Date): void {
        this.update_at = updated_at;
    }
}

export default Admin;
