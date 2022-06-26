class Result {

    userId = '';
    times = [];
    answer1 = '';
    answer2 = '';

    constructor() {

        this.userId = '';
        this.times = [];
        this.answer1 = '';
        this.answer2 = '';

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

    printUserId(){
        console.log(this.userId);
    }

    startTheExperiment() {

        userResult.setUserId(document.getElementById("userNameInput").value);

        console.log(userResult.userId);

        this.times.push(Date.now())

        localStorage.setItem('times', this.times);

        window.location.replace('1st-calendar-1.html');

    }

    finishExperiment1() {

        var timesTemp = localStorage.getItem('times');
        var currentTime = Date.now();
        var timeTaken = currentTime - timesTemp;
        localStorage.setItem('times', timesTemp);

        var elem = document.createElement('p');

        elem.innerHTML = "The time taken in milliseconds is " + String(timeTaken)

        localStorage.setItem('timeDropdown', String(timeTaken))

        document.body.appendChild(elem);

        this.times.push(currentTime)

        this.startExperiment2();

        window.location.replace('2nd-calendar-1.html');
    }

    startExperiment2(){
        console.log("Exp2")
    }

    getDayRadioButtons(){
        /// here we need to save the day value from the radio buttons

        
        window.location.replace('Radio-buttons-month-1.html');
    }

    getMonthRadioButtons() {
        /// here we need to save the month value from the radio buttons


        window.location.replace('Radio-buttons-year-1.html');
    }

    getYearRadioButtons() {
        /// here we need to save the year value from the radio buttons

        /// change the label indicating the date entered
        var value = document.querySelector('input[name="year"]:checked').value;
        document.getElementById('radioButtonsDateLabel').innerHTML = '03/05/' + value;
    }

    get userId() { return this.userId; }
    get times( ) { return this.times; }
    get answer1() {  return this.answer1; }
    get answer2() { return this.answer2; }

    set userId( newUserId ) {
        newUserId = newUserId?.trim() || '';
        if ( newUserId === '' ) {
            throw 'The userId cannot be empty';
        }
        this.userId = newUserId;
    }

    set times( timeValue ) { this.times.push(timeValue); }
    set answer1( newAnswer1 ) { this.answer1 = newAnswer1; }
    set answer2( newAnswer2 ) { this.answer2 = newAnswer2; }

}

var userResult = new Result();

// if(localStorage.getItem('currentUser') == null){
//     userResult = new Result();
//     localStorage.setItem('currentUser', userResult);
// } else {
//     userResult = localStorage.getItem('currentUser');
// }



