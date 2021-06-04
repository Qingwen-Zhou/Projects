'use strict'

module.exports = {
    Activity: Activity,
    ActivityToList: ActivityToList,
    ProfileToList: ProfileToList,
    ReminderActivity: ReminderActivity
}

/**
 * Creates an Activity Object containing a date of completion, activity name, 
 * and measurement
 * @param {Object} obj - stores activity data to build an activity object
 * @param {string} obj.date
 * @param {string} obj.activity
 * @param {float} obj.scalar
 * @returns {Object} activity - stores activity data built into an activity object
 * @returns {string} activity.date
 * @returns {string} activity.activity
 * @returns {float} activity.scalar
 */

function ReminderActivity(obj) {
    let activity = null
    // if mm-dd-yyyy, convert to ms since 1970
    if (typeof(obj.date) == 'string') {
        obj.date = (new Date(obj.date.replace('-','/'))).getTime()
    }

    if (obj.date && obj.activity && obj.scalar) {
        activity = {
            date: obj.date,
            activity: obj.activity,
            scalar: obj.scalar,
            
        }
    } else if (obj.date && obj.activity) {
        activity = {
            date: obj.date,
            activity: obj.activity,
            scalar: -1,
            
        }
    }

    if (activity == null) {
        throw new ActivityFormatException(obj)
    }

    return activity
}


function Activity(obj) {
    let activity = null
    // if mm-dd-yyyy, convert to ms since 1970
    if (typeof(obj.date) == 'string') {
        obj.date = (new Date(obj.date.replace('-','/'))).getTime()
    }

    if (obj.date && obj.activity && obj.scalar && obj.userid) {
        activity = {
            date: obj.date,
            activity: obj.activity,
            scalar: obj.scalar,
            userid: obj.userid
        }
    } else if (obj.date && obj.activity && obj.userid) {
        activity = {
            date: obj.date,
            activity: obj.activity,
            scalar: -1,
            userid: obj.userid
        }
    }

    if (activity == null) {
        throw new ActivityFormatException(obj)
    }

    return activity
}

/**
 * error message to invalid Activity creation
 * @param {*} value 
 */
function ActivityFormatException(value) {
    this.value = JSON.stringify(value);
    this.message = 'does not conform to the expected format for an activity';
    this.toString = function() {
        return this.value + ' ' + this.message;
    };
}

function ProfileFormatException(value) {
    this.value = JSON.stringify(value);
    this.message = 'does not conform with expected format for a profile';
    this.toString = function() {
        return this.value + ' ' + this.message;
    };
}
/**
 * stores and returns activity into a list format
 * @param {Activity} activity 
 * @returns activity components in a list format
 */
function ActivityToList(activity) {
    if (activity == null) {
        throw new ActivityFormatException(activity)
    }

    return [activity.activity, activity.date, activity.scalar, activity.userid]
}
function ProfileToList(profile) {
    if (profile == null) {
        throw new ProfileFormatException(profile)
    }
    return [profile.id, profile.name.givenName]
}