import { Field, ID, InputType, ObjectType, OmitType, PartialType } from '@nestjs/graphql';
import { Book } from 'src/books/entities/book.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Author {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  birth_year: number;

  @Column()
  @Field()
  nationality: string;

  @Column()
  @Field()
  bio: string;

  @OneToMany(() => Book, (book) => book.author)
  @Field(() => [Book])
  books: Book[];

  @Column()
  @Field()
  @CreateDateColumn()
  created_at: Date

  @Column()
  @Field()
  @UpdateDateColumn()
  updated_at: Date
}

@InputType()
export class FindAuthorInput extends PartialType(OmitType(Author, ['books'], InputType)) { }
// export class FindAuthorInput {

//   @Field({ nullable: true })
//   id?: number;

//   @Field({ nullable: true })
//   name?: string;

//   @Field({ nullable: true })
//   birth_year?: number;

//   @Field({ nullable: true })
//   nationality?: string;

//   @Field({ nullable: true })
//   bio?: string;

//   @Field({ nullable: true })
//   created_at?: Date

//   @Field({ nullable: true })
//   updated_at?: Date
// }
