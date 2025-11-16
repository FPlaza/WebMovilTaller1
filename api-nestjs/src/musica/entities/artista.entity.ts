import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Artist {
    @PrimaryColumn()
    idArtist: string;

    @Column()
    strArtist: string;

    @Column({ nullable: true })
    strArtistThumb: string;

    @Column({ nullable: true })
    strCountry: string;

    @Column({ nullable: true })
    strGender: string;

}
