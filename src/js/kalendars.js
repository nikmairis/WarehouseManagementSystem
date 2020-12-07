const calendarWrapperElement = document.getElementById("calendarWrapper");
const monthDropdownElement = document.querySelectorAll(".month-dropdown a");
var times = ["6-00", "6-30", "7-00", "7-30", "8-00", "8-30", "9-00", "9-30", "10-00", "10-30", "11-00", "11-30",
            "12-00", "12-30", "13-00", "13-30", "14-00", "14-30", "15-00", "15-30", "16-00", "16-30", "17-00", "17-30",
            "18-00", "18-30", "19-00", "19-30", "20-00", "20-30"]


//Sets up the month navbar
for(var i = 0; i < monthDropdownElement.length; i++){
    const menesisName = monthDropdownElement[i].dataset.month;
    monthDropdownElement[i].addEventListener('click', e=>{
        localStorage["kalendars_menesis"] = menesisName;
        window.location = "kalendars.html";
    });
    if(monthDropdownElement[i].dataset.month === "Oct" || monthDropdownElement[i].dataset.month === "Nov"
        || monthDropdownElement[i].dataset.month === "Dec")
    {
        monthDropdownElement[i].innerText += "-" + localStorage["sezona"];
    }else{
        var num = parseInt(localStorage["sezona"]);
        num += 1;
        monthDropdownElement[i].innerText += "-" + num;
    }
}

