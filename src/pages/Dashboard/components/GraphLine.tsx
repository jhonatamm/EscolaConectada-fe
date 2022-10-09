import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import './GraphLine.scss'

interface GraphLineProps{
    title: string
}
const GraphLine = () => {
    const exemple1 = [
        {
            "id": "633f7a77b0f8067ed76c14dc",
            "dtCreated": "2022-10-07T01:01:42.984+00:00",
            "dtUpdated": "2022-10-07T01:01:44.423+00:00",
            "escolaId": "6328fa78cc662a35a71406f3",
            "escolaName": "E. M. Olivio Bastos",
            "materiaDescription": "matemática",
            "materiaCod": 0,
            "ano": 2022,
            "bimestreName": "Primeiro bimestre",
            "bimestreCod": 1,
            "anoBimestre": "2022-1",
            "mpresenca": 56.63269841269841,
            "mnota": 53.76488095238095,
            "mavaliacao": 5.326428571428572
        },
        {
            "id": "633f7a77b0f8067ed76c14dd",
            "dtCreated": "2022-10-07T01:01:43.040+00:00",
            "dtUpdated": "2022-10-07T01:01:44.429+00:00",
            "escolaId": "6328fa78cc662a35a71406f3",
            "escolaName": "E. M. Olivio Bastos",
            "materiaDescription": "português",
            "materiaCod": 1,
            "ano": 2022,
            "bimestreName": "Primeiro bimestre",
            "bimestreCod": 1,
            "anoBimestre": "2022-1",
            "mpresenca": 49.300873015873016,
            "mnota": 51.02888888888889,
            "mavaliacao": 5.810277777777777
        },
        {
            "id": "633f7a77b0f8067ed76c14de",
            "dtCreated": "2022-10-07T01:01:43.045+00:00",
            "dtUpdated": "2022-10-07T01:01:44.433+00:00",
            "escolaId": "6328fa78cc662a35a71406f3",
            "escolaName": "E. M. Olivio Bastos",
            "materiaDescription": "matemática",
            "materiaCod": 0,
            "ano": 2022,
            "bimestreName": "Segundo bimestre",
            "bimestreCod": 2,
            "anoBimestre": "2022-2",
            "mpresenca": 50.418015873015875,
            "mnota": 48.05234126984127,
            "mavaliacao": 5.55015873015873
        },
        {
            "id": "633f7a77b0f8067ed76c14df",
            "dtCreated": "2022-10-07T01:01:43.050+00:00",
            "dtUpdated": "2022-10-07T01:01:44.438+00:00",
            "escolaId": "6328fa78cc662a35a71406f3",
            "escolaName": "E. M. Olivio Bastos",
            "materiaDescription": "português",
            "materiaCod": 1,
            "ano": 2022,
            "bimestreName": "Segundo bimestre",
            "bimestreCod": 2,
            "anoBimestre": "2022-2",
            "mpresenca": 53.434761904761906,
            "mnota": 51.6681746031746,
            "mavaliacao": 5.891111111111112
        },
        {
            "id": "633f7a77b0f8067ed76c14e0",
            "dtCreated": "2022-10-07T01:01:43.054+00:00",
            "dtUpdated": "2022-10-07T01:01:44.442+00:00",
            "escolaId": "6328fa78cc662a35a71406f3",
            "escolaName": "E. M. Olivio Bastos",
            "materiaDescription": "matemática",
            "materiaCod": 0,
            "ano": 2022,
            "bimestreName": "Terceiro bimestre",
            "bimestreCod": 3,
            "anoBimestre": "2022-3",
            "mpresenca": 54.381190476190476,
            "mnota": 44.95305555555556,
            "mavaliacao": 5.6499999999999995
        },
        {
            "id": "633f7a77b0f8067ed76c14e1",
            "dtCreated": "2022-10-07T01:01:43.058+00:00",
            "dtUpdated": "2022-10-07T01:01:44.448+00:00",
            "escolaId": "6328fa78cc662a35a71406f3",
            "escolaName": "E. M. Olivio Bastos",
            "materiaDescription": "português",
            "materiaCod": 1,
            "ano": 2022,
            "bimestreName": "Terceiro bimestre",
            "bimestreCod": 3,
            "anoBimestre": "2022-3",
            "mpresenca": 51.61035714285714,
            "mnota": 48.36968253968254,
            "mavaliacao": 5.005119047619048
        },
        {
            "id": "633f7a77b0f8067ed76c14e2",
            "dtCreated": "2022-10-07T01:01:43.064+00:00",
            "dtUpdated": "2022-10-07T01:01:44.453+00:00",
            "escolaId": "6328fa78cc662a35a71406f3",
            "escolaName": "E. M. Olivio Bastos",
            "materiaDescription": "matemática",
            "materiaCod": 0,
            "ano": 2022,
            "bimestreName": "Quarto bimestre",
            "bimestreCod": 4,
            "anoBimestre": "2022-4",
            "mpresenca": 51.55801587301587,
            "mnota": 50.614960317460316,
            "mavaliacao": 5.683690476190477
        },
        {
            "id": "633f7a77b0f8067ed76c14e3",
            "dtCreated": "2022-10-07T01:01:43.069+00:00",
            "dtUpdated": "2022-10-07T01:01:44.458+00:00",
            "escolaId": "6328fa78cc662a35a71406f3",
            "escolaName": "E. M. Olivio Bastos",
            "materiaDescription": "português",
            "materiaCod": 1,
            "ano": 2022,
            "bimestreName": "Quarto bimestre",
            "bimestreCod": 4,
            "anoBimestre": "2022-4",
            "mpresenca": 50.11043650793651,
            "mnota": 51.38944444444444,
            "mavaliacao": 5.715079365079365
        }
    ]


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
        colors: ['#1799AE', '#BF3767', '#733A89', '#D8CEDD', '#E9A944', '#FA8072', '#6F4E37', '#000080', '#808000', '#FF00FF'],
        dataLabels: {
            enabled: true,
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
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: ['1 bimestre', '2 bimestre', '3 Bimestre', 'Quarto bimestre'],
            title: {
                text: 'Bimestre'
            }
        },
        yaxis: {
            title: {
                text: 'Notas'
            },
            min: 5,
            max: 100
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
        }
    }
    const state = {

        series: [
            {
                name: "português - E. M. Olivio Bastos",
                data: [50, 51, 45, 54 ]

            },
            {
                name: "matemática - E. M. Olivio Bastos",
                data: [45,55, 50,51 ]
            },
            {
                name: "matemática - E. padre Mello",
                data: [74,58, 27,43 ]
            },
            {
                name: "português - E. padre Mello",
                data: [90,77, 77,99 ]
            },
            {
                name: "matemática - E. Mario Batista",
                data: [44,67, 88,97 ]
            },
            {
                name: "português - E. Mario Batista",
                data: [45,34, 56,76 ]
            },
        ]

    };

    return (
        <>
            <div id="chart" className="chart">
                <ReactApexChart options={options} series={state.series} type="line" height={600} />
            </div>
        </>
    )
}
export default GraphLine;