interface StateButtonElement extends HTMLButtonElement {
  state: any;
  reset: any;
} 

class StateButton {

  private classNamePrefix = 'button-state-'
  private defaultState = this.button.innerText;
  private defaultDuration = 2000;

  constructor(
    private button: StateButtonElement
  ) {
    this.button.state = this.state.bind(this);
    this.button.reset = this.reset.bind(this);
  }

  public state(
    state,
    stateText,
    duration = this.defaultDuration,
    disabled = false,
    autoreset = true
  ) {

    if (!stateText) stateText = this.button.dataset[state];

    if (stateText) {

      this.button.innerText = stateText;
      this.button.classList.add(this.classNamePrefix + state);

      if (disabled) this.button.disabled = true;

      if (autoreset) {
        setTimeout(() => {
          this.button.reset();
        }, duration);
      }

      }
  }

  public reset() {
    this.button.innerText = this.defaultState;
    this.button.removeAttribute('disabled');
    this.resetStateClassNames();
}

  private resetStateClassNames() {
    for (var i = 0; i < this.button.classList.length; i++) {
      var className = this.button.classList[i];
      if (className.indexOf(this.classNamePrefix) !== -1) {
        this.button.classList.remove(className);
      }
    }
  }

}

class ButtonStates {
  private buttonsSelector: string = 'button.button-state';
  private buttons: NodeListOf<StateButtonElement>;

  constructor() {
    this.buttons = <NodeListOf<StateButtonElement>>document.querySelectorAll(this.buttonsSelector);
    this.createInstances();
  }

  createInstances() {
    for (var i = 0; i < this.buttons.length; i++) {
      var button = this.buttons[i];
      new StateButton(button);
    }
  }
}

if (['complete', 'loaded', 'interactive'].indexOf(document.readyState) !== -1) {
  new ButtonStates();
} else {
  document.addEventListener('DOMContentLoaded', function(){
    new ButtonStates();
  });
}