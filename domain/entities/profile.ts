export class Profile{
    id : number;
    username : string;
    description? : string;
    rating? : number;
    avatar? : string;
    user_id : string;

    constructor(
        id: number,
        username: string,
        user_id: string,
        description?: string,
        rating?: number,
        avatar?: string
    ) {
        this.id = id;
        this.username = username;
        this.user_id = user_id;
        this.description = description;
        this.rating = rating ?? 0;
        this.avatar = avatar;
    }
}