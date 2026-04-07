let CURRENT_QUESTION = 0;


// load trạng thái game
function loadGame(){

    $.get("api/get-game.php",function(res){

    // nếu kết thúc
    if(res.status == "finished"){

    showRank()

    }

    // nếu sang câu mới
    if(res.current_question != CURRENT_QUESTION){

    CURRENT_QUESTION = res.current_question

    loadQuestion()
    clearTeams()

    }

    },"json")

}



// load câu hỏi
function loadQuestion() {

    $.get("api/get-question.php", function (res) {

        renderQuestion(res)

    }, "json")

}



// render câu hỏi (chỉ hiển thị bên phải)
function renderQuestion(q) {

    if (q.type == "truefalse") {
        renderTrueFalse(q)
    }

    if (q.type == "choice") {
        renderChoice(q)
    }

    if (q.type == "drag") {
        renderDrag(q)
    }

}



// TRUE FALSE
function renderTrueFalse(q) {

    let html = `
<img src="images/${q.image}" class="img-fluid">
`

    $("#questionArea").html(html)

}



// CHOICE
function renderChoice(q) {

    let data = JSON.parse(q.data_json)

    let html = `<img src="images/${q.image}" class="img-fluid">`

    $("#questionArea").html(html)

}



// DRAG
function renderDrag(q) {

    let data = JSON.parse(q.data_json)

    let html = `<h2 class="text-center">${q.question}</h2>`

    $("#questionArea").html(html)

}



// load answers realtime
function loadAnswers() {

    $.get("api/get-answers.php",function(res){

    renderTeams(res)

    checkEnough(res)

    },"json")

}



// hiển thị đội
function renderTeams(data){

    $("#team1").removeClass("correct wrong").html("Đội 1")
    $("#team2").removeClass("correct wrong").html("Đội 2")
    $("#team3").removeClass("correct wrong").html("Đội 3")
    $("#team4").removeClass("correct wrong").html("Đội 4")

    data.forEach(function(a){

    let box = $("#team"+a.team_id)

    box.html("Đội "+a.team_id+" ✓")

    if(a.is_correct == 1){

    box.addClass("correct")
    playCorrect()

    }else if(a.is_correct == 0){

    box.addClass("wrong")
    playWrong()

    }

    })

}


function playCorrect(){

    $("#soundCorrect")[0].play()

}

function playWrong(){

    $("#soundWrong")[0].play()

}


// đủ 4 đội -> hiện check
function checkEnough(data) {

    if(data.length == 4){

        $("#btnCheck").removeClass("d-none")

    }

}



// clear khi sang câu mới
function clearTeams() {

    $("#team1").html("")
    $("#team2").html("")
    $("#team3").html("")
    $("#team4").html("")

    $("#btnCheck").addClass("d-none")
    $("#btnNext").addClass("d-none")

}

function loadScore(){

    $.get("api/get-score.php",function(res){

    res.forEach(function(t){

    let stars = ""

    for(let i=0;i<t.score;i++){
    stars += "⭐"
    }

    $("#star"+t.id).html(stars)

    })

    },"json")

}

function starEffect(id){

    let star = $("<div>⭐</div>")

    star.css({
    position:"absolute",
    fontSize:"40px",
    top:"50%",
    left:"50%"
    })

    $("body").append(star)

    star.animate({

    top:"10px",
    opacity:0

    },1000,function(){

    star.remove()

})

}

function showRank(){

    $.get("api/get-rank.php",function(res){

    let html = ""

    res.forEach(function(t,i){

    html += `
    <div class="rank-item">

    <h2>
    ${i+1}. Đội ${t.id} ⭐ ${t.score}
    </h2>

    </div>
    `

    })

    $("#rankBody").html(html)

    $("#rankModal").modal("show")

    },"json")

}



// nút mở câu hỏi
$("#btnStart").click(function () {

    $.post("api/start.php")

})



// nút check
$("#btnCheck").click(function () {

    $.post("api/check.php", function () {

        $("#btnNext").removeClass("d-none")
        $("#btnCheck").addClass("d-none")

    })

})



// nút next
$("#btnNext").click(function () {

    $.post("api/next.php")

})

$("#btnReset").click(function(){

    if(!confirm("Reset game?")) return;

    $.post("api/reset-game.php")

})

// realtime
setInterval(function () {

    loadGame()
    loadAnswers()
    loadScore()

}, 1000)