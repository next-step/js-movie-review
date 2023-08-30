import { Component } from './Component.js';

export class Store {
  state = {
    data: null,
  };

  key;

  #observers = new Set();

  /**
   * 초기 데이터와 전역 상태 키를 입력합니다.
   * @param {any} initData
   * @param {string} key
   */
  constructor(initData, key) {
    this.state.data = initData;
    this.key = key;
  }

  /**
   * 상태를 업데이트 합니다.
   * @param {function} fetchFunc
   */
  refetch(data) {
    this.state.data = data;
  }

  /**
   * 상태를 누적하여 업데이트 합니다.
   * @param {function} fetchFunc
   */
  async accumulateData(newData) {
    this.state.data.push(...newData);
  }

  /**
   * 구독된 옵저버들에게 상태 변화를 알립니다.
   */
  notify() {
    this.#observers.forEach((observer) => {
      observer.setState({
        [this.key]: this.state,
      });
    });
  }

  /**
   * 옵저버를 추가합니다.
   * @param {Component} observer
   */
  subscribe(observer) {
    this.#observers.add(observer);
    const globalState = {
      [this.key]: this.state,
    };
    observer.setState(globalState);
  }

  /**
   * 옵저버를 제거합니다.
   * @param {object} observer
   */
  unsubscribe(observer) {
    this.#observers.delete(observer);
    Object.keys(this.state).forEach((key) => {
      delete observer.$state[key];
    });
  }

  /**
   * 옵저버를 초기화합니다.
   */
  resetSubscribe() {
    this.#observers.forEach((observer) => {
      this.unsubscribe(observer);
    });
    this.#observers.clear();
  }
}
