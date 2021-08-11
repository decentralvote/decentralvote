export function mockConnector(config = {}) {
  let defaultConfig = {
    handleDisconnect() {
    },
    close() {
    }
  };
  return Object.assign(defaultConfig, config);
}

// Mock Web 3 React
export function mockWeb3React(config = {}) {
  let defaultConfig = {
    account: '0x19dc3a6e475e90ae18a5b9865aba4812ecd22c33',
    active: false,
    activate() {
      this.active = true;
    }
  };
  return () => {
    return Object.assign(defaultConfig, config);
  }
}
