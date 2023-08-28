export class Component {
  $target;

  $props;

  $state;

  /**
   * 타겟이 될 HTML 요소와 부여받을 props를 입력합니다.
   * @param {HTMLElement} $target
   * @param {Object.<string, *>} $props
   */
  constructor($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.setup();
    this.setEvent();
    this.render();
  }

  /**
   * 컴포넌트가 최초 생성 될 시 실행되는 메서드입니다.
   */
  setup() {}

  /**
   * 컴포넌트가 마운트 될 시 실행되는 메서드입니다.
   */
  mounted() {}

  /**
   * 컴포넌트의 내부 html 코드입니다.
   */
  template() {
    return '';
  }

  /**
   * 컴포넌트를 렌더링합니다.
   */
  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  /**
   * 컴포넌트에 이벤트를 부여합니다.
   */
  setEvent() {}

  /**
   * 컴포넌트의 상태를 갱신합니다.
   * @param {object} newState
   */
  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }

  /**
   * 컴포넌트 내에 selector에 eventType이 일어날시 callback을 실행
   * @param {string} eventType
   * @param {string} selector
   * @param {function} callback
   */
  addEvent(eventType, selector, callback) {
    this.$target.addEventListener(eventType, (event) => {
      if (!event.target.closest(selector)) return false;
      callback(event);
    });
  }
}
