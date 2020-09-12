var req
var data

function start() {
    loadJSON()
}

function loadJSON() {
    req = new XMLHttpRequest();
    req.open("GET", "dummy-data.json");
    req.onreadystatechange = loadRes;
    req.send(null);
}

function loadRes() {
    if (req.readyState == 4 && req.status == 200) {
        loadJSONFromFile();
    }
}

function loadJSONFromFile() {
    data = JSON.parse(req.responseText);
    generateHTML()
}

function generateHTML() {
    let labelPages = document.getElementById("labelPages");
    let labelPagesHTML = ""

    labelPagesHTML += `<div class="page">`;
    for (let unit = 0; unit < data.data.length; unit++) {
        if (unit % 4 === 0 && unit > 0) {
            labelPagesHTML += `</div>`;
            labelPagesHTML += `<div class="page">`
        }
        labelPagesHTML += `<div class="quarter">`
        labelPagesHTML += `<span class="unit"><h1>${data.data[unit].unit}</h1></span>`

        let quarterHTML = ""
        quarterHTML += `<span class="wifi"><div class="center"><h3>Wifi</h3>`
        quarterHTML += `<p>Network name:<br><strong>${data.data[unit].ssid}</strong><br>`
        quarterHTML += `Password:<br><strong>${data.data[unit].password}</strong></p>`
        quarterHTML += `<p class="small center">Need assistance?<br>Call 484-464-0521<br>Your code is:<br><strong>${data.data[unit].code}</strong></p>`
            //quarterHTML += `<p class="small">Your password has been randomly generated to ensure the security of your network.</p>`
        quarterHTML += `</div><div class="center"><p class="small"><strong>WARNING</strong><br>Do not press RESET</p></div></span>`

        // Repeat to make 2 labels with wifi info
        labelPagesHTML += quarterHTML
        labelPagesHTML += quarterHTML
        labelPagesHTML += '</div>'
    }

    labelPagesHTML += '</div>'
    labelPages.innerHTML = labelPagesHTML
}