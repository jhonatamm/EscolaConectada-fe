export type Escola = {
    id : string,
    nome: string,
    cidadeId: string,
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


