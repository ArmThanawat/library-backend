/* eslint-disable prettier/prettier */
import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
// import { Librarian } from '../librarian/entities/librarian.entity';

@Table({
    tableName: 'books',
    timestamps: false,
})
export class Book extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    book_id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    title: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    author: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    genre: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    description: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    isbn: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    })
    available: boolean;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        comment: 'URL or base64 string of the book cover image',
    })
    image: string;
}