//created the table for the month
for(var i=1; i<=32; i++){
    if(i<=31){
    const itemDiv = document.createElement("div");
    itemDiv.className = "item";

    const tableElement = document.createElement("table");
    tableElement.className = "table table-primary table-bordered datums-" + i;

    const trDateElement = document.createElement("tr");

    const thDateElement = document.createElement("th");
    thDateElement.colSpan = 4;
    thDateElement.className = "text-center";
    thDateElement.innerText = localStorage["kalendars_menesis"] + ". " + i;

    const trTitleElement = document.createElement("tr");

    const thLaiksTitle = document.createElement("th");
    thLaiksTitle.innerText = "Laiks";

    const thBuss1Title = document.createElement("th");
    thBuss1Title.innerText = "Buss 1";

    const thBuss2Title = document.createElement("th");
    thBuss2Title.innerText = "Buss 2";

    const thBuss3Title = document.createElement("th");
    thBuss3Title.innerText = "Buss 3";

    trTitleElement.append(thLaiksTitle);
    trTitleElement.append(thBuss1Title);
    trTitleElement.append(thBuss2Title);
    trTitleElement.append(thBuss3Title);
    trDateElement.append(thDateElement);
    tableElement.append(trDateElement);
    tableElement.append(trTitleElement);

    for(var j=6; j<=20; j++){
        const trFullhourelement = document.createElement("tr");
        trFullhourelement.className =  "time-" + j + "-00";

        const tdLaiksPilns = document.createElement("td");
        tdLaiksPilns.innerText = j + ":00";
        const tdBus1 = document.createElement("td");
        tdBus1.className = "buss1";
        const tdBus2 = document.createElement("td");
        tdBus2.className = "buss2";
        const tdBus3 = document.createElement("td");
        tdBus3.className = "buss3";

        const tdBus1Puse = document.createElement("td");
        tdBus1Puse.className = "buss1";
        const tdBus2Puse = document.createElement("td");
        tdBus2Puse.className = "buss2";
        const tdBus3Puse = document.createElement("td");
        tdBus3Puse.className = "buss3";

        const trHalfhourelement = document.createElement("tr");
        trHalfhourelement.className =  "time-" + j + "-30";

        const tdLaiksPuse = document.createElement("td");
        tdLaiksPuse.innerText = j + ":30";

        trFullhourelement.append(tdLaiksPilns);
        trFullhourelement.append(tdBus1);
        trFullhourelement.append(tdBus2);
        trFullhourelement.append(tdBus3);

        trHalfhourelement.append(tdLaiksPuse);
        trHalfhourelement.append(tdBus1Puse);
        trHalfhourelement.append(tdBus2Puse);
        trHalfhourelement.append(tdBus3Puse);

        tableElement.append(trFullhourelement);
        tableElement.append(trHalfhourelement);

    }
    const printTr = document.createElement('tr');
    const printTd = document.createElement('td');
    printTr.className = "no-print";
    printTd.colSpan = 4;
    const printBtn = document.createElement('button');
    printBtn.className = "btn btn-primary";
    printBtn.id = "printBtn";
    printBtn.innerText = "Printēt!";
    printBtn.style.width = "80%";
    printBtn.addEventListener('click', e=>{
        const tables = document.querySelectorAll(".table");
        for(var t=0; t<tables.length; t++){
            tables[t].className += " no-print";
        }
        const printTable = printBtn.parentElement.parentElement.parentElement;
        printTable.className = printTable.className.replace("no-print", "");
        printTable.style.zoom = "50%";
        window.print();
        printTable.style.zoom = "100%";
    })
    printTd.append(printBtn);
    printTr.append(printTd);
    tableElement.append(printTr);
    itemDiv.append(tableElement);
    calendarWrapperElement.append(itemDiv);
    }else{
        const itemDiv = document.createElement("div");
        itemDiv.className = "item";

        const tableElement = document.createElement("table");
        tableElement.className = "table table-primary table-bordered datums-failed";

        const trDateElement = document.createElement("tr");

        const thDateElement = document.createElement("th");
        thDateElement.colSpan = 4;
        thDateElement.className = "text-center";
        thDateElement.innerText = "Kļūdas";

        const trTitleElement = document.createElement("tr");

        const thLaiksTitle = document.createElement("th");
        thLaiksTitle.innerText = "Laiks";

        const thBuss1Title = document.createElement("th");
        thBuss1Title.innerText = "Buss 1";

        const thBuss2Title = document.createElement("th");
        thBuss2Title.innerText = "Buss 2";

        const thBuss3Title = document.createElement("th");
        thBuss3Title.innerText = "Buss 3";

        trTitleElement.append(thLaiksTitle);
        trTitleElement.append(thBuss1Title);
        trTitleElement.append(thBuss2Title);
        trTitleElement.append(thBuss3Title);
        trDateElement.append(thDateElement);
        tableElement.append(trDateElement);
        tableElement.append(trTitleElement);
        const trFullhourelement = document.createElement("tr");
        trFullhourelement.className =  "laiks-failed";

        const tdLaiksPilns = document.createElement("td");
        tdLaiksPilns.innerText = "Kļūdas:";
        const tdBus1 = document.createElement("td");
        tdBus1.className = "buss1";
        const tdBus2 = document.createElement("td");
        tdBus2.className = "buss2";
        const tdBus3 = document.createElement("td");
        tdBus3.className = "buss3";

        trFullhourelement.append(tdLaiksPilns);
        trFullhourelement.append(tdBus1);
        trFullhourelement.append(tdBus2);
        trFullhourelement.append(tdBus3);

        tableElement.append(trFullhourelement);
        const printTr = document.createElement('tr');
        const printTd = document.createElement('td');
        printTr.className = "no-print";
        printTd.colSpan = 4;
        const printBtn = document.createElement('button');
        printBtn.className = "btn btn-primary";
        printBtn.id = "printBtn";
        printBtn.innerText = "Printēt!";
        printBtn.style.width = "80%";
        printBtn.addEventListener('click', e=>{
            const tables = document.querySelectorAll(".table");
            for(var t=0; t<tables.length; t++){
                tables[t].className += " no-print";
            }
            const printTable = printBtn.parentElement.parentElement.parentElement;
            printTable.className = printTable.className.replace("no-print", "");
            printTable.style.zoom = "50%";
            window.print();
            printTable.style.zoom = "100%";
        })
        printTd.append(printBtn);
        printTr.append(printTd);
        tableElement.append(printTr);
        itemDiv.append(tableElement);
        calendarWrapperElement.append(itemDiv);
    }
}


