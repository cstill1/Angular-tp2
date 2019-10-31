import {Action,Selector,State, StateContext} from '@ngxs/store';
import {PanierStateModel} from './panier-state-model';
import {AddProduct} from '../action/product-action';
import {DelProduct} from '../action/delproduct-action';

@State<PanierStateModel>({
    name: 'panier',
    defaults: {
        panier: []
    }
})

export class PanierState {

  @Selector()
    static getPanier(state: PanierStateModel) {
        return state.panier;
    }

@Action(AddProduct)
    add({getState, patchState }: StateContext<PanierStateModel>, { payload }: AddProduct) {
        const state = getState();
        var estAdd = false;
        debugger;
        state.panier.forEach(product => {
            if(product.item.id == payload.item.id){
                product.qtn+=payload.qtn;
                estAdd=true;

        }});

        if(!estAdd){
            patchState({
            
                panier: [...state.panier, payload]
            });
        }   else{
            patchState({
            
                panier: [...state.panier]
            });
        }
    }

 @Action(DelProduct)
    del ({getState, patchState }: StateContext<PanierStateModel>, { payload }: DelProduct) {
        const state = getState();
        var estRem = false;
        var i =0;
        
        for( var i = 0; i < state.panier.length; i++){ 
            if ( state.panier[i].item.id == payload.item.id ) {
                state.panier[i].qtn -= payload.qtn;
                if( state.panier[i].qtn<=0){
                    state.panier.splice(i, 1); 
                }
            }
         }
            patchState({
                panier: [...state.panier]
            });
          
    }
        
       
}
