cats_dog="";
object_detect=[];
status="";
function preload(){
    cats_dog=loadImage("dog_cat.jpg");
}

function setup(){
    canvas=createCanvas(640,420);
    canvas.center();
    objectDetector= ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function modelLoaded(){
    console.log ("cocossd is Initialized");
    status=true;
    objectDetector.detect(cats_dog,gotResult);
}

function gotResult(error,result){
    if(error){
        console.log (error);
    }
    else{
        console.log (result);

        object_detect= result;
    }
}

function draw(){
    image(cats_dog,0,0,640,420);
    
    if(status != ""){
        for(i=0 ; i<object_detect.length ; i++){
            document.getElementById("status").innerHTML="Status: Object detected";
            percent=floor(object_detect[i].confidence*100);
            fill("#456r8");
            text(object_detect[i].label+" "+percent+"%",object_detect[i].x+15,object_detect[i].y+15);
            noFill();
            stroke("#8u6f99");
            rect(object_detect[i].x,object_detect[i].y,object_detect[i].width,object_detect[i].height);
        }
    }
}