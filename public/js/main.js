import { getDatabase, ref, set } from "firebase/database";
import {collection, getFirestore, addDoc } from "firebase/firestore";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";

function writeUserData(userId, name, email, imageUrl) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
        username: name,
        email: email,
        profile_picture : imageUrl
    });
}

class UserData{

    constructor() {
    }
}

class Result {


    constructor(userId, userAge, userGender, times, elementTracking, dates, answers) {

        this.userId = userId;
        this.userAge = userAge;
        this.userGender = userGender;
        this.times = times;
        this.elementTracking = elementTracking;
        this.dates = dates;
        this.answers = answers;
    }

    initialiseData() {
        localStorage.clear();
        localStorage.setItem('userAge', 0);
        localStorage.setItem('userGender', '');
        localStorage.setItem('times', ['']);
        localStorage.setItem('elementTracking', ['']);
        localStorage.setItem('dates', ['']);
        localStorage.setItem('answers', ['']);
    }

    saveUserData(){
        this.userAge = parseInt(document.getElementById("ageInput").value);
        this.userGender = document.getElementById("genderInput").value;
        this.userId = 'U' + Date.now();
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
        try{
            localStorage.setItem('day', document.querySelector('input[name="day"]:checked').value);
        }
        catch(e){
            if(e instanceof TypeError){
            } else {
                console.log(e);
            }
        }

        var page = window.location.pathname.split("/").pop();
        if(page == 'Radio-buttons-day-1.html') {
            window.location.replace('Radio-buttons-month-1.html');           
        } else if (page == 'Radio-buttons-day-2.html') {
            window.location.replace('Radio-buttons-month-2.html');
        } else {
            window.location.replace('Radio-buttons-month-3.html');
        }
    }

    saveTheEnteredDate_RadioButtonsMonth() {
        try{
            localStorage.setItem('month', document.querySelector('input[name="month"]:checked').value);
        }
        catch(e){
            if(e instanceof TypeError){

            }else{
                console.log(e);
            }
        }


        var page = window.location.pathname.split("/").pop();
        if(page == 'Radio-buttons-month-1.html') {
            window.location.replace('Radio-buttons-year-1.html');           
        } else if (page == 'Radio-buttons-month-2.html') {
            window.location.replace('Radio-buttons-year-2.html');
        } else {
            window.location.replace('Radio-buttons-year-3.html');
        }
    }

    saveTheEnteredDate_RadioButtonsYear() {
        var date = '';
        try {
            date = localStorage.getItem('day') + '/' + 
            localStorage.getItem('month') + '/' + document.querySelector('input[name="year"]:checked').value;

            this.dates = date;
        }
        catch(e){
            if(e instanceof TypeError){

            }else{
                console.log(e);
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

        const firebaseConfig = {

            apiKey: "AIzaSyCCSg686MIwY4jJz7UNFx6PMNZ_LwOG7zk",
            authDomain: "research-prototype-22.firebaseapp.com",
            projectId: "research-prototype-22",
            storageBucket: "research-prototype-22.appspot.com",
            messagingSenderId: "551766409520",
            appId: "1:551766409520:web:493f25acf035234a9d88f5"

        };

        const app = initializeApp(firebaseConfig);

        const database = getFirestore(app);

        const dataCollection = collection(database, "experimentData");

        const user = new UserData(this.userId, this.userAge, this.userGender, this.times, this.elementTracking, this.dates, this.answers)

        addDoc(dataCollection, {
            ...user
        });

    }

    get userId() { return localStorage.getItem('userId'); }
    get userAge() { return localStorage.getItem('userAge'); }
    get userGender() { return localStorage.getItem('userGender'); }
    get times( ) { return localStorage.getItem('times'); }
    get elementTracking() { return localStorage.getItem('elementTracking'); }
    get dates() { return localStorage.getItem('dates'); }
    get answers() {  return localStorage.getItem('answers'); }

    set userId( newUserId ) { localStorage.setItem('userId', newUserId); console.log(newUserId);}
    set userAge( newUserAge ) { localStorage.setItem('userAge', newUserAge); console.log(newUserAge); }
    set userGender( newUserGender ) { localStorage.setItem('userGender', newUserGender); console.log(newUserGender); }

    set times( timeValue ) { 
        var newTimes = this.times;
        if(newTimes == '')
            newTimes = timeValue;
        else
            newTimes += ',' + timeValue;
        localStorage.setItem('times', newTimes);
        console.log(timeValue);
     }

    set elementTracking( elementValue ) { 
        var newElements = this.elementTracking;
        if(newElements == '')
            newElements = elementValue;
        else
            newElements += ',' + elementValue;
        localStorage.setItem('elementTracking', newElements);
        console.log(elementValue);
    }

    set dates( newDate ) { 
        var newDates = this.dates;
        if(newDates == '')
            newDates = newDate;
        else
            newDates += ',' + newDate;
        localStorage.setItem('dates', newDates);
        console.log(newDate);
    } 

    set answers( newAnswer ) { 
        var newAnswers = this.answers;
        if(newAnswers == '')
            newAnswers = newAnswer;
        else
            newAnswers += ',' + newAnswer;
        localStorage.setItem('answers', newAnswers);
        console.log(newAnswer);
    }

}

var userResult = new Result();



