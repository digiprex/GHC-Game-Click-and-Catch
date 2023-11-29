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
        //Redirect to appropriate store
        const store = BRAND === "saturn" ? "https://saturn.health" : "https://ghc.health"
        location.replace(store);
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

function triggerEndGamePopup(score) {
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
        
    }
    .popup-container {
        max-width: 340px;
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
        background: gray;
        cursor: not-allowed !important
    }

    @media only screen and (max-device-width: 480px){
        .popup-container {
            max-width: 340px;
        }
    }
</style>

<script>
    
</script>
<div class = "background">
    <div class = "popup-container">
        <div class = "popup-card">
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