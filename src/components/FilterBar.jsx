import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { createPortal } from 'react-dom';
import '../styles/filter-bar.css';

const uid = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `f_${Math.random().toString(36).slice(2, 9)}`;

const springy = { type: 'spring', stiffness: 560, damping: 34, mass: 0.7 };

function fieldById(fields, id) {
  return fields.find((f) => f.id === id);
}

function operatorByValue(field, value) {
  return field?.operators.find((o) => o.value === value);
}

function summarize(options, values) {
  if (!values.length) return { text: 'Select…', empty: true, glyphs: [] };
  const find = (v) => options?.find((o) => o.value === v);
  const label = (v) => find(v)?.label ?? v;

  const glyphs = values.map((v) => find(v)?.glyph).filter(Boolean).slice(0, 3);
  if (values.length === 1) return { text: label(values[0]), empty: false, glyphs };
  if (values.length <= 3) return { text: values.map(label).join(', '), empty: false, glyphs };
  return { text: `${label(values[0])} +${values.length - 1}`, empty: false, glyphs };
}

function Popover({ anchorKey, onClose, children, labelledBy }) {
  const ref = React.useRef(null);
  const [anchor, setAnchor] = React.useState(null);
  const [pos, setPos] = React.useState(null);
  const reduce = useReducedMotion();

  React.useLayoutEffect(() => {
    const el = document.querySelector(`[data-fb-anchor="${anchorKey}"]`);
    setAnchor(el);
  }, [anchorKey]);

  const keyRef = React.useRef(anchorKey);
  keyRef.current = anchorKey;
  React.useEffect(
    () => () => {
      document.querySelector(`[data-fb-anchor="${keyRef.current}"]`)?.focus();
    },
    []
  );

  React.useLayoutEffect(() => {
    if (!anchor) return;
    const place = () => {
      const el = ref.current;
      if (!el) return;
      const a = anchor.getBoundingClientRect();
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const gap = 6;
      let left = a.left;
      let top = a.bottom + gap;
      left = Math.min(left, window.innerWidth - w - 8);
      left = Math.max(8, left);
      if (top + h > window.innerHeight - 8) top = a.top - gap - h;
      setPos({ top, left });
    };
    place();
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    return () => {
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
    };
  }, [anchor]);

  React.useEffect(() => {
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target) && !(anchor && anchor.contains(e.target))) onClose();
    };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    document.addEventListener('pointerdown', onDown, true);
    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('pointerdown', onDown, true);
      document.removeEventListener('keydown', onKey, true);
    };
  }, [anchor, onClose]);

  return createPortal(
    <motion.div
      ref={ref}
      role="dialog"
      aria-labelledby={labelledBy}
      initial={reduce ? false : { opacity: 0, y: -3, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.12, ease: [0.2, 0.8, 0.2, 1] }}
      style={{ position: 'fixed', top: pos?.top ?? -9999, left: pos?.left ?? -9999, zIndex: 60 }}
      className="fb-popover"
    >
      {children}
    </motion.div>,
    document.body
  );
}

