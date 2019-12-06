import {Action,Selector,State, StateContext} from '@ngxs/store';
import {UserStateModel} from './account-state-model';


import { AddUser} from '../action/account-action';


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
    Add({getState, patchState }: StateContext<UserStateModel>, { payload }: AddUser) {
        const state = getState();
       debugger;
        patchState({ 
            user: [payload]
        });
       
    }
}