//Gets the reference of current month in DB
var databaseRefMonth = localStorage["kalendars_menesis"];
if(databaseRefMonth === undefined){
    databaseRefMonth = "Nov";
}
const dbRef = firebase.database().ref().child("data").child("sezonas").child(localStorage["sezona"]);
const menesisRef = dbRef.child("ofiss").child(databaseRefMonth);

//Fills the calendar with orders
menesisRef.on('child_added', snap => {
    if(snap.key === "nosaukums"){
        //monthPlaceholder.innerText = snap.val();
    }else{
            const order = snap.val();
            //Gets the target cell of current order
            var queryDatums = order.datums;
            if(queryDatums.charAt(0) === "0"){
                queryDatums = queryDatums.substr(1);
            }
            var queryLaiks = order.laiks;
            if(queryLaiks.charAt(0) === "0"){
                queryLaiks = queryLaiks.substr(1);
            }

            const targetCell = document.querySelector(".datums-" + queryDatums + " .time-" + queryLaiks + " .buss" + order.buss);
            const singleOrder = snap.val();
            const pasutijumi = singleOrder.pasutijumi;
            const buttonInnerRow = document.createElement("div");
            buttonInnerRow.className = "row";
            const ButtonInnerAdreseCol = document.createElement("div");
            ButtonInnerAdreseCol.className = "col-sm-12";
            ButtonInnerAdreseCol.innerText = singleOrder.adrese;
            const buttonEl = document.createElement("button");
            if(singleOrder.demontaza !== undefined){
                ButtonInnerAdreseCol.innerHTML =ButtonInnerAdreseCol.innerHTML + "<br> <b>[ DEMONTĀŽA ]</b>";
                ButtonInnerAdreseCol.style.whiteSpace = "normal";
                ButtonInnerAdreseCol.style.wordWrap = "break-word";
                buttonInnerRow.append(ButtonInnerAdreseCol);
                buttonEl.className = "btn btn-primary form-control mb-1 " + snap.key;
                buttonEl.dataset.orderId = snap.key;
                buttonEl.append(buttonInnerRow);
                buttonEl.addEventListener('click', e=>{
                    localStorage["pasutijumaID"] = snap.key;
                    //window.location.href="pasutijumaDetalas.html";
                    window.open('demontazasDetalas.html', '_blank', 'nodeIntegration=no, width=680, height=800, left=200, top=200');
                })
            }else{
                if(singleOrder.uzstadisana === "true"){
                    ButtonInnerAdreseCol.innerHTML =ButtonInnerAdreseCol.innerHTML + "<br> <b>[ Uzstādīšana ]</b>";
                }
                ButtonInnerAdreseCol.style.whiteSpace = "normal";
                ButtonInnerAdreseCol.style.wordWrap = "break-word"
                buttonInnerRow.append(ButtonInnerAdreseCol);
                for(const loopCat in pasutijumi){
                    for(const loopItem in pasutijumi[loopCat]){
                        const buttonInnerCol = document.createElement("div");
                        buttonInnerCol.className = "col-sm-12";
                        buttonInnerCol.innerText = pasutijumi[loopCat][loopItem].nosaukums +
                             '  [' + pasutijumi[loopCat][loopItem].skaits + " gb.]";
                        buttonInnerCol.style.whiteSpace = "normal";
                        buttonInnerCol.style.wordWrap = "break-word"
                        buttonInnerRow.append(buttonInnerCol);
                    }
                }
                buttonEl.className = "btn btn-primary form-control mb-1 " + snap.key;
                buttonEl.dataset.orderId = snap.key;
                buttonEl.append(buttonInnerRow);
                buttonEl.addEventListener('click', e=>{
                    localStorage["pasutijumaID"] = snap.key;
                    //window.location.href="pasutijumaDetalas.html";
                    window.open('pasutijumaDetalas.html', '_blank', 'nodeIntegration=no, width=680, height=800, left=200, top=200');
                })
            }
            try{
                targetCell.append(buttonEl);
            }catch(err){
                const failCell = document.querySelector(".datums-failed" + " .laiks-failed" + " .buss" + order.buss);
                //console.log(buttonEl.innerHTML)
                console.log(snap.key)
                console.log(".datums-" + queryDatums + " .time-" + queryLaiks + " .buss" + order.buss);
                failCell.append(buttonEl);

            }

            //reads how long the delivery will take
            var ilgums = order.ilgums;
            var ilgumsArray = ilgums.split("-");
            //calculates how long the delivery will take
            var ilgumsIndex = parseInt(ilgumsArray[0], 10) * 2;
            if(ilgumsArray[1] === "30"){
                ilgumsIndex++;
            }
            //gets the index of current time in the manually defined array
            var startTimeIndex = null;
            for(var indexFinder = 0; indexFinder < times.length; indexFinder++){
                if(times[indexFinder] === order.laiks){
                    startTimeIndex = indexFinder;
                    break;
                }
            }
            //loop that books following fields, if the delivery takes longer than 30 mins;
            for(var bookIndex = 1; bookIndex < ilgumsIndex; bookIndex++){
                try{
                    var targetBookingCell = document.querySelector(".datums-" + queryDatums + " .time-" + times[startTimeIndex+bookIndex] + " .buss" + order.buss);
                    var buttonBookEl = document.createElement("button");
                    buttonBookEl.className = "btn btn-outline-primary form-control mb-1 " + snap.key;
                    if(order.demontaza !== undefined){
                        buttonBookEl.innerHTML = snap.val().adrese + "<br> [DEMONTĀŽA]";
                    }else{
                        buttonBookEl.innerHTML = snap.val().adrese + "<br> [Izkraušana/uzstādīšana]";
                    }
                    buttonBookEl.style.whiteSpace = "normal";
                    buttonBookEl.style.wordWrap = "break-word";
                    targetBookingCell.append(buttonBookEl);
                }catch(err){
                    console.log("Out of bounds!")
                }
            }

    }
})

