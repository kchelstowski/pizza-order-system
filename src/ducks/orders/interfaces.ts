export interface Order {
    id: string,
    client: string,
    order: Array<string>,
    price: number,
    date: Date,
    status: string
}

export interface Status {
    status: string
}

export interface OrderWithStatus {
    id: string,
    status: string
}


export interface OrdersFormValues {
    id: string,
    client: string,
    checked: Array<string>
}