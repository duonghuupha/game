let CURRENT_QUESTION = 0;
let GAME_STATUS = ""
let LAST_SCORE = {}
let CURRENT_STATUS = ""
let LAST_STATUS = ""

$(document).ready(function () {
    initButtons()
});

// load trạng thái game
function loadGame(){
    $.get("api/get-game.php",function(res){
        GAME_STATUS = res.status
        // nếu kết thúc
        if(res.status == "finished"){
            clearInterval(GAME_TIMER)
            showRank()
            return
        }
        // nếu sang câu mới
        if((res.current_question != CURRENT_QUESTION && res.status == 'showing') || (res.status == 'showing' && LAST_STATUS != 'showing')){
            CURRENT_QUESTION = res.current_question
            loadQuestion()
            clearTeams()
        }
        LAST_STATUS = res.status
        // chỉ reset các nút KHÔNG liên quan check
        $("#btnOpen").addClass("d-none")
        $("#btnStart").addClass("d-none")
        $("#btnNext").addClass("d-none")
        // WAITING
        if(res.status == "waiting"){
            $("#btnStart").removeClass("d-none")
        }
        // SHOWING
        if(res.status == "showing"){
            $("#btnOpen").removeClass("d-none")
        }
        // CHECKED
        if(res.status == "checked"){
            $("#btnCheck").addClass("d-none")
            $("#btnNext").removeClass("d-none")
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
function renderTrueFalse(q){
    let html = `
        <div class="text-center">
            <img src="images/${q.image}" class="img-fluid mb-4">
            <div class="row">
                <div class="col-6">
                    <button class="btn btn-success w-100 big-btn" disabled>
                        ĐÚNG
                    </button>
                </div>
                <div class="col-6">
                    <button class="btn btn-danger w-100 big-btn" disabled>
                        SAI
                    </button>
                </div>
            </div>
        </div>
    `;
    $("#questionArea").html(html)
}

// CHOICE
function renderChoice(q){
    let data = JSON.parse(q.data_json)
    let html = `
        <img src="images/${q.image}" class="img-fluid mb-4">
        <div class="row">
    `
    data.options.forEach(function(o){
        html += `
            <div class="col-6">
                <img src="images/${o.img}" class="img-fluid">
            </div>
        `
    })
    html += `</div>`
    $("#questionArea").html(html)
}

// DRAG
function renderDrag(q){
    let data = JSON.parse(q.data_json)
    let html = `<div class="pattern-row">`
    data.pattern.forEach(function(p){
        if(p.img){
            html += `
            <div class="pattern-box">
                <img src="images/${p.img}">
            </div>
            `
        }
        if(p.drop){
            html += `<div class="pattern-box drop"></div>`
        }
    })
    html += `</div>`
    // items
    html += `<div class="items-row">`
    data.items.forEach(function(i){
        html += `
        <div class="item">
            <img src="images/${i.img}" class="drag" data-id="${i.id}">
        </div>
        `
    })
    html += `</div>`
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
    $("#team1").removeClass("correct wrong").html("<div>Đội 1</div><div class='stars' id='star1'></div>")
    $("#team2").removeClass("correct wrong").html("<div>Đội 2</div><div class='stars' id='star2'></div>")
    $("#team3").removeClass("correct wrong").html("<div>Đội 3</div><div class='stars' id='star3'></div>")
    $("#team4").removeClass("correct wrong").html("<div>Đội 4</div><div class='stars' id='star4'></div>")
    data.forEach(function(a){
        let box = $("#team"+a.team_id)
        box.html("<div>Đội "+a.team_id+" ✓</div><div class='stars' id='star"+a.team_id+"'></div>")
        if(a.is_correct == 1){
            box.addClass("correct")
            //playCorrect()
        }else if(a.is_correct == 0){
            box.addClass("wrong")
            //playWrong()
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
    /*if(data.length == 4){
        $("#btnCheck").removeClass("d-none")
    }*/
    // neu chua du 4 doi
    if(data.length != 4) return;
    if(GAME_STATUS == "open"){
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
            // nếu score không đổi thì bỏ qua
            if(LAST_SCORE[t.id] == t.score) return
            LAST_SCORE[t.id] = t.score
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
        const modal = new bootstrap.Modal($('#rankModal')[0]);
        //let modal = new bootstrap.Modal(document.getElementById('modalRank'))
        modal.show()
    },"json")
}

function showCorrectAnswer(q){
    if(q.type == "truefalse"){
        let correct = JSON.parse(q.answer_json)
        let text = correct.correct == "true" ? "ĐÚNG" : "SAI"
        $("#questionArea").append(`
            <div class="alert alert-success mt-3 text-center">
                Đáp án: ${text}
            </div>
        `)
    }
    if(q.type == "choice"){
        let data = JSON.parse(q.data_json)
        let correct = JSON.parse(q.answer_json)
        data.options.forEach(function(o){
            if(o.id == correct.correct){
                $("#questionArea").append(`
                    <div class="text-center mt-3">
                        <img src="images/${o.img}" height="120">
                    </div>
                `)
            }
        })
    }

    if(q.type == "drag"){
        let data = JSON.parse(q.data_json)
        let correct = JSON.parse(q.answer_json)
        let html = `<div class="row mt-3 justify-content-center">`
        correct.order.forEach(function(id){
            data.items.forEach(function(i){
                if(i.id == id){
                    html += `
                        <div class="col-2">
                            <img src="images/${i.img}" class="img-fluid">
                        </div>
                    `
                }
            })
        })
        html += `</div>`
        $("#questionArea").append(html)
    }
}

function initButtons(){
    $("#btnStart").removeClass("d-none") // nut mo
    $("#btnOpen").addClass("d-none") // nut bat dau
    $("#btnCheck").addClass("d-none")
    $("#btnNext").addClass("d-none")
    clearServerQuestion()
}

function clearServerQuestion(){
    $("#questionArea").empty()
}

// nút mở câu hỏi
$("#btnStart").click(function () {
    $.post("api/show.php", function(){
        loadQuestion();
        $("#btnStart").addClass("d-none")
        $("#btnOpen").removeClass("d-none")
    })
})

// nút bắt đầu câu hỏi
$("#btnOpen").click(function () {
    $.post("api/open.php")
    $("#btnOpen").addClass("d-none")
})

// nút check
$("#btnCheck").click(function () {
    $.post("api/check.php", function (res) {
        if(res.success){
            $("#btnCheck").addClass("d-none")
            $.get("api/get-question.php",function(q){
                showCorrectAnswer(q)
            },"json")
        }
        /*$.get("api/get-question.php",function(q){
            showCorrectAnswer(q)
        },"json")*/
    }, "json")
})

// nút next
$("#btnNext").click(function () {
    $.post("api/next.php", function(){
        $("#btnNext").addClass("d-none")
        $("#btnCheck").addClass("d-none")
        $("#btnOpen").removeClass("d-none")
        loadQuestion()
    })
})

$("#btnReset").click(function(){
    if(!confirm("Reset game?")) return;
    $.post("api/reset-game.php");
    location.reload()
})

// realtime
let GAME_TIMER = setInterval(function () {
    loadGame()
    loadAnswers()
    loadScore()
}, 1000)