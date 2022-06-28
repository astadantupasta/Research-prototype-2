class Result {

    userId = '';
    userAge = 0;
    userGender = '';
    times = [];
    elementTracking = [];
    dates = [];
    answers = [];

    constructor() {

        this.userAge = 0;
        this.userGender = '';
        this.times = [];
        this.elementTracking = [];
        this.dates = [];
        this.asnwers = [];

        if(localStorage.getItem('currentUserId') == null){
            this.userId = 'temp'

        } else {
            this.setUserId(localStorage.getItem('currentUserId'));
        }
    }

    setUserId(newUserId) {
        newUserId = newUserId?.trim() || '';
        if ( newUserId === '' ) {
            throw 'The userId cannot be empty';
        }
        this.userId = newUserId;
        localStorage.setItem('currentUserId', newUserId);
    }

    saveUserData(){
        this.userId = 'U' + Date.now();

        this.userAge = parseInt(document.getElementById("ageInput").value);
        this.userGender = document.getElementById("genderInput").value;

        localStorage.setItem('userAge', this.userAge);
        localStorage.setItem('userGender', this.userGender);
        localStorage.setItem('userId', this.userId);
    }

    saveTheCurrentTime(elementTracker) {

        var currentTime = Date.now();
        this.times = currentTime;
        this.elementTracking = elementTracker;

        localStorage.setItem('times', this.times);
        localStorage.setItem('elementTraking', this.elementTracking);
        console.log(currentTime);
        console.log(this.elementTracking);
    }

    saveTheEnteredDate_DropDown() {
        var date = document.getElementById('dayInput').value;
        date += '/' + document.getElementById('monthInput').value;
        date += '/' + document.getElementById('yearInput').value;

        var newDates = localStorage.getItem('dates');
        newDates.push(date);
        localStorage.setItem('dates', newDates);
        console.log(this.dates);
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
        }
        catch(e){
            if(e instanceof TypeError){

            }else{
                console.log(e);
            }
        }
        

        this.dates = date;
        console.log(this.dates);
    }

    saveTheEnteredDate_Swiper(){
        var date = localStorage.getItem('slider_day');
        date += '/' + localStorage.getItem('slider_month');
        date += '/' + localStorage.getItem('slider_year');

        this.dates = date;
        localStorage.setItem('dates', this.dates);
        console.log(this.dates);
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
        
        console.log(answer1);
        console.log(answer2);
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

    get userId() { return this.userId; }
    get userAge() { return this.userAge; }
    get userGender() { return this.userGender; }
    get times( ) { return this.times; }
    get elementTracking() { return this.elementTracking; }
    get dates() { return this.dates; }
    get answers() {  return this.answers; }

    set userId( newUserId ) { this.userId = newUserId; }
    set userAge( newUserAge ) { this.userAge = newUserAge; }
    set userGender( newUserGender ) { this.userGender = newUserGender; }
    set times( timeValue ) { this.times.push(timeValue); }
    set elementTracking( elementValue ) { this.elementTracking.push(elementValue); }
    set dates( newDate ) { this.dates.push(newDate); } 
    set answers( newAnswer ) { this.answers.push(newAnswer); }

}

var userResult = new Result();



