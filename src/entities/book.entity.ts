import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Author } from "./author.entity";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    published_year: number;

    @Column()
    genre: string;

    @Column()
    rating: number

    @ManyToOne(() => Author, (author) => author.books)
    @JoinColumn({ name: "author_id" })
    author: Author;
}
