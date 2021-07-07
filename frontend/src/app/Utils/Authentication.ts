import {environment} from "../../environments/environment"
import jwtDecode from "jwt-decode"

export interface User {
    id: string
    firstName: string
    lastName: string
    email: string
    avatar: string
}

interface MarketToken {
    user: User
    exp: number
    authorization: string
}

const emptyUser : User = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    avatar: ""
}

export const authenticate = (token : string): User => {
    const marketToken: MarketToken = jwtDecode(token)

    if(marketToken.authorization !== environment.USER_TOKEN_SECRET) return emptyUser

    // handle expired tokens
    const user = marketToken.user

    return user
}

export const  Fetch = async (url: string, method: "POST" | "GET", headers: HeadersInit | undefined, body: BodyInit | null | undefined) => {
    try{
        const req = await fetch(url, {
            method: method,
            mode: "cors",
            headers: headers,
            body: body
        })

        const res = req.json()

        if(!res) throw Error

        return res

    } catch(Error) {
        console.log(Error)
        // window.location.replace("/")
        
    }
}