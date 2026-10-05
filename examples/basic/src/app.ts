import {showDialog} from '@ngyewch/bulma-dialog';

import 'bulma/css/bulma.css';
import './app.css';

const inputTextEl = document.getElementById('inputText')!;
let text: string = '';

const showDialogButton = document.getElementById('showDialogButton')!;
showDialogButton?.addEventListener('click', () => {
    let currentText: string = text;
    showDialog<string>({
        title: 'Test dialog',
        mountContent: (mountElement, _resolve, _reject) => {
            const inputEl = document.createElement('input');
            inputEl.classList.add('input');
            inputEl.value = text;
            inputEl.setAttribute('type', 'text');
            inputEl.addEventListener('change', () => {
                currentText = inputEl.value;
            });
            mountElement.appendChild(inputEl);
        },
        mountFooter: (mountElement, resolve, _reject) => {
            const okButtonEl = document.createElement('button');
            okButtonEl.classList.add('button', 'card-footer-item');
            okButtonEl.innerText = 'OK';
            okButtonEl.addEventListener('click', () => {
                resolve(currentText);
            });
            mountElement.appendChild(okButtonEl);
        },
    })
        .then(result => {
            text = result;
            inputTextEl.innerText = result;
        });
});
