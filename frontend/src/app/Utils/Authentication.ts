import {Jwt} from 'jsonwebtoken'

export interface User {
    id: string
    firstName: string
    lastName: string
    email: string
}

export const authenticate = (token : string): User | null => {

    let user : User | null = null

//     Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, algorithms=['HS256'], function(err, decoded) {
//         if(decoded != null  && decoded.authorization==process.env.USER_TOKEN_SECRET){
//             access = true
//         }
//     })

    return user
}

// export const getToken = (req: Request) => {
//     try{
//         return req.cookies.market_token
//     }catch(error){
//         console.log(error)
//         return null
//     }
//   }

// export const getMarketToken = () => {
//     const cookies = document.cookie.split(';')
//     let market_token : string | null  = null

//     for(let i = 0; i < cookies.length; i++){
//         if(cookies[i].includes('market_token=')){
//             return market_token = cookies[i].split('market_token=')[1]
//         }
//     }
//     return market_token
// }

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