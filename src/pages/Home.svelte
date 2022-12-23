<script>
    import Field from "../components/Field.svelte";
    import {getData, saveDoc} from "../firebase";

    let docs = {}
    getData("platforms", data => docs = data)

    let field = "";

    const newDoc = () => {
        let id = window.prompt("");
        if (id) {
            docs[id] = {};
            field = id;
        }
    }
    const duplicate = data => {
        let id = window.prompt("");
        if (id)
            docs[id] = data
        docs = docs;
    }

    const saveData = () => {
        saveDoc("platform/" + field, docs[field], console.log)
    }

</script>


<div class="flex overflow-none">

    <div class="flex flex-col bg-primary">
        <button class="py-2 border border-primary-fade m-2 px-4" on:click={newDoc}>New Doc</button>
        {#each Object.keys(docs) as doc}
            <div class="flex">
                <button class="py-2 border border-primary-fade m-2 px-4" on:click={()=> field = doc}>{doc}</button>
                <button on:click={()=> {field = ""; delete docs[doc]; docs = docs}}>Remove</button>
            </div>
        {/each}
    </div>

    <div class="flex-1 m-4">

        {#if field}
            <button on:click={() => duplicate(docs[field])} >duplicate</button>
            <button on:click={saveData} >save</button>
            {#key field}
                <Field {field} doc={docs}/>
            {/key}
        {/if}

    </div>

</div>