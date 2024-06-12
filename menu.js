const levels = [
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

const menu = document.getElementById('levels')

levels.forEach(level => {
    const card = document.createElement('article');
    card.innerHTML = `
        <img src="../img/${level.folder}/menu.png">
        <form action="levels.html">
            <footer>
                <h3>${level.title}</h3>
                <p>${level.description}</p>
                <input type="number" name="level" value="${level.id}">
                <button type="submit" class="button primary small">praticar</button>
            </footer>
        </form>
    `;

    function showCommandOnHover() {
        const description = card.querySelector('p');
        let command = `git ${level.title}`;
        let index = 0;
        let typingTimeout;
        let startTypingTimeout;

        function typeWriter() {
            if (index < command.length) {
                description.textContent += command.charAt(index);
                index++;
                typingTimeout = setTimeout(typeWriter, 80);
            }
        }

        function startTyping() {
            startTypingTimeout = setTimeout(() => {
                description.textContent = ''; 
                description.classList.add('command')
                index = 0; 
                typeWriter();
            }, 500)
        }

        function stopTyping() {
            clearTimeout(typingTimeout);
            clearTimeout(startTypingTimeout);
            setTimeout(() => {
                description.textContent = level.description
                description.classList.remove('command')
            }, 300)
        }

        card.addEventListener('mouseenter', startTyping);
        card.addEventListener('mouseleave', stopTyping);
    }

    showCommandOnHover();

    menu.appendChild(card);
})