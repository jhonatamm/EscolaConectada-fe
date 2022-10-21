import { ApexOptions } from "apexcharts";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Loading from "react-loading";
import { Context } from "../../../context/Context";
import { BASE_URL } from "../../../services/api";
import { BimestreMetrics, DataMetrics, EscolaMetrics } from "../../../types/EscolaMetrics";
import { Filter } from "../../../types/Filters";
import { capitalizeFirstLetter } from "../../../util/StringUtil";
import './GraphLine.scss'

interface GraphLineProps{
    title: string
}
const GraphLine = () => {
    const [seriesState, setSeriesState] = useState<ApexAxisChartSeries>([]);
    const [escolasMetricsList, setEscolasMetricsList]=  useState<EscolaMetrics[]>([] as EscolaMetrics[]);
    const [bimestreMetricsList, setBimestreMetricsList]=  useState<BimestreMetrics[]>([] as BimestreMetrics[]);
    const [filters, setFilters] = useContext(Context);
    const [isOnloadind,setIsOnLoading] = useState(false);

    const options: ApexOptions = {
        chart: {
            height: 450,
            type: "line",
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
            },
            toolbar: {
                show: false
            }
        },
        colors: ['#1799AE', '#BF3767', '#733A89', '#E9A944', '#B7C122', '#FA8072', '#6F4E37', '#000080', '#808000', '#FF00FF'],
        dataLabels: {
            enabled: false,
        },
        noData: {
            text: "Sem dados a exibir",
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'Estatísticas das escolas',
            align: 'left'
        },
        grid: {
            borderColor: '#e7e7e7',
            strokeDashArray: 7,
        },
        xaxis: {
            categories: ['1 bimestre', '2 bimestre', '3 Bimestre', 'Quarto bimestre'],
            title: {
                text: 'Bimestre'
            }
        },
        yaxis: {
            title: {
                text: filters.exibindo
            },
            min: filters.exibirBy === 'mavaliacao' ? 0 : 5,
            max: filters.exibirBy === 'mavaliacao' ? 10 : 100
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
        }
    };
    // const state = {
    //     series: [
    //         {
    //             name: "português ",
    //             data: [{
    //                 x:'1 bimestre',
    //                 y: 60
    //             },
    //             {
    //                 x:'2 bimestre',
    //                 y: 70
    //             }
    //             ,{
    //                 x:'3 bimestre',
    //                 y: 70
    //             } 
    //         ]
    //         },
    //         {
    //             name: "matematica ",
    //             data: [{
    //                 x:'1 bimestre',
    //                 y: 50
    //             },{
    //                 x:'2 bimestre',
    //                 y: 90
    //             }
    //             ,{
    //                 x:'3 bimestre',
    //                 y: 20
    //             } 
    //         ]
    //         },
    //     ]
    // };

    //matemática - E. M. Anacleto José Borges,português - E. M. Anacleto José Borges,matemática - E. M. Anacleto José Borges,português - E. M. Anacleto José Borges,matemática - E. M. Anacleto José Borges,português - E. M. Anacleto José Borges




    useEffect(() => {
        const fetchEscolasGraphs = () => {
            let apeY: ApexYAxis = {title: {text: filters.exibindo}, min: filters.exibirBy === 'mavaliacao' ? 0 : 5, max: filters.exibirBy === 'mavaliacao' ? 10 : 100} as ApexYAxis;
            if( options.yaxis !== undefined ){
                options.yaxis = apeY;
            }
            setIsOnLoading(true);
            setSeriesState([])
            setEscolasMetricsList([] as EscolaMetrics[] )
            axios.get(BASE_URL+'metrics/escola?escolaIds='+filters.escolaIds+'&ano=2022&materiaCods='+(filters.materiaCods.length > 0 ? filters.materiaCods : ''))
            .then(function (response) {
                if (response.data){
                  //console.log(response.data);
                 setEscolasMetricsList(response.data);
                }
              })
              .catch(function (error) {
                console.log(error);
              })
              .then(function () {

              });
        }

        const fetchBimestreSerieGraphs = () => {
            let apeY: ApexYAxis = {title: {text: filters.exibindo}, min: filters.exibirBy === 'mavaliacao' ? 0 : 5, max: filters.exibirBy === 'mavaliacao' ? 10 : 100} as ApexYAxis;
            if( options.yaxis !== undefined ){
                options.yaxis = apeY;
            }
            setIsOnLoading(true);
            setSeriesState([])
            setBimestreMetricsList([] as BimestreMetrics[] )
            axios.get(BASE_URL+'metrics/sala?escolaIds='+filters.escolaIds+'&ano=2022&materiaCods='+(filters.materiaCods.length > 0 ? filters.materiaCods : '')+'&seriesIds='+filters.seriesIds)
            .then(function (response) {
                if (response.data){
                  //console.log(response.data);
                  setBimestreMetricsList(response.data);
                }
              })
              .catch(function (error) {
                console.log(error);
              })
              .then(function () {

              });
        }
        console.log("-------------------filter "+ JSON.stringify(filters))
        console.log("-------------------is truee "+ (filters.escolaIds.length > 0  && filters.seriesIds !== undefined &&  filters.seriesIds.length > 0))
        if(filters.escolaIds.length > 0  && filters.seriesIds !== undefined &&  filters.seriesIds.length > 0) fetchBimestreSerieGraphs();
        else if(filters.escolaIds.length > 0 ) fetchEscolasGraphs();
    }, [filters as Filter]);
    useEffect(() => {
        const mountGraphEscola = () => {
            let localState:ApexAxisChartSeries = [] as ApexAxisChartSeries;
            
            let escolaNames = escolasMetricsList.map(e=> e.materiaEscolaName);
            escolaNames =Array.from(new Set(escolaNames));
            escolaNames.forEach(eName => {
                let localEscola = escolasMetricsList.filter(e => e.materiaEscolaName === eName);
               
                let localSerie = {name: capitalizeFirstLetter(eName), data : [] as { x: string; y: number; }[]}
                localSerie.data = localEscola.map(escola => {
                    return {x: escola.bimestreName, y: parseFloat(escola[filters.exibirBy].toFixed(2))};
                });
                localState.push(localSerie);
            })
            setIsOnLoading(false);
            setSeriesState(localState);
        }
        const mountGraphBimestre = () => {
            let localState:ApexAxisChartSeries = [] as ApexAxisChartSeries;
            
            let escolaNames = bimestreMetricsList.map(e=> e.materiaSerieEscolaName);
            escolaNames = Array.from(new Set(escolaNames));
            escolaNames.forEach(eName => {
                let localEscola = bimestreMetricsList.filter(e => e.materiaSerieEscolaName === eName);
               
                let localSerie = {name: capitalizeFirstLetter(eName), data : [] as { x: string; y: number; }[]}
                localSerie.data = localEscola.map(escola => {
                    return {x: escola.bimestreName, y: parseFloat(escola[filters.exibirBy].toFixed(2))};
                });
                localState.push(localSerie);
            })
            setIsOnLoading(false);
            setSeriesState(localState);
        }

        console.log("-------------------filters.seriesIds.length "+ JSON.stringify(bimestreMetricsList))
        if(bimestreMetricsList.length > 0 && filters.seriesIds !== undefined &&  filters.seriesIds.length > 0) mountGraphBimestre();
        else if(escolasMetricsList.length > 0 ) mountGraphEscola();
    }, [escolasMetricsList, bimestreMetricsList]);

    return (
        <>
            <div id="chart" className="chart">

                {isOnloadind ? <div className="is-loading"><div> <Loading type={'spokes'} color={'#BF5079'} width={undefined} height={undefined}></Loading></div></div>
                 :
                 <ReactApexChart options={options} series={seriesState} type="line" height={600} /> }
               
                
            </div>
        </>
    )
}
export default GraphLine;