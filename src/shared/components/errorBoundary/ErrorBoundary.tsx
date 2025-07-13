import type { PropsWithChildren } from 'react';
import * as React from 'react';

interface Props extends PropsWithChildren {
  message: string;
}

type State = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<Props, State> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>{this.props.message}</div>;
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
