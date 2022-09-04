import {instance} from './instance';

export type LinkType = {
    counter: number
    id: number
    short: string
    target: string
}

export type ShortSortType = 'asc_short' | 'desc_short'
export type CounterSortType = 'asc_counter' | 'desc_counter'
export type TargetSortType = 'asc_target' | 'desc_target'
type SortConfigType = [ShortSortType | null, CounterSortType | null, TargetSortType | null]

export type GetParamsType = {
    offset: number
    limit: number
    sortConfig?: SortConfigType
}

export type SqueezeParamsType = {
    link: string
}

export type SqueezeResponseType = {
    id: number
    short: string
    target: string
    counter: number
}

export const linksAPI = {
    getLinks(params: GetParamsType) {
        if (params.sortConfig) {
            const sortQueryArr: Array<string> = []
            params.sortConfig.forEach((item) => {
                if(item) sortQueryArr.push(`&order=${item}`)
            })
            return instance.get<LinkType[]>(`statistics?offset=${params.offset}&limit=${params.limit}${sortQueryArr.join('')}`)
        }
        return instance.get<LinkType[]>(`statistics?offset=${params.offset}&limit=${params.limit}`)
    },

    squeezeLink(params: SqueezeParamsType) {
        return instance.post<SqueezeResponseType>(`squeeze?link=${params.link}`, null)
    }
}