menesisRef.on('child_changed', snap => {
    if(snap.key === "nosaukums"){
        //monthPlaceholder.innerText = snap.val();
    }else{
        try{
            const buttons = document.querySelectorAll("." + snap.key);
            for(var i=0; i<buttons.length; i++){
                buttons[i].remove();
            }
            const order = snap.val();
            //Gets the target cell of current order
            const targetCell = document.querySelector(".datums-" + order.datums + " .time-" + order.laiks + " .buss" + order.buss);

            const singleOrder = snap.val();
            const pasutijumi = singleOrder.pasutijumi;
            const buttonInnerRow = document.createElement("div");
            buttonInnerRow.className = "row";
            const ButtonInnerAdreseCol = document.createElement("div");
            ButtonInnerAdreseCol.className = "col-sm-12";
            ButtonInnerAdreseCol.innerText = singleOrder.adrese;
            const buttonEl = document.createElement("button");
            if(singleOrder.demontaza !== undefined){
                ButtonInnerAdreseCol.innerHTML =ButtonInnerAdreseCol.innerHTML + "<br> <b>[ DEMONTĀŽA ]</b>";
                ButtonInnerAdreseCol.style.whiteSpace = "normal";
                ButtonInnerAdreseCol.style.wordWrap = "break-word"
                buttonInnerRow.append(ButtonInnerAdreseCol);
                buttonEl.className = "btn btn-primary form-control mb-1 " + snap.key;
                buttonEl.dataset.orderId = snap.key;
                buttonEl.append(buttonInnerRow);
                buttonEl.addEventListener('click', e=>{
                    localStorage["pasutijumaID"] = snap.key;
                    //window.location.href="pasutijumaDetalas.html";
                    window.open('demontazasDetalas.html', '_blank', 'nodeIntegration=no, width=680, height=800, left=200, top=200');
                })
            }else{
                if(singleOrder.uzstadisana === "true"){
                    ButtonInnerAdreseCol.innerHTML =ButtonInnerAdreseCol.innerHTML + "<br> <b>[ Uzstādīšana ]</b>";
                }
                ButtonInnerAdreseCol.style.whiteSpace = "normal";
                ButtonInnerAdreseCol.style.wordWrap = "break-word"
                buttonInnerRow.append(ButtonInnerAdreseCol);
                for(const loopCat in pasutijumi){
                    for(const loopItem in pasutijumi[loopCat]){
                        const buttonInnerCol = document.createElement("div");
                        buttonInnerCol.className = "col-sm-12";
                        buttonInnerCol.innerText = pasutijumi[loopCat][loopItem].nosaukums +
                             '  [' + pasutijumi[loopCat][loopItem].skaits + " gb.]";
                        buttonInnerCol.style.whiteSpace = "normal";
                        buttonInnerCol.style.wordWrap = "break-word";
                        buttonInnerRow.append(buttonInnerCol);
                    }
                }
                buttonEl.className = "btn btn-primary form-control mb-1 " + snap.key;
                buttonEl.dataset.orderId = snap.key;
                buttonEl.append(buttonInnerRow);
                buttonEl.addEventListener('click', e=>{
                    localStorage["pasutijumaID"] = snap.key;
                    //window.location.href="pasutijumaDetalas.html";
                    window.open('pasutijumaDetalas.html', '_blank', 'nodeIntegration=no, width=680, height=800, left=200, top=200');
                })
            }
            targetCell.append(buttonEl);

            //reads how long the delivery will take
            var ilgums = order.ilgums;
            var ilgumsArray = ilgums.split("-");
            //calculates how long the delivery will take
            var ilgumsIndex = parseInt(ilgumsArray[0], 10) * 2;
            if(ilgumsArray[1] === "30"){
                ilgumsIndex++;
            }
            //gets the index of current time in the manually defined array
            var startTimeIndex = null;
            for(var indexFinder = 0; indexFinder < times.length; indexFinder++){
                if(times[indexFinder] === order.laiks){
                    startTimeIndex = indexFinder;
                    break;
                }
            }
            //loop that books following fields, if the delivery takes longer than 30 mins;
            for(var bookIndex = 1; bookIndex < ilgumsIndex; bookIndex++){
                try{
                    var targetBookingCell = document.querySelector(".datums-" + order.datums + " .time-" + times[startTimeIndex+bookIndex] + " .buss" + order.buss);
                    var buttonBookEl = document.createElement("button");
                    buttonBookEl.className = "btn btn-outline-primary form-control mb-1 " + snap.key;
                    if(order.demontaza !== undefined){
                        buttonBookEl.innerHTML = snap.val().adrese + "<br> [DEMONTĀŽA]";
                    }else{
                        buttonBookEl.innerHTML = snap.val().adrese + "<br> [Izkraušana/uzstādīšana]";
                    }
                    targetBookingCell.style.whiteSpace = "normal";
                    targetBookingCell.style.wordWrap = "break-word"
                    targetBookingCell.append(buttonBookEl);
                }catch(err){
                    console.log("Out of bounds!")
                }
            }
        }catch(er){
            console.log("Kļūda!");
        }
    }
})

menesisRef.on('child_removed', snap => {
    if(snap.key === "nosaukums"){
        //monthPlaceholder.innerText = snap.val();
    }else{
        try{
            const buttons = document.querySelectorAll("." + snap.key);
            for(var i=0; i<buttons.length; i++){
                buttons[i].remove();
            }
        }catch(err){
            console.log(err);
        }
    }
})