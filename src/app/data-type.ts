export interface SignUp{
    name:string,
    email:string,
    password:string
}

export interface Login{
    email: string,
    password: string
}

export interface addProduct{
    name: string,
    price: number,
    category: string,
    color: string,
    description:string,
    image: string,
    _id: number|string,
    quantity: undefined|number
    productId: number
}

export interface userRegestrition{
    name: string,
    email: string,
    password: string,
    cpassword: string
}

export interface cart{
    name: string,
    price: number,
    category: string,
    color: string,
    description:string,
    image: string,
    _id: number|string|undefined,
    quantity: undefined|number
    userId:number,
    productId:number|string
}

export interface priceSummary{
    price: number,
    discount: number,
    tax: number,
    delivery: number,
    total: number
}

export interface order{
    firstName: string,
    lastName:string,
    email:string,
    adress:string,
    phone:string,
    totalPrice:number,
    _id:number|undefined
}