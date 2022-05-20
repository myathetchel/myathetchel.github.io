$(".openbtn1").click(function () {//ボタンがクリックされたら
    $(this).toggleClass('active');//ボタン自身に activeクラスを付与し
    $("#g-nav").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
    $(".circle-bg").toggleClass('circleactive');//丸背景にcircleactiveクラスを付与
});

$("#g-nav a").click(function () {//ナビゲーションのリンクがクリックされたら
    $(".openbtn1").removeClass('active');//ボタンの activeクラスを除去し
    $("#g-nav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスを除去
    $(".circle-bg").removeClass('circleactive');//丸背景のcircleactiveクラスを除去
});
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", navHighlighter);
function navHighlighter() {           
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 150;
    sectionId = current.getAttribute("id");
    
    if (
        scrollY > sectionTop &&
        scrollY <= sectionTop + sectionHeight
    ){
        document.querySelector(".navigation a[href*=" + sectionId + "]").classList.add("nav-active");
        document.querySelector("#about").classList.add("blue");
    } else {
        document.querySelector(".navigation a[href*=" + sectionId + "]").classList.remove("nav-active");
    }
    });
}

// window.addEventListener('scroll',(e)=>{
//     const navbar = document.getElementById("navbar");
//     if(window.pageYOffset>750){
//     navbar.classList.add("add-shadow");
//     }else{
//     navbar.classList.remove("add-shadow");
//     }
// });

function reveal() {
var reveals = document.querySelectorAll(".reveal");

for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
    reveals[i].classList.add("active");
    } else {
    reveals[i].classList.remove("active");
    }
}

}
window.addEventListener("scroll", reveal);

