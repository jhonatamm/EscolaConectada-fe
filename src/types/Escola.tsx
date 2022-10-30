export type Escola = {
    id : string,
    nome: string,
    cidadeId: string,
    cidadeName?: string,
    generalMetrics?: GeneralMetrics
}

export type EscolaMetrics = {
    mediaNota : number,
    mediapresenca: number,
    mediaAvaliacao: number
}
export type GeneralMetrics = {
    [key: string]: EscolaMetrics
}


