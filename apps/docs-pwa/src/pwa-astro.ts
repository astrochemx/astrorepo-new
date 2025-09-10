import { type RegisterSWOptions, registerSW } from 'virtual:pwa-register';

/**
 * Interval in milliseconds.
 *
 * @default
 * 10 * 60 * 1000 // 10 minutes in milliseconds = 10 min * 60 sec * 1000 ms
 */
const updateIntervalMS = 10 * 60 * 1000;

export const registerSWOptions: RegisterSWOptions = {
  immediate: true,
  onRegisteredSW(swScriptUrl, registration) {
    console.log('SW registered: ', swScriptUrl);
    registration &&
      setInterval(() => {
        void (async () => {
          if (registration.installing || !navigator) {
            return;
          }
          if ('connection' in navigator && !navigator.onLine) {
            return;
          }
          try {
            const response = await fetch(swScriptUrl, {
              cache: 'no-store',
              headers: {
                'cache': 'no-store',
                'cache-control': 'no-cache',
              },
            });
            if (response?.status === 200) {
              await registration.update();
            }
          } catch (error: unknown) {
            if (error instanceof Error) {
              console.log('');
              console.log('--------------------------------------------------');
              console.log('');
              console.error('Error updating SW:', error);
              console.log('');
              console.log(error.message);
              console.log('');
              console.log('--------------------------------------------------');
              console.log('');
            }
          }
        })();
      }, updateIntervalMS);
  },
  onOfflineReady() {
    console.log('PWA application ready to work offline');
  },
};

registerSW(registerSWOptions);
