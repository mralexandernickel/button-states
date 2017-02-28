var StateButton = (function () {
    function StateButton(button) {
        this.button = button;
        this.classNamePrefix = 'button-state-';
        this.defaultState = this.button.innerText;
        this.defaultDuration = 2000;
        this.button.state = this.state.bind(this);
        this.button.reset = this.reset.bind(this);
    }
    StateButton.prototype.state = function (state, stateText, duration, disabled, autoreset) {
        var _this = this;
        if (duration === void 0) { duration = this.defaultDuration; }
        if (disabled === void 0) { disabled = false; }
        if (autoreset === void 0) { autoreset = true; }
        if (!stateText)
            stateText = this.button.dataset[state];
        if (stateText) {
            this.button.innerText = stateText;
            this.button.classList.add(this.classNamePrefix + state);
            if (disabled)
                this.button.disabled = true;
            if (autoreset) {
                setTimeout(function () {
                    _this.button.reset();
                }, duration);
            }
        }
    };
    StateButton.prototype.reset = function () {
        this.button.innerText = this.defaultState;
        this.button.removeAttribute('disabled');
        this.resetStateClassNames();
    };
    StateButton.prototype.resetStateClassNames = function () {
        for (var i = 0; i < this.button.classList.length; i++) {
            var className = this.button.classList[i];
            if (className.indexOf(this.classNamePrefix) !== -1) {
                this.button.classList.remove(className);
            }
        }
    };
    return StateButton;
}());
var ButtonStates = (function () {
    function ButtonStates() {
        this.buttonsSelector = 'button.button-state';
        this.buttons = document.querySelectorAll(this.buttonsSelector);
        this.createInstances();
    }
    ButtonStates.prototype.createInstances = function () {
        for (var i = 0; i < this.buttons.length; i++) {
            var button = this.buttons[i];
            new StateButton(button);
        }
    };
    return ButtonStates;
}());
if (['complete', 'loaded', 'interactive'].indexOf(document.readyState) !== -1) {
    new ButtonStates();
}
else {
    document.addEventListener('DOMContentLoaded', function () {
        new ButtonStates();
    });
}
//# sourceMappingURL=button-states.js.map