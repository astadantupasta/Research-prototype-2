//let uploadToDatabase = require("./database.js");

import {collection, getFirestore, addDoc, getDocs, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";

export class UserData{

    constructor(userId, userAge, userGender, times, elementTracking, dates, answers, userAgent) {

        this.userId = userId;
        this.userAge = userAge;
        this.userGender = userGender;
        this.times = times;
        this.elementTracking = elementTracking;
        this.dates = dates;
        this.answers = answers;
        this.userAgent = userAgent;
    }
}

class Result {

    constructor() {

    }

    saveUserData(){

        localStorage.clear();
        this.times = [];
        this.elementTracking = [];
        this.dates = [];
        this.answers = [];
        this.temporaryTime = '';
        this.temporaryElementName = '';
        this.userAgent = navigator.userAgent;

        this.userAge = parseInt(document.getElementById("ageInput").value);
        this.userGender = document.getElementById("genderInput").value;

        localStorage.setItem('day', '**');
        localStorage.setItem('month', '**');
        localStorage.setItem('year', '****');

        // TEMPORARY
        var id = 'LT-' + Date.now();
        localStorage.setItem('userId', id);

        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-FJ4GEM2KRK', {
            'user_id': localStorage.getItem('userId')
        });
    }

    saveTheCurrentTime(elementTracker) {
        this.temporaryTime = Date.now();
        this.temporaryElementName = elementTracker;

    }

    saveThePeriodOfTime() {
        var arrayOfStrings = this.temporaryTime.split(',');
        var arrayOfNums =  [];

        // Converting array of strings to the array of numbers
        arrayOfStrings.forEach(str => {
          arrayOfNums.push(Number(str));
        });

        var periodOfTime = arrayOfNums[arrayOfNums.length-1] - arrayOfNums[0];
        this.times = periodOfTime;
        this.elementTracking = this.temporaryElementName;

        // Cleaning the temporary values
        localStorage.setItem('temporaryTime', '');
        this.temporaryElementName = '';
    }

    saveTheEnteredDate_DropDown() {
        var date = document.getElementById('dayInput').value;
        date += '/' + document.getElementById('monthInput').value;
        date += '/' + document.getElementById('yearInput').value;

        this.dates = date;

        this.saveThePeriodOfTime();
    }

    saveTheEnteredDate_RadioButtonsDay() {

        var date = '';

        if(document.querySelector('input[name="day"]:checked') != null && document.querySelector('input[name="day"]:checked') != undefined) {
            try {
                date = document.querySelector('input[name="day"]:checked').value + '/' +
                localStorage.getItem('month') + '/' + localStorage.getItem('year');

                this.dates = date;
            } catch (e) {
                if (e instanceof TypeError) {
                } else {
                    console.log(e);
                }
            }
        }

        this.saveThePeriodOfTime();
        localStorage.setItem('day', '**');
        localStorage.setItem('month', '**');
        localStorage.setItem('year', '****');
    }

    saveTheEnteredDate_RadioButtonsMonth() {

        if(document.querySelector('input[name="month"]:checked') != null && document.querySelector('input[name="month"]:checked') != undefined) {

            try {
                localStorage.setItem('month', document.querySelector('input[name="month"]:checked').value);
            } catch (e) {
                if (e instanceof TypeError) {

                } else {
                    console.log(e);
                }
            }


            var page = window.location.pathname.split("/").pop();
            if (page == 'Radio-buttons-month-1.html') {
                window.location.replace('Radio-buttons-day-1.html');
            } else if (page == 'Radio-buttons-month-2.html') {
                window.location.replace('Radio-buttons-day-2.html');
            } else {
                window.location.replace('Radio-buttons-day-3.html');
            }

        }
    }

    saveTheEnteredDate_RadioButtonsDay_Temporary() {

        if(document.querySelector('input[name="day"]:checked') != null && document.querySelector('input[name="day"]:checked') != undefined) {

            try {
                var day = document.querySelector('input[name="day"]:checked').value;
                localStorage.setItem('day', day);
                console.log('day');
                console.log(day);
            } catch (e) {
                if (e instanceof TypeError) {

                } else {
                    console.log(e);
                }
            }
        }

        this.changeTheEnteredDateLabel_RadioButtons();
    }

    saveTheEnteredDate_RadioButtonsYear() {
        if(document.querySelector('input[name="year"]:checked') != null && document.querySelector('input[name="year"]:checked') != undefined) {

            try {
                localStorage.setItem('year', document.querySelector('input[name="year"]:checked').value);
            } catch (e) {
                if (e instanceof TypeError) {

                } else {
                    console.log(e);
                }
            }
        }
        var page = window.location.pathname.split("/").pop();
        if (page == 'Radio-buttons-year-1.html') {
            window.location.replace('Radio-buttons-month-1.html');
        } else if (page == 'Radio-buttons-year-2.html') {
            window.location.replace('Radio-buttons-month-2.html');
        } else {
            window.location.replace('Radio-buttons-month-3.html');
        }
    }

    saveTheEnteredDate_Swiper(){
        var date = localStorage.getItem('slider_day');
        date += '/' + localStorage.getItem('slider_month');
        date += '/' + localStorage.getItem('slider_year');

        this.dates = date;
        this.saveThePeriodOfTime();
    }

    changeTheEnteredDateLabel_RadioButtons(){
            var day='**', month='**', year='****';
            try {
                day = localStorage.getItem('day');
                if(day == null || day == undefined)
                    day = '**';
            }
            catch(e) {
                if(e instanceof TypeError){
                    day = '**';
                }
                else {
                    console.log(e);
                }
            }

            try {
                month = localStorage.getItem('month');
            }
            catch(e) {
                if(e instanceof TypeError){
                    month = '**';
                    if(month == null || month == undefined)
                        month = '**';
                }
                else {
                    console.log(e);
                }
            }

            try {
                year = localStorage.getItem('year');
                if(year == null || year == undefined)
                    year = '****';
            }
            catch(e) {
                if(e instanceof TypeError){
                    year = '****';
                }
                else {
                    console.log(e);
                }
            }

            document.getElementById('radioButtonsDateLabel').innerHTML = year + '-' + month + '-' + day;         
    }

    saveTheAnswers() {
        var answer1, answer2;
        try {
            answer1 = document.querySelector('input[name="comfortable"]:checked').value;
        }
        catch(e) {
            if(e instanceof TypeError) {
                answer1 = 'NotEvaluated';
            }
        }

        try {
            answer2 = document.querySelector('input[name="quick"]:checked').value;
        }
        catch(e) {
            if(e instanceof TypeError) {
                answer2 = 'notEvaluated';
            }
        }
        
        this.answers = answer1;
        this.answers = answer2;
    }

    disableLink(link) {
        link.setAttribute('aria-disabled', 'true');
    }

    enableLink(link) {
        link.removeAttribute('aria-disabled');
    }

    printAllTheData() {
        console.log('All the data:');
        console.log(this.userId);
        console.log(this.userAge);
        console.log(this.userGender);
        console.log(this.times);
        console.log(this.elementTracking);
        console.log(this.dates);
        console.log(this.answers);
    }

    getAllTheData(){

        const user = new UserData(this.userId, this.userAge, this.userGender, this.times, this.elementTracking, this.dates, this.answers, this.userAgent);

        return user;
    }

    copyInfoToClipboard() {
        var text = 'https://researchprototype.web.app/';
        if(navigator && navigator.clipboard && navigator.clipboard.writeText)
            navigator.clipboard.writeText(text).then(function(x) {alert("Link copied to clipboard!");});
        else
            Promise.reject('The Clipboard API is not available.');
    }

    get userId() { return localStorage.getItem('userId'); }
    get userAge() { return localStorage.getItem('userAge'); }
    get userGender() { return localStorage.getItem('userGender'); }
    get times( ) { return localStorage.getItem('times'); }
    get elementTracking() { return localStorage.getItem('elementTracking'); }
    get dates() { return localStorage.getItem('dates'); }
    get answers() {  return localStorage.getItem('answers'); }
    get userAgent() { return localStorage.getItem('userAgent'); }
    get temporaryTime() { return localStorage.getItem('temporaryTime'); }
    get temporaryElementName() { return localStorage.getItem('temporaryElementName'); }

    set userId( newUserId ) { localStorage.setItem('userId', newUserId); console.log(newUserId);}
    set userAge( newUserAge ) { localStorage.setItem('userAge', newUserAge); console.log(newUserAge); }
    set userGender( newUserGender ) { localStorage.setItem('userGender', newUserGender); console.log(newUserGender); }
    set userAgent( newUserAgent ) { localStorage.setItem('userAgent', newUserAgent); console.log(newUserAgent); }
    set temporaryElementName( newtemporaryElementName ) { localStorage.setItem('temporaryElementName', newtemporaryElementName); console.log(newtemporaryElementName); }

    set times( timeValue ) {
        var newTimes = this.times;
        if(newTimes == '' || (this.times == null || this.times == undefined))
            newTimes = timeValue;
        else
            newTimes += ',' + timeValue;
        localStorage.setItem('times', newTimes);
        console.log(timeValue);
     }

    set elementTracking( elementValue ) {
        var newElements = this.elementTracking;
        if(newElements == '' || (this.elementTracking == null || this.elementTracking == undefined))
            newElements = elementValue;
        else
            newElements += ',' + elementValue;
        localStorage.setItem('elementTracking', newElements);
        console.log(elementValue);
    }

    set dates( newDate ) {
        var newDates = this.dates;
        if(newDates == '' || (this.dates == null || this.dates == undefined))
            newDates = newDate;
        else
            newDates += ',' + newDate;
        localStorage.setItem('dates', newDates);
        console.log(newDate);
    } 

    set answers( newAnswer ) {
        var newAnswers = this.answers;
        if(newAnswers == '' || (this.answers == null || this.answers == undefined))
            newAnswers = newAnswer;
        else
            newAnswers += ',' + newAnswer;
        localStorage.setItem('answers', newAnswers);
        console.log(newAnswer);
    }

    set temporaryTime( newtemporaryTime ) {
        var newTemporaries = this.temporaryTime;
        if(newTemporaries == '' || (this.temporaryTime == null || this.temporaryTime == undefined))
            newTemporaries = newtemporaryTime;
        else
            newTemporaries += ',' + newtemporaryTime;

        localStorage.setItem('temporaryTime', newTemporaries);
        console.log(newtemporaryTime);
    }

}

window.userResult = new Result();



