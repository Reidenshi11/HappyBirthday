const buttonMen = document.querySelector('.header__button-gender_men');
const buttonWomen = document.querySelector('.header__button-gender_women');
const body = document.body;
const cardImage = document.querySelector('.card__image');
const cardText = document.querySelector('.card__text');
const buttonText = document.querySelector('.header__button-change_text');
const buttonImage = document.querySelector('.header__button-change_image');
const root = document.documentElement;

const state = {
    gender: body.classList.contains('women') ? 'women' : 'men'
};


function mathrandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    mathRandom = Math.floor(Math.random()*(max-min+1)+min);
    return mathRandom;
}

const getRandomForArr = (arr) => {
    let randomNumber = mathrandom(0, (+(arr.length) - 1));
    return arr[randomNumber]
}

const getData = () => {
    return fetch('db.json').then(response => response.json())
}

const changeDOM = () => {
    if (state.photo.includes('black')) {
        cardText.style.color = 'white';
    } else {
        cardText.style.color = '';
    }

    cardImage.src = `img/${state.photo}`;
    cardText.innerHTML = state.text.replaceAll('\n', '<br>');
}

const getDataToCard = () => {
    getData().then(data => {
        state.text = getRandomForArr(data.text[state.gender]);
        state.photo = getRandomForArr(data.photo[state.gender]);
        changeDOM();
    })
}

const changeToMen = () => {
    if (state.gender !== 'men') {
        body.classList.remove('women');
        body.classList.add('men');
        state.gender = 'men';
        getDataToCard();
    }
}

const changeToWomen = () => {
    if (state.gender !== 'women') {
        body.classList.remove('men');
        body.classList.add('women');
        state.gender = 'women';
        getDataToCard();
    }
}

const changeText = () => {
    getData().then(data => {
        state.text = getRandomForArr(data.text[state.gender]);
        changeDOM();
    });
};

const changeImage = () => {
    getData().then(data => {
        state.photo = getRandomForArr(data.photo[state.gender]);
        changeDOM();
    })
};

buttonMen.addEventListener('click', changeToMen);
buttonWomen.addEventListener('click', changeToWomen);
buttonText.addEventListener('click', changeText);
buttonImage.addEventListener('click', changeImage);

btnUserColor.onclick = () => {
    if (state.gender == 'men') {
        root.style.setProperty('--color-men', `${userColor.value}`)
    } else {
        root.style.setProperty('--color-women', `${userColor.value}`)
    }

}

getDataToCard();

const cardWrapper = document.querySelector('.card__wrapper');

cardWrapper.addEventListener('dblclick', () => {
    const newWindow = window.open(
        '',
        '',
        `width=840,height=520,
        top=${screen.height / 2 - 520 / 2},
        left=${screen.width / 2 - 840 / 2},`
    );

    html2canvas(cardWrapper).then((canvas) => {
        canvas.style.maxWidth = '100%';
        canvas.style.height = 'auto';
        newWindow.document.body.append(canvas);
    });
});

