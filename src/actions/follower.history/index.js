export const PROFILE = "PROFILE_SCREEN",
    FOLLOWER = "FOLLOWER_SCREEN",
    FOLLOWING = "FOLLOWING_SCREEN",
    HOME = "homeScreen",
    HOME2 = "HOME2_SCREEN",
    USER_PROFILE = "USER_PROFILE_SCREEN",
    NOTIFICATION="NOTIFICATION_SCREEN",
    MYU="MYU_SCREEN",
    SEARCH_RESULT = "SEARCH_RESULT",
    SEARCH_ADVANCE = "SEARCH_ADVANCE";

class FollowerHistoryClass {
    followerHistory = [];
    followerHistoryFromUser = [];

    isAtHome = true;
    tabName = HOME;

    push = (fromScreen, {screen, user_id, actionArrays}) => {

        switch (fromScreen) {
            case HOME:
                this.followerHistory.push({
                    screen,
                    user_id,
                    actionArrays
                });
                break;

            case USER_PROFILE:
                this.followerHistoryFromUser.push({
                    screen,
                    user_id,
                    actionArrays
                });
                break;
        }
    };

    pop = (fromScreen, result) => {

        switch (fromScreen) {
            case HOME:
                if(this.followerHistory.length > 1) this.followerHistory.pop();

                setTimeout(() => {

                    const lastItemHistory = this.followerHistory[this.followerHistory.length - 1];

                    const {actionArrays} = lastItemHistory;
                    for(let i = 0; i < actionArrays.length; i++){
                        actionArrays[i]();
                    }

                    result(true);

                }, 200);
                break;

            case USER_PROFILE:
                if(this.followerHistoryFromUser.length > 1) this.followerHistoryFromUser.pop();
                setTimeout(() => {

                    const lastItemHistory = this.followerHistoryFromUser[this.followerHistoryFromUser.length - 1];

                    const {actionArrays} = lastItemHistory;
                    for(let i = 0; i < actionArrays.length; i++){
                        actionArrays[i]();
                    }

                    result(true);

                }, 200);
                break;
        }
    };

    reset = (fromScreen) => {

        switch (fromScreen) {
            case HOME:
                this.followerHistory.splice(1, this.followerHistory.length - 1);
                break;

            case USER_PROFILE:
                this.followerHistoryFromUser.splice(1, this.followerHistoryFromUser.length - 1);
                break;
        }


    };

    runActionAtLastItemHistory = (fromScreen) => {

        switch (fromScreen) {
            case HOME:

                let lastItemTemp1 = this.followerHistory[this.followerHistory.length - 1].actionArrays;

                for(let i = 0; i < lastItemTemp1.length; i++){
                    lastItemTemp1[i]();
                }

                break;

            case USER_PROFILE:

                let lastItemTemp2 = this.followerHistoryFromUser[this.followerHistoryFromUser.length - 1].actionArrays;

                for(let i = 0; i < lastItemTemp2.length; i++){
                    lastItemTemp2[i]();
                }

                break;
        }


    };

    getIsAtHome = () => this.isAtHome;

    toggleIsAtHome = () => this.isAtHome = !this.isAtHome;

    getTabActiveName = () => this.tabName;

    setTabActiveName = (name) => this.tabName = name;
}
export const FollowerHistory = new FollowerHistoryClass();
