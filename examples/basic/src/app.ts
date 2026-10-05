import {createDialogFooterItem, showDialog} from '@ngyewch/bulma-dialog';

import 'bulma/css/bulma.css';
import './app.css';

const inputTextEl = document.getElementById('inputText')!;
let text: string = '';

const showDialogButton = document.getElementById('showDialogButton')!;
showDialogButton.addEventListener('click', () => {
    let currentText: string = text;
    showDialog<string>({
        title: 'Test dialog',
        mountContent: (mountElement, _resolve, _reject) => {
            const inputEl = document.createElement('input');
            inputEl.classList.add('input');
            inputEl.value = currentText;
            inputEl.setAttribute('type', 'text');
            inputEl.addEventListener('change', () => {
                currentText = inputEl.value;
            });
            mountElement.appendChild(inputEl);
        },
        mountFooter: (mountElement, resolve, reject) => {
            mountElement.appendChild(createDialogFooterItem('OK', _e => {
                resolve(currentText);
            }));
            mountElement.appendChild(createDialogFooterItem('Cancel', _e => {
                reject();
            }));
        },
    })
        .then(result => {
            text = result;
            inputTextEl.innerText = result;
        });
});
