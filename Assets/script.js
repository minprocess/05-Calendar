    var eventsStored;  // Events for each hour stored in array. Saved to and read from localStorage
    var x;
    var currHourPrevious;
    var test = false;   // If true then currHour is set to 11 am.
    var testtime = "Sun., Apr. 4 2021, 11:42 am";

    function setAttributes() {
        currHourPrevious = getCurrHour();

        var firstDiv = document.getElementById('first-div');

        eventsStored = JSON.parse(localStorage.getItem("eventsStored") || "[]");
        console.log("setAttributes eventsStored.length", eventsStored.length);
        if (eventsStored.length == 0) {
            for (var i=0; i<9; i++) {
                eventsStored[i] = "";
            }
        }

        const currHour = getCurrHour();
        if (currHour < 9 || currHour > 17) {
            for (var i=0; i<9; i++) {
                eventsStored[i] = "";
            }
            localStorage.setItem("eventsStored", JSON.stringify(eventsStored));
        }

        SetDisplayTime();

        // Create left grid column for hour, middle grid column for event and right grid column for save buttons
        for (var i=9; i<18; i++) {
            var iDivL = document.createElement('div');
            iDivL.id = 'grid-item-left-'+i;
            iDivL.className = 'grid-item-left';
            firstDiv.appendChild(iDivL);
            $('#'+iDivL.id).addClass( "hour" );
            $('#'+iDivL.id).addClass( "time-block" );

            var iDivM = document.createElement('textarea');
            iDivM.id = 'grid-item-mid-'+i;
            iDivM.className = 'grid-item-mid';
            firstDiv.appendChild(iDivM);
            $('#'+iDivM.id).addClass('textarea');
            $('#'+iDivM.id).addClass( bgColorFromHour() );
            $('#'+iDivM.id).addClass('row');

            // Save buttons
            var iDivR = document.createElement('button');
            iDivR.id = 'grid-item-right-'+i;
            //iDivR.className = 'grid-item-right';
            firstDiv.appendChild(iDivR);
            $('#'+iDivR.id).addClass("saveBtn");
            $('#'+iDivR.id).addClass("saveBtn i:hover");
            iDivR.setAttribute("data-index", i-9);
        }

        setEventBackground();

        // Show the hour in the left column
        var hour;
        for (var i=9; i<18; i++)
        {
            if (i < 12) {
                hour = i + ' AM';
            }
            else if (i == 12) {
                hour = i + ' PM';
            }
            else {
                hour = i - 12 + ' PM';
            }
            var hourEl = document.getElementById("grid-item-left-" + i);
            hourEl.textContent = hour;
        }
        $( "button" ).on( "click", btnClickHandler);

        var cellId;
        for (var i=9; i<18; i++) {
            cellId = '#grid-item-mid-'+i;
            var eventEl = document.querySelector(cellId);
            eventEl.value = eventsStored[i-9];
        }   // end of loop that fills table with stored events

        var hourEl3 = document.querySelector("#grid-item-left-9");
        var y = $(hourEl3).offset();
        var msg1El3 = document.querySelector("#msg1");
        $(msg1El3).offset({left: y.left});
        var msg2El3 = document.querySelector("#clock");
        $(msg2El3).offset({left: y.left});
    }    // end of setAtributes

    function getCurrHour() {
        var currHour = moment().hour();
        if (test) {
            currHour = 11;
        }
        return currHour;
    }

    function clearEvents() {
        for (var i=9; i<18; i++) {
            cellId = '#grid-item-mid-'+i;
            var eventEl = document.querySelector(cellId);
            eventEl.textContent = "";
            eventsStored[i-9] = "";
        }
    }

    function setEventBackground() {
        for (var i=9; i<18; i++) {
            cellId = '#grid-item-mid-'+i;
            var eventEl = document.querySelector(cellId);
            var classShouldBe = bgColorFromHour(i);  // 'past', 'present', 'future'
            console.log("setEventBackground classShouldBe: ", classShouldBe);
            if (!eventEl.classList.contains(classShouldBe)) {
                console.log("setEventBackground eventEl.classList", eventEl.classList);
                if (eventEl.classList.contains("past")) {
                    console.log("setEventBackground remove past");
                    $(eventEl).removeClass("past");
                }
                else if (eventEl.classList.contains("present")) {
                    console.log("setEventBackground remove present");
                    $(eventEl).removeClass("present");
                }
                else if (eventEl.classList.contains("future")) {
                    console.log("setEventBackground remove future");
                    $(eventEl).removeClass("future");
                }
            }
            $(eventEl).addClass(classShouldBe);
        }
    }

    function bgColorFromHour(i) {
        var currHour = getCurrHour();
        var whenClass;
        if (i > currHour) {
            whenClass = "future";
        }
        else if (i == currHour) {
            whenClass = "present";
        }
        else {
            whenClass = "past";
        }
        return whenClass;
    }

    // Save events to local storage when the user clicks the save event button
    function btnClickHandler(e) {
        var i = $(this).attr("data-index");
        var j = parseInt(i)+9;
        var cellId = '#grid-item-mid-'+j;
        var eventEl = document.querySelector(cellId);

        eventsStored[i] = eventEl.value;
        localStorage.setItem("eventsStored", JSON.stringify(eventsStored));
    }

    function SetDisplayTime() {
        var datetimeEl = document.querySelector("#clock");
        if (test) {
            datetimeEl.textContent = testtime;
        }
        else {
            var today = moment().format("ddd., MMM. D YYYY, h:mm a");
            datetimeEl.textContent = today;
        }
    }

    // Called every 60 seconds
    // At 9 am exactly the events from previous day are erased
    function onTimer() {
        SetDisplayTime();
        var currHour = getCurrHour();
        if (currHour > currHourPrevious) {
            currHourPrevious = currHour;
            setEventBackground();
            if (currHour == 17) {
                clearEvents();
                localStorage.setItem("eventsStored", JSON.stringify(eventsStored));
            }
        }
    }

    const m = moment();
    console.log(m.hour());
    console.log(m);
    setAttributes();
    x = setInterval(onTimer, 60000);
  
