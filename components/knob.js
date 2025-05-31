/**
 * Custom Knob Component
 * Created with Mr. Mig's Plugin Studio
 */

export class CustomKnob {
  constructor(options = {}) {
    this.value = options.value || 0;
    this.min = options.min || 0;
    this.max = options.max || 1;
    this.step = options.step || 0.01;
    this.label = options.label || '';
    this.unit = options.unit || '';
    
    this.element = this.createElement();
    this.bindEvents();
  }
  
  createElement() {
    const knob = document.createElement('div');
    knob.className = 'custom-knob';
    knob.innerHTML = `
      <div class="knob-track"></div>
      <div class="knob-handle"></div>
      <div class="knob-label">${this.label}</div>
      <div class="knob-value">${this.formatValue()}</div>
    `;
    return knob;
  }
  
  setValue(value) {
    this.value = Math.max(this.min, Math.min(this.max, value));
    this.updateDisplay();
    this.dispatchChange();
  }
  
  formatValue() {
    return `${this.value.toFixed(2)}${this.unit}`;
  }
  
  updateDisplay() {
    const percentage = (this.value - this.min) / (this.max - this.min);
    const rotation = percentage * 270 - 135; // 270 degree range
    
    const handle = this.element.querySelector('.knob-handle');
    handle.style.transform = `rotate(${rotation}deg)`;
    
    const valueDisplay = this.element.querySelector('.knob-value');
    valueDisplay.textContent = this.formatValue();
  }
  
  bindEvents() {
    let isDragging = false;
    let startY = 0;
    let startValue = 0;
    
    this.element.addEventListener('mousedown', (e) => {
      isDragging = true;
      startY = e.clientY;
      startValue = this.value;
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
    
    const onMouseMove = (e) => {
      if (!isDragging) return;
      
      const deltaY = startY - e.clientY;
      const sensitivity = 0.01;
      const newValue = startValue + (deltaY * sensitivity * (this.max - this.min));
      
      this.setValue(newValue);
    };
    
    const onMouseUp = () => {
      isDragging = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }
  
  dispatchChange() {
    this.element.dispatchEvent(new CustomEvent('change', {
      detail: { value: this.value }
    }));
  }
}
