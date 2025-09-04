
class ElonWealthGame {
    constructor() {
        this.state = {
            wealth: 440000000000, // $440B - Elon's actual wealth
            incomePerSec: 0,
            expensePerSec: 0,
            reputation: 50,
            innovation: 50,
            happiness: 50,
            carbon: 0,
            influence: 0,
            ownedItems: {},
            activeProjects: [],
            unlockedCategories: ['luxury', 'tech', 'space'],
            achievements: [],
            multipliers: {
                income: 1,
                reputation: 1,
                innovation: 1
            }
        };

        this.data = this.initializeData();
        this.currentTab = 'luxury';
        this.lastUpdate = Date.now();
        this.eventChance = 0.002;
        this.achievements = this.initAchievements();

        this.init();
    }

    initializeData() {
        return {
            luxury: [
                {
                    id: 'hypercar_collection',
                    name: 'مجموعة السيارات الخارقة',
                    description: 'مجموعة من أندر السيارات في العالم - لامبورغيني، مكلارين، بوجاتي',
                    icon: '🏎️',
                    baseCost: 5000000,
                    scaling: { alpha: 0.12, beta: 1.1 },
                    effects: { reputation: 3, carbon: 8, influence: 1 },
                    limit: 25,
                    upkeep: 75000
                },
                {
                    id: 'mega_yacht',
                    name: 'يخت عملاق مخصص',
                    description: 'يخت بطول 180 متر مع مهبط هليكوبتر وغواصة شخصية',
                    icon: '🛥️',
                    baseCost: 500000000,
                    scaling: { alpha: 0.15, beta: 1.2 },
                    effects: { reputation: 12, happiness: 8, carbon: 35, influence: 3 },
                    limit: 3,
                    upkeep: 5000000
                },
                {
                    id: 'penthouse_collection',
                    name: 'مجموعة البنتهاوس العالمية',
                    description: 'بنتهاوس في أهم مدن العالم - نيويورك، لندن، طوكيو، دبي',
                    icon: '🏙️',
                    baseCost: 100000000,
                    scaling: { alpha: 0.10, beta: 1.3 },
                    effects: { reputation: 8, happiness: 6, influence: 2 },
                    limit: 12,
                    upkeep: 1000000
                },
                {
                    id: 'private_jet_fleet',
                    name: 'أسطول طائرات خاصة',
                    description: 'طائرات بوينغ وإيرباص مخصصة بالكامل',
                    icon: '✈️',
                    baseCost: 300000000,
                    scaling: { alpha: 0.18, beta: 1.15 },
                    effects: { reputation: 10, innovation: 2, carbon: 45, influence: 4 },
                    limit: 8,
                    upkeep: 3000000
                },
                {
                    id: 'art_masterpieces',
                    name: 'تحف فنية نادرة',
                    description: 'لوحات دافنشي، بيكاسو، ومنحوتات عصر النهضة',
                    icon: '🎨',
                    baseCost: 150000000,
                    scaling: { alpha: 0.20, beta: 1.4 },
                    effects: { reputation: 15, happiness: 10, influence: 5 },
                    limit: 15,
                    upkeep: 500000
                }
            ],
            tech: [
                {
                    id: 'ai_datacenter',
                    name: 'مركز بيانات ذكاء اصطناعي',
                    description: 'مراكز بيانات متطورة تدير خوارزميات الذكاء الاصطناعي المتقدمة',
                    icon: '🤖',
                    baseCost: 8000000000,
                    scaling: { alpha: 0.25, beta: 1.3 },
                    effects: { innovation: 25, incomePerSec: 500000, reputation: 8 },
                    limit: 10,
                    upkeep: 2000000
                },
                {
                    id: 'quantum_lab',
                    name: 'مختبر الحوسبة الكمية',
                    description: 'أحدث تقنيات الحوسبة الكمية لحل المشاكل المعقدة',
                    icon: '⚛️',
                    baseCost: 5000000000,
                    scaling: { alpha: 0.35, beta: 1.4 },
                    effects: { innovation: 30, reputation: 15, incomePerSec: 300000 },
                    limit: 5,
                    upkeep: 1500000
                },
                {
                    id: 'neural_interface',
                    name: 'واجهة دماغية عصبية',
                    description: 'تقنية Neuralink المتقدمة لربط الدماغ بالحاسوب',
                    icon: '🧠',
                    baseCost: 12000000000,
                    scaling: { alpha: 0.40, beta: 1.5 },
                    effects: { innovation: 50, reputation: 20, happiness: 15 },
                    limit: 3,
                    upkeep: 3000000
                },
                {
                    id: 'robotics_factory',
                    name: 'مصنع الروبوتات المتقدمة',
                    description: 'مصانع تنتج روبوتات تسلا وروبوتات صناعية متطورة',
                    icon: '🦾',
                    baseCost: 15000000000,
                    scaling: { alpha: 0.30, beta: 1.25 },
                    effects: { innovation: 20, incomePerSec: 800000, influence: 8 },
                    limit: 8,
                    upkeep: 4000000
                }
            ],
            space: [
                {
                    id: 'starship_fleet',
                    name: 'أسطول ستارشيب',
                    description: 'صواريخ SpaceX قابلة لإعادة الاستخدام للسفر بين الكواكب',
                    icon: '🚀',
                    baseCost: 20000000000,
                    scaling: { alpha: 0.22, beta: 1.2 },
                    effects: { innovation: 35, reputation: 25, incomePerSec: 1000000 },
                    limit: 12,
                    upkeep: 5000000
                },
                {
                    id: 'mars_base',
                    name: 'قاعدة المريخ',
                    description: 'أول مستعمرة بشرية دائمة على سطح المريخ',
                    icon: '🪐',
                    baseCost: 100000000000,
                    scaling: { alpha: 0.15, beta: 1.6 },
                    effects: { innovation: 100, reputation: 150, happiness: 80, influence: 50 },
                    limit: 1,
                    upkeep: 20000000
                },
                {
                    id: 'satellite_network',
                    name: 'شبكة أقمار ستارلينك',
                    description: 'آلاف الأقمار الصناعية لتوفير إنترنت عالمي عالي السرعة',
                    icon: '📡',
                    baseCost: 25000000000,
                    scaling: { alpha: 0.18, beta: 1.3 },
                    effects: { incomePerSec: 1500000, innovation: 20, happiness: 40, influence: 15 },
                    limit: 6,
                    upkeep: 8000000
                },
                {
                    id: 'space_elevator',
                    name: 'مصعد فضائي',
                    description: 'مصعد يربط الأرض بالفضاء لتسهيل النقل الفضائي',
                    icon: '🏗️',
                    baseCost: 200000000000,
                    scaling: { alpha: 0.12, beta: 1.8 },
                    effects: { innovation: 200, reputation: 300, incomePerSec: 5000000 },
                    limit: 1,
                    upkeep: 50000000
                }
            ],
            projects: [
                {
                    id: 'hyperloop_network',
                    name: 'شبكة هايبرلوب عالمية',
                    description: 'شبكة نقل فائقة السرعة تربط القارات',
                    icon: '🚄',
                    cost: 80000000000,
                    buildTime: 240,
                    yields: { incomePerSec: 2000000, innovation: 40, carbon: -50, influence: 25 },
                    upkeep: 10000000
                },
                {
                    id: 'tesla_gigafactory',
                    name: 'مصانع تسلا العملاقة',
                    description: 'مصانع عملاقة لإنتاج البطاريات والسيارات الكهربائية',
                    icon: '🏭',
                    cost: 50000000000,
                    buildTime: 180,
                    yields: { incomePerSec: 3000000, carbon: -80, happiness: 30, influence: 20 },
                    upkeep: 8000000
                },
                {
                    id: 'solar_city',
                    name: 'مدن الطاقة الشمسية',
                    description: 'مدن كاملة تعتمد على الطاقة المتجددة 100%',
                    icon: '☀️',
                    cost: 120000000000,
                    buildTime: 300,
                    yields: { incomePerSec: 4000000, carbon: -200, happiness: 60, reputation: 80 },
                    upkeep: 15000000
                },
                {
                    id: 'global_internet',
                    name: 'إنترنت عالمي مجاني',
                    description: 'توفير إنترنت مجاني لكل شخص على وجه الأرض',
                    icon: '🌐',
                    cost: 200000000000,
                    buildTime: 360,
                    yields: { happiness: 200, reputation: 250, influence: 100 },
                    upkeep: 25000000
                }
            ],
            charity: [
                {
                    id: 'climate_reversal',
                    name: 'عكس التغير المناخي',
                    description: 'مشروع عالمي لعكس آثار التغير المناخي',
                    icon: '🌍',
                    baseCost: 50000000000,
                    scaling: { alpha: 0.08, beta: 1.2 },
                    effects: { carbon: -200, happiness: 100, reputation: 150 },
                    limit: 3,
                    upkeep: 0
                },
                {
                    id: 'universal_education',
                    name: 'التعليم العالمي المجاني',
                    description: 'توفير تعليم عالي الجودة مجاناً للجميع',
                    icon: '🎓',
                    baseCost: 30000000000,
                    scaling: { alpha: 0.10, beta: 1.1 },
                    effects: { happiness: 80, innovation: 30, reputation: 100 },
                    limit: 5,
                    upkeep: 0
                },
                {
                    id: 'disease_eradication',
                    name: 'القضاء على الأمراض',
                    description: 'برنامج للقضاء على الأمراض المعدية عالمياً',
                    icon: '🏥',
                    baseCost: 75000000000,
                    scaling: { alpha: 0.12, beta: 1.3 },
                    effects: { happiness: 150, reputation: 200, influence: 50 },
                    limit: 2,
                    upkeep: 0
                },
                {
                    id: 'poverty_elimination',
                    name: 'القضاء على الفقر',
                    description: 'مبادرة عالمية للقضاء على الفقر المدقع',
                    icon: '🤝',
                    baseCost: 100000000000,
                    scaling: { alpha: 0.15, beta: 1.4 },
                    effects: { happiness: 200, reputation: 300, influence: 100 },
                    limit: 1,
                    upkeep: 0
                }
            ]
        };
    }

