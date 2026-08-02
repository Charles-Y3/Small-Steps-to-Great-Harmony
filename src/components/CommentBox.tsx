import { useEffect, useState, type FormEvent } from 'react';
import { supabase } from '../utils/supabase';
import { containsProfanity } from '../utils/profanity';
import { useT } from '../i18n/useT';

const BODY_MAX = 500;
const PAGE_SIZE = 5;

interface Comment {
  id: string;
  name: string | null;
  body: string;
  created_at: string;
}

export function CommentBox({ appId }: { appId: string }) {
  const { t, locale } = useT();
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from('comments')
      .select('id, name, body, created_at')
      .eq('app_id', appId)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (!cancelled) setComments(data ?? []);
      });
    return () => { cancelled = true; };
  }, [appId]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (honeypot || !body.trim()) return;

    setError(false);
    if (containsProfanity(name) || containsProfanity(body)) {
      setBlocked(true);
      return;
    }
    setBlocked(false);
    setSubmitting(true);
    const { data, error: insertError } = await supabase
      .from('comments')
      .insert({ app_id: appId, name: name.trim() || null, body: body.trim() })
      .select('id, name, body, created_at')
      .single();
    setSubmitting(false);

    if (insertError || !data) {
      setError(true);
      return;
    }
    setComments((prev) => [data, ...(prev ?? [])]);
    setName('');
    setBody('');
  }

  const visible = comments?.slice(0, visibleCount) ?? [];
  const remaining = (comments?.length ?? 0) - visible.length;

  return (
    <div className="commentBox">
      <h3 className="commentBoxTitle">
        {comments && comments.length > 0 ? t('comments_titleCount', { count: comments.length }) : t('comments_title')}
      </h3>

      {comments === null ? null : comments.length === 0 ? (
        <p className="commentsEmpty">{t('comments_empty')}</p>
      ) : (
        <>
          <ul className="commentList">
            {visible.map((c) => (
              <li key={c.id} className="commentItem">
                <div className="commentMeta">
                  <span className="commentName">{c.name || t('comments_anonymous')}</span>
                  <span className="commentDate">
                    {new Date(c.created_at).toLocaleDateString(locale === 'en' ? 'en' : 'zh')}
                  </span>
                </div>
                <p className="commentBody">{c.body}</p>
              </li>
            ))}
          </ul>
          {remaining > 0 && (
            <button
              type="button"
              className="commentShowMore"
              onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
            >
              {t('comments_showMore', { count: remaining })}
            </button>
          )}
        </>
      )}

      <form className="commentForm" onSubmit={handleSubmit}>
        <input
          type="text"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="commentHoneypot"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
        <input
          type="text"
          value={name}
          onChange={(e) => { setName(e.target.value); setBlocked(false); setError(false); }}
          placeholder={t('comments_namePlaceholder')}
          className="commentNameInput"
          maxLength={80}
        />
        <textarea
          value={body}
          onChange={(e) => { setBody(e.target.value); setBlocked(false); setError(false); }}
          placeholder={t('comments_bodyPlaceholder')}
          className="commentBodyInput"
          maxLength={BODY_MAX}
          rows={3}
          required
        />
        {blocked && <p className="commentError">{t('comments_blocked')}</p>}
        {error && <p className="commentError">{t('comments_error')}</p>}
        <button type="submit" className="commentSubmit" disabled={submitting || blocked || !body.trim()}>
          {submitting ? t('comments_submitting') : t('comments_submit')}
        </button>
      </form>
    </div>
  );
}
