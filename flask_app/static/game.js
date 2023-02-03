console.log("Script be linked")
const URL = filterurl(document.querySelector("#game_setup").innerHTML)
function filterurl(string){
    var newstring = ""
    for(z = 0; z < string.length; z++){
        if(string[z] + string[z+1] + string[z+2] + string[z+3] == "amp;"){
            z = z + 3
        }
        else{
            newstring += string[z]
        }
    }
    return newstring
}

let i = 0
let functiondata = {}
let answered = "no"
let correctness = ""
const display2 = document.querySelector("#praise_or_humiliation")
const display = document.querySelector("#where_the_magic_happens")
const display3 = document.querySelector("#questiondiv")
const display4 = document.querySelector("#admonishment")
function play(event) {
    event.preventDefault()
    console.log("success")
    display.innerHTML = "Loading....."
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            i = 0
            functiondata = data

            startgame()
        })
        .catch(err => console.log(err))
}

function startgame() {
    display4.innerHTML = ''
    display2.innerHTML = ''
    if (i < functiondata.results.length) {
        display3.innerHTML = `<h2> ${functiondata.results[i].question} <h2>`
        if (functiondata.results[i].incorrect_answers[1]) {
            var arr = [
                functiondata.results[i].incorrect_answers[0],
                functiondata.results[i].incorrect_answers[1],
                functiondata.results[i].incorrect_answers[2],
                filterquotes(functiondata.results[i].correct_answer)]
            var q = Math.floor(Math.random() * 4)
            var w = Math.floor(Math.random() * 3)
            var e = Math.floor(Math.random() * 2)
            var temp = q
            q = arr[q]
            arr.splice(temp, 1)
            q = filterquotes(q)
            temp = w
            w = arr[w]
            arr.splice(temp, 1)
            w = filterquotes(w)
            temp = e
            e = arr[e]
            arr.splice(temp, 1)
            e = filterquotes(e)
            var r = filterquotes(arr[0])
                display.innerHTML = `
                <button id = "bt1" class = "skooch btn btn-secondary btn-primary" onclick='answer( "${q}","${functiondata.results[i].correct_answer}")'> ${q} 
                <button id = "bt2" class = "skooch btn btn-secondary btn-primary" onclick='answer( "${w}", "${functiondata.results[i].correct_answer}")'> ${w} 
                <button id = "bt3" class = "skooch btn btn-secondary btn-primary" onclick='answer( "${e}", "${functiondata.results[i].correct_answer}")'> ${e} 
                <button id = "bt4" class = "skooch btn btn-secondary btn-primary" onclick='answer( "${r}", "${functiondata.results[i].correct_answer}")'> ${r} 
                `
        }
        else {
            
            if (functiondata.results[i].correct_answer == "True") {
                var e = filterquotes(functiondata.results[i].correct_answer)
                var r = functiondata.results[i].incorrect_answers[0]
            }
            else {
                var r = filterquotes(functiondata.results[i].correct_answer)
                var e = functiondata.results[i].incorrect_answers[0]
            }
            display.innerHTML = `
                        <button class = "bt1 skooch btn btn-secondary btn-primary" onclick="answer('${e}', '${functiondata.results[i].correct_answer}')"> ${e}
                        <button class = "bt2 skooch btn btn-secondary btn-primary" onclick="answer('${r}', '${functiondata.results[i].correct_answer}')"> ${r}
                        `
        }
    }
    else {
        display3.innerHTML = ''
        display.innerHTML = ` <h2 class = "text-warning"> That's all folks if you're left longing for more titalating trivia increase the number of questions in the <a href = "/">Home </a> <h2 class = "text-warning"> page Or hit the Start Round button again to take another quiz with the same settings. 
        
        `
    }
    // function colorbutton(button){
    //     if(correctness == "yes"){
    //         document.querySelector("#" + button).background-color = 
    //     }
    // }
}
function answer(answer1, data) {
    console.log("answered")
    if(answered == "yes"){
        admonish()
    }
    else{
    var insults = [
        "BAHAHAHA you incompetent bafoon what kind of answer was THAT!!",
        "Intelligence is relative maybe when you're a bit older you'll be able to compete intellectually with kindergardeners",
        "You are evidence that natural selection is only a theory",
        "Wisdom and knowledge are easily distinguishable but I'd still bet my left kidney that you have neither",
        "Special kids are given helmets but you my friend need an Iron Man suit.",
        "I know kids who were dropped as babies, using them as a reference you must have been fired from a canon",
        "The organism that gave you the sustenance to think of that answer is shaming you from heaven",
        "They say sleep deprivation leads to poor judgement, maybe it's time to lay down after a week.",
        "Most people learn from a failure, but I struggle to think of anything someone could learn from you",
        "Is six figures alot? Depends, Dollars:yes, Neurons:no",
        "ACHOO I'm ACHOO I'm sorry I'm ACHOO allergic to ACHOO imbeciles",
        "Does Kim Kardashian pay you to make her seem like more of an intellectual?",
        "If opposites truly attract your spouse will probably cure cancer",
        "How many teachers lost their jobs before the principle discovered you're beyond help",
        "The no child left behind act will have to be ammended so you don't repeat the same grade till death",
        "BREATH IN you're clearly deprived of oxygen",
        "You can read right?",
        "It's amazing that scientists managed to get a fish to flop on the mouse till it clicked one of the answer buttons.",
        "You know you're supposed to read the question THEN answer right?",
        "You know it's bad when the scarecrow from the Wizard of Oz realizes that some people are dumber than him even WITH a brain",
        "The experimental brain transplant is being explored to stop people from dying but you've brought to light an even better case for procedure",
        "I normally don't recommend gambling but frankly you're chances of making it any other way are worse",
        "Yeah when people say don't overthink it assume they're talking to someone else",
        "I feel bad for the tutors that thought they weren't any good when in reality they just had the monumental task of teaching you anything.",
        "Lower your mouse sensitivity your missclicks are making you look like you're incapable of thought",
        "BEHOLD the first person with an iq lower than a bag of bricks"
    ]
    var praises = [
        "You're vast knowledge is to be admired",
        "Never before have I laid eyes on such an intellect",
        "May you find many friends, so they might glean a fraction of you're brilliance",
        "you're a superstar",
        "Unparalleled genius",
        "I'm proud that such a brilliant individual decided to even visit my site",
        "I feel sorry for anyone sharing a class with you that's graded on a curve",
        "When you were in college did the professors ask you for help?",
        "Google is getting jealous of your ability to answer questions",
        "You're gonna go far",
        "I'm so proud of you",
        "Your are humanities hope or if you're not human then you're humanities downfall.",
        "You make this look easy",
        "Were you born a genius or did you work your way up"
    ]
    var insult = insults[Math.floor(Math.random() * insults.length)]
    var praise = praises[Math.floor(Math.random() * praises.length)]
    if (answer1 == data) {
        display2.innerHTML = ` <h2 class = "link-success"> ${praise} <h2>
            <button class = "btn btn-info btn-large" onclick="selectquestion(), startgame()"> next question 
        `
        correctness = "yes"
    }
    else {
        display2.innerHTML = `
            <h2 class = "link-danger"> ${insult} <h2>
            <button class = "btn btn-info btn-large" onclick="selectquestion(), startgame()"> next question 
            `
            correctness = "nope"
    }
    answered = "yes"
}
}

function admonish(){
    display4.innerHTML = `
    <h2 style = "color: rebeccapurple"> You're parents didn't get a do over when they made you so you don't get a do over when you give a bad answer. <h2>
    `
}

function selectquestion(){
    answered = "no"
    i++
}

function filterquotes(string){
    var newstring = ""
    for(var v = 0; v < string.length; v++){
        if(string[v] + string[v + 1] + string[v + 2] + string[v + 3] + string[v + 4] + string[v + 5] == "&quot;"){
            v = v + 5
        }
        else{
            newstring += string[v]
        }
    }
    return newstring
}