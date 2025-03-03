# CUNY Upskilling Form Fix
![image](https://github.com/user-attachments/assets/955fb07d-2b0f-484c-acae-26dee679ae7e)

A userscript to correct the error on the CUNY Upskilling registration page. After filling out the entire form the user is given the error message: "Please review the current page (1 of 1) and fill in valid responses for each field: Which of these statements best describes you?". However, the field isn't available in the form. This script reveals that field, allowing the user to properly submit the form.



## Installation
1. Install Tampermonkey or another userscript manager.
2. Copy the provided script.
3. In Tampermonkey select 'create a new script', then paste the above script, and finally save the script.
4. Visit https://www.cuny.edu/about/administration/offices/ocip/students/upskilling/#register all forms should now be available.

## Features
- Reveals hidden all fields with red borders for visibility.
- Keeps the `.cuny-search-form` popup hidden.
- Works dynamically with DOM changes.

## License
MIT.

