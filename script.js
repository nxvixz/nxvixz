document.querySelectorAll('.java').forEach(el => { el.src = "./icons/languages/java.svg"; });
document.querySelectorAll('.onshape').forEach(el => { el.src = "./icons/onshape.svg"; });

// web development
document.querySelectorAll('.javascript, .js').forEach(el => { el.src = "./icons/languages/javascript.svg"; });;

// libraries
document.querySelectorAll('.djs, .discordjs').forEach(el => { el.src = "./icons/libraries/discordjs.svg"; });
document.querySelectorAll('.ejs, .expressjs').forEach(el => { el.src = "./icons/libraries/expressjs.svg"; });

function relativeTime(timestamp) {
    const diff = timestamp - Math.floor(Date.now() / 1000);

    const months = Math.floor(diff / 2592000);
    const days = Math.floor(diff / 86400);
    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor(diff / 60);

    if (months > 0) return `${months} month${months === 1 ? "" : "s"}`;
    if (days > 0) return `${days} day${days === 1 ? "" : "s"}`;
    if (hours > 0) return `${hours} hour${hours === 1 ? "" : "s"}`;
    if (minutes > 0) return `${minutes} minute${minutes === 1 ? "" : "s"}`;
    return `${diff} second${diff === 1 ? "" : "s"}`;
}

function formatTimestamp(start, end = Math.floor(Date.now() / 1000)) {
    const diff = Math.max(0, end - start);

    const days = Math.floor(diff / 86400);
    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);
    const remainingDays = (days % 365) % 30;

    const parts = [];

    if (years > 0) parts.push(`${years} Year${years === 1 ? "" : "s"}`);
    if (months > 0) parts.push(`${months} Month${months === 1 ? "" : "s"}`);
    if (remainingDays > 0) parts.push(`${remainingDays} Day${remainingDays === 1 ? "" : "s"}`);

    if (parts.length === 0) return "Less than a day";
    if (parts.length === 1) return parts[0];
    if (parts.length === 2) return `${parts[0]} and ${parts[1]}`;

    return `${parts.slice(0, -1).join(", ")}, and ${parts.at(-1)}`;
}

function updateTimestamps() {
    document.querySelectorAll('.timestamp').forEach(el => {
        const start = Number(el.getAttribute('time1'));

        if (Math.floor(Date.now() / 1000) < start) {
            el.innerHTML = `
                <span class="material-symbols-outlined">timer</span>
                Upcoming (In ${relativeTime(start)})
            `;
            return;
        }

        const end = el.getAttribute('time2') === "now"
            ? Math.floor(Date.now() / 1000)
            : Number(el.getAttribute('time2'));

        el.innerHTML = `
            <span class="material-symbols-outlined">timer</span>
            ${formatTimestamp(start, end)}
        `;
    });
}

document.getElementById('projects').addEventListener('click', () => {
    document.getElementById('projects-section').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('experience').addEventListener('click', () => {
    document.getElementById('experience-section').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('home-button').addEventListener('click', () => {
    document.getElementById('main').scrollIntoView({ behavior: 'smooth' });
});

document.querySelectorAll('.skill').forEach(el => {
    if (!el.hasAttribute('tabindex')) {
        el.setAttribute('tabindex', '0');
    }
});

updateTimestamps();
setInterval(updateTimestamps, 1000);