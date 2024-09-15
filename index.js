import { catsData } from '/data.js'

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.querySelector('#get-image-btn');

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
    const checkedRadio = document.querySelector('input[type="radio"]:checked');
    if(checkedRadio)
        console.log(checkedRadio.value);
}

getImageBtn.addEventListener('click', getMatchingCatsArray);
emotionRadios.addEventListener('change', highlightCheckedOption);