import {environment} from "../../environments/environment"
import jwtDecode from "jwt-decode"

export interface User {
    id: string
    firstName: string
    lastName: string
    email: string
}

interface MarketToken {
    user: User
    exp: number
    authorization: string
}

export const authenticate = (token : string): User | null => {

    const marketToken: MarketToken = jwtDecode(token)

    if(marketToken.authorization !== environment.USER_TOKEN_SECRET) return null

    // handle expired token
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
        window.location.replace("/")
        
    }
}