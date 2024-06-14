const interactionsContainer = document.getElementById('interactions-container');
const body = document.getElementsByTagName('body')[0];
const cat = document.getElementById('cat');
const loader = document.getElementById('loader');

const levels = [
    {
        id: 0,
        title: 'introdução',
        endpoint: 'introducao',
        folder:  'introducao',
        description: 'Introdução ao versionamento',
    },
    {
        id: 1,
        title: 'config',
        endpoint: 'config',
        folder:  'config',
        description: 'Configure seu git com suas credenciais e informações de usuário',
    },
    {
        id: 2,
        title: 'remote add',
        endpoint: 'remote%20add',
        folder:  'remote-add',
        description: 'Vincule sua pasta de trabalho local a um repositório remoto',
    },
    {
        id: 3,
        title: 'clone',
        endpoint: 'clone',
        folder:  'clone',
        description: 'Copie o conteúdo do repositório remoto para sua pasta de trabalho local',
    },
    {
        id: 4,
        title: 'add',
        endpoint: 'add',
        folder:  'add',
        description: 'Adicionando alterações para o estado preparado',
    },
    {
        id: 5,
        title: 'commit',
        endpoint: 'commit',
        folder:  'commit',
        description: 'Passando suas alterações para o estado consolidado antes de enviar para o repositório remoto',
    },
    {
        id: 6,
        title: 'status',
        endpoint: 'status',
        folder:  'status',
        description: 'Verificando o estado de suas alterações',
    },
    {
        id: 7,
        title: 'push',
        endpoint: 'push',
        folder:  'push',
        description: 'Enviando suas alterações para o repositório remoto ',
    },
    {
        id: 8,
        title: 'pull',
        endpoint: 'pull',
        folder:  'pull',
        description: 'Trazendo a versão mais atual do conteúdo no repositório remoto para sua pasta de trabalho local',
    },
    {
        id: 9,
        title: 'log',
        endpoint: 'log',
        folder:  'config',
        description: 'Checando todos os commits realizados sua branch',
    },
    {
        id: 10,
        title: 'branch',
        endpoint: 'branch',
        folder:  'branch',
        description: 'Listando e verificando as branches disponíveis',
    },
    {
        id: 11,
        title: 'checkout',
        endpoint: 'checkout',
        folder:  'checkout',
        description: 'Mude de branch ou crie uma nova para trabalhar no código de forma organizada',
    },
    {
        id: 12,
        title: 'help',
        endpoint: '--help',
        folder:  '--help',
        description: 'Nunca mais tenha dúvida sobre comandos git',
    },
]
const params = new URLSearchParams(document.location.search);
let currentLevel = params.get('level') ? Number.parseInt(params.get('level')) : 0;
let currentScreen = 0;
let levelData = {};

function renderDialog(data) {

    setupLayout()
    setupButtons()

    const dialogContent = document.getElementById('dialog-content');

    function setupLayout() {
        interactionsContainer.innerHTML = `
        <article class="dialog-box">
            <div class="content" id="dialog-content"></div>
            <div class="button-container">
                <button class="button secondary" id="back">voltar</button>
                <button class="button primary" id="next">continuar</button>
            </div>
        </article>`;
        interactionsContainer.style.padding = '40px 80px 80px 20px';
        cat.style.display = 'block';
    }

    function setupButtons() {
        const nextButton = document.getElementById('next');
        const backButton = document.getElementById('back');
        nextButton.addEventListener('click', () => setScreen(currentScreen+1));
        currentScreen === 0 ? 
        backButton.setAttribute('disabled', 'true') : 
        backButton.addEventListener('click', () => setScreen(currentScreen-1));
    }

    function renderTitle(text) {
        const title = document.createElement('h1');
        title.textContent = text;
        dialogContent.appendChild(title);
    }

    function renderDescription(textList) {
        const descriptionContainer = document.createElement('div');
        textList.forEach(text => {
            const description = document.createElement('p');
            description.textContent = text;
            descriptionContainer.appendChild(description);
        });
        dialogContent.appendChild(descriptionContainer);
    }

    function renderImage(path) {
        const image = document.createElement('img');
        image.src = `../${path}`;
        image.alt = 'ilustração do processo descrito';
        dialogContent.appendChild(image)
    }

    function renderExample(commandList) {
        const exampleContainer = document.createElement('ul');
        if(!Array.isArray(commandList[0])) {
            commandList = Array(commandList);
        }
        commandList.forEach(command => {
            const example = document.createElement('li');
            for(const splittedCommand of command) {
                const exampleSpan = document.createElement('span');
                exampleSpan.textContent = splittedCommand.texto;
                exampleSpan.style.color = splittedCommand.cor;
                example.appendChild(exampleSpan);
            }
            exampleContainer.appendChild(example);
        })        
        dialogContent.appendChild(exampleContainer);
    }

    if(data.titulo) {
        renderTitle(data.titulo);
    }
    if(data.descricao) {
        renderDescription(data.descricao);
    }
    if(data.imagem.length > 0) {
        renderImage(data.imagem[0]);
    }
    if(data.exemplo.length > 0) {
        renderExample(data.exemplo);
    }
}

