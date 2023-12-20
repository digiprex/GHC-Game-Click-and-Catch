const apiHost = "https://stagingappapi.ghc.health/";
const conversionRate = 1;

async function submitPhoneForRewards(score) {
    const phone = document.getElementById("phone").value;
    //Api call to credit reward
    const sessionId = sessionStorage.getItem("sessionId");
    document.getElementById("submit").disabled = true;
    try {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let data = JSON.stringify({
        "brand": BRAND,
        "phoneNumber": phone,
        "session": sessionId,
        "score": score,
        "conversionRate": conversionRate
        });

        let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
        };

        await fetch(`${apiHost}api/gameRewards/create`, requestOptions);
        
    } catch (error) {
        console.log(error);
    } finally {
        //Change content for end-popup-container
        const endPopup = document.getElementById('end-popup-card');
        const htmlContent = `
        <style>
            .acknowledgement-card {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 12px;
                
            }
            
            .card-title {
                text-align: center;
            }
            
        </style>
        <div class = "acknowledgement-card">
            <div class = "gif-container">
                <dotlottie-player src="https://lottie.host/d778cbb4-5693-4e1e-99fa-acc352205f24/Mizcdbzqya.json" background="transparent" speed="1" style="width: 200px; height: 200px;" autoplay></dotlottie-player>
            </div>
            <div class = "card-title">
                Response Received!!
            </div>
        </div>
        `;
        endPopup.innerHTML = htmlContent;

        //Redirect to appropriate store
        const store = BRAND === "saturn" ? "https://saturn.health" : "https://ghc.health";
        setTimeout(()=>{
            location.replace(store);
        }, 5000);
        
        //document.getElementById("submit").disabled = false;
    }
}


function validatePhone(input) {
    var pattern = /^\d+$/
    if(!pattern.test(input.value)){
        input.value = input.value.slice(0, -1);
    } else {
        previousInput = input.value;
    }
    if(input.value.length < 10) {
        document.getElementById("submit").disabled = true;
    } else {
        document.getElementById("submit").disabled = false;
    }
}

function loadSession() {
    let id = sessionStorage.getItem("sessionId");
    if(!id){
        //Store random session Id
        id = btoa(Math.random());
        id = id.substring(0, 10);
        sessionStorage.setItem("sessionId",id);
    } 
    console.log("Session Id: ", id);
}

async function triggerEndGamePopup(score) {
    let actualWidth = window.innerWidth;
    let resolutionWidth = screen.width;
    let scaleFactor = actualWidth/resolutionWidth;
    const htmlContent = `
    <style>
    .background {
        background: rgba(0, 0, 0, 0.15);
        position: fixed;
        z-index: 5;
        min-height: 100vh;
        min-width: 100vw;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow-y: hidden;
        
    }
    .popup-container {
        max-width: 340px;
        animation: zoomDesktop 1s;
    }
    .popup-card {
        background: white;
        padding: 15px;
        border-radius: 15px;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    
    .card-title {
        font-size: 20px;
        font-weight: 600;
        line-height: normal;
        margin-bottom: 5px;
    }
    
    .form-info {
        font-size: 14px;
        padding: 5px 0px;
        text-align: center;
    }
    
    .form-body {
        display: flex;
        padding: 10px 0px 0px 0px;
        justify-content: space-between;
    }
    
    .phone-number {
        padding: 5px;
        margin-right: 10px;
        border-radius: 5px;
        border: 1px solid black;
        height: 20px;
    }
    
    .submit {
        background: #333333;
        color: white;
        width: 120px;
        border-radius: 10px;
        flex: 1;
        cursor: pointer
        
    }

    :disabled {
        background: rgba(0,0,0,0.4);
        cursor: not-allowed !important
    }

    @keyframes zoom {
        0% { transform: scale(0) }
        100% { transform: scale(${scaleFactor}) }
      }

    @keyframes zoomDesktop { 
        0% { transform: scale(0) }
        100% { transform: scale(1) }
    }

    @media only screen and (max-device-width: 480px){
        .popup-container {
            max-width: 340px;
            animation: zoom 1s;
            transform: scale(${scaleFactor})
        }
    }
    
</style>

<script>
    
</script>

<div class = "background" onscroll = "preventDefaultBehaviour(event)">
    <div class = "popup-container">
        <div id = "end-popup-card" class = "popup-card">
            <div class = "card-title">
                Oops! It's Game Over
            </div>
            <div class = "card-body">
                <div class = "form">
                    <div class = "form-info">
                        Congratulations! You've scored ${score} points.
                        <br/> <br/>Submit your phone number to receive a reward.
                    </div>
                    <div class = "form-body">
                        <input class = "phone-number" type = "text" id = "phone" name = "phone"
                            pattern="[1-9]{1}[0-9]{5}"
           minlength="10"
           maxlength="10" oninput = "validatePhone(this)"/>
                        <input class = "submit" type = "submit" name = "submit" id = "submit" value = "Submit" onclick = "submitPhoneForRewards(${score})" disabled/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    `;

const parent = document.createElement('div');
parent.innerHTML = htmlContent;
document.body.appendChild(parent);
}

