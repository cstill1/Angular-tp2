
import { Product } from '../models/product';

export class AddProduct {
    static readonly type = '[Product] Add';

    constructor(public payload: Product) {}
    
}

