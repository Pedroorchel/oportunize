// Função principal para alternar entre as telas
function showScreen(screenId) {
    // Esconde todas as telas removendo a classe 'active'
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });

    // Mostra a tela desejada adicionando a classe 'active'
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

// Funções para gerenciar o LocalStorage
function getUsers() {
    const users = localStorage.getItem('oportuniza-users');
    return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
    localStorage.setItem('oportuniza-users', JSON.stringify(users));
}

// Lógica de Cadastro
function handleRegister() {
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    if (!name || !email || !password) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const users = getUsers();
    if (users.find(user => user.email === email)) {
        alert('Este e-mail já está cadastrado!');
        return;
    }

    users.push({ name, email, password });
    saveUsers(users);
    alert('Conta criada com sucesso!');
    
    // Limpa os campos e volta para o login
    document.getElementById('reg-name').value = '';
    document.getElementById('reg-email').value = '';
    document.getElementById('reg-password').value = '';
    showScreen('login-screen');
}

// Lógica de Login
function handleLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Atualiza o nome na tela de Home
        document.getElementById('user-display-name').innerText = user.name;
        
        // Navega para a Home
        showScreen('home-screen');
        
        // Limpa os campos
        document.getElementById('login-email').value = '';
        document.getElementById('login-password').value = '';
    } else {
        alert('E-mail ou senha incorretos!');
    }
}

// Lógica de Recuperação de Senha
function handleRecover() {
    const email = document.getElementById('recover-email').value;
    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (user) {
        alert(`Lembrete: Sua senha é "${user.password}"`);
        showScreen('login-screen');
    } else {
        alert('E-mail não encontrado no sistema.');
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.style.width === '250px') {
        sidebar.style.width = '0';
    } else {
        sidebar.style.width = '250px';
    }
}

// Função para mostrar o card da vaga no mapa
function toggleVacancyCard() {
    const card = document.getElementById('vacancy-card');
    card.classList.toggle('active');
}

// Fechar o card se clicar no mapa novamente
document.querySelector('iframe').onclick = function() {
    document.getElementById('vacancy-card').classList.remove('active');
};

// ====================== DETALHES DAS VAGAS ======================
let currentJobId = null;

