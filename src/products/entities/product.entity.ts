import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-image.entity";

@Entity({ name: 'products'})
export class Product {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column('text', { name: 'title', unique: true })
    title: string;

    @Column('float', { default: 0 })
    price: number;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column('text', { unique: true })
    slug: string;

    @Column('int', { default: 0 })
    stock: number;

    @Column('text', { array: true })
    sizes: string[]

    @Column('text')
    gender: string;

    @Column('text',{array: true, default: []})
    tags: string[]

    @OneToMany(
        ()=> ProductImage, 
        (image) => image.product,
        {cascade: true, eager: true}
    )
    images?:ProductImage[];

    // Método que se ejecuta antes de insertar un registro 
    @BeforeInsert()
    checkSlugInsert() {
        if (!this.slug) {
            this.slug = this.title;
        }

        this.slug = this.slug
            .toLocaleLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '');
    }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.slug
            .toLocaleLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '');
    }

    // @BeforeUpdate()
    // tag
    // images
}
