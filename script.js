console.log("loaded extention")
//let debug = ""
if (typeof debug == "undefined"){
    console.log = function(){}
}
document.body.onload = setTimeout(calculate,3000);

function calculate(){
    let table = document.getElementsByClassName("table-month")
    if (table.length < 1){
        return
    }else{
        table = Array.prototype.slice.call(table)
    }
    for (let i=0;i<table.length;i++){
        if (!(table[i].classList.length == 1)){
            table.splice(i,1)
        }
    }
    if (table.length !== 1){
        return
    }else{
        table = table[0]
    }
    console.log(table)
    let tableText = table.textContent
    tableText = tableText.replaceAll(" ","").replaceAll("\n","")
    let days = tableText.match(/[A-ZÁ-Ž]([a-z]){2}(?![a-z0-9])/gm)
    let validDays = ["Pon", "Uto", "Str", "Štv", "Pia", "Sob", "Ned"]
    for (let i=0;i<days.length;i++){
        if (!(validDays.includes(days[i]))){
            days.splice(i,1)
        }
    }
    let hoursWrapper = document.getElementsByClassName("day ng-scope")
    let workHours = []
    for (i=0;i<days.length;i++){
        let temp = hoursWrapper[i].children
        workHours.push([temp[0].innerText,temp[1].innerText,temp[0].innerText==""?null:hoursWrapper[i].classList.length>2?true:false])
    }
    console.log(workHours)
    var breaks = 0
    for (i=0;i<workHours.length;i++){
        if (workHours[i][2]==null){
            console.log("skipped: "+workHours[i])
            workHours.splice(i,1)
            i--
            continue
        }
        let temp = workHours[i]
        console.log(temp)
        let start = new Date("2007-01-01T"+temp[0].split(" ").join(":")).getHours()
        let end = new Date("2007-01-01T"+temp[1].split(" ").join(":")).getHours()
        let diff = end - start
        console.log(diff)
        if (diff >= 6){
            breaks += 1
            diff = diff - 0.30
        }
        if (temp[2]===false){
            workHours[i] = []
            workHours[i].push(diff*4.8)
            workHours[i].push(false)
        }else{
            workHours[i] = []
            workHours[i].push(diff*7.2)
            workHours[i].push(true)
        }
    }
    console.log(workHours)
    let sum = 0
    let map = {"d":0,"w":0}
    for (i=0;i<workHours.length;i++){
        sum = sum + workHours[i][0]
        map[workHours[i][1]==true?"w":"d"] += 1
    }
    console.log(sum)
    document.body.innerHTML += `<div style=\"margin: 0 auto; display: table; background-color: hsl(96, 43%, 58%); border-radius: 25px; padding: 15px;\">Your salary for this month will be: ${sum.toFixed(2)}€<br>Normal days: ${map.d}<br>Weekend days: ${map.w}<br>Breaks: ${breaks}</div>`
    return
}