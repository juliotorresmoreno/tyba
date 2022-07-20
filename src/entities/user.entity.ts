import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn
} from 'typeorm';

const tableName = 'users';

@Entity({
    name: tableName,
    synchronize: true
})
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ default: false })
    verified: boolean;

    @Column({ type: 'varchar', length: 100, default: '', nullable: true })
    name: string;

    @Column({ type: 'varchar', length: 100, default: '', nullable: true })
    last_name: string;

    @Column({ type: 'varchar', length: 300, default: '', nullable: true })
    email: string;

    @Column({ type: 'varchar', length: 255, default: '', nullable: false })
    password: string;

    @Column({ type: 'varchar', length: 1000, default: '', nullable: true })
    photo_url: string;

    @Column({
        type: 'varchar',
        length: 15,
        default: '',
        unique: true
    })
    phone: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    creation_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;

    @DeleteDateColumn({ type: 'timestamptz' })
    deleted_at?: Date;
}

@Entity(tableName, {
    synchronize: false
})
export class Session {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    verified: boolean;

    @Column()
    name: string;

    @Column()
    last_name: string;

    @Column()
    email: string;

    @Column()
    photo_url: string;

    @Column()
    phone: string;

    @Column()
    deleted_at?: Date;
}
