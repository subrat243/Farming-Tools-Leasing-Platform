export const connectKeplr = async (): Promise<string> => {
  if (!window.keplr) {
    throw new Error('Please install Keplr extension');
  }

  // Request connection to Cosmos Hub (you can change this to your preferred chain)
  await window.keplr.enable('cosmoshub-4');
  
  const offlineSigner = window.keplr.getOfflineSigner('cosmoshub-4');
  const accounts = await offlineSigner.getAccounts();
  
  return accounts[0].address;
};