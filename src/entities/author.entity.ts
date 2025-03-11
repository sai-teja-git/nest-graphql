import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Book } from "./book.entity";

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    birth_year: number;

    @Column()
    nationality: string;

    @Column()
    bio: string;

    @OneToMany(() => Book, (book) => book.author)
    books: Book[];
}
