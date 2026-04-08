<!DOCTYPE html>
<html>

<head>
    <title>Title of the document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.min.js"></script>
    <link href="https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css" rel="stylesheet">
    <link href="css/global.css" rel="stylesheet">
</head>

<body>
    <div class="container-fluid">
        <div class="row vh-100">
            <!-- LEFT -->
            <div class="col-2 p-2">
                <div class="team-box team1" id="team1">
                    <div>Đội 1</div>
                    <div class="stars" id="star1"></div>
                </div>

                <div class="team-box team2" id="team2">
                    <div>Đội 2</div>
                    <div class="stars" id="star2"></div>
                </div>

                <div class="team-box team3" id="team3">
                    <div>Đội 3</div>
                    <div class="stars" id="star3"></div>
                </div>

                <div class="team-box team4" id="team4">
                    <div>Đội 4</div>
                    <div class="stars" id="star4"></div>
                </div>
                <hr>
                <button id="btnStart" class="btn btn-primary w-100 big-btn mb-2">
                    MỞ
                </button>
                <button id="btnOpen" class="btn btn-primary w-100 big-btn mb-2">
                    BẮT ĐẦU
                </button>
                <button id="btnCheck" class="btn btn-success w-100 big-btn mb-2 d-none">
                    KIỂM TRA
                </button>
                <button id="btnNext" class="btn btn-warning w-100 big-btn d-none">
                    TIẾP
                </button>
                <button id="btnReset" class="btn btn-danger w-100 mt-2">
                    RESET
                </button>

            </div>
            <!-- RIGHT -->
            <div class="col-10 p-3">
                <div class="question-box h-100" id="questionArea">
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="rankModal">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header text-center">
                    <h3>BẢNG XẾP HẠNG</h3>
                </div>
                <div class="modal-body" id="rankBody"></div>
            </div>
        </div>
    </div>
    <!--<audio id="soundCorrect" src="sound/correct.mp3"></audio>
    <audio id="soundWrong" src="sound/wrong.mp3"></audio>-->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"></script>
    <script src="js/server.js"></script>
</body>

</html>