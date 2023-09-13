class Component {
  constructor(props = {}) {
    this.props = props;
    this.state = {};
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  render() {
    throw new Error('렌더링 메서드를 오버라이딩 해야합니다.');
  }
}
