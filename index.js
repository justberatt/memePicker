import { catsData } from '/data.js'

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.querySelector('#get-image-btn');
const gifsOnlyOption = document.querySelector('#gifs-only-option')

const highlightCheckedOption = (e) => {
    const radios = document.querySelectorAll('.radio');
    for (let radio of radios) {
        radio.classList.remove('highlight')
    }
    document.querySelector(`#${e.target.id}`).parentElement.classList.add('highlight')
}


const getEmotionsArray = (cats) => {
    const emotionsArray = []
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if (!emotionsArray.includes(emotion))
                emotionsArray.push(emotion)
        }
    }
    return emotionsArray
}

const renderEmotionsRadios = (cats) => {
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input 
                type="radio"
                id="${emotion}"
                value="${emotion}"
                name="emotions"
                >
        </div>
        `
    }
    emotionRadios.innerHTML = radioItems
}
renderEmotionsRadios(catsData) 

const getMatchingCatsArray = () => {
    const selectedEmotion = document.querySelector('input[type="radio"]:checked');
    if(selectedEmotion) {
        const isGif = gifsOnlyOption.checked
        const matchingCatsArray = catsData.filter((cat) => {
            if (isGif) return cat.emotionTags.includes(selectedEmotion.value) && cat.isGif === true 
            else return cat.emotionTags.includes(selectedEmotion.value) // I access the value here
        })
        return matchingCatsArray;
    }
}

const getSingleCatObject = () => {
    const catsArray = getMatchingCatsArray();
    if (catsArray.length === 1)
        return catsArray[0];
    else {
        const index = Math.floor(Math.random() * catsArray.length);
        return catsArray[index];
    }
}

const renderCat = () => {
    getSingleCatObject()
}

getImageBtn.addEventListener('click', renderCat);
emotionRadios.addEventListener('change', highlightCheckedOption);