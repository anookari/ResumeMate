import { LightningElement } from 'lwc';

export function isValidPhone(value){
    if(value === '' || value == null) return true; // no need to validate
    let phoneNumber = value;
    const phonePattern = '^\\(?([2-9][0-9]{2})\\)? ?([0-9]{3})-? ?([0-9]{4})$';
    let isValid = true;
    if(phoneNumber.match(phonePattern)){
        isValid = true;
    }else{
        window.console.log('utility not valid pattern' + phoneNumber);
        isValid = false;
    }
    return isValid;
}

// get the param from the URL. Returns false if not found. Calling method should handle a false return
export function getURLParam(param) {
    var variable = param;
    if (param != null && param !== "All Params") {
        variable = param
    
        let query = decodeURIComponent(window.location.search.substring(1));

        let vars = query.split("&");
        for (let i=0;i<vars.length;i++) {
            let pair = vars[i].split("=");
            if(pair[0] === variable){return pair[1];}
        }
    }else if(param === "All Params"){
        var query = location.search.substr(1);
        var result = {};
        query.split("&").forEach(function(part) {
        var item = part.split("=");
        result[item[0]] = item[1];
        });
        return result;
    }

    return false;
}

export function getInCommunityBuilder() {
    if (inCommunityBuilder == undefined) {
        var urlToCheck = window.location.href;
        if(!urlToCheck) {
        urlToCheck = window.location.hostname;
        }
        urlToCheck = urlToCheck.toLowerCase();
        inCommunityBuilder = urlToCheck.indexOf('builder.salesforce-communities') >= 0 || urlToCheck.indexOf('livepreview') >= 0;
    }
    return inCommunityBuilder;
}

// Detect Mobile Device
export function isMobile(){ 
    // Check storage type
    if (sessionStorage.desktop) // desktop storage 
        return false;
    else if (localStorage.mobile) // mobile storage
        return true;

    // If no storage detected, check userAgent
    if(navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)){
        return true;
    }else{
        return false;
    }
}

export function formatDate (dateInput,dateFormat) {        
    if (dateInput) {
        var year = dateInput.slice(0,4);
        var month = dateInput.slice(5,7);
        var day = dateInput.slice(8,10);
        
        if(dateFormat == 'DDMMYY'){
            return day + "/" + month + "/" + year;
        }else if(dateFormat == 'MMDDYY'){
            return month + "/" + day + "/" + year;
        } else if(dateFormat == 'YYYY-MM-DD'){
            return year + "-" + month + "-" + day;
        }          
    }
}

export function getPageBaseURL(){
    var url = window.location.href;
    var index1 = url.lastIndexOf("/");
    var index2 = url.lastIndexOf("?");
    var pageBaseUrl = url.substring(index1+1, index2);
    return pageBaseUrl;
}

export function getNumberOfDays(start,end) {
    const date1 = new Date(start);
    const date2 = new Date(end);
    //One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;
    //Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();
    //Calculating the no. of days between two dates
    var  dayscount= Math.round(diffInTime / oneDay);
    
    var age = '';
    var daysAgoLabel = 'X Days Ago';
    var weeksAgoLabel = 'X Weeks Ago';
    var monthsAgoLabel = 'X Months Ago';
        if(dayscount == 0){ age = 'Today'; }            
        else if (dayscount == 1){ age = 'Day Ago'; }            
        else if (dayscount < 7){ age= daysAgoLabel.replace('X', ''+dayscount); }
        else if (dayscount >= 7 && dayscount <= 13){ age = 'Week Ago'; }
        else if (dayscount >= 14 && dayscount <= 27){   
            var days_count = dayscount/7;
            age = weeksAgoLabel.replace('X', ''+Math.floor(days_count));
        }            
        else if (dayscount >= 28 && dayscount <= 59){ age = 'Month Ago'; }
        else if (dayscount >= 60 && dayscount <= 359){                   
            var remainingdays = dayscount - 28;                
            var monthval = remainingdays / 30;                                
            monthval++;                 
            age = monthsAgoLabel.replace('X', ''+Math.floor(monthval));
        }
        else if (dayscount >= 360){ age = 'Year Ago'; }    
    return age;
}
 
export default class Utility extends LightningElement {}