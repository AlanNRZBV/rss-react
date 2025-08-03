import * as React from 'react';
import { type PropsWithChildren } from 'react';

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

  handleClick = () => {
    this.setState({ hasError: true });
  };

  static getDerivedStateFromError(): State {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>{this.props.message}</div>;
    }

    return (
      <div className="flex h-full flex-col dark:bg-gray-900">
        {this.props.children}
        <button
          className="mt-2 self-end rounded-md border border-black bg-red-200 px-4 py-2"
          onClick={this.handleClick}
        >
          Trigger Error
        </button>
      </div>
    );
  }
}
export default ErrorBoundary;