    initAchievements() {
        return [
            { id: 'first_billion', name: 'أول مليار', description: 'أنفق أول مليار دولار', condition: () => this.getTotalSpent() >= 1000000000 },
            { id: 'space_pioneer', name: 'رائد الفضاء', description: 'اشتر 5 عناصر فضائية', condition: () => this.getCategoryCount('space') >= 5 },
            { id: 'tech_mogul', name: 'قطب التكنولوجيا', description: 'وصل لمستوى ابتكار 200+', condition: () => this.state.innovation >= 200 },
            { id: 'philanthropist', name: 'المحسن الكبير', description: 'أنفق 50 مليار على الخير', condition: () => this.getCategorySpent('charity') >= 50000000000 },
            { id: 'mars_colonizer', name: 'مستعمر المريخ', description: 'امتلك قاعدة المريخ', condition: () => (this.state.ownedItems['mars_base'] || 0) > 0 }
        ];
    }

    init() {
        this.setupEventListeners();
        this.renderCurrentTab();
        this.startGameLoop();
        this.updateDisplay();
        this.initCanvas();
        this.checkAchievements();
        
        this.showToast('🚀 مرحباً بك في إمبراطورية إيلون ماسك المالية! استعد لتجربة استراتيجية لا تُنسى!', 'success');
    }

