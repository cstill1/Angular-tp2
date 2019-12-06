
import { Product } from '../models/product';

export class DelProduct {
    static readonly type = '[Product] Del';

    constructor(public payload: Product) {}
    
}

