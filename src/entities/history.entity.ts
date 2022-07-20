import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn
} from 'typeorm';

const tableName = 'history';

@Entity({
    name: tableName,
    synchronize: true
})
export class History {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 100, default: '', nullable: true })
    method: string;

    @Column({ type: 'varchar', length: 5000, default: '', nullable: true })
    url: string;

    @Column({ type: 'varchar', length: 100, default: '', nullable: true })
    email?: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    creation_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;

    @DeleteDateColumn({ type: 'timestamptz' })
    deleted_at?: Date;
}
