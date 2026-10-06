<script lang="ts">
    import {createDialogFooterItem, showDialog} from '@ngyewch/bulma-dialog';

    import CustomForm from './CustomForm.svelte';
    import {type CustomStruct} from './CustomForm.js';
    import {mount} from "svelte";

    let data = $state<CustomStruct>({
        name: '',
        email: '',
        phone: '',
        department: '',
        member: false,
        subject: '',
        question: '',
    });

    function doShowDialog() {
        let newData = $state<CustomStruct>($state.snapshot(data));
        showDialog<CustomStruct>({
            title: 'Support',
            mount: (contentElement, footerElement, resolve, reject) => {
                const submitButton = createDialogFooterItem('Submit', () => {
                    resolve(newData);
                });
                footerElement.appendChild(submitButton);
                footerElement.appendChild(createDialogFooterItem('Cancel', () => {
                    reject();
                }))

                mount(CustomForm, {
                    target: contentElement,
                    props: {
                        data: newData,
                        onValidate: (isValid: boolean) => {
                            if (isValid) {
                                submitButton.classList.remove('disabled');
                            } else {
                                submitButton.classList.add('disabled');
                            }
                        },
                    },
                });
            },
            onClose: () => {
                console.log('closed');
            },
        })
            .then(response => {
                data = response;
            });
    }
</script>

<div class="container">
    <button class="button" onclick={() => doShowDialog()}>Show dialog</button>
    <div class="box">
        <table class="table">
            <tbody>
            <tr>
                <th>Name</th>
                <td>{data.name}</td>
            </tr>
            <tr>
                <th>Email</th>
                <td>{data.email}</td>
            </tr>
            <tr>
                <th>Phone</th>
                <td>{data.phone}</td>
            </tr>
            <tr>
                <th>Department</th>
                <td>{data.department}</td>
            </tr>
            <tr>
                <th>Member</th>
                <td>{data.member}</td>
            </tr>
            <tr>
                <th>Subject</th>
                <td>{data.subject}</td>
            </tr>
            <tr>
                <th>Question</th>
                <td>{data.question}</td>
            </tr>
            </tbody>
        </table>
    </div>
</div>
