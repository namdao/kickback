import { Component } from 'react';

import { registerScreens, registerScreenVisibilityListener, startRoot } from '@screens';
import configureStore from '@store/configureStore'
import { appInitialized, home, signUpActiveScreen, signUpSetTypeScreen } from '@actions/changeRoot';
import initialBranchIO from '@actions/branchIO';
import sagaMiddleware from '@store/middleware/saga'
import rootSaga from '@sagas'
import { getKeyAsyncStorage } from './utils/async';
import { k_USER_INFO } from '@constants/storage-constants';
import { signupActive as signUpAction } from '@actions/signup';
import screenKeys from '@constants/screenKey';

// Configure Store Redux And Register Navigation
export const store = configureStore();
sagaMiddleware.run(rootSaga)
registerScreens(store);
registerScreenVisibilityListener(store);
import branch from 'react-native-branch';
import { initialUser } from '@actions/user';
// console.disableYellowBox = true;
branch.subscribe(({ error, params }) => {
  if (error) return;
  if (!params["+clicked_branch_link"] && !params["+non_branch_link"]) {
    return
  }
  if (params["+non_branch_link"]) {

  }
  else {
    switch (params['~channel']) {
      case 'registration': {
        if (params.confirmation_url) {
          getKeyAsyncStorage(k_USER_INFO).then((response) => {
            if (!response.username) store.dispatch(signUpAction({ confirmation_url: params.confirmation_url }));
          })
        };
        break;
      }
    }
  }
})
class App extends Component {
  constructor(props) {
    super(props);
    store.subscribe(this.onStoreUpdate.bind(this));
    // store.dispatch(initialBranchIO());
    getKeyAsyncStorage(k_USER_INFO).then((response) => {

      if (response.isActive) {
        store.dispatch(signUpActiveScreen(response));
        store.dispatch(initialUser(response));
      } else if (response.access_token) {
        store.dispatch(initialUser(response));
        store.dispatch(home());
      } else {
        store.dispatch(appInitialized());
      };
    })
  }
  startApp = (root) => {

    startRoot(root);
  }
  onStoreUpdate = () => {

    let root = store.getState().root;
    // handle a root change
    if (this.currentRoot != root.screen) {
      this.currentRoot = root.screen;
      this.startApp(root);
    }
  }
}
// console.disableYellowBox = true;
export default App;