    initCanvas() {
        this.canvas = document.getElementById('fx-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        this.particles = [];
        this.startParticleSystem();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    startParticleSystem() {
        setInterval(() => {
            if (this.particles.length < 50) {
                this.particles.push(this.createParticle());
            }
            this.updateParticles();
            this.renderParticles();
        }, 100);
    }

    createParticle() {
        return {
            x: Math.random() * this.canvas.width,
            y: this.canvas.height + 10,
            vx: (Math.random() - 0.5) * 2,
            vy: -Math.random() * 3 - 1,
            life: 1,
            decay: Math.random() * 0.02 + 0.005,
            color: `hsl(${Math.random() * 60 + 160}, 70%, 60%)`,
            size: Math.random() * 3 + 1
        };
    }

    updateParticles() {
        this.particles = this.particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= p.decay;
            return p.life > 0;
        });
    }

    renderParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach(p => {
            this.ctx.globalAlpha = p.life;
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
        this.ctx.globalAlpha = 1;
    }

    setupEventListeners() {
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', () => {
                this.switchTab(button.dataset.tab);
            });
        });

        document.getElementById('event-modal').addEventListener('click', (e) => {
            if (e.target.id === 'event-modal') {
                this.closeModal();
            }
        });
    }

    switchTab(tabName) {
        if (this.currentTab === tabName) return;
        
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        
        document.querySelectorAll('.panel-content').forEach(panel => {
            panel.style.display = 'none';
        });
        document.getElementById(`${tabName}-panel`).style.display = 'block';
        
        this.currentTab = tabName;
        this.renderCurrentTab();
    }

    renderCurrentTab() {
        switch (this.currentTab) {
            case 'luxury':
            case 'tech':
            case 'space':
            case 'charity':
                this.renderItems(this.currentTab);
                break;
            case 'projects':
                this.renderProjects();
                break;
        }
    }

    renderItems(category) {
        const container = document.getElementById(`${category}-items`);
        if (!container) return;
        
        container.innerHTML = '';
        
        this.data[category].forEach(item => {
            const owned = this.state.ownedItems[item.id] || 0;
            const cost = this.calculateCost(item, owned);
            const canAfford = this.state.wealth >= cost;
            const canBuy = !item.limit || owned < item.limit;
            
            const card = document.createElement('div');
            card.className = 'item-card';
            if (owned > 0) card.classList.add('owned');
            
            card.innerHTML = `
                <div class="item-header">
                    <span class="item-icon">${item.icon}</span>
                    <div class="item-info">
                        <h3 class="item-name">${item.name}</h3>
                        <p class="item-description">${item.description}</p>
                    </div>
                </div>
                <div class="item-stats">
                    ${this.renderEffects(item.effects)}
                </div>
                <div class="item-footer">
                    <div>
                        <div class="item-price">${this.formatMoney(cost)}</div>
                        ${item.upkeep ? `<div class="stat-badge negative">صيانة: ${this.formatMoney(item.upkeep)}/س</div>` : ''}
                        ${item.limit ? `<div class="item-limit">الحد الأقصى: ${item.limit}</div>` : ''}
                    </div>
                    <div style="text-align: left;">
                        ${owned > 0 ? `<div class="item-owned">مملوك: ${owned}${item.limit ? `/${item.limit}` : ''}</div>` : ''}
                        <button class="buy-button ${canAfford ? 'affordable' : 'expensive'}" 
                            onclick="game.buyItem('${item.id}', '${category}')"
                            ${!canAfford || !canBuy ? 'disabled' : ''}>
                            ${!canAfford ? 'مال غير كافٍ' : canBuy ? 'اشتري الآن' : 'مكتمل'}
                        </button>
                    </div>
                </div>
            `;
            
            container.appendChild(card);
        });
    }

    renderProjects() {
        const container = document.getElementById('project-items');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.data.projects.forEach(project => {
            const activeProject = this.state.activeProjects.find(p => p.id === project.id);
            const isBuilding = activeProject && !activeProject.completed;
            const isCompleted = activeProject && activeProject.completed;
            const canAfford = this.state.wealth >= project.cost;
            
            const card = document.createElement('div');
            card.className = 'project-card';
            if (isCompleted) card.classList.add('completed');
            
            let progressSection = '';
            let button = '';
            
            if (isBuilding) {
                const progress = ((project.buildTime - activeProject.timeLeft) / project.buildTime) * 100;
                progressSection = `
                    <div class="project-progress">
                        <div class="project-progress-bar" style="width: ${progress}%"></div>
                        <span class="progress-text">${Math.round(progress)}%</span>
                    </div>
                    <div class="building-status">
                        🚧 جاري البناء... ${Math.ceil(activeProject.timeLeft)} ثانية متبقية
                    </div>
                `;
                button = '<button class="buy-button building" disabled>⏳ قيد البناء</button>';
            } else if (isCompleted) {
                progressSection = '<div class="completed-status">✅ مكتمل ونشط - يولد عوائد مستمرة</div>';
                button = '<button class="buy-button completed" disabled>✅ مكتمل</button>';
            } else {
                button = `<button class="buy-button ${canAfford ? 'affordable' : 'expensive'}" 
                    onclick="game.startProject('${project.id}')"
                    ${!canAfford ? 'disabled' : ''}>
                    ${canAfford ? '🚀 ابدأ المشروع' : '💰 مال غير كافٍ'}
                </button>`;
            }
            
            card.innerHTML = `
                <div class="project-header">
                    <div class="project-info">
                        <h3>${project.icon} ${project.name}</h3>
                        <p class="project-description">${project.description}</p>
                    </div>
                    <div class="project-costs">
                        <div class="project-cost">${this.formatMoney(project.cost)}</div>
                        <div class="project-build-time">⏱️ ${project.buildTime} ثانية</div>
                        ${project.upkeep ? `<div class="stat-badge negative">🔧 ${this.formatMoney(project.upkeep)}/س</div>` : ''}
                    </div>
                </div>
                ${progressSection}
                <div class="project-yields">
                    <h4>العوائد المتوقعة:</h4>
                    ${this.renderYields(project.yields)}
                </div>
                <div class="project-action">
                    ${button}
                </div>
            `;
            
            container.appendChild(card);
        });
    }

    renderEffects(effects) {
        let html = '';
        Object.entries(effects).forEach(([key, value]) => {
            const isPositive = value > 0;
            const className = isPositive ? 'positive' : 'negative';
            const sign = isPositive ? '+' : '';
            const icon = this.getEffectIcon(key);
            html += `<span class="stat-badge ${className}">${icon} ${sign}${this.formatValue(value, key)}</span>`;
        });
        return html;
    }

    renderYields(yields) {
        let html = '';
        Object.entries(yields).forEach(([key, value]) => {
            const isPositive = value > 0;
            const sign = isPositive ? '+' : '';
            const icon = this.getEffectIcon(key);
            html += `<div class="yield-item">
                <span class="yield-icon">${icon}</span>
                <span class="yield-value ${isPositive ? 'positive' : 'negative'}">${sign}${this.formatValue(value, key)}</span>
            </div>`;
        });
        return html;
    }

    getEffectIcon(effect) {
        const icons = {
            reputation: '👑',
            innovation: '🚀',
            happiness: '😊',
            carbon: '🌱',
            incomePerSec: '💰',
            influence: '⭐'
        };
        return icons[effect] || '📊';
    }

    formatValue(value, type) {
        if (type === 'incomePerSec') {
            return this.formatMoney(value) + '/س';
        }
        return value.toString();
    }

    calculateCost(item, owned) {
        return Math.floor(item.baseCost * Math.pow(1 + item.scaling.alpha, Math.pow(owned, item.scaling.beta)));
    }

    buyItem(itemId, category) {
        const item = this.data[category].find(i => i.id === itemId);
        if (!item) return;
        
        const owned = this.state.ownedItems[itemId] || 0;
        const cost = this.calculateCost(item, owned);
        
        if (this.state.wealth < cost) {
            this.showToast('💸 ليس لديك مال كافٍ لهذا الشراء!', 'warning');
            this.shakeElement('.wealth-main');
            return;
        }
        
        if (item.limit && owned >= item.limit) {
            this.showToast('🚫 وصلت للحد الأقصى من هذا العنصر!', 'warning');
            return;
        }
        
        this.state.wealth -= cost;
        this.state.ownedItems[itemId] = owned + 1;
        
        this.applyEffects(item.effects);
        
        if (item.upkeep) {
            this.state.expensePerSec += item.upkeep;
        }
        
        this.showPurchaseEffect(item.icon, cost);
        this.showToast(`✨ تم شراء ${item.name} بنجاح! ${item.icon}`, 'success');
        this.createMoneyExplosion();
        
        this.updateDisplay();
        this.renderCurrentTab();
        this.checkAchievements();
    }

    startProject(projectId) {
        const project = this.data.projects.find(p => p.id === projectId);
        if (!project || this.state.wealth < project.cost) return;
        
        const existing = this.state.activeProjects.find(p => p.id === projectId);
        if (existing) return;
        
        this.state.wealth -= project.cost;
        this.state.activeProjects.push({
            id: projectId,
            timeLeft: project.buildTime,
            completed: false
        });
        
        this.showToast(`🚧 بدأ مشروع ${project.name}!`, 'success');
        this.updateDisplay();
        this.renderCurrentTab();
    }

    applyEffects(effects) {
        Object.entries(effects).forEach(([key, value]) => {
            if (key === 'incomePerSec') {
                this.state.incomePerSec += value * this.state.multipliers.income;
            } else if (this.state.multipliers[key]) {
                this.state[key] = (this.state[key] || 0) + value * this.state.multipliers[key];
            } else {
                this.state[key] = (this.state[key] || 0) + value;
            }
        });
    }

    startGameLoop() {
        setInterval(() => this.gameLoop(), 100);
        setInterval(() => this.updateDisplay(), 50);
    }

    gameLoop() {
        const now = Date.now();
        const dt = (now - this.lastUpdate) / 1000;
        this.lastUpdate = now;
        
        const netIncome = this.state.incomePerSec - this.state.expensePerSec;
        this.state.wealth += netIncome * dt;
        this.state.wealth = Math.max(0, this.state.wealth);
        
        this.updateProjects(dt);
        
        if (Math.random() < this.eventChance * dt) {
            this.triggerRandomEvent();
        }
        
        if (Math.random() < 0.02 * dt) {
            this.applyMarketVolatility();
        }
        
        this.updateMultipliers();
    }

    updateProjects(dt) {
        this.state.activeProjects.forEach(activeProject => {
            if (activeProject.completed) return;
            
            activeProject.timeLeft -= dt;
            
            if (activeProject.timeLeft <= 0) {
                activeProject.timeLeft = 0;
                activeProject.completed = true;
                
                const project = this.data.projects.find(p => p.id === activeProject.id);
                if (project) {
                    this.applyEffects(project.yields);
                    if (project.upkeep) {
                        this.state.expensePerSec += project.upkeep;
                    }
                    this.showToast(`🎉 اكتمل ${project.name}! يولد عوائد الآن!`, 'success');
                    this.createCelebrationEffect();
                    this.renderCurrentTab();
                }
            }
        });
    }

    updateMultipliers() {
        this.state.multipliers.income = 1 + (this.state.innovation / 500);
        this.state.multipliers.reputation = 1 + (this.state.influence / 200);
        this.state.multipliers.innovation = 1 + (this.state.reputation / 300);
    }

    triggerRandomEvent() {
        const events = [
            {
                title: '📈 صعود تسلا التاريخي!',
                description: 'سهم تسلا يحطم أرقاماً قياسية جديدة! السوق متفائل بشأن المستقبل.',
                choices: [
                    { 
                        text: '💎 بيع 10% من الأسهم', 
                        effect: () => {
                            const gain = this.state.wealth * 0.15;
                            this.state.wealth += gain;
                            this.showToast(`🎯 ربحت ${this.formatMoney(gain)} من بيع الأسهم!`, 'success');
                        }
                    },
                    { 
                        text: '🚀 الاحتفاظ والتوسع', 
                        effect: () => {
                            this.state.incomePerSec *= 1.08;
                            this.state.innovation += 10;
                            this.showToast('🔥 زاد دخلك الشهري وابتكارك!', 'success');
                        }
                    }
                ]
            },
            {
                title: '🧬 اختراق طبي مذهل!',
                description: 'فريق Neuralink حقق اختراقاً في علاج الشلل النصفي!',
                choices: [
                    { 
                        text: '❤️ نشر العلاج مجاناً', 
                        effect: () => {
                            this.state.reputation += 50;
                            this.state.happiness += 30;
                            this.showToast('🌟 أصبحت بطلاً عالمياً!', 'success');
                        }
                    },
                    { 
                        text: '💰 بيع براءة الاختراع', 
                        effect: () => {
                            this.state.wealth += 25000000000;
                            this.state.innovation += 20;
                            this.showToast('💎 ربحت 25 مليار دولار!', 'success');
                        }
                    }
                ]
            },
            {
                title: '🌍 أزمة مناخية عالمية!',
                description: 'التغير المناخي يتسارع! العالم ينظر إليك كقائد في الحلول.',
                choices: [
                    { 
                        text: '⚡ استثمار ضخم في الطاقة النظيفة', 
                        effect: () => {
                            this.state.wealth -= 15000000000;
                            this.state.carbon -= 100;
                            this.state.reputation += 80;
                            this.showToast('🌱 أنقذت الكوكب وكسبت احترام العالم!', 'success');
                        }
                    },
                    { 
                        text: '🏭 التركيز على التكنولوجيا', 
                        effect: () => {
                            this.state.innovation += 30;
                            this.state.reputation -= 20;
                            this.showToast('🤖 تقدمت تقنياً لكن خسرت بعض الشعبية', 'warning');
                        }
                    }
                ]
            },
            {
                title: '👽 اكتشاف فضائي مذهل!',
                description: 'سبيس إكس اكتشفت إشارات غريبة من الفضاء! هل هي حياة ذكية؟',
                choices: [
                    { 
                        text: '📡 نشر الاكتشاف للعالم', 
                        effect: () => {
                            this.state.reputation += 200;
                            this.state.happiness += 100;
                            this.state.influence += 50;
                            this.showToast('👽 غيرت مجرى التاريخ البشري!', 'success');
                        }
                    },
                    { 
                        text: '🤫 الاحتفاظ بالسر والبحث أكثر', 
                        effect: () => {
                            this.state.innovation += 100;
                            this.state.incomePerSec += 2000000;
                            this.showToast('🛸 طورت تقنيات متقدمة سرية!', 'success');
                        }
                    }
                ]
            }
        ];
        
        const event = events[Math.floor(Math.random() * events.length)];
        this.showEventModal(event);
    }

    applyMarketVolatility() {
        const scenarios = [
            {
                type: 'crypto_boom',
                change: 0.12,
                message: '🚀 Dogecoin يطير إلى القمر! +12%'
            },
            {
                type: 'market_crash',
                change: -0.08,
                message: '📉 انهيار مؤقت في السوق -8%'
            },
            {
                type: 'tech_rally',
                change: 0.15,
                message: '💻 موجة صعود تقني +15%'
            },
            {
                type: 'inflation_fear',
                change: -0.05,
                message: '😰 مخاوف التضخم تؤثر -5%'
            }
        ];
        
        const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
        this.state.wealth *= (1 + scenario.change);
        
        if (scenario.change > 0) {
            this.showToast(scenario.message, 'success');
            this.createMoneyRain();
        } else {
            this.showToast(scenario.message, 'warning');
        }
    }

    showEventModal(event) {
        const modal = document.getElementById('event-modal');
        document.getElementById('event-title').textContent = event.title;
        document.getElementById('event-description').textContent = event.description;
        
        const choicesContainer = document.getElementById('event-choices');
        choicesContainer.innerHTML = '';
        
        event.choices.forEach(choice => {
            const button = document.createElement('button');
            button.className = 'choice-button';
            button.textContent = choice.text;
            button.addEventListener('click', () => {
                choice.effect();
                this.closeModal();
                this.updateDisplay();
                this.checkAchievements();
            });
            choicesContainer.appendChild(button);
        });
        
        modal.style.display = 'flex';
    }

    closeModal() {
        document.getElementById('event-modal').style.display = 'none';
    }

    checkAchievements() {
        this.achievements.forEach(achievement => {
            if (!this.state.achievements.includes(achievement.id) && achievement.condition()) {
                this.state.achievements.push(achievement.id);
                this.showAchievement(achievement);
            }
        });
    }

    showAchievement(achievement) {
        this.showToast(`🏆 إنجاز جديد: ${achievement.name} - ${achievement.description}`, 'success');
        this.createCelebrationEffect();
    }

    getTotalSpent() {
        let total = 440000000000 - this.state.wealth; // Starting wealth minus current
        return Math.max(0, total);
    }

    getCategoryCount(category) {
        let count = 0;
        this.data[category].forEach(item => {
            count += this.state.ownedItems[item.id] || 0;
        });
        return count;
    }

    getCategorySpent(category) {
        let spent = 0;
        this.data[category].forEach(item => {
            const owned = this.state.ownedItems[item.id] || 0;
            for (let i = 0; i < owned; i++) {
                spent += this.calculateCost(item, i);
            }
        });
        return spent;
    }

    updateDisplay() {
        document.getElementById('wealth').textContent = this.formatMoney(this.state.wealth);
        document.getElementById('income-rate').textContent = `+${this.formatMoney(this.state.incomePerSec)}/س`;
        document.getElementById('expense-rate').textContent = `-${this.formatMoney(this.state.expensePerSec)}/س`;
        
        document.getElementById('reputation').textContent = Math.floor(this.state.reputation);
        document.getElementById('innovation').textContent = Math.floor(this.state.innovation);
        document.getElementById('happiness').textContent = Math.floor(this.state.happiness);
        document.getElementById('carbon').textContent = Math.floor(this.state.carbon);
        
        const influenceDisplay = document.getElementById('influence');
        if (influenceDisplay) {
            influenceDisplay.textContent = Math.floor(this.state.influence);
        }
        
        this.updateIndicatorColors();
        this.updateWealthGlow();
    }

    updateIndicatorColors() {
        const indicators = [
            { id: 'reputation', value: this.state.reputation, good: 100, bad: 20 },
            { id: 'innovation', value: this.state.innovation, good: 150, bad: 30 },
            { id: 'happiness', value: this.state.happiness, good: 80, bad: 20 },
            { id: 'carbon', value: -this.state.carbon, good: -50, bad: 50 },
            { id: 'influence', value: this.state.influence, good: 50, bad: 10 }
        ];
        
        indicators.forEach(indicator => {
            const element = document.getElementById(indicator.id);
            if (!element) return;
            
            const parent = element.parentElement;
            parent.classList.remove('positive', 'negative', 'neutral');
            
            if (indicator.value >= indicator.good) {
                parent.classList.add('positive');
            } else if (indicator.value <= indicator.bad) {
                parent.classList.add('negative');
            } else {
                parent.classList.add('neutral');
            }
        });
    }

    updateWealthGlow() {
        const wealthElement = document.getElementById('wealth');
        const netIncome = this.state.incomePerSec - this.state.expensePerSec;
        
        wealthElement.classList.remove('gaining', 'losing');
        
        if (netIncome > 0) {
            wealthElement.classList.add('gaining');
        } else if (netIncome < 0) {
            wealthElement.classList.add('losing');
        }
    }

    formatMoney(amount) {
        const units = ['', 'K', 'M', 'B', 'T', 'Q'];
        let unitIndex = 0;
        let value = Math.abs(amount);
        
        while (value >= 1000 && unitIndex < units.length - 1) {
            value /= 1000;
            unitIndex++;
        }
        
        const formatted = value < 10 ? value.toFixed(2) : value < 100 ? value.toFixed(1) : Math.floor(value);
        return `$${formatted}${units[unitIndex]}`;
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<span class="toast-icon">${type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️'}</span> ${message}`;
        
        const container = document.getElementById('toast-container');
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    showPurchaseEffect(icon, cost) {
        const effect = document.createElement('div');
        effect.className = 'purchase-effect';
        effect.innerHTML = `
            <div class="effect-icon">${icon}</div>
            <div class="effect-cost">-${this.formatMoney(cost)}</div>
        `;
        
        document.body.appendChild(effect);
        
        setTimeout(() => effect.remove(), 2000);
    }

    createMoneyExplosion() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                this.particles.push({
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2,
                    vx: (Math.random() - 0.5) * 10,
                    vy: (Math.random() - 0.5) * 10,
                    life: 1,
                    decay: 0.02,
                    color: '#3ddc97',
                    size: Math.random() * 5 + 3
                });
            }, i * 50);
        }
    }

    createCelebrationEffect() {
        const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: -10,
                    vx: (Math.random() - 0.5) * 4,
                    vy: Math.random() * 5 + 2,
                    life: 1,
                    decay: 0.01,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    size: Math.random() * 4 + 2
                });
            }, i * 100);
        }
    }

    createMoneyRain() {
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: -10,
                    vx: 0,
                    vy: Math.random() * 3 + 2,
                    life: 1,
                    decay: 0.008,
                    color: '#3ddc97',
                    size: Math.random() * 3 + 2
                });
            }, i * 200);
        }
    }

    shakeElement(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.classList.add('shake');
            setTimeout(() => element.classList.remove('shake'), 600);
        }
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    save() {
        const saveData = {
            ...this.state,
            saveTime: Date.now()
        };
        localStorage.setItem('elonWealthGame', JSON.stringify(saveData));
        this.showToast('💾 تم حفظ إمبراطوريتك المالية!', 'success');
    }

    load() {
        const saved = localStorage.getItem('elonWealthGame');
        if (saved) {
            const data = JSON.parse(saved);
            this.state = { ...this.state, ...data };
            
            // Calculate offline earnings
            if (data.saveTime) {
                const offlineTime = (Date.now() - data.saveTime) / 1000;
                const offlineEarnings = Math.max(0, (this.state.incomePerSec - this.state.expensePerSec) * Math.min(offlineTime, 28800)); // Max 8 hours
                if (offlineEarnings > 0) {
                    this.state.wealth += offlineEarnings;
                    this.showToast(`💰 ربحت ${this.formatMoney(offlineEarnings)} أثناء غيابك!`, 'success');
                }
            }
            
            this.updateDisplay();
            this.renderCurrentTab();
            this.showToast('📁 تم تحميل إمبراطوريتك بنجاح!', 'success');
        }
    }
}

// Auto-save every 30 seconds
setInterval(() => {
    if (window.game) {
        window.game.save();
    }
}, 30000);

// Initialize game
window.addEventListener('DOMContentLoaded', () => {
    window.game = new ElonWealthGame();
    setTimeout(() => window.game.load(), 1000);
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (!window.game) return;
    
    const shortcuts = {
        '1': 'luxury',
        '2': 'tech', 
        '3': 'space',
        '4': 'projects',
        '5': 'charity'
    };
    
    if (shortcuts[e.key]) {
        window.game.switchTab(shortcuts[e.key]);
    } else if (e.key === 's' && e.ctrlKey) {
        e.preventDefault();
        window.game.save();
    }
});

// PWA support
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {
        console.log('Service Worker registration failed');
    });
}
