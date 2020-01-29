import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserStateModel } from './account-state-model';


import { AddUser } from '../action/account-action';
import { DelUser } from '../action/deluser-action';


@State<UserStateModel>({
    name: 'user',
    defaults: {
        user: []
    }
})

export class AccountState {

    @Selector()
    static getUser(state: UserStateModel) {
        return state.user;
    }

    @Action(AddUser)
    Add({ getState, patchState }: StateContext<UserStateModel>, { payload }: AddUser) {
        const state = getState();
        patchState({
            user: [payload]
        });

    }

    @Action(DelUser)
    del ({getState, patchState }: StateContext<UserStateModel>, { payload }: DelUser) {
        const state = getState();
        var estRem = false;
        var i =0;
        
        
            patchState({
                user: []
            });
          
    }
}
