document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('theme-toggle');
    const tooltipText = document.querySelector('.tooltip-text');
    
    // 1. Check for a saved preference or fallback to system settings
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // 2. Determine initial state
    let currentTheme = 'dark'; // Default to dark match
    if (savedTheme === 'light' || (!savedTheme && !systemPrefersDark)) {
        currentTheme = 'light';
    }
    
    // 3. Unified function to handle both CSS variables and text values
    function applyTheme(theme) { 
    // Force the button to drop focus so the tooltip closes immediately on mouse leave
    if (typeof toggleButton !== 'undefined') {
        toggleButton.blur();
    }

    if (theme === 'light') { 
        document.documentElement.setAttribute('data-theme', 'light'); 
        localStorage.setItem('theme', 'light'); 
        toggleButton.innerHTML = '🌙 Dark Mode'; 
        if (tooltipText) tooltipText.textContent = 'Click to switch to dark mode contrast profile'; 
    } else { 
        document.documentElement.removeAttribute('data-theme'); 
        localStorage.setItem('theme', 'dark'); 
        toggleButton.innerHTML = '☀️ Light Mode'; 
        if (tooltipText) tooltipText.textContent = 'Click to switch to light mode contrast profile'; 
    } 
}
    
    // Execute on initial page load
    applyTheme(currentTheme);

    // 4. Handle manual toggle button clicks
    toggleButton.addEventListener('click', () => {
        const activeTheme = document.documentElement.getAttribute('data-theme');
        // If the attribute is currently 'light', switch to dark. Otherwise, switch to light.
        const nextTheme = activeTheme === 'light' ? 'dark' : 'light';
        applyTheme(nextTheme);
    });
});
