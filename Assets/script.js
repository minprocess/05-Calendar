var eventsStored;  // Events for each hour stored in array. Saved to and read from localStorage

function setAttributes() {
    var firstDiv = document.getElementById('first-div');

    eventsStored = JSON.parse(localStorage.getItem("eventsStored") || "[]");
    console.log("setAttributes eventsStored.length", eventsStored.length);
    if (eventsStored.length == 0) {
      for (var i=0; i<9; i++) {
        eventsStored[i] = "";
      }
    }
/*
    var iDiv = document.createElement('div');
    iDiv.id = 'block'+'-1';
    console.log(iDiv.id);
    //iDiv.className = 'block';
    firstDiv.appendChild(iDiv);
    var iDiv2 = document.createElement('div');
    iDiv2.id = 'block'+'-2';
    console.log(iDiv2.id);
    //iDiv.className = 'block';
    firstDiv.appendChild(iDiv2);    
*/
    //const currHour = moment().hour();
    const currHour = 11;
    for (var i=9; i<18; i++) {
        var iDivL = document.createElement('div');
        iDivL.id = 'grid-item-left-'+i;
        console.log(iDivL.id);
        iDivL.className = 'grid-item-left';
        $('#'+iDivL.id).addClass( "hour" )

        firstDiv.appendChild(iDivL);
    
        var iDivM = document.createElement('textarea');
        iDivM.id = 'grid-item-mid-'+i;
        console.log(iDivM.id);
        iDivM.className = 'grid-item-mid';
        firstDiv.appendChild(iDivM);
        if (i > currHour) {
            //$('#'+iDivM.id).css("#future");
            $('#'+iDivM.id).addClass( "future" )
        }
        else if (i == currHour) {
            $('#'+iDivM.id).addClass('present');
        }
        else {
            $('#'+iDivM.id).addClass('past');
        }

//        var iDivR = document.createElement('div');
        var iDivR = document.createElement('button');
        iDivR.id = 'grid-item-right-'+i;
        console.log(iDivR.id);
        iDivR.className = 'grid-item-right';
        $('#'+iDivR.id).addClass("saveBtn saveBtn i:hover");
        //$('#'+iDivR.id).attr("data-index", i);
        //console.log($('#'+iDivR.id).attr("data-index"));
        iDivR.setAttribute("data-index", i-9);
        firstDiv.appendChild(iDivR);
        //$('#'+iDivR.id).css('background', '#01AECC');

    }

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
    var j;
    for (var i=9; i<18; i++) {
        cellId = '#grid-item-mid-'+i;
        console.log("At send of set attributes cellID eventsStored[i]",  cellId, eventsStored[i-9]);
        //var eventEl = document.getElementById(cellId);
        var eventEl = document.querySelector(cellId);
        eventEl.value = eventsStored[i-9];
    }   // end of loop that fills table with stored events
  }    // end of setAtributes

  /*
  function setEventBackground() {
      for (var i=9; i<18 i++) {
        cellId = '#grid-item-mid-'+i;
        var currClass = document.querySelector(cellId);
        var colorShouldbe = 
        if (currC)
      }
  }
*/
  function bgColorFromHour() {
    cellId = '#grid-item-mid-'+i;
    if (i > currHour) {
      //$('#'+iDivM.id).css("#future");
      $('#'+iDivM.id).addClass( "future" )
    }
    else if (i == currHour) {
        $('#'+iDivM.id).addClass('present');
    }
    else {
        $('#'+iDivM.id).addClass('past');
    }
  }

  function btnClickHandler(e) {
    //var target = e.target; // Clicked element
    //console.log("target ", target);
    //var i = $("button").attr("data-index");

    var i = $(this).attr("data-index");
    console.log("btnClickHandler index: ", i)
    var j = parseInt(i)+9;
    var cellId = '#grid-item-mid-'+j;
    console.log("In btnClickHandler cellId ",  cellId);
    //var eventEl = document.getElementById(cellId);
    var eventEl = document.querySelector(cellId);

    console.log("In btClickHandler( ) eventEl.value", eventEl.value);
    eventsStored[i] = eventEl.value;


    localStorage.setItem("eventsStored", JSON.stringify(eventsStored));
  }

  const m = moment();
  console.log(m.hour());
  console.log(m);
  setAttributes();
  
