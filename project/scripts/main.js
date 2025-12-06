const STORAGE_KEYS = {
    plan: 'learnhub_plan',
    checklist: 'learnhub_checklist',
    enrollment: 'learnhub_enrollment'
};

const courseCatalog = [
    {
        id: 'fullstack-web',
        title: 'Full-stack Web Engineering',
        category: 'technology',
        level: 'intermediate',
        duration: '12 weeks',
        format: 'Hybrid · Mentor-led',
        description: 'Master modern JavaScript, APIs, and deployment pipelines through weekly build labs.',
        image: 'assets/images/course-web.svg',
        tags: ['JavaScript', 'Career switch', 'APIs']
    },
    {
        id: 'ux-research',
        title: 'Human-Centered UX Research',
        category: 'design',
        level: 'beginner',
        duration: '10 weeks',
        format: 'Live cohorts',
        description: 'Learn moderated testing, diary studies, and synthesis frameworks with guided critiques.',
        image: 'assets/images/course-ui.svg',
        tags: ['Interviews', 'Accessibility', 'Storytelling']
    },
    {
        id: 'product-strategy',
        title: 'Product Strategy Leadership',
        category: 'business',
        level: 'advanced',
        duration: '8 weeks',
        format: 'Executive labs',
        description: 'Define north-star metrics, opportunity trees, and stakeholder narratives for bold bets.',
        image: 'assets/images/course-product.svg',
        tags: ['Roadmaps', 'OKRs', 'Leadership']
    },
    {
        id: 'data-story',
        title: 'Data Storytelling & Analytics',
        category: 'technology',
        level: 'intermediate',
        duration: '9 weeks',
        format: 'Project studio',
        description: 'Transform dashboards into persuasive stories using Python, SQL, and no-code viz tools.',
        image: 'assets/images/course-data.svg',
        tags: ['Dashboards', 'SQL', 'Visualization']
    },
    {
        id: 'growth-marketing',
        title: 'Growth Marketing Experiments',
        category: 'marketing',
        level: 'beginner',
        duration: '6 weeks',
        format: 'Async sprints',
        description: 'Set up funnels, design experiments, and automate reporting across the customer journey.',
        image: 'assets/images/course-marketing.svg',
        tags: ['Funnels', 'Automation', 'Copywriting']
    },
    {
        id: 'ai-ops',
        title: 'Responsible AI Literacy',
        category: 'technology',
        level: 'advanced',
        duration: '5 weeks',
        format: 'Micro sprint',
        description: 'Decode AI concepts, governance, and prompt engineering for cross-functional leaders.',
        image: 'assets/images/course-cyber.svg',
        tags: ['AI', 'Ethics', 'Automation']
    }
];

const studyTips = [
    {
        category: 'Focus tip',
        title: 'Stack two wins per session.',
        message: 'Begin with a five-minute warm-up and end with a 60-second recap message to your mentor.',
        author: 'Coach Dara · UX Research'
    },
    {
        category: 'Career tip',
        title: 'Narrate measurable outcomes.',
        message: 'When you log progress, capture the leading metric you influenced. Recruiters love tangible proof.',
        author: 'Coach Malik · Product Strategy'
    },
    {
        category: 'Wellness tip',
        title: 'Tiny breaks protect retention.',
        message: 'Use a 45/10/5 timer: focus, stretch, then summarize what you learned aloud.',
        author: 'Coach Priya · Learning Science'
    },
    {
        category: 'Community tip',
        title: 'Ship feedback loops early.',
        message: 'Share draft ideas halfway through the sprint to unlock critiques before the deadline crunch.',
        author: 'Coach Felipe · Engineering'
    }
];

const planSuggestions = {
    'career switch': ['fullstack-web', 'ux-research'],
    upskill: ['data-story', 'product-strategy'],
    freelance: ['growth-marketing', 'ux-research'],
    portfolio: ['ux-research', 'fullstack-web']
};

const goalCopy = {
    'career switch': 'switch into a new role',
    upskill: 'deepen skills in your current role',
    freelance: 'launch a freelance service',
    portfolio: 'ship a standout portfolio'
};

