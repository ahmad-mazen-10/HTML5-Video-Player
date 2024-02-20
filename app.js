//get elements
const player = document.querySelector('.player');
const video = player.querySelector('video');
const progressBar = player.querySelector('.progress');
const progress = player.querySelector('.prgs-filled');
const toggle = player.querySelector('.toggle');
const skipButton = player.querySelectorAll(`[data-skip]`);
const ranges = player.querySelectorAll('.player-slider');


//build out function
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();

}

function updateBtn() {
    const icon = this.pause ? '▶️' : '⏸️';
    toggle.textContent = icon;
    console.log('updated')
}
function skip() {
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdate() {
    video[this.name] = this.value;
    console.log(this.value)
}
function handleProgress() {
    const precent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${precent}%`;
}
function scrub() {
    const scrubTime = (e.offsetX / progress.offserWidth) * video.duration;
    video.currentTime = scrubTime;
    console.log(e)
}


//hool up the event element

video.addEventListener('click', togglePlay);
video.addEventListener('play', togglePlay);    
video.addEventListener('pause', updateBtn);    
video.addEventListener('timeupdate', handleProgress);    

toggle.addEventListener('click', togglePlay);
skipButton.forEach(button => button.addEventListener('click',skip))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));    

let mousedown = false;
progress.addEventListener('click', scrub); 
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); 