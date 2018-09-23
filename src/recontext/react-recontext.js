import React from "react";

// create Context Provider to wrap root Component
const createProvider = (setProvider, Provider, initialState) =>
  class RootProvider extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = initialState;
      setProvider(this);
    }

    render() {
      return <Provider value={this.state}>{this.props.children}</Provider>;
    }
  };

// inject root state into component
const createConnect = Consumer => mapStateToProps => ComponentToWrap => {
  const ConnectedComponent = props => {
    return (
      <Consumer>
        {state => {
          const stateToProps = mapStateToProps(state || {});
          return <ComponentToWrap {...props} {...stateToProps} />;
        }}
      </Consumer>
    );
  };

  const displayName =
    ComponentToWrap.displayName || ComponentToWrap.name || "NoName";
  ConnectedComponent.displayName = `Consumer(${displayName})`;

  return ConnectedComponent;
};

// create store
export default (initialState, actionsCreators = {}, logger = false) => {
  const context = React.createContext();
  const setProvider = self => (provider = self);
  let provider = null;
  let state = initialState;

  const actions = Object.keys(actionsCreators).reduce(
    (accumulator, currentAction) => ({
      ...accumulator,
      [currentAction]: (...args) => {
        const update = actionsCreators[currentAction](state, ...args);
        const nextState = { ...state, ...update };
        if (logger) {
          let params = "nothing";
          if (args) {
            if (args.length === 1) params = args[0];
            else if (args.length > 1) params = args;
          }
          console.log(
            "---> ACTION: %c" + currentAction,
            `color: #000000; font-weight: bold`
          );
          console.log(
            "  %cprev state ",
            `color: #C0C0C0; font-weight: bold`,
            state
          );
          console.log(
            "  %cparams     ",
            `color: #0000FF; font-weight: bold`,
            params
          );
          console.log(
            "  %cnext state ",
            `color: #008000; font-weight: bold`,
            nextState
          );
        }

        state = nextState;
        provider.setState(nextState);
      }
    }),
    {}
  );

  const Provider = createProvider(setProvider, context.Provider, initialState);
  const connect = createConnect(context.Consumer);

  return {
    Provider,
    connect,
    actions
  };
};
