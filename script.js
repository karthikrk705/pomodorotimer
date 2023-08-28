document.addEventListener('DOMContentLoaded', function() {
    const workmins = document.querySelector('#settimein');
    const startstopbtn = document.querySelector('#glasscontainer');
    const mindis = document.querySelector('#minutes');
    const secdis = document.querySelector('#seconds');

    const blacktop = document.querySelector('#blacktop')
    const blackbot = document.querySelector('#blackbot')
  
    let interval = null;
    let remainingSeconds = 0;
    let originalws = 0;
    let originalrs = 0;
    let reststate = false;

    startstopbtn.addEventListener("click", () => {
        if (interval === null) {
            if (reststate === false) {
                start();
            } else {
                rest();
            }
        } else {
            stop();
        }
    });

    startstopbtn.addEventListener("dblclick", () => {
        const inputMinutes = parseInt(workmins.value);
    
        if (!isNaN(inputMinutes) && inputMinutes < 60) { // Check for valid input
            stop();
            remainingSeconds = inputMinutes * 60;
            originalws = remainingSeconds;
            updateInterfaceTime();
        }
    });

    function updateInterfaceTime() {
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;
  
        mindis.textContent = minutes.toString().padStart(2, "0");
        secdis.textContent = seconds.toString().padStart(2, "0");
    }


    function start() {
        reststate = false;
        if (remainingSeconds === 0) {
            remainingSeconds = originalws;
        }

        let h1 = 0
        let h2 = 1.7727
        let c = originalws*1000/1000
        let v = h2/c
        interval = setInterval(() => {
            remainingSeconds--;

            h1 = h1 + v
            h2 = h2 - v

            blacktop.style.height = h1 + 'cm';
            blackbot.style.height = h2 + 'cm';
            updateInterfaceTime();

            if (remainingSeconds === 0) {
                clearInterval(interval);
                interval = null;
                rest();
            }
        }, 1000);
    }

    function stop() {
        clearInterval(interval);
        interval = null;
    }

    function rest() {
        reststate = true;
        const restmins = document.querySelector('#resttimein');
        const restMinutes = parseInt(restmins.value);
        let restseconds = 0;
        restseconds = restMinutes * 60;
        originalrs = remainingSeconds
        
        let h3 = 0
        let h4 = 1.7727
        let d = originalws*1000/1000
        let e = h4/d
        interval = setInterval(() => {
            restseconds--;

            h3 = h3 + e
            h4 = h4 - e

            blacktop.style.height = h3 + 'cm';
            blackbot.style.height = h4 + 'cm';
            
            const minutes = Math.floor(restseconds / 60);
            const seconds = restseconds % 60;
        
            mindis.textContent = minutes.toString().padStart(2, "0");
            secdis.textContent = seconds.toString().padStart(2, "0");
      
            if (restseconds === 0) {
                clearInterval(interval);
                interval = null;
                start();                                                                        
            }
        }, 1000);
    }

  const playButton = document.getElementById('playButton');
  const music = document.getElementById('music');

  playButton.addEventListener('click', function() {
    if (music.paused) {
      music.play();
    } else {
      music.pause();
    }
  });


//   let h1 = 0
//   let h2 = 66
//   function updatehourglass(cc){
//     let v1 = Math.floor(h1+cc) 
//     let v2 = Math.floor(h2-cc)
//     blacktop.style.height = v1 + 'cm';
//     blackbot.style.height = v2 + 'cm';  
//    }

  
});
