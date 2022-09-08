export default class User{
    constructor(user_id,name,email,rank,country,user_image = ""){
        this.user_id = user_id
        this.email = email;
        this.name = name;
        this.rank = rank;
        this.country = country;
        this.user_image = user_image
    }

    toString(){
        return `email = ${this.email}, user_id = ${this.user_id}, name = ${this.name}, rank = ${this.rank}}`
    }
}