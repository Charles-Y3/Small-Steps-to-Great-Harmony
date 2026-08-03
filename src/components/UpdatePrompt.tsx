import { useRegisterSW } from 'virtual:pwa-register/react';
import { useT } from '../i18n/useT';

/** Surfaces the PWA's "a new version is waiting" state as a visible
 * banner — registerType is 'prompt' in vite.config.ts specifically so the
 * service worker never swaps itself in silently without this. */
export function UpdatePrompt() {
  const { t } = useT();
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  if (!needRefresh) return null;

  return (
    <div className="updatePrompt" role="status">
      <p className="updatePromptText">{t('update_available')}</p>
      <div className="updatePromptActions">
        <button className="updatePromptReload" onClick={() => updateServiceWorker(true)}>
          {t('update_reload')}
        </button>
        <button className="updatePromptDismiss" onClick={() => setNeedRefresh(false)}>
          {t('update_dismiss')}
        </button>
      </div>
    </div>
  );
}
