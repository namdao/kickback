import NotificationService from '../notification';

export default class CommonDataManager {
    static myInstance = null;    
    constructor() {
        this.notificationService = new NotificationService();
    }

    /**
     * @returns {CommonDataManager}
     */
    static getInstance() {
        if (CommonDataManager.myInstance == null) {
            CommonDataManager.myInstance = new CommonDataManager();
        }
        return this.myInstance;
    }

    getNotificationService() {
        return this.notificationService;
    }
}