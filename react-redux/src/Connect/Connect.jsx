import React from "react";
import { ReactReduxContext } from "../Provider/Provider";

export default function connect(mapStateToProps, mapDispatchToProps) {
  return function (HoccedComponent) {
    class MyClass extends React.PureComponent {
      constructor(props) {
        super(props);
        this.renderHoccedComponent = this.renderHoccedComponent.bind(this);
      }

      listener({disableRender}) {
        // console.info(disableRender);
        if (!disableRender) this.forceUpdate()
      }

      componentDidMount() {
        let store = this.context;
        store.subscribe(this.listener.bind(this));
      }

      componentWillUnmount() {
        let store = this.context;
        store.unsubscribe(this.listener);
      }

      renderHoccedComponent(store) {
        const stateFromStore = store.getState();
        const state = mapStateToProps && mapStateToProps(stateFromStore);
        const dispatch =
          mapDispatchToProps && mapDispatchToProps(store.dispatch.bind(store));
        return (
          <HoccedComponent {...this.props} {...state} {...dispatch} />
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
