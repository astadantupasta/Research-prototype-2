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
        this.userAgent = navigator.userAgent;

        this.userAge = parseInt(document.getElementById("ageInput").value);
        this.userGender = document.getElementById("genderInput").value;

        // TEMPORARY
        var id = 'U' + Date.now();
        localStorage.setItem('userId', id);

        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-FJ4GEM2KRK', {
            'user_id': localStorage.getItem('userId')
        });
    }

    saveTheCurrentTime(elementTracker) {

        this.times = Date.now();
        this.elementTracking = elementTracker;
    }

    saveTheCurrentTimeSwiper(elementTracker, value, correctValue) {

        if(value == correctValue) {
            this.times = Date.now();
            this.elementTracking = elementTracker;
        } else {
            this.times = Date.now();
            this.elementTracking = 'INVALID:' + elementTracker;
        }

    }

    saveTheEnteredDate_DropDown() {
        var date = document.getElementById('dayInput').value;
        date += '/' + document.getElementById('monthInput').value;
        date += '/' + document.getElementById('yearInput').value;

        this.dates = date;
    }

    saveTheEnteredDate_RadioButtonsDay() {

        if(document.querySelector('input[name="day"]:checked') != null && document.querySelector('input[name="day"]:checked') != undefined) {
            try {
                localStorage.setItem('day', document.querySelector('input[name="day"]:checked').value);
            } catch (e) {
                if (e instanceof TypeError) {
                } else {
                    console.log(e);
                }
            }

            var page = window.location.pathname.split("/").pop();
            if (page == 'Radio-buttons-day-1.html') {
                window.location.replace('Radio-buttons-month-1.html');
            } else if (page == 'Radio-buttons-day-2.html') {
                window.location.replace('Radio-buttons-month-2.html');
            } else {
                window.location.replace('Radio-buttons-month-3.html');
            }
        }
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
                window.location.replace('Radio-buttons-year-1.html');
            } else if (page == 'Radio-buttons-month-2.html') {
                window.location.replace('Radio-buttons-year-2.html');
            } else {
                window.location.replace('Radio-buttons-year-3.html');
            }

        }
    }

    saveTheEnteredDate_RadioButtonsYear() {

        if(document.querySelector('input[name="year"]:checked') != null && document.querySelector('input[name="year"]:checked') != undefined) {

            var date = '';
            try {
                date = localStorage.getItem('day') + '/' +
                    localStorage.getItem('month') + '/' + document.querySelector('input[name="year"]:checked').value;

                this.dates = date;
            } catch (e) {
                if (e instanceof TypeError) {

                } else {
                    console.log(e);
                }
            }

        }
    }

    saveTheEnteredDate_Swiper(){
        var date = localStorage.getItem('slider_day');
        date += '/' + localStorage.getItem('slider_month');
        date += '/' + localStorage.getItem('slider_year');

        this.dates = date;
    }

    changeTheEnteredDateLabel_RadioButtons(){
        try{
            var value = document.querySelector('input[name="year"]:checked').value;
            document.getElementById('radioButtonsDateLabel').innerHTML = '03/05/' + value;            
        }
        catch(e){
            if(e instanceof TypeError){

            }else
            {
                console.log(e);
            }
        }

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

    get userId() { return localStorage.getItem('userId'); }
    get userAge() { return localStorage.getItem('userAge'); }
    get userGender() { return localStorage.getItem('userGender'); }
    get times( ) { return localStorage.getItem('times'); }
    get elementTracking() { return localStorage.getItem('elementTracking'); }
    get dates() { return localStorage.getItem('dates'); }
    get answers() {  return localStorage.getItem('answers'); }
    get userAgent() { return localStorage.getItem('userAgent'); }

    set userId( newUserId ) { localStorage.setItem('userId', newUserId); console.log(newUserId);}
    set userAge( newUserAge ) { localStorage.setItem('userAge', newUserAge); console.log(newUserAge); }
    set userGender( newUserGender ) { localStorage.setItem('userGender', newUserGender); console.log(newUserGender); }
    set userAgent( newUserAgent ) { localStorage.setItem('userAgent', newUserAgent); console.log(newUserAgent); }

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

}

window.userResult = new Result();



