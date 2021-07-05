interface Request {
    firstName : string
    lastName : string
    service : string
    rating : number
}

interface Feedback {
    firstName : string
    lastName : string 
    service : string
    rating : number
}


export interface Dashboard {
    firstName :  string
    lastName : string
    request :  Request [] 
    feedback : Feedback [] 
    avatar : string}
}