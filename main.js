song1 = '';
song2 = '';

lwScore = 0;
rwScore = 0;

song1Status = "";
song2Status = "";

lwx = 0
lwy = 0
rwx = 0
rwy = 0

function preload() {
    song1 = loadSound('duck.mp3');
    song2 = loadSound('spy.mp3');
}

function setup() {
    canvas = createCanvas(600,500)
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("Model has loaded!");
}

function gotPoses(results){
    if (results.length > 0) {
        console.log(results);

        lwx = results[0].pose.leftWrist.x;
        lwy = results[0].pose.leftWrist.y;
        rwx = results[0].pose.rightWrist.x;
        rwy = results[0].pose.rightWrist.y;

        lwScore = results[0].pose.keypoints[9].score;
        rwScore = results[0].pose.keypoints[10].score;

        console.log("left wrist score is " + lwScore);
        console.log("right wrist score is " + rwScore);

        funnything = [lwx, lwy, rwx, rwy];

        console.log("Starting in order from Left Wrist X to Left Wrist Y and Right Wrist X to Right Wrist Y" + funnything);
    }
}

function draw() {
    image(video, 0, 0, 600, 600);

    song1.isPlaying();
    console.log("Q: Is song1 playing? A: " + song1.isPlaying());
    song1Status = song1.isPlaying();
    song2Status = song2.isPlaying();

    if (lwScore > 0.2) {
        fill("#FF0000");
        stroke("#FF0000");
        circle(lwx, lwy, 20);
        song2.stop();

        if (song1Status == false) {
            song1.play();

            document.getElementById("song").innerHTML = "Duck";
        }
    }

    if (rwScore > 0.2) {
        fill("#0080FF");
        stroke("#0080FF");
        circle(rwx, rwy, 20);
        song1.stop();

        if (song2Status == false) {
            song2.play();

            document.getElementById("song").innerHTML = "Spy";
        }
    }

}