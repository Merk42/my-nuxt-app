export type LESSONS_RESPONSE = {
    search: {
        lessons: {
            result: RESPONSE_RESULT;
            expires: number
        }
    }
}

export type RESPONSE_RESULT = {
    notices: {
        related_added: number;
        sku_match: number;
        or_switch: number
    },
    merchandizing: string;
    related_searches: string;
    sorted_by: boolean;
    refinables: REFINABLES,
    user_search_depth: {
        key:string;
        value: string;
    }[],
    pagination: {
        total_products: number;
        product_min: number;
        product_max: number;
        current_page: number;
        total_pages: number;
        prev_page: number;
        next_page: number;
    },
    query_time: number;
    results: RESULT[]
}

export type REFINABLE_KEY = 'Styles' | 'Instrument' | 'Skilllevel' | 'Curriculum' | 'Educator' | 'Series'

export type REFINABLES = {
    [key in REFINABLE_KEY]?: {
        values: REFINABLE
    }
}

export type REFINABLE = {
    [key:string]:number
}

export type RESULT = {
    Yotposcore: number;
    Lessonid: number;
    Access: string;
    Code: string;
    Parentid: string;
    Channel: string;
    Curriculum: string;
    Cid: number;
    Styles: string;
    Releasedate: string;
    Popularity: number;
    Educator: string;
    Price: number;
    Image: string;
    Description: string;
    Tftv: string;
    Name: string;
    Url: string;
    Sku: string;
    Ct: string;
    Authorid: number;
    Subtitle: string;
    Instrument: string;
    Series: string;
    Skilllevel: string;
    Sid: string;
    Img: string;
    Yotpocount: number;
    Status: number;
    id: number;
    results_flags: string;
    early_access_date: boolean;
    yotpo: {
        reviews: number;
        score: number;
    },
    Type: string;
    sale?: number;
    new?: number;
    multiEducator?: number;
    soundslice?: number;
    favorite?: number;
    objectID: string;
}