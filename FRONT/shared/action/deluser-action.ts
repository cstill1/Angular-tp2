
import { User } from '../models/user';

export class DelUser {
    static readonly type = '[User] Del';

    constructor(public payload: User) {}
    
}

