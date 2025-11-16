export interface ApiResponse {
    artists: Artist[];
}

export interface Artist {
    idArtist: string;
    strArtist: string;
    strArtistStripped: string | null;
    strArtistAlternate: string;
    strLabel: string | null;
    idLabel: string | null;
    intFormedYear: string;
    intBornYear: string;
    intDiedYear: string | null;
    strDisbanded: string | null;
    strStyle: string;
    strGenre: string;
    strMood: string;
    strWebsite: string;
    strFacebook: string;
    strTwitter: string;
    strBiographyEN: string | null;
    strBiographyDE: string | null;
    strBiographyFR: string | null;
    strBiographyCN: string | null;
    strBiographyIT: string | null;
    strBiographyJP: string | null;
    strBiographyRU: string | null;
    strBiographyES: string | null;
    strBiographyPT: string | null;
    strBiographySE: string | null;
    strBiographyNL: string | null;
    strBiographyHU: string | null;
    strBiographyNO: string | null;
    strBiographyIL: string | null;
    strBiographyPL: string | null;
    strGender: string;
    intMembers: string;
    strCountry: string;
    strCountryCode: string;
    strArtistThumb: string | null;
    strArtistLogo: string | null;
    strArtistCutout: string | null;
    strArtistClearart: string | null;
    strArtistWideThumb: string | null;
    strArtistFanart: string | null;
    strArtistFanart2: string | null;
    strArtistFanart3: string | null;
    strArtistFanart4: string | null;
    strArtistBanner: string | null;
    strMusicBrainzID: string;
    strISNIcode: string | null;
    strLastFMChart: string | null;
    intCharted: string;
    strLocked: string;
}
