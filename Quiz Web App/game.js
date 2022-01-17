let arrqus = Array.from(document.getElementsByClassName('choice-text'))
let question = []

fetch("qustion.json")
.then(response => {
    return response.json();
})
.then(qustion => {
    question = qustion
    startGame();
})
.catch(error => console.log("qustion not found"))

let avaliblequs = []
let quscounter = 0
let score = 0
let currentqus = {}
let correctans 

startGame = () => {
    avaliblequs = [...question]
    score = 0
    quscounter = 0
    nextqus()
}

nextqus = () => {
    if(avaliblequs.length === 0){
        return window.location.assign("/end.html")
    }
    quscounter++;
    document.getElementsByClassName("navbar")[0].innerText = quscounter+"/"+question.length
    document.getElementById("qusbar1").style.width = `${(quscounter/(question.length))*100}%`
    const nextqustionindex = Math.floor(Math.random() * avaliblequs.length)
    currentqus = avaliblequs[nextqustionindex]
    document.getElementById("qustion").innerText = currentqus.question
    
    //console.log(arrqus)
    let i = 0
    arrqus.forEach(choice => {
        let choicearr = currentqus.answers
        choice.innerText = choicearr[i]
        i++
    });
    avaliblequs.splice(nextqustionindex,1)
    correctans = currentqus.answers[currentqus.correctIndex]
}

arrqus.forEach(choice => {
    choice.addEventListener("click" , e => {
        
        if(e.target.innerText === correctans){
            
            score += 10
            document.getElementsByClassName("navscore")[0].innerText = score
            localStorage.setItem("score",score)
            document.getElementById(e.target.id).parentElement.style.backgroundColor = "#008000"
            
            setTimeout(() => {
                
                document.getElementById(e.target.id).parentElement.style.backgroundColor = "#857e7e"
                
                nextqus()
            },500)
            
        }
        else{
            document.getElementById(e.target.id).parentElement.style.backgroundColor = "#ff0000"
            setTimeout(() => {
                document.getElementById(e.target.id).parentElement.style.backgroundColor = "#857e7e"
                nextqus()
            },500)
            
            
        }
        
    })
})