import {RootStore} from "../RootReducer";
import _ from "lodash";
import {findNameOfProduct} from "../products/selectors";
import randomColor from "randomcolor";


export const getOrdersOfUser = (state: RootStore, login: string | undefined) => {
    return state.orders.orders.filter(order => order.client === login)
}

export const summaryOfClient = (state: RootStore) => {

    const loginClientsWithArrayOfPrices: Record<string, Array<number>> = state.orders.orders
        .filter(order => order.status === "Completed")
        .reduce((acc, curr) => {
            if (acc[curr.client as keyof typeof acc]) {
                return {...acc, [curr.client]: [...acc[curr.client as keyof typeof acc], curr.price]}
            }
            return {...acc, [curr.client]: [curr.price]}

        }, {})
    const loginClientWithSum = _.orderBy(Object.keys(loginClientsWithArrayOfPrices).map(login => {
        return {
            login: login,
            sum: loginClientsWithArrayOfPrices[login].reduce((acc, curr) => acc + curr, 0)
        }
    }), ['sum'], 'desc').slice(0, 3)

    return loginClientWithSum.reduce((acc, curr) => {
        if (acc["labels" as keyof typeof acc]) {
            return {
                "labels": [...acc["labels" as keyof typeof acc], curr.login],
                "datasets": [{
                    "label": acc["datasets" as keyof typeof acc][0]["label"],
                    "backgroundColor": '#242b34',
                    "data": [...acc["datasets" as keyof typeof acc][0]["data"], curr.sum]
                }]
            }
        }
        return {
            "labels": [curr.login],
            "datasets": [{
                "label": "Sum of orders made",
                "backgroundColor": '#242b34',
                "data": [curr.sum]
            }]
        }
    }, {})

}

export const summaryOfProducts = (state: RootStore) => {
    const dictionaryOfProducts: Record<string, number> = state.orders.orders.reduce((acc: Record<string, number>, curr) => {
        const productsOfOrder: Array<string> = []
        curr.order.forEach((product) => {
            productsOfOrder.push(product)
        })
        productsOfOrder.forEach(product => {
            if (acc[product as keyof typeof acc]) {
                acc[product as keyof typeof acc] += 1
            } else {
                acc[product as keyof typeof acc] = 1
            }
        })
        return acc
    }, {})

    const productsWithAmount = Object.keys(dictionaryOfProducts).map(id => ({
        name: findNameOfProduct(state.products.products, id),
        amount: dictionaryOfProducts[id]
    }))

    return productsWithAmount.reduce((acc, curr) => {
        if (acc["labels" as keyof typeof acc]) {
            return {
                "labels": [...acc["labels" as keyof typeof acc], curr.name],
                "datasets": [{
                    "label": acc["datasets" as keyof typeof acc][0]["label"],
                    "backgroundColor": [...acc["datasets" as keyof typeof acc][0]["backgroundColor"], `${randomColor({
                        luminosity: 'dark',
                        format: 'hex',
                        alpha: 0.9
                    })}`],
                    "data": [...acc["datasets" as keyof typeof acc][0]["data"], curr.amount]
                }]
            }
        }
        return {
            "labels": [curr.name],
            "datasets": [{
                "label": "Amount of product's apperances",
                "backgroundColor": [`${randomColor({luminosity: 'dark', format: 'hex', alpha: 0.9})}`],
                "data": [curr.amount]
            }]
        }
    }, {})
}


export const sumByMonth = (state: RootStore) => {
    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"]
    const dictionaryOfMonths: Record<string, number> = state.orders.orders.reduce((acc: Record<string, number>, curr) => {
        if (acc[new Date(curr.date).getMonth().toString() as keyof typeof acc]) {
            return {
                ...acc,
                [new Date(curr.date).getMonth().toString()]: acc[new Date(curr.date).getMonth().toString()] + curr.price
            }
        }
        return {...acc, [new Date(curr.date).getMonth().toString()]: curr.price}
    }, {})
    const monthsWithSum = Object.keys(dictionaryOfMonths).map(month => {
        return {
            month: months[parseInt(month)],
            sum: dictionaryOfMonths[month]
        }
    })

    return monthsWithSum.reduce((acc, curr) => {
        if (acc["labels" as keyof typeof acc]) {
            return {
                "labels": [...acc["labels" as keyof typeof acc], curr.month],
                "datasets": [{
                    "label": acc["datasets" as keyof typeof acc][0]["label"],
                    "borderColor": '#42A5F5',
                    "data": [...acc["datasets" as keyof typeof acc][0]["data"], curr.sum]
                }]
            }
        }
        return {
            "labels": [curr.month],
            "datasets": [{
                "label": "Money per month",
                "backgroundColor": '#42A5F5',
                "data": [curr.sum]
            }]
        }
    }, {})

}