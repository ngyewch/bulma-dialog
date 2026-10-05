export interface DialogOptions<T> {
    title?: string;
    hideCloseButton?: boolean;
    disableOutsideClick?: boolean;
    mountContent?: (containerElement: HTMLElement, resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void;
    mountFooter?: (containerElement: HTMLElement, resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void;
    classes?: string[];
    styles?: Record<string, string>;
}

export function showDialog<T>(options: DialogOptions<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        const modalEl = document.createElement('div');
        modalEl.classList.add('modal', 'is-active');
        if (options.classes !== undefined) {
            modalEl.classList.add(...options.classes);
        }
        if (options.styles !== undefined) {
            (Object.entries(options.styles) as [string, string][])
                .forEach(([key, value]) => {
                    modalEl.style.setProperty(key, value);
                });
        }

        const modalBackgroundEl = document.createElement('div');
        modalBackgroundEl.classList.add('modal-background');
        if ((options.disableOutsideClick === undefined) || !options.disableOutsideClick) {
            modalBackgroundEl.onclick = () => {
                document.body.removeChild(modalEl);
                reject();
            };
        }
        modalEl.appendChild(modalBackgroundEl);

        const modalContentEl = document.createElement('div');
        modalContentEl.classList.add('modal-content');
        modalEl.appendChild(modalContentEl);

        const modalCardEl = document.createElement('div');
        modalCardEl.classList.add('card');
        modalContentEl.appendChild(modalCardEl);

        const modalCardHeaderEl = document.createElement('header');
        modalCardHeaderEl.classList.add('card-header');
        const modalCardTitleEl = document.createElement('p');
        modalCardTitleEl.classList.add('card-header-title');
        if (options.title !== undefined) {
            modalCardTitleEl.innerText = options.title;
        }
        modalCardHeaderEl.appendChild(modalCardTitleEl);
        if ((options.hideCloseButton === undefined) || !options.hideCloseButton) {
            const closeButtonEl = document.createElement('button');
            closeButtonEl.classList.add('card-header-icon');
            closeButtonEl.setAttribute('aria-label', 'close');
            closeButtonEl.onclick = () => {
                document.body.removeChild(modalEl);
                reject();
            };
            modalCardHeaderEl.appendChild(closeButtonEl);
            const closeSpanEl = document.createElement('span');
            closeSpanEl.classList.add('delete');
            closeButtonEl.appendChild(closeSpanEl);
        }
        modalCardEl.appendChild(modalCardHeaderEl);

        if (options.mountContent !== undefined) {
            const modalCardContentEl = document.createElement('div');
            modalCardContentEl.classList.add('card-content');
            modalCardEl.appendChild(modalCardContentEl);
            options.mountContent(modalCardContentEl,
                (value: T | PromiseLike<T>): void => {
                    document.body.removeChild(modalEl);
                    resolve(value);
                },
                (reason?: any): void => {
                    document.body.removeChild(modalEl);
                    reject(reason);
                });
        }

        if (options.mountFooter !== undefined) {
            const modalCardFooterEl = document.createElement('footer');
            modalCardFooterEl.classList.add('card-footer');
            modalCardEl.appendChild(modalCardFooterEl);
            options.mountFooter(modalCardFooterEl,
                (value: T | PromiseLike<T>): void => {
                    document.body.removeChild(modalEl);
                    resolve(value);
                },
                (reason?: any): void => {
                    document.body.removeChild(modalEl);
                    reject(reason);
                });
        }

        document.body.appendChild(modalEl);
    });
}