function showJobDetail(id) {
    currentJobId = id;
    const card = document.getElementById('job-detail-card');
    if (!card) {
        alert("Erro: Tela de detalhes não encontrada!");
        return;
    }

    let html = '';

    if (id === 1) {
        html = `
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                <img src="images/Bosch-Logo-2002-2018.png" style="height: 45px; border-radius: 8px;">
                <div>
                    <h3>Desenvolvedor Full Stack</h3>
                    <p style="color: var(--text-muted);">Bosch • Araucária, PR</p>
                </div>
            </div>
            <h2 style="color: #0071e3;">R$ 5.800 - R$ 8.200</h2>
            <p><strong>Contrato:</strong> CLT • Pleno</p>
            <hr style="margin: 20px 0;">
            <h4>Requisitos</h4>
            <ul style="padding-left: 20px; line-height: 1.8;">
                <li>React, Node.js e Python</li>
                <li>Experiência com APIs</li>
                <li>Inglês intermediário</li>
            </ul>
            <h4>Benefícios</h4>
            <ul style="padding-left: 20px; line-height: 1.8;">
                <li>Plano de saúde</li>
                <li>PLR</li>
                <li>Vale Alimentação</li>
            </ul>
        `;
    } 
    else if (id === 2) {
        html = `
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                <img src="images/Bosch-Logo-2002-2018.png" style="height: 45px; border-radius: 8px;">
                <div>
                    <h3>Designer de UI/UX</h3>
                    <p style="color: var(--text-muted);">Bosch • Araucária, PR</p>
                </div>
            </div>
            <h2 style="color: #0071e3;">R$ 4.900 - R$ 7.000</h2>
            <p><strong>Contrato:</strong> CLT • Júnior/Pleno</p>
            <hr style="margin: 20px 0;">
            <h4>Requisitos</h4>
            <ul style="padding-left: 20px; line-height: 1.8;">
                <li>Figma e Adobe XD</li>
                <li>Prototipação</li>
                <li>Portfólio</li>
            </ul>
        `;
    } 
    else if (id === 3) {
        html = `
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                <img src="images/r.jpg" style="height: 45px; border-radius: 8px;">
                <div>
                    <h3>Analista de Dados Júnior</h3>
                    <p style="color: var(--text-muted);">Mondelez • Curitiba, PR</p>
                </div>
            </div>
            <h2 style="color: #e30613;">R$ 3.800 - R$ 5.200</h2>
            <p><strong>Contrato:</strong> CLT • Júnior</p>
            <hr style="margin: 20px 0;">
            <h4>Requisitos</h4>
            <ul style="padding-left: 20px; line-height: 1.8;">
                <li>Power BI, SQL e Excel Avançado</li>
                <li>Boa capacidade analítica</li>
            </ul>
        `;
    }
    else if (id === 4) {
        html = `
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" style="height: 40px; border-radius: 8px;">
                <div>
                    <h3>Engenheiro de Dados Sênior</h3>
                    <p style="color: var(--text-muted);">Google • São Paulo, SP</p>
                </div>
            </div>
            <h2 style="color: #4285F4;">R$ 12.500 - R$ 17.000</h2>
            <p><strong>Contrato:</strong> CLT • Sênior</p>
            <hr style="margin: 20px 0;">
            <h4>Requisitos</h4>
            <ul style="padding-left: 20px; line-height: 1.8;">
                <li>BigQuery, Python e Spark</li>
                <li>Engenharia de dados em nuvem</li>
                <li>Experiência com pipelines escaláveis</li>
            </ul>
        `;
    }
    else if (id === 5) {
        html = `
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" style="height: 45px; border-radius: 8px;">
                <div>
                    <h3>Analista de Logística</h3>
                    <p style="color: var(--text-muted);">Amazon • Barueri, SP</p>
                </div>
            </div>
            <h2 style="color: #FF9900;">R$ 6.500 - R$ 9.000</h2>
            <p><strong>Contrato:</strong> CLT • Pleno</p>
            <hr style="margin: 20px 0;">
            <h4>Requisitos</h4>
            <ul style="padding-left: 20px; line-height: 1.8;">
                <li>Gestão de estoque e transporte</li>
                <li>Melhoria contínua em logística</li>
                <li>Experiência com WMS e ERP</li>
            </ul>
        `;
    }
    else if (id === 6) {
        html = `
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" style="height: 45px; border-radius: 8px;">
                <div>
                    <h3>Product Manager</h3>
                    <p style="color: var(--text-muted);">Microsoft • Campinas, SP</p>
                </div>
            </div>
            <h2 style="color: #F25022;">R$ 13.000 - R$ 18.500</h2>
            <p><strong>Contrato:</strong> CLT • Sênior</p>
            <hr style="margin: 20px 0;">
            <h4>Requisitos</h4>
            <ul style="padding-left: 20px; line-height: 1.8;">
                <li>Gestão de produtos de software</li>
                <li>Roadmap e estratégia de lançamento</li>
                <li>Comunicação com times ágeis</li>
            </ul>
        `;
    }
    else if (id === 7) {
        html = `
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" style="height: 45px; border-radius: 8px;">
                <div>
                    <h3>Especialista em Suporte Técnico</h3>
                    <p style="color: var(--text-muted);">Apple • São Paulo, SP</p>
                </div>
            </div>
            <h2 style="color: #000000;">R$ 8.200 - R$ 10.500</h2>
            <p><strong>Contrato:</strong> CLT • Pleno</p>
            <hr style="margin: 20px 0;">
            <h4>Requisitos</h4>
            <ul style="padding-left: 20px; line-height: 1.8;">
                <li>Suporte a produtos Apple</li>
                <li>Atendimento ao cliente</li>
                <li>Conhecimento de sistemas iOS e macOS</li>
            </ul>
        `;
    }
    else if (id === 8) {
        html = `
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" style="height: 40px; border-radius: 8px;">
                <div>
                    <h3>Especialista em Marketing Digital</h3>
                    <p style="color: var(--text-muted);">Netflix • Rio de Janeiro, RJ</p>
                </div>
            </div>
            <h2 style="color: #E50914;">R$ 9.000 - R$ 12.500</h2>
            <p><strong>Contrato:</strong> CLT • Pleno</p>
            <hr style="margin: 20px 0;">
            <h4>Requisitos</h4>
            <ul style="padding-left: 20px; line-height: 1.8;">
                <li>Campanhas em redes sociais</li>
                <li>Insights de audiência e métricas</li>
                <li>Planejamento de lançamentos</li>
            </ul>
        `;
    }

    card.innerHTML = html;
    showScreen('job-detail-screen');
}