function renderTerminal(data) {

    setupLayout(data.titulo);

    const correctAnswers = [];
    const apiAnswers = data.resposta;

    const commandInput = document.getElementById('command');
    const lastAnswers = document.getElementById('last-answers');
    document.addEventListener('keyup', handleSubmit)
    commandInput.focus()

    function setupLayout(title) {
        interactionsContainer.innerHTML = `
        <article class="terminal-box">
            <header>
                <div>
                    <img src="../img/shared/logo-small.png" alt="gitFactory logo">
                    <h4>${title ? title : "Git Factory"}</h4>
                </div>
            </header>
            <div class="terminal-content">
                <div class="question-box">
                    <img src="../img/shared/traffic-lights.png" alt="mac traffic lights">
                    <div class="text-container" id="question"></div>
                </div>
                <div id="last-answers"></div>
                <div class="terminal-input-container">
                    <p class="info">
                        <span style="color: #1BC400">gitfactory@DESKTOP</span>
                        <span style="color: #C00898">MINGW64</span>
                        <span style="color: #FFB800">~/factory/learn</span>
                        <span style="color: #6FBBE5">(main)</span>
                    </p>
                    <label for="command">$</label>
                    <input type="text" id="command" name="command">
                </div>
            </div>
        </article>`;
        interactionsContainer.style.padding = '40px 80px 24px 20px';
        cat.style.display = 'block';
    }

    function renderQuestion(textList) {
        const questionContainer = document.getElementById('question');
        textList.forEach(text => {
            const step = document.createElement('p');
            step.textContent = text;
            questionContainer.appendChild(step);
        });
    }

    function checkAnswer(value) {
        const rightAnswer = apiAnswers[correctAnswers.length].trim().toLowerCase();
        if(value === rightAnswer) {
            correctAnswers.push(value);
            return true;
        } else {
            return false;
        }
    }

    function createAnswerLayout(data) {
        return `
        <div class="terminal-input-container">
            <p class="info">
                <span style="color: #1BC400">gitfactory@DESKTOP</span>
                <span style="color: #C00898">MINGW64</span>
                <span style="color: #FFB800">~/factory/learn</span>
                <span style="color: #6FBBE5">(main)</span>
            </p>
            <p class="answer">$${data.answer}</p>
            ${data.status ? 
                correctAnswers.length == apiAnswers.length ?
                    '<p class="feedback right">parabéns, você acertou!</p>'
                    :
                    ''
                :
                '<p class="feedback wrong">git error: Tente novamente!</p>'
            }
        </div>
        `
    }

    function handleSubmit(event) {
        if(event.key === 'Enter') {
            const answer = commandInput.value;
            const status = checkAnswer(commandInput.value.trim().toLowerCase())
            lastAnswers.innerHTML += createAnswerLayout({answer, status})
            commandInput.value = '';
            if(correctAnswers.length === apiAnswers.length) {
                setTimeout(() => {
                    setScreen(currentScreen+1);
                    document.removeEventListener('keyup', handleSubmit);
                }, 1000);
            }
        }
    }

    if(data.desafio) {
        renderQuestion(data.desafio);
    }
}

function renderFinalScreen(data) {
    
    setupLayout()

    let allowInterval = true;
    let intervalId = null;
    const progressbar = document.querySelectorAll('.progressbar div')
    const endContainer = document.querySelector('div.end-container.blur')

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    function setupLayout() {
        cat.style.display = 'none';
        interactionsContainer.innerHTML = '';
        const endContainer = document.createElement('div');
        endContainer.classList.add('blur');
        endContainer.classList.add('end-container');
        endContainer.innerHTML = `
            <img src="../${data.imagem[0]}" alt="recompensa do nível">
            <h4>Parabéns! Você concluiu o nível</h4>
            <p>segure qualquer botão para continuar</p>
            <div class="progressbar">
                <img src="../${data.imagem[1]}" alt="símbolo da fase">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <img src="../img/shared/check.png" alt="fase concluída">
            </div>
        `
        body.appendChild(endContainer);
    }

    function handleKeyDown() {
        if (allowInterval) {
            allowInterval = !allowInterval;
            let progress = 0;

            intervalId = setInterval(() => {
                if(progress < 5) {
                    progressbar[progress].classList.add('done');
                    progress++;
                } else {
                    clearInterval(intervalId);
                    if(currentLevel+1 < levels.length) {
                        body.removeChild(endContainer);
                        currentLevel++;
                        startLevel(levels[currentLevel].endpoint);
                        document.removeEventListener('keyup', handleKeyUp);
                        document.removeEventListener('keydown', handleKeyDown);
                    } else {
                        console.log("bora BILL....");
                        window.location.href = 'certificate.html';
                    }
                }
            }, 500);
        }
    }

    function handleKeyUp() {
        clearInterval(intervalId);
        allowInterval = !allowInterval;
        for(const bar of progressbar) {
            if(bar.classList.contains('done')) { 
                bar.classList.remove('done') 
            }
        }
    }

    
}

const renderScreenFunctions = {
    'dialogo': (data) => renderDialog(data),
    'exemplo': (data) => renderDialog(data),
    'terminal': (data) => renderTerminal(data),
    'final': (data) => renderFinalScreen(data),
}

function startLevel(levelName) {
    
    function showLoader() {
        loader.style.display = 'flex';
    }
    function hideLoader() {
        loader.style.display = 'none';
    }

    const screensOrder = ["dialogo", "exemplo", "terminal", "final"];
    showLoader();

    fetch(`https://gitfactory-telas-1.onrender.com/tela?grupoTela=${levelName}`)
        .then(data => data.json())
        .then(data => data.sort((a, b) => {
            return screensOrder.indexOf(a.tipo) - screensOrder.indexOf(b.tipo);
        }))
        .then(data => {
            hideLoader();
            levelData = data;
            setScreen(0);
        })
}


function setScreen(number) {
    if(number === levelData.length) {
        currentLevel ++;
        startLevel(levels[currentLevel]['endpoint'])
    } else {
        currentScreen = number;
        screenData = levelData[currentScreen];
        const screenRenderer = renderScreenFunctions[screenData.tipo];
        if(screenRenderer) {
            screenRenderer(screenData);
        }
    }
}

startLevel(levels[currentLevel].endpoint)
