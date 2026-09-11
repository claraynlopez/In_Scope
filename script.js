// Slide Navigation
function showPanel(panelName) {
    const track = document.getElementById('slider-track');
    const navHome = document.getElementById('nav-home');
    const navCalc = document.getElementById('nav-calculator');

    if (panelName === 'calculator') {
        track.classList.add('slide-calculator');
        navCalc.classList.add('active');
        navHome.classList.remove('active');
    } else {
        track.classList.remove('slide-calculator');
        navHome.classList.add('active');
        navCalc.classList.remove('active');
    }
}

// Toggle Modal Itinerary
function toggleItineraryModal() {
    const modal = document.getElementById('itinerary-modal');
    if (modal.classList.contains('opacity-0')) {
        modal.classList.remove('opacity-0', 'pointer-events-none');
    } else {
        modal.classList.add('opacity-0', 'pointer-events-none');
    }
}

// Main Scope Date Calculation
const firstDay = new Date(2025, 4, 28);
firstDay.setHours(0, 0, 0, 0);

const today = new Date();
today.setHours(0, 0, 0, 0);

const timeDiff = today - firstDay;
const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

const limitDay = new Date(today.getTime() + (daysDiff * 24 * 60 * 60 * 1000));
const lastDayFormatted = limitDay.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

document.getElementById('resultat').textContent = lastDayFormatted;

// Custom Calculator
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const todayStr = `${year}-${month}-${day}`;

document.getElementById('current-date').value = todayStr;
document.getElementById('start-date').value = '2025-05-28';

function showAlert(msg) {
    const alertBox = document.getElementById('calculator-alert');
    const alertMsg = document.getElementById('alert-message');
    alertMsg.textContent = msg;
    alertBox.classList.remove('hidden');
}

function hideAlert() {
    const alertBox = document.getElementById('calculator-alert');
    alertBox.classList.add('hidden');
}

function calculateScope() {
    hideAlert();

    const startDateInput = document.getElementById('start-date').value;
    const currentDateInput = document.getElementById('current-date').value;

    if (!startDateInput || !currentDateInput) {
        showAlert('Please select both start and target dates.');
        return;
    }

    const startDate = new Date(startDateInput);
    startDate.setHours(0, 0, 0, 0);

    const currentDate = new Date(currentDateInput);
    currentDate.setHours(0, 0, 0, 0);

    if (startDate > currentDate) {
        showAlert('The start date must be earlier than or equal to the target date.');
        return;
    }

    const diffTime = currentDate - startDate;
    const calcDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const calcLimitDate = new Date(currentDate.getTime() + (calcDays * 24 * 60 * 60 * 1000));

    const limitFormatted = calcLimitDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const resultHTML = `
        <div class="p-5 rounded-2xl bg-cream-50 border border-navy-900/15 space-y-3 shadow-sm">
            <div class="flex items-center justify-between border-b border-navy-900/10 pb-2">
                <span class="text-xs font-cinzel font-bold text-navy-900 tracking-wider uppercase">Calculation Results</span>
                <span class="px-2.5 py-0.5 rounded-full bg-navy-900 text-cream-100 text-[10px] font-cinzel font-bold tracking-wider">${calcDays} Days Elapsed</span>
            </div>

            <div class="space-y-1">
                <div class="text-xs font-cinzel text-navy-900/60 uppercase tracking-widest">Projected Scope Deadline:</div>
                <div class="text-2xl font-garamond font-bold text-navy-900">${limitFormatted}</div>
            </div>

            <p class="text-xs text-navy-900/80 leading-relaxed bg-cream-100 p-3 rounded-xl border border-navy-900/10 font-sans">
                From <strong>${startDate.toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}</strong> until target date, <strong>${calcDays} days</strong> elapse.
                Extending that duration forward places your deadline on <strong>${limitFormatted}</strong>.
            </p>
        </div>
    `;

    document.getElementById('calculator-result').innerHTML = resultHTML;
}

window.onload = function() {
    calculateScope();
};
