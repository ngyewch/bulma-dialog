<script lang="ts">
    import {type CustomStruct} from './CustomForm.js';

    let {
        data = $bindable(),
        onValidate,
    } = $props<{
        data: CustomStruct;
        onValidate?: (isValid: boolean) => void;
    }>();

    let isValid = $derived<boolean>(
        (data.name !== '')
        && (data.email !== '')
        && (data.phone !== '')
        && (data.department !== '')
        && (data.subject !== '')
        && (data.question !== '')
    );

    $effect(() => {
        if (onValidate !== undefined) {
            onValidate(isValid);
        }
    });
</script>

<div>
    <div class="field is-horizontal">
        <div class="field-label is-normal">
            <label for="from" class="label">From</label>
        </div>
        <div class="field-body">
            <div class="field">
                <p class="control is-expanded has-icons-left">
                    <input id="from" class="input" type="text" placeholder="Name" bind:value={data.name}>
                    <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control is-expanded has-icons-left has-icons-right">
                    <input class="input is-success" type="email" placeholder="Email" bind:value={data.email}>
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                    </span>
                    <span class="icon is-small is-right">
                        <i class="fas fa-check"></i>
                    </span>
                </p>
            </div>
        </div>
    </div>

    <div class="field is-horizontal">
        <div class="field-label"></div>
        <div class="field-body">
            <div class="field is-expanded">
                <div class="field has-addons">
                    <p class="control">
                        <!-- svelte-ignore a11y_missing_attribute -->
                        <a class="button is-static">
                            +44
                        </a>
                    </p>
                    <p class="control is-expanded">
                        <input class="input" type="tel" placeholder="Your phone number" bind:value={data.phone}>
                    </p>
                </div>
            </div>
        </div>
    </div>

    <div class="field is-horizontal">
        <div class="field-label is-normal">
            <label for="department" class="label">Department</label>
        </div>
        <div class="field-body">
            <div class="field is-narrow">
                <div class="control">
                    <div class="select is-fullwidth">
                        <select id="department" bind:value={data.department}>
                            <option></option>
                            <option>Business development</option>
                            <option>Marketing</option>
                            <option>Sales</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="field is-horizontal">
        <div class="field-label">
            <label for="member" class="label">Already a member?</label>
        </div>
        <div class="field-body">
            <div class="field is-narrow">
                <div class="control">
                    <label class="radio">
                        <input type="radio" name="member" value={true} bind:group={data.member}>
                        Yes
                    </label>
                    <label class="radio">
                        <input type="radio" name="member" value={false} bind:group={data.member}>
                        No
                    </label>
                </div>
            </div>
        </div>
    </div>

    <div class="field is-horizontal">
        <div class="field-label is-normal">
            <label for="subject" class="label">Subject</label>
        </div>
        <div class="field-body">
            <div class="field">
                <div class="control">
                    <input id="subject" class="input is-danger" type="text" placeholder="e.g. Partnership opportunity" bind:value={data.subject}>
                </div>
            </div>
        </div>
    </div>

    <div class="field is-horizontal">
        <div class="field-label is-normal">
            <label for="question" class="label">Question</label>
        </div>
        <div class="field-body">
            <div class="field">
                <div class="control">
                    <textarea id="question" class="textarea" placeholder="Explain how we can help you" bind:value={data.question}></textarea>
                </div>
            </div>
        </div>
    </div>
</div>
