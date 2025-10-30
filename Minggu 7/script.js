// Theme toggle + persistence
(function(){
    const root = document.documentElement;
    const toggle = document.getElementById('themeToggle');
    const KEY = 'theme-preference';

    function showToast(message){
        let toast = document.getElementById('toast');
        if(!toast){
            toast = document.createElement('div');
            toast.id = 'toast';
            toast.className = 'toast';
            toast.setAttribute('role','status');
            toast.setAttribute('aria-live','polite');
            toast.setAttribute('aria-atomic','true');
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.remove('show');
        void toast.offsetWidth;
        toast.classList.add('show');
        if(toast._timeout) clearTimeout(toast._timeout);
        toast._timeout = setTimeout(()=>{
            toast.classList.remove('show');
        }, 2600);
    }

    function applyTheme(theme){
        if(theme === 'dark'){
            root.setAttribute('data-theme','dark');
            if(toggle){
                const icon = toggle.querySelector('.icon');
                const label = toggle.querySelector('.label');
                if(icon) icon.textContent = '🌙';
                if(label) label.textContent = 'Gelap';
                toggle.setAttribute('aria-pressed','true');
                toggle.setAttribute('aria-label','Ganti ke tema terang');
                toggle.title = 'Ganti ke tema terang';
            }
            showToast('Tema diubah ke Gelap');
        } else {
            root.removeAttribute('data-theme');
            if(toggle){
                const icon = toggle.querySelector('.icon');
                const label = toggle.querySelector('.label');
                if(icon) icon.textContent = '☀️';
                if(label) label.textContent = 'Terang';
                toggle.setAttribute('aria-pressed','false');
                toggle.setAttribute('aria-label','Ganti ke tema gelap');
                toggle.title = 'Ganti ke tema gelap';
            }
            showToast('Tema diubah ke Terang');
        }
    }

    function getPreferredTheme(){
        const stored = localStorage.getItem(KEY);
        if(stored) return stored;
        if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
            return 'dark';
        }
        return 'light';
    }

    const initial = getPreferredTheme();
    applyTheme(initial);

    if(toggle){
        toggle.addEventListener('click', function(){
            const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
            const next = current === 'dark' ? 'light' : 'dark';
            applyTheme(next);
            localStorage.setItem(KEY, next);
        });
    }
})();

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    if (!name || !email) {
        alert('Nama dan Email tidak boleh kosong!');
        return;
    }
    alert('Terima kasih, ' + name + '! Pesan Anda telah dikirim.');
    this.reset();
});
