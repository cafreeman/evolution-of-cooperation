import Component from '@glimmer/component';
import { action } from '@ember/object';

interface SelectArgs {
  onChange: (v: any) => void;
}

export default class Select extends Component<SelectArgs> {
  @action
  handleSelect(e: Event) {
    this.args.onChange(e.target.value);
  }
}