document.addEventListener('DOMContentLoaded', () => {
    updateYear();
    initNavToggle();
    initHeroGreeting();
    initCourseHighlights();
    initCourseDirectory();
    initStudyPlanForm();
    initTipRotator();
    initChecklist();
    initEnrollmentForm();
    initLazyLoading();
});

function updateYear() {
    const yearNodes = document.querySelectorAll('#currentYear');
    const year = new Date().getFullYear();
    yearNodes.forEach((node) => {
        node.textContent = `${year}`;
    });
}

function initNavToggle() {
    const toggle = document.querySelector('[data-nav-toggle]');
    const nav = document.querySelector('[data-site-nav]');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!expanded));
        nav.classList.toggle('is-open', !expanded);
    });
}

function initHeroGreeting() {
    const greeting = document.querySelector('#personalGreeting');
    const plan = readStorage(STORAGE_KEYS.plan);
    if (!greeting || !plan) return;

    greeting.textContent = `Welcome back, ${plan.name}. Your ${plan.timeline} sprint is ready when you are.`;
}

function initCourseHighlights() {
    const homeGrid = document.querySelector('[data-home-course-grid]');
    if (!homeGrid) return;
    const highlights = courseCatalog.slice(0, 3);
    homeGrid.innerHTML = highlights.map(buildCourseCard).join('');
}

function initCourseDirectory() {
    const grid = document.querySelector('[data-course-grid]');
    if (!grid) return;

    const search = document.querySelector('#courseSearch');
    const categoryFilter = document.querySelector('#categoryFilter');
    const levelFilter = document.querySelector('#levelFilter');
    const emptyMessage = document.querySelector('[data-course-empty]');

    const render = () => {
        const term = search?.value.toLowerCase().trim() ?? '';
        const category = categoryFilter?.value ?? 'all';
        const level = levelFilter?.value ?? 'all';

        const filtered = courseCatalog.filter((course) => {
            const matchesTerm = course.title.toLowerCase().includes(term) ||
                course.tags.some((tag) => tag.toLowerCase().includes(term));
            const matchesCategory = category === 'all' || course.category === category;
            const matchesLevel = level === 'all' || course.level === level;
            return matchesTerm && matchesCategory && matchesLevel;
        });

        grid.innerHTML = filtered.map(buildCourseCard).join('');
        if (emptyMessage) {
            emptyMessage.textContent = filtered.length ? '' : 'No courses match your filters yet. Try another keyword or level.';
        }
    };

    ['input', 'change'].forEach((event) => {
        search?.addEventListener(event, render);
        categoryFilter?.addEventListener(event, render);
        levelFilter?.addEventListener(event, render);
    });

    render();
}

function buildCourseCard(course) {
    const tags = course.tags.map((tag) => `<li>${tag}</li>`).join('');
    return `
        <article class="course-card">
            <img class="course-card__image lazy-media" src="assets/images/placeholder.svg" data-src="${course.image}" width="360" height="240" alt="${course.title} illustration" loading="lazy">
            <div class="course-card__body">
                <p class="eyebrow">${capitalize(course.category)} · ${capitalize(course.level)}</p>
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <ul class="tag-list">${tags}</ul>
                <div class="course-card__meta">
                    <span>${course.duration}</span>
                    <span>${course.format}</span>
                </div>
                <a class="btn btn--small" href="enroll.html">Secure a seat</a>
            </div>
        </article>
    `;
}

function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function initStudyPlanForm() {
    const form = document.querySelector('#studyPlanForm');
    const output = document.querySelector('#studyPlanOutput');
    if (!form || !output) return;

    const savedPlan = readStorage(STORAGE_KEYS.plan);
    if (savedPlan) {
        renderPlan(savedPlan, output);
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const plan = {
            name: (formData.get('name') ?? '').toString().trim(),
            goal: (formData.get('goal') ?? 'career switch').toString(),
            timeline: (formData.get('timeline') ?? '6 weeks').toString(),
            hours: Number(formData.get('hours') ?? 0) || 0
        };

        if (!plan.name) {
            output.innerHTML = `<p>Please provide your name so we can personalize your plan.</p>`;
            return;
        }

        writeStorage(STORAGE_KEYS.plan, plan);
        renderPlan(plan, output);
        const greeting = document.querySelector('#personalGreeting');
        if (greeting) {
            greeting.textContent = `Welcome back, ${plan.name}. Your ${plan.timeline} sprint is ready when you are.`;
        }
        form.reset();
    });
}

