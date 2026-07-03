// Mission Gyan Jobs - Common.js V7.1 Pro Max FINAL
// 100% Working: Back Button + Tags + Countdown + Share Box + Related Jobs + Analytics
// Fix: Back button ab har page pe aayega

// ===== GOOGLE ANALYTICS 4 - START =====
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-8GKG4REDX6');

(function() {
  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-8GKG4REDX6';
  document.head.appendChild(gaScript);
})();

function trackDownload(jobTitle, fileUrl) {
  gtag('event', 'file_download', {
    'event_category': 'Job PDF',
    'event_label': jobTitle,
    'file_url': fileUrl,
    'value': 1
  });
}

function trackOutboundClick(url) {
  gtag('event', 'click', {
    'event_category': 'Outbound Link',
    'event_label': url,
    'transport_type': 'beacon'
  });
}
// ===== GOOGLE ANALYTICS 4 - END =====

document.addEventListener('DOMContentLoaded', function() {

    // ===== AUTO OUTBOUND LINK TRACKING =====
    document.querySelectorAll('a[href^="http"]').forEach(function(link) {
      if (!link.href.includes('missiongyanjobs.github.io')) {
        link.addEventListener('click', function() {
          trackOutboundClick(link.href);
        });
      }
    });

    // ===== CHECK VACANCY PAGE =====
    const metaDiv = document.getElementById('job-meta');
    const isVacancyPage =!!metaDiv;

    if (isVacancyPage) {
        const h1 = document.querySelector('h1');
        if(!h1) return;

        const jobPage = document.getElementById('job-page') ||
                        document.querySelector('.container') ||
                        document.querySelector('main') ||
                        document.body;

        // ===== SMART DATA READER =====
        const jobData = {
            qualification: metaDiv?.dataset.qualification || 'Not Specified',
            formMode: metaDiv?.dataset.formMode || 'Check Notification',
            status: metaDiv?.dataset.status || 'New Vacancy',
            post: metaDiv?.dataset.post || null,
            total: metaDiv?.dataset.total || null,
            lastDate: metaDiv?.dataset.lastDate || null,
            showUpdated: metaDiv?.dataset.showUpdated!== 'false',
            showShare: metaDiv?.dataset.showShare!== 'false'
        };

        // ===== COUNTDOWN =====
        function getCountdown(lastDateStr) {
            if (!lastDateStr) return '';
            const parts = lastDateStr.split('/');
            if (parts.length!== 3) return '';
            const lastDate = new Date(parts[2], parts[1] - 1, parts[0]);
            const today = new Date();
            today.setHours(0,0,0,0);
            const diff = Math.ceil((lastDate - today) / (1000 * 60 * 60 * 24));

            if (diff < 0) return '<span style="background:#dc2626;color:#fff;padding:3px 10px;border-radius:6px;font-weight:600;margin-left:8px;">⛔ Expired</span>';
            if (diff === 0) return '<span style="background:#dc2626;color:#fff;padding:3px 10px;border-radius:6px;font-weight:600;margin-left:8px;">⏳ Last Day Today</span>';
            if (diff <= 7) return `<span style="background:#dc2626;color:#fff;padding:3px 10px;border-radius:6px;font-weight:600;margin-left:8px;">⏳ ${diff} Days Left</span>`;
            return `<span style="background:#16a34a;color:#fff;padding:3px 10px;border-radius:6px;font-weight:600;margin-left:8px;">⏳ ${diff} Days Left</span>`;
        }

        const countdownHTML = getCountdown(jobData.lastDate);

        // ===== DYNAMIC TAGS =====
        let tagsArray = [];
        if(jobData.qualification && jobData.qualification!== 'Not Specified') tagsArray.push({text: jobData.qualification, color: '#4caf50'});
        if(jobData.formMode && jobData.formMode!== 'Check Notification') tagsArray.push({text: jobData.formMode, color: '#2196f3'});
        if(jobData.status) tagsArray.push({text: jobData.status, color: '#ff5722'});

        if(tagsArray.length > 0) {
            let tagsHTML = `<div id="mgj-tags" style="margin:0 0 12px 0;display:flex;flex-wrap:wrap;gap:8px;justify-content:center;">`;
            tagsArray.forEach(tag => {
                tagsHTML += `<span style="background:${tag.color};color:white;padding:6px 14px;border-radius:20px;font-size:13px;font-weight:600;box-shadow:0 2px 4px rgba(0,0,0,0.1);">${tag.text}</span>`;
            });
            tagsHTML += `</div>`;
            h1.insertAdjacentHTML('afterend', tagsHTML);
        }

        // ===== LAST UPDATED =====
        if(jobData.showUpdated) {
            let today = new Date().toLocaleDateString('en-GB', {day:'2-digit',month:'long',year:'numeric'});
            let updatedHTML = `<p id="mgj-updated" style="font-size:13px;color:#1b5e20;margin:8px 0 15px 0;background:#e8f5e9;padding:8px 14px;border-left:4px solid #4caf50;border-radius:4px;display:inline-block;font-weight:600;box-shadow:0 1px 3px rgba(0,0,0,0.05);">✅ Last Updated: ${today}</p>`;
            h1.insertAdjacentHTML('afterend', updatedHTML);
        }

        // ===== INFO LINE =====
        let infoParts = [];
        if(jobData.post) infoParts.push(jobData.post);
        if(jobData.total) infoParts.push(`Total ${jobData.total} Posts`);
        if(jobData.lastDate) infoParts.push(`Last Date: ${jobData.lastDate}`);

        if(infoParts.length > 0) {
            let infoLine = `<p id="mgj-info" style="font-size:14px;color:#1e3a8a;margin:-8px 0 18px 0;opacity:0.95;font-weight:600;text-align:center;">${infoParts.join(' | ')} ${countdownHTML}</p>`;
            h1.insertAdjacentHTML('afterend', infoLine);
        }

        // ===== SHARE BOX + RELATED JOBS =====
        if(jobData.showShare) {
            const container = document.querySelector('.container');
            const footerNote = document.querySelector('.footer-note');

            if (container && footerNote) {
                const shareSection = document.createElement('div');
                shareSection.id = 'mgj-share-related';
                shareSection.style.cssText = 'margin:25px 20px 0 20px;padding:20px;background:#f8f9fa;border-radius:8px;border:1px solid #e0e0e0;';

                const currentUrl = window.location.href;
                const title = document.title;

                shareSection.innerHTML = `
                    <h3 style="color:#b30000;margin:0 0 15px 0;text-align:center;font-size:18px;">📤 Share This Job</h3>
                    <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-bottom:25px;">
                        <a href="https://wa.me/?text=${encodeURIComponent(title + ' ' + currentUrl)}" target="_blank" onclick="gtag('event','share',{method:'WhatsApp'})" style="background:#25D366;color:#fff;padding:10px 20px;border-radius:5px;text-decoration:none;font-weight:600;display:inline-flex;align-items:center;gap:5px;">WhatsApp</a>
                        <a href="https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}" target="_blank" onclick="gtag('event','share',{method:'Telegram'})" style="background:#0088cc;color:#fff;padding:10px 20px;border-radius:5px;text-decoration:none;font-weight:600;display:inline-flex;align-items:center;gap:5px;">Telegram</a>
                        <button onclick="navigator.clipboard.writeText('${currentUrl}');this.innerText='✓ Copied!';setTimeout(()=>this.innerText='Copy Link',2000);gtag('event','share',{method:'Copy'})" style="background:#6c757d;color:#fff;padding:10px 20px;border-radius:5px;border:none;font-weight:600;cursor:pointer;">Copy Link</button>
                    </div>
                    <h3 style="color:#b30000;margin:0 0 15px 0;text-align:center;font-size:18px;">🔗 Related Jobs</h3>
                    <div id="related-jobs" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:12px;">
                        <a href="https://missiongyanjobs.github.io/" style="background:#fff;padding:14px;border:2px solid #b30000;border-radius:5px;text-decoration:none;color:#b30000;font-weight:600;text-align:center;transition:0.2s;">🏠 View All Latest Jobs</a>
                        <a href="https://missiongyanjobs.github.io/category/central-govt" style="background:#fff;padding:14px;border:2px solid #1976d2;border-radius:5px;text-decoration:none;color:#1976d2;font-weight:600;text-align:center;transition:0.2s;">🏛️ Central Govt Jobs</a>
                        <a href="https://missiongyanjobs.github.io/category/10th-pass" style="background:#fff;padding:14px;border:2px solid #388e3c;border-radius:5px;text-decoration:none;color:#388e3c;font-weight:600;text-align:center;transition:0.2s;">📚 10th Pass Jobs</a>
                        <a href="https://missiongyanjobs.github.io/category/offline-form" style="background:#fff;padding:14px;border:2px solid #f57c00;border-radius:5px;text-decoration:none;color:#f57c00;font-weight:600;text-align:center;transition:0.2s;">📝 Offline Form Jobs</a>
                    </div>
                `;

                container.insertBefore(shareSection, footerNote);
            }
        }

        // ===== DOWNLOAD TRACKING =====
        document.querySelectorAll('a[href$=".pdf"]').forEach(function(link) {
            link.addEventListener('click', function() {
                trackDownload(document.title, link.href);
            });
        });
    }

    // ===== SMART BACK/HOME BUTTON - PRO MAX FIX =====
    // Ab har page pe chalega, top-bar ho ya na ho
    const path = window.location.pathname;
    const isHomePage = path === '/' || path === '/index.html' || path === '' || path.endsWith('missiongyanjobs.github.io/') || path.endsWith('missiongyanjobs.github.io');

    if (!isHomePage &&!document.getElementById('mgj-home-btn')) {
        const header = document.querySelector('.top-bar') || document.querySelector('header') || document.body;

        var btn = document.createElement('a');
        btn.id = 'mgj-home-btn';
        btn.href = '#';

        if (isVacancyPage) {
            btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg><span>Back</span>`;
            btn.onclick = function(e) {
                e.preventDefault();
                if (window.history.length > 1) {
                    window.history.back();
                } else {
                    window.location.href = 'https://missiongyanjobs.github.io/';
                }
            };
        } else {
            btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 22"></polyline></svg><span>Home</span>`;
            btn.onclick = function(e) {
                e.preventDefault();
                window.location.href = 'https://missiongyanjobs.github.io/';
            };
        }

        var css = `#mgj-home-btn{position:fixed;left:15px;top:15px;display:inline-flex;align-items:center;gap:6px;background:#fff;color:#0d47a1!important;padding:10px 16px;border-radius:8px;text-decoration:none!important;font-weight:700;font-size:14px;box-shadow:0 2px 12px rgba(0,0,0,0.2);transition:0.2s;z-index:9999;border:2px solid #0d47a1} #mgj-home-btn:hover{background:#0d47a1;color:#fff!important;transform:translateY(-2px);box-shadow:0 4px 16px rgba(0,0,0,0.3)} @media(max-width:768px){#mgj-home-btn{left:10px;top:10px;padding:8px 12px} #mgj-home-btn span{display:none}} #mgj-share-related a:hover{transform:translateY(-2px);box-shadow:0 4px 8px rgba(0,0,0,0.15)}`;

        if (!document.getElementById('mgj-btn-style')) {
            var style = document.createElement('style');
            style.id = 'mgj-btn-style';
            style.innerHTML = css;
            document.head.appendChild(style);
        }

        // Top-bar hai to usme, nahi to body me direct add kar de
        if (header.classList && header.classList.contains('top-bar')) {
            btn.style.position = 'absolute';
            btn.style.top = '50%';
            btn.style.transform = 'translateY(-50%)';
            header.insertBefore(btn, header.firstChild);
        } else {
            document.body.prepend(btn);
        }
    }
});