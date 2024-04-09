const AWAITING_DEVICE = 0;
const DEVICE_RECEIVED = 1;
const DATA_RECOVERED = 2;
const DATA_RECOVERY_FAILED = 3;
const DATA_RECOVERY_CANCELLED = 4;
const AVAILABLE_FOR_RETREIVAL = 5;
const EXPIRING_SOON = 6;
const RETRIEVAL_EXPIRED = 7;
const DATA_DELETED = 8;

const retrievalState = {
    AWAITING_DEVICE,
    DEVICE_RECEIVED,
    DATA_RECOVERED,
    DATA_RECOVERY_FAILED,
    DATA_RECOVERY_CANCELLED,
    AVAILABLE_FOR_RETREIVAL,
    EXPIRING_SOON,
    RETRIEVAL_EXPIRED,
    DATA_DELETED,

    retrievalStateToString: (state) => {
        switch(state) {
            case AWAITING_DEVICE:
                return 'Awaiting Device';
            case DEVICE_RECEIVED:
                return 'Device Received';
            case DATA_RECOVERED:
                return 'Data Recovered';
            case DATA_RECOVERY_FAILED:
                return 'Data Recovery Failed';
            case DATA_RECOVERY_CANCELLED:
                return 'Data Recovery Cancelled';
            case AVAILABLE_FOR_RETREIVAL:
                return 'Available for Retrieval';
            case EXPIRING_SOON:
                return 'Expiring Soon';
            case RETRIEVAL_EXPIRED:
                return 'Expired';
            case DATA_DELETED:
                return 'Data Deleted';
            default:
                return 'Unknown';
        }
    },

    retrievalStateToColor: (state, prefix = "") => {
        switch(state) {
            case AWAITING_DEVICE:
                return prefix + 'secondary';
            case DEVICE_RECEIVED:
                return prefix + 'success';
            case DATA_RECOVERED:
                return prefix + 'info';
            case DATA_RECOVERY_FAILED:
                return prefix + 'danger';
            case DATA_RECOVERY_CANCELLED:
                return prefix + 'secondary';
            case AVAILABLE_FOR_RETREIVAL:
                return prefix + 'info';
            case EXPIRING_SOON:
                return prefix + 'warning';
            case RETRIEVAL_EXPIRED:
                return prefix + 'danger';
            case DATA_DELETED:
                return prefix + 'secondary';
            default:
                return prefix + 'info';
        }
    },

    retrievalStateToNextStepString: (state) => {
        switch(state) {
            case AWAITING_DEVICE:
                return 'Make sure to bring your device to us as soon as possible in order to start the data recovery process.';
            case DEVICE_RECEIVED:
                return 'We have received your device and are currently working on recovering your data.';
            case DATA_RECOVERED:
                return 'Your data has been successfully recovered and is available for download.';
            case DATA_RECOVERY_FAILED:
                return 'Unfortunately, we were unable to recover any data from your device.';
            case DATA_RECOVERY_CANCELLED:
                return 'Your data recovery process has been cancelled.';
            case AVAILABLE_FOR_RETREIVAL:
                return 'Your data is available for download.';
            case EXPIRING_SOON:
                return 'Your data is available for download, but will expire soon. Make sure to download it before it is too late.';
            case RETRIEVAL_EXPIRED:
                return 'Your data has expired and is no longer available for download.';
            case DATA_DELETED:
                return 'Your data has been deleted.';
            default:
                return 'Unknown';
        }
    },

    stateHasFiles: (state) => (state === DATA_RECOVERED || state === AVAILABLE_FOR_RETREIVAL || state === EXPIRING_SOON),

    isExpiredState: (state) => (state === DATA_DELETED || state === RETRIEVAL_EXPIRED),

    isFailedState: (state) => (state === DATA_RECOVERY_FAILED || state === DATA_RECOVERY_CANCELLED),

    getList: () => Object.values(retrievalState).filter(value => typeof value === 'number')
};

module.exports = retrievalState;