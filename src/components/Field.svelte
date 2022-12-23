<script>
    import HTML from "./HTML.svelte";

    export let field;
    export let doc;

    let type = "text";

    if (typeof doc[field] === "string")
        type = "text"

    if (typeof doc[field] === "number")
        type = "number"

    if (typeof doc[field] === "boolean")
        type = "boolean"

    if (typeof doc[field] === "object")
        type = "object"

    if (doc[field] === null)
        type = "text"

    // if (doc[field].length && doc[field][0])
    //     type = "array"

    const validate = () => {
        if (type === "array")
            doc[field] = []
        if (type === "object")
            doc[field] = {}
    }

    const addField = () => {
        let id = window.prompt("");
        if (id) {
            if (type === "array")
                doc[field].push(id);
            else
                doc[field][id] = "";
        }
        doc = doc;
        // console.log(doc)
    }

    const duplicate = data => {
        console.log(data, doc[field])
        if (type === "array")
            doc[field].push(data)
        else {
            let id = window.prompt("");
            if (id)
                doc[field][id] = data
        }
        doc = doc;
    }

    let showChildren = true;
    export let node = false;

</script>


<div class="flex flex-col px-4 py-2">

    <div class="flex items-center mb-2 group">

        <h3 class="font-bold text-lg hover:cursor-pointer" on:click={()=> showChildren = !showChildren}>{field} : </h3>

        <div class="group-hover:visible invisible">

            {#if node}
                {#each ['text', 'number', 'boolean', 'html', 'date', 'object', 'array'] as option}
                    <label class="rounded-full rounded border px-2 border-primary mx-2">
                        {option}:
                        <input bind:group={type} type="radio" value={option} on:change={validate}>
                    </label>
                {/each}
            {/if}

        </div>

    </div>

    {#if type === "text"}
        <input type="text" bind:value={doc[field]} aria-label={field}>
    {/if}

    {#if type === "number"}
        <input type="number" bind:value={doc[field]} aria-label={field}>
    {/if}

    {#if type === "boolean"}
        <input type="checkbox" bind:checked={doc[field]} aria-label={field}>
    {/if}

    {#if type === "html"}
        <HTML bind:value={doc[field]}/>
    {/if}

    {#if type === "date"}
        <input type="date" bind:value={doc[field]} aria-label={field}>
    {/if}

    {#if ["object", "array"].includes(type)}
        <button on:click={addField}>Add Field</button>
    {/if}

    {#if showChildren}

        {#if type === "object"}
            {#each Object.keys(doc[field]) as mField}
                <div class="m-4 border-l border-primary">
                    <div>
                        <button on:click={()=> {delete doc[field][mField]; doc = doc}} >delete</button>
                        <button on:click={() => duplicate(doc[field][mField])} >duplicate</button>
                    </div>
                    <svelte:self field={mField} doc={doc[field]} node={true}/>
                </div>
            {/each}
        {/if}

        {#if type === "array"}
            {#each doc[field].length? doc[field]: Object.keys(doc[field]) as mField, i}
                <div class="m-4 border-l border-primary">
                    <div>
                        <button on:click={()=> {doc[field].splice(i, 1); doc = doc}} >delete</button>
                        <button on:click={() => duplicate(doc[field][i])} >duplicate</button>
                    </div>
                    <svelte:self field={i} doc={doc[field]} node={true} />
                </div>
            {/each}
        {/if}

    {/if}


</div>