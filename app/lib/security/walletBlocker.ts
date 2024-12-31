// Block wallet injections
const blockWalletInjections = () => {
  const walletProperties = ['ethereum', 'solana', 'phantom'];

  walletProperties.forEach((prop) => {
    // Make properties immutable and empty
    Object.defineProperty(window, prop, {
      value: undefined,
      configurable: false,
      writable: false,
      enumerable: false,
    });
  });
};

// Run blocker as early as possible
if (typeof window !== 'undefined') {
  blockWalletInjections();
}

export default blockWalletInjections;
