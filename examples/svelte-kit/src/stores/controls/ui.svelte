<script lang="ts">
  export let controls: Record<string, any>
  export let context: any
</script>

<div class="controls-container">
  {#each Object.keys(controls) as key}
    {@const { type, label = key, options, placeholder, min, max } = controls[key] ?? {}}
    {#if type === "boolean"}
      <div class="checkbox">
        <input
          data-testid={key}
          id={label}
          type="checkbox"
          on:change={(e) => {
            $context = { ...$context, [key]: e.currentTarget?.checked }
          }}
          checked={$context[key]}
        />
        <label for={label}>{label}</label>
      </div>
    {:else if type === "string"}
      <div class="text">
        <label for={label} style="margin-right:10px">{label}</label>
        <input
          id={label}
          data-testid={key}
          type="text"
          {placeholder}
          value={$context[key]}
          on:keydown={(e) => {
            if (e.key === "Enter") {
              $context = { ...$context, [key]: e.currentTarget.value }
            }
          }}
        />
      </div>
    {:else if type === "select"}
      <div class="text">
        <label for={label} style="margin-right:10px">
          {label}
        </label>
        <select
          data-testid={key}
          id={label}
          value={$context[key]}
          on:change={(e) => {
            $context = { ...$context, [key]: e.currentTarget.value }
          }}
        >
          <option>-----</option>
          {#each options as option}
            <option value={option}>
              {option}
            </option>
          {/each}
        </select>
      </div>
    {:else if type === "number"}
      <div class="text">
        <label for={label} style="margin-right:10px">
          {label}
        </label>
        <input
          data-testid={key}
          id={label}
          type="number"
          {min}
          {max}
          value={$context[key]}
          on:keydown={(e) => {
            if (e.key === "Enter") {
              const val = parseFloat(e.currentTarget.value)
              $context = { ...$context, [key]: isNaN(val) ? 0 : val }
            }
          }}
        />
      </div>
    {/if}
  {/each}
</div>
