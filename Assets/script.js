

function setAttributes() {
    var firstDiv = document.getElementById('first-div');
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
    const currHour = moment().hour();
    for (var i=9; i<18; i++) {
        var iDivL = document.createElement('div');
        iDivL.id = 'grid-item-left-'+i;
        console.log(iDivL.id);
        iDivL.className = 'grid-item-left';
        firstDiv.appendChild(iDivL);
    
        var iDivM = document.createElement('textarea');
        iDivM.id = 'grid-item-mid-'+i;
        console.log(iDivM.id);
        iDivM.className = 'grid-item-mid';
        firstDiv.appendChild(iDivM);
        if (i > currHour) {
            $('#'+iDivM.id).css('background', 'lightgreen');
        }
        else if (i == currHour) {
            $('#'+iDivM.id).css('background', 'pink');
        }
        else {
            $('#'+iDivM.id).css('background', 'lightgray');
        }

        var iDivR = document.createElement('div');
        iDivR.id = 'grid-item-right-'+i;
        console.log(iDivR.id);
        iDivR.className = 'grid-item-right';
        firstDiv.appendChild(iDivR);
        $('#'+iDivR.id).css('background', '#01AECC');
        
    }

    var hour;
    for (var i=9; i<18; i++)
    {
        if (i < 12) {
            hour = i + ' AM';
        }
        else {
            hour = i - 12 + ' AM';
        }
        var hourEl = document.getElementById("grid-item-left-" + i);
        hourEl.textContent = hour;
    }

  }    // end of setAtributes

  const m = moment();
  console.log(m.hour());
  console.log(m);
  setAttributes();
  
