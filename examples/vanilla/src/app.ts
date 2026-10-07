import {createDialogFooterItem, showDialog} from '@ngyewch/bulma-dialog';

import 'bulma/css/bulma.css';
import '@ngyewch/bulma-dialog/dist/bulma-dialog.css';
import './app.css';

const inputTextEl = document.getElementById('inputText')!;
let text: string = '';

const showDialogButton = document.getElementById('showDialogButton')!;
showDialogButton.addEventListener('click', () => {
    let currentText: string = text;
    const validate = (): boolean => {
        return (currentText.trim().length > 0);
    }
    showDialog<string>({
        title: 'Test dialog',
        mount: (contentElement, footerElement, resolve, reject) => {
            const okButton = createDialogFooterItem('OK', _e => {
                resolve(currentText);
            });
            footerElement.appendChild(okButton);
            footerElement.appendChild(createDialogFooterItem('Cancel', _e => {
                reject();
            }));

            const updateForm = () => {
                if (validate()) {
                    okButton.classList.remove('is-disabled');
                } else {
                    okButton.classList.add('is-disabled');
                }
            }
            updateForm();

            const inputEl = document.createElement('input');
            inputEl.classList.add('input');
            inputEl.value = currentText;
            inputEl.setAttribute('type', 'text');
            inputEl.addEventListener('input', () => {
                currentText = inputEl.value;
                updateForm();
            });
            contentElement.appendChild(inputEl);
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
