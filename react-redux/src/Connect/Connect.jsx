import React from "react";
import { ReactReduxContext } from "../Provider/Provider";

export default function connect(mapStateToProps, mapDispatchToProps) {
  return function (HoccedComponent) {
    class MyClass extends React.PureComponent {
      constructor(props) {
        super(props);
        this.renderHoccedComponent = this.renderHoccedComponent.bind(this);
      }

      listener(newState) {
        this.setState(newState);
      }

      componentDidMount() {
        let store = this.context;
        store.subscribe(this.listener.bind(this));
        const stateFromStore = store.getState();
        this.setState(mapStateToProps(stateFromStore));
      }

      componentDidUpdate() {
        let store = this.context;
        const stateFromStore = store.getState();
        this.setState(mapStateToProps(stateFromStore));
      }

      componentWillUnmount() {
        let store = this.context;
        const unsubscribe = store.subscribe(this.listener);
        unsubscribe();
      }

      renderHoccedComponent(store) {
        const dispatch =
          mapDispatchToProps && mapDispatchToProps(store.dispatch.bind(store));
        return (
          <HoccedComponent {...this.props} {...this.state} {...dispatch} />
        );
      }

      render() {
        return (
          <ReactReduxContext.Consumer>
            {this.renderHoccedComponent}
          </ReactReduxContext.Consumer>
        );
      }
    }
    MyClass.contextType = ReactReduxContext;
    return MyClass;
  };
}
