import EnvLabelView from './EnvLabelView'

interface Condition {
  regex: RegExp;
  labelText?: string;
  labelColor?: string;
}

interface EnvLabelParams {
  conditions: Array<Condition>;
}

export default class EnvLabel {
  constructor(private conditions: Array<Condition>) {}

  public static init({ conditions }: EnvLabelParams): void {
    const instance = new EnvLabel(conditions);
    instance.init();
  }

  private init() {
    if (!this.validate()) return;

    if (document.readyState === 'complete') {
      this.showLabel();
    } else {
      document.addEventListener("DOMContentLoaded", () => this.showLabel());
    }
  }

  private validate(): boolean {
    if (!document) {
      console.log('This environment is out of support.');
      return false;
    }

    if (!('content' in document.createElement('template'))) {
      console.log('This browser does not support HTML template tag.');
      return false;
    }

    if (!this.conditions || this.conditions.length == 0) {
      console.log('You have to set at least one condition to check environment.');
      return false;
    }

    return true;
  }

  private showLabel(): void {
    const hostname = window.location.hostname;
    const matchedCondition = this.findMatchedCondition(hostname);

    if (!matchedCondition) return;

    const labelText = matchedCondition.labelText || hostname;
    const labelColor = matchedCondition.labelColor || '#000';
    const template = document.createElement('template');
    template.innerHTML = new EnvLabelView(labelText, labelColor).toHTML();

    const clone = document.importNode(template.content, true);
    document.body.appendChild(clone);
  };

  private findMatchedCondition(hostname: string): Condition | undefined {
    let condition;
    for (var i = 0; i < this.conditions.length; i++) {
      condition = this.conditions[i];
      if (condition.regex.test(hostname)) {
        return condition;
      }
    }
    return;
  }
}
