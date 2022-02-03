import React from 'react';
import {RootStore} from "../../ducks/RootReducer";
import {connect} from "react-redux";
import {sumByMonth, summaryOfClient, summaryOfProducts} from "../../ducks/orders/selectors";
import Menu from "../dashboard/Menu";
import {Chart} from "primereact/chart";


interface OrdersStatsProps {
    summaryOfClient: Object,
    summaryOfProducts: Object,
    sumByMonth: Object
}

const OrdersStats = ({summaryOfClient, summaryOfProducts, sumByMonth}: OrdersStatsProps) => {
    const options = (title: string) => {
        return {
            plugins: {
                title: {
                    display: true,
                    text: `${title}`,
                    font: {
                        size: 24,
                    },
                    color: 'white'
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        color: 'white'
                    }
                },
                label: {
                    color: 'white'
                }
            }
        }
    }
    return (
        <div>
            <Menu/>
            <h1 className="uppercase">Main statistics</h1>
            <Chart type="bar" data={summaryOfClient} options={options('Spent money by clients (top 3)')}
                   className="bar-chart"/>
            <Chart type="doughnut" data={summaryOfProducts} options={options('Apperances of products')}
                   className="donut-chart"/>
            <Chart type="line" data={sumByMonth} options={options('Money per month')} className="bar-chart"/>
        </div>
    );
};

const mapStateToProps = (state: RootStore) => {
    return {
        summaryOfClient: summaryOfClient(state),
        summaryOfProducts: summaryOfProducts(state),
        sumByMonth: sumByMonth(state)
    }
}


export default connect(mapStateToProps)(OrdersStats);