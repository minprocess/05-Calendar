    var eventsStored;  // Events for each hour stored in array. Saved to and read from localStorage
    var x;
    var currHourPrevious;

    function setAttributes() {
        var firstDiv = document.getElementById('first-div');

        eventsStored = JSON.parse(localStorage.getItem("eventsStored") || "[]");
        console.log("setAttributes eventsStored.length", eventsStored.length);
        if (eventsStored.length == 0) {
            for (var i=0; i<9; i++) {
                eventsStored[i] = "";
            }
        }

        var today = moment().format("ddd, MMM D YYYY, h:mm a")
        var datetimeEl = document.querySelector("#clock");
        datetimeEl.textContent = today;

        const currHour = getCurrHour();
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
    }    // end of setAtributes

    function getCurrHour() {
        var currHour = moment().hour();
        currHour = 11;
        return currHour;
    }

    function clearEvents() {
        for (var i=9; i<18; i++) {
            cellId = '#grid-item-mid-'+i;
            var eventEl = document.querySelector(cellId);
            eventEl.textConent = "";
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
        console.log("btnClickHandler index: ", i)
        var j = parseInt(i)+9;
        var cellId = '#grid-item-mid-'+j;
        console.log("In btnClickHandler cellId ",  cellId);
        var eventEl = document.querySelector(cellId);

        console.log("In btClickHandler( ) eventEl.value", eventEl.value);
        eventsStored[i] = eventEl.value;

        localStorage.setItem("eventsStored", JSON.stringify(eventsStored));
    }

    // Called every 60 seconds
    // At 9 am exactly the events from previous day are erased
    function onTimer() {
        var today = moment().format("ddd, MMM D YYYY, h:m a")
        var datetimeEl = document.querySelector("#clock");
        datetimeEl.textContent = today;

        var currHour = getCurrHour();
        if (currHour > currHourPrevious) {
            currHourPrevious = currHour;
            setEventBackground();
            if (currHour == 9) {
                clearEvents();
                localStorage.setItem("eventsStored", JSON.stringify(eventsStored));
            }
        }
    }

    const m = moment();
    console.log(m.hour());
    console.log(m);
    setAttributes();
    x = setInterval(onTimer(), 60000);
  
