import {showDialog} from '@ngyewch/bulma-dialog';

import 'bulma/css/bulma.css';
import './app.css';

const inputTextEl = document.getElementById('inputText')!;

const showDialogButton = document.getElementById('showDialogButton')!;
showDialogButton?.addEventListener('click', () => {
    showDialog<string>({
        title: 'Test dialog',
        mount: (mountElement, resolve, _reject) => {
            const inputEl = document.createElement('input');
            inputEl.classList.add('input');
            inputEl.value = inputTextEl.innerText;
            inputEl.setAttribute('type', 'text');
            mountElement.appendChild(inputEl);

            const okButtonEl = document.createElement('button');
            okButtonEl.classList.add('button');
            okButtonEl.innerText = 'OK';
            okButtonEl.addEventListener('click', () => {
                resolve(inputEl.value);
            });
            mountElement.appendChild(okButtonEl);
        },
    })
        .then(result => {
            inputTextEl.innerText = result;
        });
});
