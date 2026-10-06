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
        mount: (contentElement, footerElement, resolve, reject) => {
            const inputEl = document.createElement('input');
            inputEl.classList.add('input');
            inputEl.value = currentText;
            inputEl.setAttribute('type', 'text');
            inputEl.addEventListener('change', () => {
                currentText = inputEl.value;
            });
            contentElement.appendChild(inputEl);

            footerElement.appendChild(createDialogFooterItem('OK', _e => {
                resolve(currentText);
            }));
            footerElement.appendChild(createDialogFooterItem('Cancel', _e => {
                reject();
            }));
        },
        onClose: () => {
            console.log('dialog closed');
        },
    })
        .then(result => {
            text = result;
            inputTextEl.innerText = result;
        });
});
