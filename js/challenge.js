
document.addEventListener('DOMContentLoaded', ()=> {

    //TODO[x]: 1. Grab all DOM elements that we will be interacting with in Javascript
    const counter = document.querySelector('#counter')
    const minus = document.querySelector('#minus')
    const plus = document.querySelector('#plus')
    const heart = document.querySelector('#heart')
    const pause = document.querySelector('#pause')
    const likesContainer = document.querySelector('.likes')
    const commentForm = document.querySelector('#comment-form')
    let intervalRunning = true
    let intervalTimer; // holds the setInterval func so multiple instances of the setInterval aren't created 

    let likeHolder = {}

    /*
        TODO[x] 2. Creating the counter
        TODO[x]: 2a. disable the like, plus, minus buttons when counter is paused
        TODO[x]: 2b. enable when the counter is continued
    */

    let count = 0

    function toggleInterval(){
        if(intervalRunning) {
            clearInterval(intervalTimer);
            intervalRunning = false;
            pause.textContent = "resume";
            plus.setAttribute('disabled', true)
            minus.setAttribute('disabled', true)
            heart.setAttribute('disabled', true)
            console.log("Interval paused.");
        } else {
            intervalRunning = true
            startInterval()
            pause.innerHTML = "pause"
            plus.disabled = false
            minus.disabled = false
            heart.disabled = false
            console.log("Interval Started")
        }

    }

    function startInterval(){
        intervalTimer = setInterval(()=>{
            console.log("Interval is running . . .")
            count++ 
            counter.innerHTML = count
        }, 1000)
    }

    pause.addEventListener('click', toggleInterval)

    if(intervalRunning){
        startInterval()
    }


    /*
       TODO[x]: 3. Increment/Decrement the count through the plus/minus buttons
    */

    function increment(){
        count++
        counter.innerHTML = count
    }

    function decrement(){
        count--
        counter.innerHTML = count
    }

    plus.addEventListener('click', increment)
    minus.addEventListener('click', decrement)


    /*
        TODO[x]: 4. clicking Heart creates a DOM element stating the count was liked 'x' times it was hearted
            TODO[x]: 4a. The element does not repeated appear in the DOM. 
    */

    // TODO[x]: 4b. Renders the number liked and how many likes it has. 
    function likedNumberRender(num){
        let likedNum = document.createElement('li')
        likedNum.id = count
        likedNum.innerHTML = `${num} has been liked ${likeHolder[count]} time`
        likesContainer.appendChild(likedNum)
    }

    function likedNumChecker(){
        /*
        TODO[x]: 4c. If number is liked for the first time, render it and set its number to 1 
        */
        if(likeHolder[count]){
            likeHolder[count]++
            let likedNumElement = document.getElementById(`${count}`)
            likedNumElement.innerHTML = `${likedNumElement.id} has been liked ${likeHolder[count]} times`
        } else {
            likeHolder[count] = 1
            likedNumberRender(count)
        }
        console.log(likeHolder)
    }

    heart.addEventListener('click', likedNumChecker)


    /*
        TODO: 5. Add form submit comments to the Comments container
    */

    const form = document.querySelector("#comment-form")
 
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        const inputText = document.querySelector("#comment-input").value
        renderComment(inputText)
        form.reset()
    })

    function renderComment(comment){
        if(comment){
            const newDiv = document.createElement('div')
            const newComment = document.createElement('p')
            const commentsContainer = document.querySelector('#list')
            newComment.innerHTML = comment
            newDiv.append(newComment)
            commentsContainer.append(newDiv)
        }
    }

  
})