function triggerStartGamePopup(brand) {
    let actualWidth = window.innerWidth;
    let resolutionWidth = screen.width;
    let scaleFactor = actualWidth/resolutionWidth;
    const htmlContent = `
    <style>
    .background {
        background: rgba(0, 0, 0, 0.15);
        position: fixed;
        z-index: 5;
        min-height: 100vh;
        min-width: 100vw;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow-y: hidden;
        
    }
    .popup-container {
        max-width: 340px;
    }

    .zoomIn {
        animation: zoomDesktop 1s;
    }

    .zoomOut {
        animation: shrinkDesktop 1s;
        transform: scale(0);
    }
    
    .card {
        background: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 12px;
        border-radius: 8px;
        
    }
    
    .card-title {
        text-align: center;
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        padding: 0px 15px;
    }
    
    .card-body {
    }
    
    .card-header {
        text-align: center;
        font-size: 18px;
        font-style: normal;
        font-weight: 400; 
    }
    
    .card-text {
        font-size: 16px;
        font-style: normal;
        font-weight: 400; 
        line-height: 25.81px;
        padding-left: 8px;
        padding-right: 8px;
    }
    
    .card-footer {
        text-align: center;
        margin: 20px 0px;
        font-size: 16px;
        font-style: normal;
        font-weight: 600; 
    }
    
    .submitBtn {
        width: 195px;
        height: 45px; 
        border-radius: 8px;
        background: #A06EF2; 
        font-size: 18px;
        font-style: normal;
        font-weight: 400; 
        color: #FFFFFE;
        cursor: pointer;
    }

    @keyframes zoom {
        0% { transform: scale(0) }
        100% { transform: scale(${scaleFactor}) }
      }

    @keyframes zoomDesktop {
        0% { transform: scale(0) }
        100% { transform: scale(1) }
    }
    @keyframes shrink {
        0% { transform: scale(${scaleFactor}) }
        100% { transform: scale(0) }
    }

    @keyframes shrinkDesktop {
        0% { transform: scale(1) }
        100% { transform: scale(0) }
    }

    @media only screen and (max-device-width: 480px){
        .popup-container {
            max-width: 340px;
            transform: scale(${scaleFactor});
        }
        .zoomIn {
            animation: zoom 1s;
        }

        .zoomOut {
            animation: shrink 1s;
            transform: scale(0);
        }
    }
    </style>

    <div class = "background" onscroll = "preventDefaultBehaviour(event)">
        <div id = "popup" class = "popup-container zoomIn">
        <div class = "card">
            <div class = "card-title">
                WELCOME TO THE OFFERS CARNIVAL BY ${brand.toUpperCase()}
            </div>
            <div class = "card-body">
                <!--<div class = "card-header">
                    How about a quick game?
                </div>-->
                <div class = "card-text">
                    <ol class = "bullet-pts">
                        <li>Tap on the falling goodies to grab them.</li>
                        <li>Avoid missing any, as it will result in game over.</li>
                    </ol>
                </div>
                <div class = "card-footer">
                    GOOD LUCK, AND HAPPY CATCHING!
                </div>
            </div>
            <button class = "submitBtn" onclick = "closeInstructionsPopup()">
                Proceed
            </button>
        </div>
        </div>
    </div>
    `;

const parent = document.createElement('div');
parent.setAttribute("id", "instructions");
parent.innerHTML = htmlContent;
document.body.appendChild(parent);

}

function closeInstructionsPopup() {
    const instructionsPopup = document.getElementById("instructions");
    const popup = document.getElementById("popup");
    popup.classList.remove("zoomIn");
    popup.classList.add("zoomOut");
    console.log("zoomOut Added");
    setTimeout(() => {
        instructionsPopup.remove();
    }, 1000);

}

function preventDefaultBehaviour(event) {
    event.preventDefault();
    event.stopPropagation();
}