import { shared, mixins } from "../styles";
import { BaseElement, element, html, css, property, listen } from "./base.js";
import "./icon.js";
import "./spinner.js";

type ButtonState = "idle" | "loading" | "success" | "fail";

@element("pl-loading-button")
export class LoadingButton extends BaseElement {
    @property({ reflect: true })
    state: ButtonState = "idle";
    @property()
    noTab: boolean = false;

    private _stopTimeout: number;

    static styles = [
        shared,
        css`
            :host {
                display: flex;
                height: var(--row-height);
            }

            :host([state="loading"]) button {
                cursor: progress;
            }

            button {
                background: transparent;
                position: relative;
                flex: 1;
                height: auto;
            }

            button > * {
                transition: transform 0.2s cubic-bezier(1, -0.3, 0, 1.3), opacity 0.2s;
                will-change: transform;
                ${mixins.absoluteCenter()}
            }

            button > .label {
                display: flex;
                align-items: center;
                justify-content: center;
                ${mixins.fullbleed()}
            }

            :host(.vertical) .label {
                flex-direction: column;
            }

            button.loading .label,
            button.success .label,
            button.fail .label,
            button:not(.loading) .spinner,
            button:not(.success) .icon-success,
            button:not(.fail) .icon-fail {
                opacity: 0.5;
                transform: scale(0);
            }

            button pl-icon {
                font-size: 120%;
            }

            pl-spinner {
                width: 30px;
                height: 30px;
            }
        `
    ];

    render() {
        const { state, noTab } = this;
        return html`
            <button type="button" class="${state}" tabindex="${noTab ? "-1" : ""}">
                <div class="label"><slot></slot></div>

                <pl-spinner .active="${state == "loading"}" class="spinner"></pl-spinner>

                <pl-icon icon="check" class="icon-success"></pl-icon>

                <pl-icon icon="cancel" class="icon-fail"></pl-icon>
            </button>
        `;
    }

    static get is() {
        return "pl-loading-button";
    }

    @listen("click")
    _click(e: MouseEvent) {
        if (this.state === "loading") {
            e.stopPropagation();
        }
    }

    start() {
        clearTimeout(this._stopTimeout);
        this.state = "loading";
    }

    stop() {
        this.state = "idle";
    }

    success() {
        this.state = "success";
        this._stopTimeout = window.setTimeout(() => this.stop(), 1000);
    }

    fail() {
        this.state = "fail";
        this._stopTimeout = window.setTimeout(() => this.stop(), 1000);
    }
}