function renderPlan(plan, container) {
    const recommendations = suggestCourses(plan.goal).map((course) => `
        <li>
            <strong>${course.title}</strong>
            <span>${course.duration} · ${course.format}</span>
        </li>
    `).join('');

    container.innerHTML = `
        <p class="eyebrow">Hello ${plan.name}</p>
        <h3>Your ${plan.timeline} sprint</h3>
        <p>You plan to dedicate ${plan.hours} focused hours weekly with a goal to ${describeGoal(plan.goal)}.</p>
        <h4>Recommended tracks</h4>
        <ul class="recommendations">${recommendations}</ul>
        <p class="muted">We saved this plan on your device so you can adjust it anytime.</p>
    `;
}

function suggestCourses(goal) {
    const ids = planSuggestions[goal] ?? ['fullstack-web'];
    return courseCatalog.filter((course) => ids.includes(course.id)).slice(0, 2);
}

function initTipRotator() {
    const card = document.querySelector('[data-tip-card]');
    if (!card) return;
    const title = card.querySelector('[data-tip-title]');
    const category = card.querySelector('[data-tip-category]');
    const message = card.querySelector('[data-tip-message]');
    const author = card.querySelector('[data-tip-author]');
    const button = card.querySelector('[data-tip-next]');
    if (!title || !category || !message || !author) return;
    let index = 0;

    const renderTip = () => {
        const tip = studyTips[index];
        if (!tip) return;
        title.textContent = tip.title;
        category.textContent = tip.category;
        message.textContent = tip.message;
        author.textContent = tip.author;
    };

    button?.addEventListener('click', () => {
        index = (index + 1) % studyTips.length;
        renderTip();
    });

    renderTip();
}

function initChecklist() {
    const list = document.querySelector('[data-checklist]');
    if (!list) return;
    const progressLabel = document.querySelector('[data-checklist-progress]');
    const saved = readStorage(STORAGE_KEYS.checklist) ?? [];
    const checkboxes = Array.from(list.querySelectorAll('input[type="checkbox"]'));

    checkboxes.forEach((checkbox) => {
        checkbox.checked = saved.includes(checkbox.value);
        checkbox.addEventListener('change', () => {
            const selected = checkboxes.filter((box) => box.checked).map((box) => box.value);
            writeStorage(STORAGE_KEYS.checklist, selected);
            if (progressLabel) {
                progressLabel.textContent = `${selected.length} / ${checkboxes.length} rituals complete`;
            }
        });
    });

    if (progressLabel) {
        const initialCount = checkboxes.filter((box) => box.checked).length;
        progressLabel.textContent = `${initialCount} / ${checkboxes.length} rituals complete`;
    }
}

function initEnrollmentForm() {
    const form = document.querySelector('#enrollmentForm');
    const confirmation = document.querySelector('#enrollConfirmation');
    if (!form || !confirmation) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        if (!form.reportValidity()) {
            confirmation.innerHTML = `<p>Please complete all required fields and agree to the guidelines.</p>`;
            return;
        }

        const submission = Object.fromEntries(formData.entries());
        writeStorage(STORAGE_KEYS.enrollment, submission);
        confirmation.innerHTML = `
            <p class="eyebrow">Thanks ${submission.fullName}</p>
            <p>We will reach out via ${submission.email} about the ${submission.startDate} track for ${submission.interest}.</p>
            <p class="muted">Save this summary for your records. A confirmation email arrives shortly.</p>
        `;
        form.reset();
    });
}

function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (!lazyImages.length) return;

    const loadImage = (img) => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    loadImage(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, { rootMargin: '200px 0px' });

        lazyImages.forEach((img) => observer.observe(img));
    } else {
        lazyImages.forEach(loadImage);
    }
}

function describeGoal(goal) {
    return goalCopy[goal] ?? 'grow your skills';
}

function readStorage(key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (_error) {
        return null;
    }
}

function writeStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
