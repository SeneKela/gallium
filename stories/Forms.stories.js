export default {
  title: 'Components/Forms',
  parameters: {
    docs: {
      description: {
        component:
          'Filled, 4px, 32px tall, the same as buttons. Hover darkens the fill, focus lifts to the layer colour and draws the ring. Pair every control with a visible `.cf-label` or an `aria-label`.',
      },
    },
  },
};

export const Fields = {
  render: () => `
    <div class="sb-panel sb-2">
      <div class="cf-field"><label class="cf-label" for="f1">Client</label><input class="cf-input" id="f1" value="Acme Corp"></div>
      <div class="cf-field"><label class="cf-label" for="f2">Sponsor</label><input class="cf-input" id="f2" placeholder="Who signs the business case" aria-describedby="f2h"><span class="cf-helper" id="f2h">A named person, not a team.</span></div>
      <div class="cf-field"><label class="cf-label" for="f3">Cost type</label><select class="cf-select" id="f3"><option>One-time</option><option>Per year</option></select></div>
      <div class="cf-field"><label class="cf-label" for="f4">Annual value</label><input class="cf-input is-num" id="f4" value="abc" aria-invalid="true" aria-describedby="f4e"><span class="cf-error-text" id="f4e">Enter a number.</span></div>
    </div>`,
};

export const TextArea = {
  parameters: { docs: { description: { story: 'The vertical resize grip is the shared `.cf-resize` handle, driven by `cf-resize.js`.' } } },
  render: () => `
    <div class="sb-panel"><div class="cf-field"><label class="cf-label" for="f5">Problem statement</label>
      <div class="cf-resizable" data-cf-resizable="y" data-min-h="80"><textarea class="cf-textarea" id="f5" data-cf-resize-target>Support agents spend hours on repeat tickets.</textarea><button type="button" class="cf-resize is-se" aria-label="Resize text area"></button></div>
    </div></div>`,
};

export const TogglesAndChecks = {
  render: () => `
    <div class="sb-panel"><div class="cf-row" style="gap:var(--cf-sp-06)">
      <label class="cf-toggle"><input type="checkbox" role="switch" checked><span>Client safe mode</span></label>
      <label class="cf-check"><input type="checkbox" checked><span>Include costs</span></label>
      <label class="cf-check"><input type="checkbox"><span>Include risks</span></label>
    </div></div>`,
};

export const Segmented = {
  render: () => `
    <div class="sb-panel cf-stack">
      <div class="cf-seg" role="group" aria-label="Screens"><button type="button" aria-pressed="true">Build</button><button type="button" aria-pressed="false">Results</button><button type="button" aria-pressed="false">Share</button></div>
      <div class="cf-field"><span class="cf-label">Trust</span>
        <div class="cf-seg is-block" role="radiogroup" aria-label="Trust">
          <button type="button" role="radio" aria-checked="false"><span class="cf-dot is-confirmed"></span>Confirmed</button>
          <button type="button" role="radio" aria-checked="true"><span class="cf-dot is-estimate"></span>Estimate</button>
          <button type="button" role="radio" aria-checked="false"><span class="cf-dot is-unknown"></span>Unknown</button>
        </div></div>
    </div>`,
};

export const StepperAndSlider = {
  render: () => `
    <div class="sb-panel"><div class="cf-card is-sm is-interactive"><div class="cf-content cf-stack">
      <div class="cf-head" style="align-items:flex-start"><div class="cf-head-text"><h4 class="cf-head-t">Realisation</h4><p class="cf-head-s">Share of modelled value you expect to capture</p></div>
        <span class="cf-stepper"><button type="button" data-d="-5" aria-label="Decrease"><svg class="cf-icon"><use href="#icon--subtract"/></svg></button><input type="number" value="80" min="0" max="100" aria-label="Realisation %"><button type="button" data-d="5" aria-label="Increase"><svg class="cf-icon"><use href="#icon--add"/></svg></button></span></div>
      <input type="range" class="cf-slider" min="0" max="100" value="80" aria-label="Realisation" style="--_p:80%">
    </div></div></div>`,
};

export const Focus = {
  parameters: { docs: { description: { story: 'One focus ring for everything. Containers that hold flush controls set `--cf-focus-offset:-2px` so the ring is drawn inside. Forced here with `data-cf-state="focus"`.' } } },
  render: () => `
    <div class="sb-panel cf-row" style="gap:var(--cf-sp-07);align-items:flex-start">
      <div class="sb-cell"><button class="cf-btn" type="button" data-cf-state="focus"><span>Primary</span></button><span class="sb-cap">button · inset 2px + 1px</span></div>
      <div class="sb-cell"><button class="cf-btn is-ghost is-icon" type="button" data-cf-state="focus" aria-label="More"><svg><use href="#icon--overflow-menu--horizontal"/></svg></button><span class="sb-cap">icon</span></div>
      <div class="sb-cell"><input class="cf-input" value="Acme Corp" data-cf-state="focus" aria-label="Client"><span class="sb-cap">input · inside</span></div>
      <div class="sb-cell"><div class="cf-seg"><button type="button" aria-pressed="true">Build</button><button type="button" aria-pressed="false" data-cf-state="focus">Results</button></div><span class="sb-cap">segmented · inside</span></div>
    </div>`,
};
