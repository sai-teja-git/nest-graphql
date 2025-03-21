import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Author } from 'src/authors/entities/author.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Book {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  published_year: number;

  @Column()
  @Field()
  genre: string;

  @Column({ type: "real" })
  @Field()
  rating: number

  @ManyToOne(() => Author, (author) => author.books)
  @JoinColumn({ name: "author_id" })
  @Field(() => Author)
  author: Author;

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
class RatingComparisonInput {
  @Field(() => Number, { nullable: true })
  gt?: number;

  @Field(() => Number, { nullable: true })
  lt?: number;

  @Field(() => Number, { nullable: true })
  eq?: number;

  @Field(() => Number, { nullable: true })
  gte?: number;

  @Field(() => Number, { nullable: true })
  lte?: number;
}

@InputType()
export class FindBookInput {
  @Field({ nullable: true })
  id?: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  published_year?: number;

  @Field({ nullable: true })
  genre?: string;

  @Field({ nullable: true })
  rating?: RatingComparisonInput;

  @Field({ nullable: true })
  created_at?: Date

  @Field({ nullable: true })
  updated_at?: Date
}