const SECRET_CODE = "552012";
const noteText = "Sorry wish karne mein late ho gaya, par bina kuch khaas banaye wish karne ka mann nahi tha. Aap janti he ho kya kya hua tha inn kuch din but usko side rakhte h. Abhi ke liye to Happy Navratri maate ❤️. Ab jaldi se snapchat par aake snap bhej dijiye.";

let noCount = 0;
let yesScale = 1;
let enteredPin = "";

const noData = [
    { text: "Aisa mat kariye yaar! Puja ka time hai 😭", file: "1.jpg" },
    { text: "Firse Nahi?! Bura lagta hai yaar 🥺", file: "2.jpg" },
    { text: "Meri Maa Durga toh aap hi ho, ab maan bhi jao! 🙏", file: "3.gif" },
    { text: "Ab 'Nahi' ka option hi gayab! Chup-chap Haan dabao 😤❤️", file: "4.jpg" }
];

function handleNo() {
    if (noCount < noData.length) {
        document.getElementById('meme-text').innerText = noData[noCount].text;
        
        document.getElementById('video-container').style.display = "none";
        const container = document.getElementById('meme-container');
        const memePic = document.getElementById('meme-pic');
        
        memePic.src = noData[noCount].file;
        container.style.display = "flex";

        yesScale += 0.22;
        document.getElementById('btn-yes').style.transform = `scale(${yesScale})`;
        noCount++;
        if (noCount === noData.length) {
            document.getElementById('btn-no').style.display = 'none';
        }
    }
}

function handleYes() {
    document.getElementById('meme-container').style.display = "none";
    
    const vidBox = document.getElementById('video-container');
    const theVideo = document.getElementById('yes-video');
    
    vidBox.style.display = "flex";
    theVideo.play().catch(e => console.log("Autoplay error:", e));

    document.getElementById('meme-text').innerText = "Finally Devi Ji maan gayi! 🎉❤️";
    document.querySelector('.btn-group').innerHTML = `<button class="btn btn-yes" onclick="goToPuzzle()">Chalo Ab Surprise Unlock Karo 🔒</button>`;
}

function goToPuzzle() {
    document.getElementById('screen-meme').classList.remove('active');
    document.getElementById('screen-puzzle').classList.add('active');
}

function pressKey(num) {
    if (enteredPin.length < 6) {
        enteredPin += num;
        updatePinView();
    }
}

function clearPin() {
    enteredPin = "";
    updatePinView();
}

function updatePinView() {
    let display = "";
    for (let i = 0; i < 6; i++) {
        display += (i < enteredPin.length) ? enteredPin[i] + " " : "_ ";
    }
    document.getElementById('pin-view').innerText = display.trim();
}

function checkPin() {
    if (enteredPin === SECRET_CODE) {
        document.getElementById('screen-puzzle').classList.remove('active');
        document.getElementById('screen-diya').classList.add('active');
    } else {
        const card = document.getElementById('lock-card');
        const hint = document.getElementById('hint-text');
        card.classList.add('error-shake');
        hint.style.color = "#ffcc00";
        hint.innerHTML = "❌ Galat Code!<br><strong style='color:#ff6666; font-size:1.05rem;'>Hint: Mera phone password daalo 📱👀</strong>";
        enteredPin = "";
        updatePinView();
        setTimeout(() => card.classList.remove('error-shake'), 400);
    }
}

function lightDiya() {
    document.getElementById('screen-diya').style.background = "radial-gradient(circle, #4a1c00 0%, #000 80%)";
    setTimeout(() => {
        document.getElementById('screen-diya').classList.remove('active');
        document.getElementById('screen-puja').classList.add('active');
        
        const pujaVid = document.getElementById('puja-scene-video');
        const errBox = document.getElementById('vid-error');
        
        pujaVid.play().catch(err => {
            console.log("Autoplay blocked/failed:", err);
            pujaVid.load();
            pujaVid.play().catch(e => {
                console.log("Still failed, showing error hint");
                errBox.style.display = "block";
            });
        });

        pujaVid.onerror = function() {
            errBox.style.display = "block";
        };

        startFlowers();
    }, 1000);
}

function goToFinalMessage() {
    document.getElementById('screen-puja').classList.remove('active');
    document.getElementById('screen-final').classList.add('active');
    typeMessage();
}

function typeMessage() {
    let i = 0;
    const box = document.getElementById('typewriter');
    box.innerHTML = "";
    const interval = setInterval(() => {
        box.innerHTML += noteText.charAt(i);
        i++;
        if (i >= noteText.length) {
            clearInterval(interval);
            document.getElementById('bye-box').classList.add('show');
        }
    }, 35);
}

function startFlowers() {
    setInterval(() => {
        const flower = document.createElement('div');
        flower.classList.add('flower');
        flower.innerText = ['🌼', '🌺', '✨'][Math.floor(Math.random() * 3)];
        flower.style.left = Math.random() * 95 + 'vw';
        flower.style.animationDuration = (Math.random() * 2 + 3) + 's';
        document.body.appendChild(flower);
        setTimeout(() => flower.remove(), 5000);
    }, 400);
}