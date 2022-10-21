import { Escola } from "./Escola"

export type Filter = {
    escolaIds : string[],
    anos: string[],
    escolas: Escola[],
    materiaCods: number[],
    seriesIds: number[],
    exibirBy: string,
    exibindo: string,
    mapString: string,
    
}