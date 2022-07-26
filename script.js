var loaded = 4;
document.addEventListener('DOMContentLoaded', function () {

    function parseJSON(data) {
        str = JSON.stringify(data)
        jsondata = JSON.parse(str)
        counter = 0;

        jsondata.forEach(element => {
            if (counter == 4) {
                return;
            }
            const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];
            dateAndTime = element.date.split(" ")
            pom = dateAndTime + ""
            const d = new Date(dateAndTime[0])
            var date = pom[8] + pom[9] + " " + month[d.getMonth()] + " " + d.getFullYear()
            var div = document.createElement("div")
            var html = ['<div class="card" style="border:1px solid grey;  " >',
                '<div class="header">',
                '<img class="user-image" src="' + element.profile_image + '" align="left"></img>',
                '<p class="user-name" >' + element.name + '</p>',
                '<span class="span-pos"><img class="insta-logo" src="icons/instagram-logo.svg"</img></span>',
                '<div class="instagram-card-time"><p class="post-date">' + date + '</p></div>',
                '</div>',
                '<div class="card-image">',
                '<img class="post-image" src="' + element.image + ' " align="center"/>',
                '</div>',
                '<div class="content">',
                '<p class="text">' + element.caption + '</p>',
                '</div>',
                '<div class="like-button">',
                '<img id="srce" src="icons/heart.svg" class="likeShape" onclick="heart(this,' + element.likes + ',' + counter + ')" align="left"></img>',
                '<p id="likes' + counter + '">' + element.likes + '</p>',
                '</div>',
                '</div>'].join('');
            div.innerHTML = html;
            document.getElementById("cards").appendChild(div);
            counter += 1;

        });
        var button = document.createElement("button");
        var funk = "more(" + str + ")";
        button.setAttribute("id", "loadmore");
        button.setAttribute("onclick", funk.toString());
        button.innerHTML = "Load More";
        document.getElementById("grid").appendChild(button)
    }


    fetch("data.json")
        .then(response => {
            return response.json();
        })
        .then(jsondata => {
            parseJSON(jsondata)
        })


}, false);

function more(data) {
    str = JSON.stringify(data)
    jsondata = JSON.parse(str)
    counter = loaded;
    var n = Object.keys(jsondata).length;

    for (var i = loaded; i < loaded + 4; ++i) {


        const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        dateAndTime = jsondata[i].date.split(" ")
        pom = dateAndTime + ""
        const d = new Date(dateAndTime[0])
        var date = pom[8] + pom[9] + " " + month[d.getMonth()] + " " + d.getFullYear()
        console.log(i + " " + dateAndTime[0])
        var div = document.createElement("div")
        var html = ['<div class="card" style="border:1px solid grey;" >',
            '<div class="header">',
            '<img class="user-image" src="' + jsondata[i].profile_image + '" align="left"></img>',
            '<p class="user-name" >' + jsondata[i].name + '</p>',
            '<span class="span-pos"><img class="insta-logo" src="icons/instagram-logo.svg"</img></span>',
            '<div class="instagram-card-time' + jsondata[i].date + '"><p class="post-date">' + date + '</p></div>',
            '</div>',
            '<div class="card-image">',
            '<img class="post-image" id="slika' + i + '" src="' + jsondata[i].image + ' " align="center"/>',
            '</div>',
            '<div class="content">',
            '<p class="text">' + jsondata[i].caption + '</p>',
            '</div>',
            '<div class="like-button">',
            '<img id="srce" src="icons/heart.svg" class="likeShape" onclick="heart(this,' + jsondata[i].likes + ',' + counter + ')" align="left"></img>',
            '<p id="likes' + counter + '">' + jsondata[i].likes + '</p>',

            '</div>',
            '</div>'].join('');
        div.innerHTML = html;
        document.getElementById("cards").appendChild(div);
        counter += 1;
        if (counter == n) {
            kopce = document.getElementById("loadmore");
            kopce.style.visibility = 'hidden';

            break;
        }
    }
    loaded += 4
}


function heart(el, num, counter) {
    source = el.src;
    para = document.getElementById("likes" + counter);
    if (source.indexOf("icons/heart.svg") != -1) {
        br = parseInt(para.textContent) + 1
        para.innerHTML = br
        el.setAttribute("src", "icons/heart2.svg");
    }
    else {
        br = parseInt(para.textContent) - 1
        para.innerHTML = br
        el.setAttribute("src", "icons/heart.svg");
    }

}