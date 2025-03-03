// ==UserScript==
// @name         Fix CUNY Upskilling site
// @namespace    github.com/ai-guapo
// @version      1.1
// @description  Form fix for CUNY Upskilling page
// @author       ai-guapo
// @match        https://www.cuny.edu/about/administration/offices/ocip/students/upskilling/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to wait for an element to appear
    function waitForElement(selector, callback, maxAttempts = 20, interval = 500) {
        let attempts = 0;
        const checkExist = setInterval(() => {
            const element = document.querySelector(selector);
            attempts++;
            if (element) {
                clearInterval(checkExist);
                console.log(`Found element with selector "${selector}"`);
                callback(element);
            } else if (attempts >= maxAttempts) {
                clearInterval(checkExist);
                console.log(`Element "${selector}" not found after ${maxAttempts} attempts, proceeding...`);
                callback(null);
            }
        }, interval);
    }

    // Function to reveal hidden form fields and hide the search popup
    function manageElements() {
        // Hide the search overlay
        const searchOverlay = document.querySelector('.cuny-search-form');
        if (searchOverlay) {
            searchOverlay.style.display = 'none !important'; // Force hide with high specificity
            searchOverlay.style.visibility = 'hidden';
            searchOverlay.classList.add('hidden'); // Reinforce hidden state
            console.log('Search overlay (.cuny-search-form) hidden.');
        }

        // Select only form-related elements to reveal
        const elements = document.querySelectorAll(
            'input, select, textarea, label, fieldset, .fsHidden:not(.cuny-search-form), .fsHiddenField:not(.cuny-search-form > *)'
        );

        let hiddenCount = 0;
        elements.forEach((el) => {
            // Skip if part of the search overlay
            if (el.closest('.cuny-search-form')) {
                return;
            }

            const computedStyle = window.getComputedStyle(el);
            const isHidden = computedStyle.display === 'none' || computedStyle.visibility === 'hidden' ||
                             el.classList.contains('fsHidden') || el.classList.contains('fsHiddenField');

            if (isHidden) {
                el.style.display = 'block';
                el.style.visibility = 'visible';
                el.classList.remove('fsHidden', 'fsHiddenField');

                if (el.hasAttribute('disabled')) {
                    el.removeAttribute('disabled');
                }

                // Optional: Highlight for debugging
                el.style.border = '2px solid red';
                el.style.backgroundColor = '#fff3f3';

                hiddenCount++;
                console.log(`Revealed element: ${el.tagName}${el.id ? '#' + el.id : ''}${el.className ? '.' + el.className : ''}`);
            }
        });

        console.log(`Total hidden form elements revealed: ${hiddenCount}`);

        // Ensure parent elements of forms are visible, excluding search overlay
        const forms = document.querySelectorAll('form:not(.cuny-search-form)');
        forms.forEach((form) => {
            let parent = form.parentElement;
            while (parent && parent !== document.body) {
                if (window.getComputedStyle(parent).display === 'none') {
                    parent.style.display = 'block';
                    console.log(`Revealed parent of form: ${parent.tagName}${parent.id ? '#' + parent.id : ''}`);
                }
                parent = parent.parentElement;
            }
        });
    }

    // Prevent search overlay from showing on input events
    function blockSearchTrigger() {
        document.addEventListener('focusin', (e) => {
            const searchOverlay = document.querySelector('.cuny-search-form');
            if (searchOverlay) {
                searchOverlay.style.display = 'none !important';
            }
        }, true);

        document.addEventListener('input', (e) => {
            const searchOverlay = document.querySelector('.cuny-search-form');
            if (searchOverlay) {
                searchOverlay.style.display = 'none !important';
            }
        }, true);
    }

    // Run when the Formstack form loads
    waitForElement('.fsForm', () => {
        console.log('Page loaded, managing elements...');
        manageElements();
        blockSearchTrigger();

        // Monitor DOM changes
        const observer = new MutationObserver(() => {
            console.log('DOM changed, re-managing elements...');
            manageElements();
        });
        observer.observe(document.body, { childList: true, subtree: true });
    });
})();