function startApplication() {
    const jobInfo = document.getElementById('application-job-info');
    let html = '';

    if (currentJobId === 1) {
        html = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <img src="images/Bosch-Logo-2002-2018.png" style="height: 45px; border-radius: 6px;">
                <div>
                    <h3 style="margin: 0;">Desenvolvedor Full Stack</h3>
                    <p style="margin: 5px 0 0; color: var(--text-muted);">Bosch • Araucária, PR</p>
                </div>
            </div>
        `;
    } else if (currentJobId === 2) {
        html = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <img src="images/Bosch-Logo-2002-2018.png" style="height: 45px; border-radius: 6px;">
                <div>
                    <h3 style="margin: 0;">Designer de UI/UX</h3>
                    <p style="margin: 5px 0 0; color: var(--text-muted);">Bosch • Araucária, PR</p>
                </div>
            </div>
        `;
    } else if (currentJobId === 3) {
        html = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <img src="images/r.jpg" style="height: 45px; border-radius: 6px;">
                <div>
                    <h3 style="margin: 0;">Analista de Dados Júnior</h3>
                    <p style="margin: 5px 0 0; color: var(--text-muted);">Mondelez • Curitiba, PR</p>
                </div>
            </div>
        `;
    } else if (currentJobId === 4) {
        html = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" style="height: 45px; border-radius: 6px;">
                <div>
                    <h3 style="margin: 0;">Engenheiro de Dados Sênior</h3>
                    <p style="margin: 5px 0 0; color: var(--text-muted);">Google • São Paulo, SP</p>
                </div>
            </div>
        `;
    } else if (currentJobId === 5) {
        html = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" style="height: 45px; border-radius: 6px;">
                <div>
                    <h3 style="margin: 0;">Analista de Logística</h3>
                    <p style="margin: 5px 0 0; color: var(--text-muted);">Amazon • Barueri, SP</p>
                </div>
            </div>
        `;
    } else if (currentJobId === 6) {
        html = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" style="height: 45px; border-radius: 6px;">
                <div>
                    <h3 style="margin: 0;">Product Manager</h3>
                    <p style="margin: 5px 0 0; color: var(--text-muted);">Microsoft • Campinas, SP</p>
                </div>
            </div>
        `;
    } else if (currentJobId === 7) {
        html = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" style="height: 45px; border-radius: 6px;">
                <div>
                    <h3 style="margin: 0;">Especialista em Suporte Técnico</h3>
                    <p style="margin: 5px 0 0; color: var(--text-muted);">Apple • São Paulo, SP</p>
                </div>
            </div>
        `;
    } else if (currentJobId === 8) {
        html = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" style="height: 45px; border-radius: 6px;">
                <div>
                    <h3 style="margin: 0;">Especialista em Marketing Digital</h3>
                    <p style="margin: 5px 0 0; color: var(--text-muted);">Netflix • Rio de Janeiro, RJ</p>
                </div>
            </div>
        `;
    } else {
        html = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <p style="color: var(--text-muted);">Vaga desconhecida</p>
            </div>
        `;
    }

    jobInfo.innerHTML = html;
    showScreen('application-screen');
}

function submitApplication() {
    // Volta para a tela inicial
    showScreen('home-screen');
    
    // Mostra o modal de sucesso bonito
    showSuccess("✅ Candidatura enviada com sucesso!<br><small>Obrigado! Entraremos em contato em breve.</small>");
}

// ====================== DETALHES DO CURSO (Tela completa) ======================
let currentCourseCard = null;

function showCourseDetail(courseCard) {
    currentCourseCard = courseCard;

    const title = courseCard.querySelector('h3').textContent;
    const instructor = courseCard.querySelector('.course-instructor').textContent;
    const desc = courseCard.querySelector('.course-desc').textContent;
    const level = courseCard.querySelector('.course-level').textContent;
    const metaSpans = courseCard.querySelectorAll('.course-meta span');
    const duration = metaSpans[0] ? metaSpans[0].textContent.replace(/<i.*?<\/i>/g, '').trim() : 'N/A';
    const rating = metaSpans[1] ? metaSpans[1].textContent.replace(/<i.*?<\/i>/g, '').trim() : 'N/A';
    const imgSrc = courseCard.querySelector('img').src;

    const detailCard = document.getElementById('course-detail-card');

    detailCard.innerHTML = `
        <div class="course-image" style="position: relative; margin-bottom: 20px;">
            <img src="${imgSrc}" style="width: 100%; height: auto; max-height: 300px; object-fit: contain; border-radius: 16px;">
            <span class="course-level" style="position: absolute; top: 15px; right: 15px;">${level}</span>
        </div>
        <h2 style="margin: 0 0 8px 0;">${title}</h2>
        <p style="color: var(--text-muted); margin-bottom: 15px;">${instructor}</p>
        
        <div class="course-meta" style="margin: 15px 0;">
            <span><i class="fa-solid fa-clock"></i> ${duration}</span>
            <span><i class="fa-solid fa-star"></i> ${rating}</span>
        </div>

        <h3>Sobre o curso</h3>
        <p style="line-height: 1.6; color: #444;">${desc}</p>

        <h3>O que você vai receber </h3>
        <ul style="padding-left: 20px; line-height: 1.8;">
            <li>Certificado de conclusão</li>
            <li>Acesso vitalício ao conteúdo</li>
            <li>Projetos práticos</li>
            <li>Suporte da comunidade</li>
            <li>Material de apoio em PDF</li>
        </ul>
    `;

    showScreen('course-detail-screen');
}

function enrollInCourseFromDetail() {
    if (!currentCourseCard) return;
    const title = currentCourseCard.querySelector('h3').textContent;
    showScreen('courses-screen');
    showSuccess(`✅ Inscrição realizada com sucesso no curso:<br><strong>${title}</strong>`);
}

// Filtro por Categoria + Busca
let currentCategory = 'all';

function filterByCategory(category) {
    currentCategory = category;
    
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('active');
        if (card.getAttribute('data-category') === category) {
            card.classList.add('active');
        }
    });

    applyFilters();
}

function applyFilters() {
    const searchTerm = document.getElementById('course-search').value.toLowerCase().trim();
    const courseCards = document.querySelectorAll('.course-card');
    const sectionTitle = document.getElementById('section-title');

    courseCards.forEach(card => {
        const title = card.getAttribute('data-title') || card.querySelector('h3').textContent;
        const category = card.getAttribute('data-category');

        const matchesSearch = searchTerm === '' || title.toLowerCase().includes(searchTerm);
        const matchesCategory = currentCategory === 'all' || category === currentCategory;

        if (matchesSearch && matchesCategory) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    if (searchTerm !== '') {
        sectionTitle.textContent = `Resultados para "${searchTerm}"`;
    } else if (currentCategory === 'all') {
        sectionTitle.textContent = 'Todos os Cursos';
    } else {
        sectionTitle.textContent = document.querySelector(`[data-category="${currentCategory}"] span`).textContent;
    }
}

// ====================== INICIALIZAÇÃO ======================
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('course-search');
    
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }

    // Botões "Ver Detalhes" dos cursos - agora abre tela completa
    document.querySelectorAll('.btn-enroll').forEach(button => {
        button.addEventListener('click', function() {
            const courseCard = this.closest('.course-card');
            if (courseCard) {
                showCourseDetail(courseCard);
            }
        });
    });
});

// ===================== FUNÇÕES DO MODAL (EDITAR NOME + SUCESSO) =====================

function showEditNameModal() {
    const currentName = document.getElementById('user-display-name').textContent || "Usuário";
    document.getElementById('new-name-input').value = currentName;
    document.getElementById('edit-name-modal').style.display = 'flex';
}

function closeEditNameModal() {
    document.getElementById('edit-name-modal').style.display = 'none';
}

function saveNewName() {
    const newName = document.getElementById('new-name-input').value.trim();
    
    if (newName === "") {
        alert("O nome não pode ficar vazio!");
        return;
    }

    document.getElementById('user-display-name').textContent = newName;
    localStorage.setItem('profileName', newName);
    closeEditNameModal();
    showSuccess("Nome atualizado e salvo com sucesso!");
}

function showSuccess(message) {
    document.getElementById('success-message').innerHTML = message;
    document.getElementById('success-screen').classList.remove('hidden');
    
    setTimeout(() => {
        document.getElementById('success-screen').classList.add('hidden');
    }, 2500);
}

function closeSuccessScreen() {
    document.getElementById('success-screen').classList.add('hidden');
}

// ===================== FUNÇÃO PARA TROCA DE FOTO =====================
function changeProfilePhoto(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const settingsImg = document.getElementById('profile-img-settings');
        const homeImg = document.getElementById('home-profile-img');
        if (settingsImg) settingsImg.src = e.target.result;
        if (homeImg) homeImg.src = e.target.result;

        localStorage.setItem('profilePhoto', e.target.result);
        showSuccess("Foto de perfil atualizada e salva com sucesso!");
    };
    reader.readAsDataURL(file);
}

// ===================== CARREGAR DADOS SALVOS =====================
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('course-search');
    
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }

    // Carrega nome salvo
    const savedName = localStorage.getItem('profileName');
    if (savedName) {
        document.getElementById('user-display-name').textContent = savedName;
    }

    // Carrega foto salva
    const savedPhoto = localStorage.getItem('profilePhoto');
    if (savedPhoto) {
        const settingsImg = document.getElementById('profile-img-settings');
        const homeImg = document.getElementById('home-profile-img');
        if (settingsImg) settingsImg.src = savedPhoto;
        if (homeImg) homeImg.src = savedPhoto;
    }
});