function SearchList({ items, multi, loading, error, searchable = true, placeholder = 'Filter…', onQuery, onPick, onRetry, labelId }) {
  const [q, setQ] = React.useState('');
  const [active, setActive] = React.useState(0);
  const listId = React.useId();
  const inputRef = React.useRef(null);
  const listRef = React.useRef(null);

  const filtered = React.useMemo(() => {
    if (onQuery) return items;
    const needle = q.trim().toLowerCase();
    if (!needle) return items;
    return items.filter((i) => i.label.toLowerCase().includes(needle));
  }, [items, q, onQuery]);

  React.useEffect(() => {
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, []);

  React.useEffect(() => {
    setActive((a) => Math.min(a, Math.max(0, filtered.length - 1)));
  }, [filtered.length]);

  React.useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const commit = (i) => {
    const item = filtered[i];
    if (item) onPick(item.value);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActive(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActive(filtered.length - 1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      commit(active);
    }
  };

  return (
    <div>
      {searchable && (
        <div className="fb-search-wrap">
          <input
            ref={inputRef}
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={filtered[active] ? `${listId}-${active}` : undefined}
            aria-labelledby={labelId}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              onQuery?.(e.target.value);
            }}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            className="fb-search-input"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      )}

      <ul ref={listRef} id={listId} role="listbox" aria-multiselectable={multi || undefined} aria-labelledby={labelId} className="fb-list" onKeyDown={onKeyDown} tabIndex={-1}>
        {loading && (
          <li className="fb-list-loading">
            <Spinner /> Loading options…
          </li>
        )}

        {error && !loading && (
          <li className="fb-list-error">
            <p>Couldn't load options.</p>
            <button type="button" onClick={onRetry} className="fb-retry">
              Try again
            </button>
          </li>
        )}

        {!loading && !error && filtered.length === 0 && <li className="fb-list-empty">No matches</li>}

        {!loading &&
          !error &&
          filtered.map((item, i) => {
            const isActive = i === active;
            return (
              <li
                key={item.value}
                id={`${listId}-${i}`}
                data-idx={i}
                role="option"
                aria-selected={multi ? !!item.selected : isActive}
                onMouseEnter={() => setActive(i)}
                onClick={() => onPick(item.value)}
                className={`fb-option${isActive ? ' fb-active' : ''}`}
              >
                {multi && (
                  <span aria-hidden className={`fb-checkbox${item.selected ? ' fb-selected' : ''}`}>
                    {item.selected && <CheckIcon />}
                  </span>
                )}
                {item.glyph && (
                  <span className="fb-glyphs" aria-hidden>
                    {item.glyph}
                  </span>
                )}
                <span className="fb-option-label">{item.label}</span>
                {!multi && item.selected && (
                  <span className="fb-option-check">
                    <CheckIcon />
                  </span>
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

const Segment = React.forwardRef(function Segment(
  { role, children, onOpen, registerRef, tabIndex, ariaLabel, anchorKey, onFocus, muted, active, flash },
  _ref
) {
  return (
    <button
      type="button"
      ref={registerRef}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      aria-haspopup="listbox"
      aria-expanded={active}
      data-fb-anchor={anchorKey}
      onFocus={onFocus}
      onClick={onOpen}
      className={[
        'fb-segment',
        muted ? 'fb-muted' : '',
        active ? 'fb-active' : '',
        role === 'field' ? 'fb-field' : '',
        flash ? 'fb-flash' : '',
      ].join(' ').trim()}
    >
      {children}
    </button>
  );
});

export function FilterBar({ fields, value, onChange, addLabel = 'Filter', emptyLabel = 'Add filter', disabled, className, 'aria-label': ariaLabel = 'Filters' }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = React.useState(null);
  const [flashId, setFlashId] = React.useState(null);

  const itemRefs = React.useRef([]);
  const [focusIdx, setFocusIdx] = React.useState(0);

  const [asyncState, setAsyncState] = React.useState({});

  const itemMeta = [];
  value.forEach((f) => {
    itemMeta.push({ filterId: f.id, kind: 'field' });
    itemMeta.push({ filterId: f.id, kind: 'operator' });
    itemMeta.push({ filterId: f.id, kind: 'value' });
    itemMeta.push({ filterId: f.id, kind: 'remove' });
  });
  itemMeta.push({ kind: 'add' });

  React.useEffect(() => {
    if (focusIdx > itemMeta.length - 1) setFocusIdx(itemMeta.length - 1);
  }, [itemMeta.length, focusIdx]);

  const focusItem = (idx) => {
    const clamped = Math.max(0, Math.min(idx, itemMeta.length - 1));
    setFocusIdx(clamped);
    itemRefs.current[clamped]?.focus();
  };

  const onToolbarKeyDown = (e) => {
    if (open) return;
    const last = itemMeta.length - 1;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      focusItem(focusIdx >= last ? 0 : focusIdx + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      focusItem(focusIdx <= 0 ? last : focusIdx - 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      focusItem(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      focusItem(last);
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
      const meta = itemMeta[focusIdx];
      if (meta?.filterId) {
        e.preventDefault();
        removeFilter(meta.filterId, focusIdx);
      }
    }
  };

  const addFilter = (fieldId) => {
    const field = fieldById(fields, fieldId);
    if (!field) return;
    const filter = { id: uid(), field: fieldId, operator: field.operators[0]?.value ?? 'is', values: [] };
    onChange([...value, filter]);
    setOpen({ kind: 'value', filterId: filter.id });
  };

  const changeField = (filterId, fieldId) => {
    const field = fieldById(fields, fieldId);
    onChange(
      value.map((f) =>
        f.id === filterId ? { ...f, field: fieldId, operator: field?.operators[0]?.value ?? f.operator, values: [] } : f
      )
    );
    setOpen({ kind: 'value', filterId });
  };

  const changeOperator = (filterId, opValue) => {
    const filter = value.find((f) => f.id === filterId);
    const field = fieldById(fields, filter?.field ?? '');
    const nextOp = operatorByValue(field, opValue);
    onChange(
      value.map((f) => (f.id === filterId ? { ...f, operator: opValue, values: nextOp?.multi ? f.values : f.values.slice(0, 1) } : f))
    );
    setOpen(null);
  };

  const toggleValue = (filterId, optionValue, multi) => {
    onChange(
      value.map((f) => {
        if (f.id !== filterId) return f;
        if (!multi) return { ...f, values: [optionValue] };
        const has = f.values.includes(optionValue);
        return { ...f, values: has ? f.values.filter((v) => v !== optionValue) : [...f.values, optionValue] };
      })
    );
    setFlashId(filterId);
    window.setTimeout(() => setFlashId((c) => (c === filterId ? null : c)), 640);
    if (!multi) setOpen(null);
  };

  const removeFilter = (filterId, atIdx) => {
    onChange(value.filter((f) => f.id !== filterId));
    setOpen(null);
    const target = Math.max(0, (atIdx ?? focusIdx) - 1);
    requestAnimationFrame(() => focusItem(target));
  };

  const clearAll = () => {
    onChange([]);
    setOpen(null);
    requestAnimationFrame(() => focusItem(0));
  };

  const ensureOptions = React.useCallback((field, query = '') => {
    if (!field.loadOptions) return;
    setAsyncState((s) => ({ ...s, [field.id]: { loading: true, error: false, options: s[field.id]?.options ?? [] } }));
    field
      .loadOptions(query)
      .then((options) => setAsyncState((s) => ({ ...s, [field.id]: { loading: false, error: false, options } })))
      .catch(() => setAsyncState((s) => ({ ...s, [field.id]: { loading: false, error: true, options: [] } })));
  }, []);

  React.useEffect(() => {
    if (!open || open.kind !== 'value') return;
    const filter = value.find((f) => f.id === open.filterId);
    const field = fieldById(fields, filter?.field ?? '');
    if (field?.loadOptions && !asyncState[field.id]?.options.length) ensureOptions(field);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  let itemIndex = 0;
  const nextRef = () => {
    const idx = itemIndex++;
    return {
      idx,
      register: (el) => (itemRefs.current[idx] = el),
      tabIndex: idx === focusIdx ? 0 : -1,
      onFocus: () => setFocusIdx(idx),
    };
  };

  const anchorKey = !open ? null : open.kind === 'add' ? 'add' : `${open.filterId}:${open.kind}`;

  const openPopoverContent = () => {
    if (!open) return null;

    if (open.kind === 'add' || open.kind === 'field') {
      const items = fields.map((f) => ({ value: f.id, label: f.label, glyph: f.icon }));
      return (
        <SearchList
          key={anchorKey}
          labelId="fb-field-label"
          items={items}
          multi={false}
          onPick={(v) => (open.kind === 'add' ? addFilter(v) : changeField(open.filterId, v))}
        />
      );
    }

    const filter = value.find((f) => f.id === open.filterId);
    const field = fieldById(fields, filter?.field ?? '');
    if (!filter || !field) return null;

    if (open.kind === 'operator') {
      const items = field.operators.map((o) => ({ value: o.value, label: o.label, selected: o.value === filter.operator }));
      return (
        <SearchList
          key={anchorKey}
          labelId="fb-op-label"
          items={items}
          multi={false}
          searchable={items.length > 6}
          onPick={(v) => changeOperator(filter.id, v)}
        />
      );
    }

    const op = operatorByValue(field, filter.operator);
    const multi = !!op?.multi;
    const async = field.loadOptions ? asyncState[field.id] : undefined;
    const source = field.loadOptions ? async?.options ?? [] : field.options ?? [];
    const items = source.map((o) => ({ value: o.value, label: o.label, glyph: o.glyph, selected: filter.values.includes(o.value) }));
    return (
      <SearchList
        key={anchorKey}
        labelId="fb-value-label"
        items={items}
        multi={multi}
        loading={async?.loading}
        error={async?.error}
        onQuery={field.loadOptions ? (q) => ensureOptions(field, q) : undefined}
        onRetry={() => ensureOptions(field)}
        onPick={(v) => toggleValue(filter.id, v, multi)}
      />
    );
  };

  const showClear = value.length > 1;

  return (
    <div role="toolbar" aria-label={ariaLabel} aria-orientation="horizontal" aria-disabled={disabled || undefined} onKeyDown={onToolbarKeyDown} className={`fb-toolbar${className ? ` ${className}` : ''}`}>
      <AnimatePresence initial={false} mode="popLayout">
        {value.map((filter) => {
          const field = fieldById(fields, filter.field);
          const op = operatorByValue(field, filter.operator);
          const summary = summarize(field?.loadOptions ? asyncState[field.id]?.options : field?.options, filter.values);
          const fieldItem = nextRef();
          const opItem = nextRef();
          const valueItem = nextRef();
          const removeItem = nextRef();
          const isFlashing = flashId === filter.id;

          return (
            <motion.div
              key={filter.id}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
              transition={springy}
              className="fb-token"
            >
              <Segment
                role="field"
                registerRef={fieldItem.register}
                tabIndex={fieldItem.tabIndex}
                onFocus={fieldItem.onFocus}
                anchorKey={`${filter.id}:field`}
                active={open?.kind === 'field' && open.filterId === filter.id}
                ariaLabel={`Field: ${field?.label ?? filter.field}. Edit field.`}
                onOpen={() => setOpen({ kind: 'field', filterId: filter.id })}
              >
                {field?.icon && (
                  <span style={{ color: 'var(--text-tertiary)', display: 'flex' }} aria-hidden>
                    {field.icon}
                  </span>
                )}
                {field?.label ?? filter.field}
              </Segment>

              <span aria-hidden className="fb-divider" />

              <Segment
                role="operator"
                registerRef={opItem.register}
                tabIndex={opItem.tabIndex}
                onFocus={opItem.onFocus}
                anchorKey={`${filter.id}:operator`}
                muted
                active={open?.kind === 'operator' && open.filterId === filter.id}
                ariaLabel={`Operator: ${op?.label ?? filter.operator}. Edit operator.`}
                onOpen={() => setOpen({ kind: 'operator', filterId: filter.id })}
              >
                {op?.label ?? filter.operator}
              </Segment>

              <span aria-hidden className="fb-divider" />

              <Segment
                role="value"
                registerRef={valueItem.register}
                tabIndex={valueItem.tabIndex}
                onFocus={valueItem.onFocus}
                anchorKey={`${filter.id}:value`}
                muted={summary.empty}
                active={open?.kind === 'value' && open.filterId === filter.id}
                flash={isFlashing}
                ariaLabel={`Value: ${summary.empty ? 'none selected' : summary.text}. Edit value.`}
                onOpen={() => setOpen({ kind: 'value', filterId: filter.id })}
              >
                {!summary.empty && summary.glyphs.length > 0 && (
                  <span className="fb-glyphs" aria-hidden>
                    {summary.glyphs.map((g, i) => (
                      <span key={i} style={{ display: 'flex', alignItems: 'center' }}>
                        {g}
                      </span>
                    ))}
                  </span>
                )}
                <span className={`fb-value-text${summary.empty ? ' fb-empty' : ''}`}>{summary.text}</span>
              </Segment>

              <button
                type="button"
                ref={removeItem.register}
                tabIndex={removeItem.tabIndex}
                onFocus={removeItem.onFocus}
                onClick={() => removeFilter(filter.id, removeItem.idx)}
                aria-label={`Remove ${field?.label ?? filter.field} filter`}
                className="fb-remove"
              >
                <CloseIcon />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {(() => {
        const addItem = nextRef();
        const isEmpty = value.length === 0;
        return (
          <button
            type="button"
            ref={addItem.register}
            tabIndex={addItem.tabIndex}
            onFocus={addItem.onFocus}
            data-fb-anchor="add"
            aria-label={isEmpty ? emptyLabel : addLabel}
            aria-haspopup="listbox"
            aria-expanded={open?.kind === 'add'}
            onClick={() => setOpen({ kind: 'add' })}
            className="fb-add"
          >
            <PlusIcon />
            {isEmpty ? emptyLabel : addLabel}
          </button>
        );
      })()}

      {showClear && (
        <button type="button" onClick={clearAll} className="fb-clear">
          Clear
        </button>
      )}

      {open && anchorKey && (
        <Popover anchorKey={anchorKey} onClose={() => setOpen(null)}>
          {openPopoverContent()}
        </Popover>
      )}
    </div>
  );
}

function PlusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M6 2.5v7M2.5 6h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2.5 6.2l2.2 2.3L9.5 3.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="fb-spin">
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
      <path d="M12.5 7A5.5 5.5 0 0 0 7 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default FilterBar;
