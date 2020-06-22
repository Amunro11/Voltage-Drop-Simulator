

//Global Variables that are required for the math. distanceSlider and currentSlider are object variables. To get the value of distance it would be distanceSlider.value
var distanceSlider = document.getElementById("distance-slider");                  //Get the distance slider object. Used to get the current value of the slider and set max value  
var currentSlider = document.getElementById("current-slider");                    //Get the current slider object. Used to get the current value of the slider and set max value 
var resistance = 0;
var gauge = 0;
var sourceVoltage = 0;
var loadVoltage = 0; 
var droppedVoltage = 0;
var droppedPercent = 0;




//Elements to load in when page is first loaded
document.getElementById("distance").innerHTML = distanceSlider.value + " FT";               //Show the initial value of distance next to the slider bar
document.getElementById("distanceResult").innerHTML = distanceSlider.value + " FT";         //Show the inital value of distance in the results table

document.getElementById("current").innerHTML = "Select Gauge First";                        //Show the initial value of current next to the slider bar. Will update once gauge is selected
document.getElementById("currentResult").innerHTML = "Select Gauge First";                        //Show the inital value of current in the results table. Will update once gauge is selected

document.getElementById("current-slider").disabled=true;                                    //Start with the current slider disabled until the user selects a gauge radiobutton.


//Call the function results, every time that the slider bar is updated. 
distanceSlider.oninput = function() {                                             
    results();                                                                      
}


//Call the function results, every time that the slider bar is updated.
currentSlider.oninput = function() {
    results();
}


function displaySourceVoltage() { 
    var sourceV = document.getElementsByName('sourceVoltage'); 
 
    for (i = 0; i < sourceV.length; i++) { 
        if (sourceV[i].checked) 
         sourceVoltage = sourceV[i].value;
         document.getElementById("sourceVoltageResult").innerHTML = sourceVoltage + " V";
    }

    results();
}           


function displayGauge() { 
    var wireGauge = document.getElementsByName('awg'); 
      
    for (i = 0; i < wireGauge.length; i++) { 
        if(wireGauge[i].checked) 
        gauge = wireGauge[i].value;
    }
    if (gauge == 4) {
        document.getElementById("awg").innerHTML = gauge + " AUGHT";
    }
    else {
        document.getElementById("awg").innerHTML = gauge + " AWG";
    }

    document.getElementById("current-slider").disabled=false;                         //Turn the current slider back on because they selected a gauge.
    document.getElementById("current").innerHTML = currentSlider.value + " A";                    //Once again show the correct value of current that the slider position is in
    document.getElementById("currentResult").innerHTML = currentSlider.value + " A";              //Once again show the correct value of current that the slider position is in 

    results();
}   


function results(){

    switch (gauge) {
        case "14":                                          //since the value of gauge comes from html, it is in string form. Must put quotations or it wont work
            resistance = .0027633;
            currentSlider.max = "15";                       //Change the max value of the current slider bar based on wire gauge. Must be input as a string since its html
            break;
        case "10":
            resistance = .0010933;
            currentSlider.max = "30";
            break;
        case "6":
            resistance = .000433;
            currentSlider.max = "65";
            break;
        case "2":
            resistance = .000171;
            currentSlider.max = "115";
            break;
        case "4":
            currentSlider.max = "230";
            resistance = .00005366;
    }


    if (sourceVoltage !== 0 && gauge !== 0) {

        resistance = resistance * (distanceSlider.value * 2);
        droppedVoltage = currentSlider.value * resistance;
        loadVoltage = sourceVoltage - droppedVoltage;
        droppedPercent = droppedVoltage / sourceVoltage * 100;
   
        document.getElementById("loadVoltageResult").innerHTML = loadVoltage.toFixed (2) + " V";               //Ensure that there is only 2 decimal places shown
        document.getElementById("droppedVoltageResult").innerHTML = droppedVoltage.toFixed (2) + " V";         //Ensure that there is only 2 decimal places shown
        document.getElementById("droppedVoltagePercent" ).innerHTML = droppedPercent.toFixed () + " %";        //Ensure that there is no decimal places shown

    }

    if (gauge !== 0) {

        document.getElementById("current").innerHTML = currentSlider.value + " A";
        document.getElementById("currentResult").innerHTML = currentSlider.value + " A"
    }


    document.getElementById("distance").innerHTML = distanceSlider.value + " FT";                   //Print the value of the slider above the slider bar
    document.getElementById("distanceResult").innerHTML = distanceSlider.value + " FT"              //Print the value of the slider to the results table


}

