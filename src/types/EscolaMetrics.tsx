export type EscolaMetrics={
    [key: string]: string | any | undefined,
    id:string,
    escolaId: string,
    escolaName: string,
    materiaDescription: string,
    materiaCod: number,
    ano: number,
    bimestreName: string,
    bimestreCod: number,
    anoBimestre: string,
    mpresenca: number,
    mnota: number,
    mavaliacao: number,
    materiaEscolaName: string

}

export type BimestreMetrics={
    [key: string]: string | any | undefined,
    id:string,
    materiaId: string,
    escolaId: string,
    escolaName: string,
    materiaDescription: string,
    materiaCod: number,
    salaId: string,
    ano: number,
    bimestreName: string,
    bimestreCod: number,
    anoBimestre: string,
    mpresenca: number,
    mnota: number,
    mavaliacao: number,
    materiaSerieEscolaName: string
}


export type DataMetrics = {
     x:string,
     y:number 
}