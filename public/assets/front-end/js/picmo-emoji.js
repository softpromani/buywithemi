var ye = (n, u, f) => {
    if (!u.has(n)) throw TypeError("Cannot " + f);
};
var w = (n, u, f) => (
        ye(n, u, "read from private field"), f ? f.call(n) : u.get(n)
    ),
    b = (n, u, f) => {
        if (u.has(n))
            throw TypeError(
                "Cannot add the same private member more than once"
            );
        u instanceof WeakSet ? u.add(n) : u.set(n, f);
    },
    J = (n, u, f, _) => (
        ye(n, u, "write to private field"), _ ? _.call(n, f) : u.set(n, f), f
    );
var v = (n, u, f) => (ye(n, u, "access private method"), f);
(function (n, u) {
    typeof exports == "object" && typeof module < "u"
        ? u(exports)
        : typeof define == "function" && define.amd
        ? define(["exports"], u)
        : ((n = typeof globalThis < "u" ? globalThis : n || self),
          u((n.picmo = {})));
})(this, function (n) {
    var k, A, I, fe, T, ve, R, we, C, E, Z, M, be, V;
    ("use strict");
    const u = "14.0";
    function f(i, e, t) {
        let o = `https://cdn.jsdelivr.net/npm/emojibase-data@${e}/${i}`;
        return (
            typeof t == "function"
                ? (o = t(i, e))
                : typeof t == "string" && (o = `${t}/${i}`),
            o
        );
    }
    async function _(i, e = {}) {
        const { local: t = !1, version: o = "latest", cdnUrl: s, ...r } = e,
            a = f(i, o, s),
            c = t ? localStorage : sessionStorage,
            h = `emojibase/${o}/${i}`,
            p = c.getItem(h);
        if (p) return Promise.resolve(JSON.parse(p));
        const m = await fetch(a, {
            credentials: "omit",
            mode: "cors",
            redirect: "error",
            ...r,
        });
        if (!m.ok) throw new Error("Failed to load Emojibase dataset.");
        const d = await m.json();
        try {
            c.setItem(h, JSON.stringify(d));
        } catch {}
        return d;
    }
    const Xe = { discord: "joypixels", slack: "iamcal" };
    async function Ce(i, e, t) {
        var o;
        return _(
            `${i}/shortcodes/${
                (o = Xe[e]) !== null && o !== void 0 ? o : e
            }.json`,
            t
        );
    }
    function x(i, e) {
        if (e.length === 0) return i;
        const t = new Set(i.shortcodes);
        return (
            e.forEach((o) => {
                const s = o[i.hexcode];
                Array.isArray(s) ? s.forEach((r) => t.add(r)) : s && t.add(s);
            }),
            (i.shortcodes = [...t]),
            i.skins &&
                i.skins.forEach((o) => {
                    x(o, e);
                }),
            i
        );
    }
    function et(i, e = []) {
        const t = [];
        return (
            i.forEach((o) => {
                if (o.skins) {
                    const { skins: s, ...r } = o;
                    t.push(x(r, e)),
                        s.forEach((a) => {
                            const c = { ...a };
                            r.tags && (c.tags = [...r.tags]), t.push(x(c, e));
                        });
                } else t.push(x(o, e));
            }),
            t
        );
    }
    function tt(i, e) {
        return (
            e.length === 0 ||
                i.forEach((t) => {
                    x(t, e);
                }),
            i
        );
    }
    async function je(i, e = {}) {
        const { compact: t = !1, flat: o = !1, shortcodes: s = [], ...r } = e,
            a = await _(`${i}/${t ? "compact" : "data"}.json`, r);
        let c = [];
        return (
            s.length > 0 &&
                (c = await Promise.all(
                    s.map((h) => {
                        let p;
                        if (h.includes("/")) {
                            const [m, d] = h.split("/");
                            p = Ce(m, d, r);
                        } else p = Ce(i, h, r);
                        return p.catch(() => ({}));
                    })
                )),
            o ? et(a, c) : tt(a, c)
        );
    }
    async function _e(i, e) {
        return _(`${i}/messages.json`, e);
    }
    function D(i, e) {
        const o = i.target.closest("[data-emoji]");
        if (o) {
            const s = e.find((r) => r.emoji === o.dataset.emoji);
            if (s) return s;
        }
        return null;
    }
    function Y(i) {
        var t;
        const e =
            (t = window.matchMedia) == null
                ? void 0
                : t.call(window, "(prefers-reduced-motion: reduce)");
        return i.animate && !(e != null && e.matches);
    }
    function Q(i, e) {
        return i.toLowerCase().includes(e.toLowerCase());
    }
    function ke(i, e) {
        let t = null;
        return () => {
            t ||
                (t = window.setTimeout(() => {
                    i(), (t = null);
                }, e));
        };
    }
    function Ee(i, e) {
        let t = null;
        return (...o) => {
            t && window.clearTimeout(t),
                (t = window.setTimeout(() => {
                    i(...o), (t = null);
                }, e));
        };
    }
    function S(i, e, t, o) {
        if (Y(o) && i.animate) return i.animate(e, t).finished;
        const s = t.direction === "normal" ? 1 : 0,
            r = Object.entries(e).reduce(
                (a, [c, h]) => ({ ...a, [c]: h[s] }),
                {}
            );
        return Object.assign(i.style, r), Promise.resolve();
    }
    function B(i) {
        var t;
        const e = document.createElement("template");
        return (
            (e.innerHTML = i),
            (t = e.content) == null ? void 0 : t.firstElementChild
        );
    }
    async function xe(i) {
        const e = new TextEncoder().encode(i),
            t = await crypto.subtle.digest("SHA-256", e);
        return Array.from(new Uint8Array(t))
            .map((s) => s.toString(16).padStart(2, "0"))
            .join("");
    }
    function y(...i) {
        return i.reduce((e, t) => ({ ...e, [t]: N(t) }), {});
    }
    function N(i) {
        return `picmo__${i}`;
    }
    function F(i) {
        for (; i.firstChild; ) i.removeChild(i.firstChild);
        return i;
    }
    function j(i, ...e) {
        F(i).append(...e);
    }
    function Se(i) {
        try {
            return window[i].length, !0;
        } catch {
            return !1;
        }
    }
    function X() {
        return Se("sessionStorage");
    }
    function Fe() {
        return Se("localStorage");
    }
    function P(i) {
        var e;
        return {
            emoji: i.emoji,
            label: i.label,
            tags: i.tags,
            skins: (e = i.skins) == null ? void 0 : e.map((t) => P(t)),
            order: i.order,
            custom: !1,
            hexcode: i.hexcode,
            version: i.version,
        };
    }
    function O(i, e, t) {
        var o;
        return t && !t.some((s) => s.order === i.group)
            ? !1
            : Q(i.label, e) ||
                  ((o = i.tags) == null ? void 0 : o.some((s) => Q(s, e)));
    }
    class Pe {
        constructor(e = "en") {
            this.locale = e;
        }
    }
    const it = [
        (i, e) => (i.hexcode === "1F91D" && e < 14 && (i.skins = []), i),
        (i, e) => (
            i.skins &&
                (i.skins = i.skins.filter((t) => !t.version || t.version <= e)),
            i
        ),
    ];
    function ot(i, e) {
        return it.some((t) => t(i, e) === null) ? null : i;
    }
    function H(i, e) {
        return i.filter((t) => ot(t, e) !== null);
    }
    const ee = {};
    function te(i) {
        return ee[i] || (ee[i] = new st(i)), ee[i];
    }
    te.deleteDatabase = (i) => {};
    class st extends Pe {
        open() {
            return Promise.resolve();
        }
        delete() {
            return Promise.resolve();
        }
        close() {}
        isPopulated() {
            return Promise.resolve(!1);
        }
        getEmojiCount() {
            return Promise.resolve(this.emojis.length);
        }
        getEtags() {
            return Promise.resolve({ foo: "bar" });
        }
        getHash() {
            return Promise.resolve("");
        }
        populate(e) {
            return (
                (this.categories = e.groups),
                (this.emojis = e.emojis),
                Promise.resolve()
            );
        }
        getCategories(e) {
            var o;
            let t = this.categories.filter((s) => s.key !== "component");
            if (
                (e.showRecents && t.unshift({ key: "recents", order: -1 }),
                (o = e.custom) != null &&
                    o.length &&
                    t.push({ key: "custom", order: 10 }),
                e.categories)
            ) {
                const s = e.categories;
                (t = t.filter((r) => s.includes(r.key))),
                    t.sort((r, a) => s.indexOf(r.key) - s.indexOf(a.key));
            } else t.sort((s, r) => s.order - r.order);
            return Promise.resolve(t);
        }
        getEmojis(e, t) {
            const o = this.emojis
                .filter((s) => s.group === e.order)
                .filter((s) => s.version <= t)
                .sort((s, r) =>
                    s.order != null && r.order != null ? s.order - r.order : 0
                )
                .map(P);
            return Promise.resolve(H(o, t));
        }
        searchEmojis(e, t, o, s) {
            const r = this.emojis
                    .filter((h) => O(h, e, s) && h.version <= o)
                    .map(P),
                a = t.filter((h) => O(h, e, s)),
                c = [...H(r, o), ...a];
            return Promise.resolve(c);
        }
        setMeta(e) {
            this.meta = e;
        }
    }
    function rt(i, e) {
        const t = `https://cdn.jsdelivr.net/npm/emojibase-data@${i}/${e}`;
        return {
            emojisUrl: `${t}/data.json`,
            messagesUrl: `${t}/messages.json`,
        };
    }
    async function ze(i) {
        try {
            return (await fetch(i, { method: "HEAD" })).headers.get("etag");
        } catch {
            return null;
        }
    }
    function at(i) {
        const { emojisUrl: e, messagesUrl: t } = rt("latest", i);
        try {
            return Promise.all([ze(e), ze(t)]);
        } catch {
            return Promise.all([null, null]);
        }
    }
    async function nt(i, e, t) {
        let o;
        try {
            o = await i.getEtags();
        } catch {
            o = {};
        }
        const { storedEmojisEtag: s, storedMessagesEtag: r } = o;
        if (t !== r || e !== s) {
            const [a, c] = await Promise.all([_e(i.locale), je(i.locale)]);
            await i.populate({
                groups: a.groups,
                emojis: c,
                emojisEtag: e,
                messagesEtag: t,
            });
        }
    }
    async function ct(i, e) {
        const t = await i.getHash();
        return e !== t;
    }
    async function Le(i, e, t) {
        let o = t || e(i);
        try {
            await o.open();
        } catch {
            console.warn(
                "[picmo] IndexedDB not available, falling back to InMemoryStoreFactory"
            ),
                (o = te(i));
        }
        return o;
    }
    async function lt(i, e, t) {
        if (!X() && typeof window < "u")
            throw new Error(
                "Session storage is required to use CDN emoji data."
            );
        const o = await Le(i, e, t),
            [s, r] = await at(i);
        if (await o.isPopulated()) s && r && (await nt(o, s, r));
        else {
            const [a, c] = await Promise.all([_e(i), je(i)]);
            await o.populate({
                groups: a.groups,
                emojis: c,
                emojisEtag: s,
                messagesEtag: r,
            });
        }
        return o;
    }
    async function ht(i, e, t, o, s) {
        const r = await Le(i, e, s),
            a = await xe(o);
        return (
            (!(await r.isPopulated()) || (await ct(r, a))) &&
                (await r.populate({ groups: t.groups, emojis: o, hash: a })),
            r
        );
    }
    async function ie(i, e, t, o, s) {
        return t && o ? ht(i, e, t, o, s) : lt(i, e, s);
    }
    function dt(i, e) {
        i.deleteDatabase(e);
    }
    class $e {
        constructor() {
            this.handleKeyDown = this.handleKeyDown.bind(this);
        }
        activate(e) {
            (this.rootElement = e),
                this.rootElement.addEventListener(
                    "keydown",
                    this.handleKeyDown
                );
        }
        deactivate() {
            var e;
            (e = this.rootElement) == null ||
                e.removeEventListener("keydown", this.handleKeyDown);
        }
        get focusableElements() {
            return this.rootElement.querySelectorAll('input, [tabindex="0"]');
        }
        get lastFocusableElement() {
            return this.focusableElements[this.focusableElements.length - 1];
        }
        get firstFocusableElement() {
            return this.focusableElements[0];
        }
        checkFocus(e, t, o) {
            e.target === t && (o.focus(), e.preventDefault());
        }
        handleKeyDown(e) {
            e.key === "Tab" &&
                this.checkFocus(
                    e,
                    e.shiftKey
                        ? this.firstFocusableElement
                        : this.lastFocusableElement,
                    e.shiftKey
                        ? this.lastFocusableElement
                        : this.firstFocusableElement
                );
        }
    }
    const { light: Ae, dark: mt, auto: ut } = y("light", "dark", "auto");
    class l {
        constructor({ template: e, classes: t, parent: o }) {
            (this.isDestroyed = !1),
                (this.appEvents = {}),
                (this.uiEvents = []),
                (this.uiElements = {}),
                (this.ui = {}),
                (this.template = e),
                (this.classes = t),
                (this.parent = o),
                (this.keyBindingHandler = this.keyBindingHandler.bind(this));
        }
        initialize() {
            this.bindAppEvents();
        }
        setCustomEmojis(e) {
            this.customEmojis = e;
        }
        setEvents(e) {
            this.events = e;
        }
        setPickerId(e) {
            this.pickerId = e;
        }
        emit(e, ...t) {
            this.events.emit(e, ...t);
        }
        setI18n(e) {
            this.i18n = e;
        }
        setRenderer(e) {
            this.renderer = e;
        }
        setEmojiData(e) {
            (this.emojiDataPromise = e),
                e.then((t) => {
                    this.emojiData = t;
                });
        }
        updateEmojiData(e) {
            (this.emojiData = e), (this.emojiDataPromise = Promise.resolve(e));
        }
        setOptions(e) {
            this.options = e;
        }
        renderSync(e = {}) {
            return (
                (this.el = this.template.renderSync({
                    classes: this.classes,
                    i18n: this.i18n,
                    pickerId: this.pickerId,
                    ...e,
                })),
                this.postRender(),
                this.el
            );
        }
        async render(e = {}) {
            return (
                await this.emojiDataPromise,
                (this.el = await this.template.renderAsync({
                    classes: this.classes,
                    i18n: this.i18n,
                    pickerId: this.pickerId,
                    ...e,
                })),
                this.postRender(),
                this.el
            );
        }
        postRender() {
            this.bindUIElements(),
                this.bindKeyBindings(),
                this.bindUIEvents(),
                this.scheduleShowAnimation();
        }
        bindAppEvents() {
            Object.keys(this.appEvents).forEach((e) => {
                this.events.on(e, this.appEvents[e], this);
            }),
                this.events.on("data:ready", this.updateEmojiData, this);
        }
        unbindAppEvents() {
            Object.keys(this.appEvents).forEach((e) => {
                this.events.off(e, this.appEvents[e]);
            }),
                this.events.off("data:ready", this.updateEmojiData);
        }
        keyBindingHandler(e) {
            const t = this.keyBindings[e.key];
            t && t.call(this, e);
        }
        bindKeyBindings() {
            this.keyBindings &&
                this.el.addEventListener("keydown", this.keyBindingHandler);
        }
        unbindKeyBindings() {
            this.keyBindings &&
                this.el.removeEventListener("keydown", this.keyBindingHandler);
        }
        bindUIElements() {
            this.ui = Object.keys(this.uiElements).reduce(
                (e, t) => ({
                    ...e,
                    [t]: this.el.querySelector(this.uiElements[t]),
                }),
                {}
            );
        }
        bindUIEvents() {
            this.uiEvents.forEach((e) => {
                (e.handler = e.handler.bind(this)),
                    (e.target ? this.ui[e.target] : this.el).addEventListener(
                        e.event,
                        e.handler,
                        e.options
                    );
            });
        }
        unbindUIEvents() {
            this.uiEvents.forEach((e) => {
                (e.target ? this.ui[e.target] : this.el).removeEventListener(
                    e.event,
                    e.handler
                );
            });
        }
        destroy() {
            this.unbindAppEvents(),
                this.unbindUIEvents(),
                this.unbindKeyBindings(),
                this.el.remove(),
                (this.isDestroyed = !0);
        }
        scheduleShowAnimation() {
            if (this.parent) {
                const e = new MutationObserver((t) => {
                    const [o] = t;
                    o.type === "childList" &&
                        o.addedNodes[0] === this.el &&
                        (Y(this.options) &&
                            this.animateShow &&
                            this.animateShow(),
                        e.disconnect);
                });
                e.observe(this.parent, { childList: !0 });
            }
        }
        static childEvent(e, t, o, s = {}) {
            return { target: e, event: t, handler: o, options: s };
        }
        static uiEvent(e, t, o = {}) {
            return { event: e, handler: t, options: o };
        }
        static byClass(e) {
            return `.${e}`;
        }
    }
    const pt =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512zM232 256C232 264 236 271.5 242.7 275.1L338.7 339.1C349.7 347.3 364.6 344.3 371.1 333.3C379.3 322.3 376.3 307.4 365.3 300L280 243.2V120C280 106.7 269.3 96 255.1 96C242.7 96 231.1 106.7 231.1 120L232 256z"/></svg>',
        gt =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M64 496C64 504.8 56.75 512 48 512h-32C7.25 512 0 504.8 0 496V32c0-17.75 14.25-32 32-32s32 14.25 32 32V496zM476.3 0c-6.365 0-13.01 1.35-19.34 4.233c-45.69 20.86-79.56 27.94-107.8 27.94c-59.96 0-94.81-31.86-163.9-31.87C160.9 .3055 131.6 4.867 96 15.75v350.5c32-9.984 59.87-14.1 84.85-14.1c73.63 0 124.9 31.78 198.6 31.78c31.91 0 68.02-5.971 111.1-23.09C504.1 355.9 512 344.4 512 332.1V30.73C512 11.1 495.3 0 476.3 0z"/></svg>',
        yt =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM176.4 240C194 240 208.4 225.7 208.4 208C208.4 190.3 194 176 176.4 176C158.7 176 144.4 190.3 144.4 208C144.4 225.7 158.7 240 176.4 240zM336.4 176C318.7 176 304.4 190.3 304.4 208C304.4 225.7 318.7 240 336.4 240C354 240 368.4 225.7 368.4 208C368.4 190.3 354 176 336.4 176zM259.9 369.4C288.8 369.4 316.2 375.2 340.6 385.5C352.9 390.7 366.7 381.3 361.4 369.1C344.8 330.9 305.6 303.1 259.9 303.1C214.3 303.1 175.1 330.8 158.4 369.1C153.1 381.3 166.1 390.6 179.3 385.4C203.7 375.1 231 369.4 259.9 369.4L259.9 369.4z"/></svg>',
        ft =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M448 64H192C85.96 64 0 149.1 0 256s85.96 192 192 192h256c106 0 192-85.96 192-192S554 64 448 64zM247.1 280h-32v32c0 13.2-10.78 24-23.98 24c-13.2 0-24.02-10.8-24.02-24v-32L136 279.1C122.8 279.1 111.1 269.2 111.1 256c0-13.2 10.85-24.01 24.05-24.01L167.1 232v-32c0-13.2 10.82-24 24.02-24c13.2 0 23.98 10.8 23.98 24v32h32c13.2 0 24.02 10.8 24.02 24C271.1 269.2 261.2 280 247.1 280zM431.1 344c-22.12 0-39.1-17.87-39.1-39.1s17.87-40 39.1-40s39.1 17.88 39.1 40S454.1 344 431.1 344zM495.1 248c-22.12 0-39.1-17.87-39.1-39.1s17.87-40 39.1-40c22.12 0 39.1 17.88 39.1 40S518.1 248 495.1 248z"/></svg>',
        vt =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M112.1 454.3c0 6.297 1.816 12.44 5.284 17.69l17.14 25.69c5.25 7.875 17.17 14.28 26.64 14.28h61.67c9.438 0 21.36-6.401 26.61-14.28l17.08-25.68c2.938-4.438 5.348-12.37 5.348-17.7L272 415.1h-160L112.1 454.3zM191.4 .0132C89.44 .3257 16 82.97 16 175.1c0 44.38 16.44 84.84 43.56 115.8c16.53 18.84 42.34 58.23 52.22 91.45c.0313 .25 .0938 .5166 .125 .7823h160.2c.0313-.2656 .0938-.5166 .125-.7823c9.875-33.22 35.69-72.61 52.22-91.45C351.6 260.8 368 220.4 368 175.1C368 78.61 288.9-.2837 191.4 .0132zM192 96.01c-44.13 0-80 35.89-80 79.1C112 184.8 104.8 192 96 192S80 184.8 80 176c0-61.76 50.25-111.1 112-111.1c8.844 0 16 7.159 16 16S200.8 96.01 192 96.01z"/></svg>',
        wt =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M512 32H120c-13.25 0-24 10.75-24 24L96.01 288c0 53 43 96 96 96h192C437 384 480 341 480 288h32c70.63 0 128-57.38 128-128S582.6 32 512 32zM512 224h-32V96h32c35.25 0 64 28.75 64 64S547.3 224 512 224zM560 416h-544C7.164 416 0 423.2 0 432C0 458.5 21.49 480 48 480h480c26.51 0 48-21.49 48-48C576 423.2 568.8 416 560 416z"/></svg>',
        bt =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M482.3 192C516.5 192 576 221 576 256C576 292 516.5 320 482.3 320H365.7L265.2 495.9C259.5 505.8 248.9 512 237.4 512H181.2C170.6 512 162.9 501.8 165.8 491.6L214.9 320H112L68.8 377.6C65.78 381.6 61.04 384 56 384H14.03C6.284 384 0 377.7 0 369.1C0 368.7 .1818 367.4 .5398 366.1L32 256L.5398 145.9C.1818 144.6 0 143.3 0 142C0 134.3 6.284 128 14.03 128H56C61.04 128 65.78 130.4 68.8 134.4L112 192H214.9L165.8 20.4C162.9 10.17 170.6 0 181.2 0H237.4C248.9 0 259.5 6.153 265.2 16.12L365.7 192H482.3z"/></svg>',
        Ct =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M9.375 233.4C3.375 239.4 0 247.5 0 256v128c0 8.5 3.375 16.62 9.375 22.62S23.5 416 32 416h32V224H32C23.5 224 15.38 227.4 9.375 233.4zM464 96H352V32c0-17.62-14.38-32-32-32S288 14.38 288 32v64H176C131.8 96 96 131.8 96 176V448c0 35.38 28.62 64 64 64h320c35.38 0 64-28.62 64-64V176C544 131.8 508.3 96 464 96zM256 416H192v-32h64V416zM224 296C201.9 296 184 278.1 184 256S201.9 216 224 216S264 233.9 264 256S246.1 296 224 296zM352 416H288v-32h64V416zM448 416h-64v-32h64V416zM416 296c-22.12 0-40-17.88-40-40S393.9 216 416 216S456 233.9 456 256S438.1 296 416 296zM630.6 233.4C624.6 227.4 616.5 224 608 224h-32v192h32c8.5 0 16.62-3.375 22.62-9.375S640 392.5 640 384V256C640 247.5 636.6 239.4 630.6 233.4z"/></svg>',
        jt = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <radialGradient gradientUnits="userSpaceOnUse" cy="10%" id="gradient-0">
      <stop offset="0" stop-color="hsl(50, 100%, 50%)" />
      <stop offset="1" stop-color="hsl(50, 100%, 60%)" />
    </radialGradient>
  </defs>
  <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
  <ellipse stroke="#000" fill="rgba(0, 0, 0, 0.6)" cx="172.586" cy="207.006" rx="39.974" ry="39.974"/>
  <ellipse stroke="#000" fill="rgba(0, 0, 0, 0.6)" cx="334.523" cy="207.481" rx="39.974" ry="39.974"/>
  <ellipse stroke="#000" fill="rgba(0, 0, 0, 0.6)" cx="313.325" cy="356.208" rx="91.497" ry="59.893"/>
  <path fill="#55a7ff" d="M 159.427 274.06 L 102.158 363.286 L 124.366 417.011 L 160.476 423.338 L 196.937 414.736 L 218.502 375.214"></path>
  <path fill="url(#gradient-0)" d="M256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zM256 352C290.9 352 323.2 367.8 348.3 394.9C354.3 401.4 364.4 401.7 370.9 395.7C377.4 389.7 377.7 379.6 371.7 373.1C341.6 340.5 301 320 256 320C247.2 320 240 327.2 240 336C240 344.8 247.2 352 256 352H256zM208 369C208 349 179.6 308.6 166.4 291.3C163.2 286.9 156.8 286.9 153.6 291.3C140.6 308.6 112 349 112 369C112 395 133.5 416 160 416C186.5 416 208 395 208 369H208zM303.6 208C303.6 225.7 317.1 240 335.6 240C353.3 240 367.6 225.7 367.6 208C367.6 190.3 353.3 176 335.6 176C317.1 176 303.6 190.3 303.6 208zM207.6 208C207.6 190.3 193.3 176 175.6 176C157.1 176 143.6 190.3 143.6 208C143.6 225.7 157.1 240 175.6 240C193.3 240 207.6 225.7 207.6 208z" />
</svg>`,
        _t =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"/></svg>',
        kt =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256.3 331.8C208.9 331.8 164.1 324.9 124.5 312.8C112.2 309 100.2 319.7 105.2 331.5C130.1 390.6 188.4 432 256.3 432C324.2 432 382.4 390.6 407.4 331.5C412.4 319.7 400.4 309 388.1 312.8C348.4 324.9 303.7 331.8 256.3 331.8H256.3zM176.4 176C158.7 176 144.4 190.3 144.4 208C144.4 225.7 158.7 240 176.4 240C194 240 208.4 225.7 208.4 208C208.4 190.3 194 176 176.4 176zM336.4 240C354 240 368.4 225.7 368.4 208C368.4 190.3 354 176 336.4 176C318.7 176 304.4 190.3 304.4 208C304.4 225.7 318.7 240 336.4 240z"/></svg>',
        Et =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M500.3 7.251C507.7 13.33 512 22.41 512 31.1V175.1C512 202.5 483.3 223.1 447.1 223.1C412.7 223.1 383.1 202.5 383.1 175.1C383.1 149.5 412.7 127.1 447.1 127.1V71.03L351.1 90.23V207.1C351.1 234.5 323.3 255.1 287.1 255.1C252.7 255.1 223.1 234.5 223.1 207.1C223.1 181.5 252.7 159.1 287.1 159.1V63.1C287.1 48.74 298.8 35.61 313.7 32.62L473.7 .6198C483.1-1.261 492.9 1.173 500.3 7.251H500.3zM74.66 303.1L86.5 286.2C92.43 277.3 102.4 271.1 113.1 271.1H174.9C185.6 271.1 195.6 277.3 201.5 286.2L213.3 303.1H239.1C266.5 303.1 287.1 325.5 287.1 351.1V463.1C287.1 490.5 266.5 511.1 239.1 511.1H47.1C21.49 511.1-.0019 490.5-.0019 463.1V351.1C-.0019 325.5 21.49 303.1 47.1 303.1H74.66zM143.1 359.1C117.5 359.1 95.1 381.5 95.1 407.1C95.1 434.5 117.5 455.1 143.1 455.1C170.5 455.1 191.1 434.5 191.1 407.1C191.1 381.5 170.5 359.1 143.1 359.1zM440.3 367.1H496C502.7 367.1 508.6 372.1 510.1 378.4C513.3 384.6 511.6 391.7 506.5 396L378.5 508C372.9 512.1 364.6 513.3 358.6 508.9C352.6 504.6 350.3 496.6 353.3 489.7L391.7 399.1H336C329.3 399.1 323.4 395.9 321 389.6C318.7 383.4 320.4 376.3 325.5 371.1L453.5 259.1C459.1 255 467.4 254.7 473.4 259.1C479.4 263.4 481.6 271.4 478.7 278.3L440.3 367.1zM116.7 219.1L19.85 119.2C-8.112 90.26-6.614 42.31 24.85 15.34C51.82-8.137 93.26-3.642 118.2 21.83L128.2 32.32L137.7 21.83C162.7-3.642 203.6-8.137 231.6 15.34C262.6 42.31 264.1 90.26 236.1 119.2L139.7 219.1C133.2 225.6 122.7 225.6 116.7 219.1H116.7z"/></svg>',
        xt =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M413.8 447.1L256 448l0 31.99C256 497.7 241.8 512 224.1 512c-17.67 0-32.1-14.32-32.1-31.99l0-31.99l-158.9-.0099c-28.5 0-43.69-34.49-24.69-56.4l68.98-79.59H62.22c-25.41 0-39.15-29.8-22.67-49.13l60.41-70.85H89.21c-21.28 0-32.87-22.5-19.28-37.31l134.8-146.5c10.4-11.3 28.22-11.3 38.62-.0033l134.9 146.5c13.62 14.81 2.001 37.31-19.28 37.31h-10.77l60.35 70.86c16.46 19.34 2.716 49.12-22.68 49.12h-15.2l68.98 79.59C458.7 413.7 443.1 447.1 413.8 447.1z"/></svg>',
        St =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3c-95.73 0-173.3 77.6-173.3 173.3C0 496.5 15.52 512 34.66 512H413.3C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM479.1 320h-73.85C451.2 357.7 480 414.1 480 477.3C480 490.1 476.2 501.9 470 512h138C625.7 512 640 497.6 640 479.1C640 391.6 568.4 320 479.1 320zM432 256C493.9 256 544 205.9 544 144S493.9 32 432 32c-25.11 0-48.04 8.555-66.72 22.51C376.8 76.63 384 101.4 384 128c0 35.52-11.93 68.14-31.59 94.71C372.7 243.2 400.8 256 432 256z"/></svg>',
        Ft = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <radialGradient id="radial" cy="85%">
      <stop offset="20%" stop-color="var(--color-secondary)" />
      <stop offset="100%" stop-color="var(--color-primary)" />
    </radialGradient>
  </defs>
  <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
  <path fill="url('#radial')" d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z" />
</svg>`,
        Pt =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>';
    function zt(i, e) {
        const t = B(e);
        return (t.dataset.icon = i), t.classList.add(N("icon")), t;
    }
    const Ie = {
            clock: pt,
            flag: gt,
            frown: yt,
            gamepad: ft,
            lightbulb: vt,
            mug: wt,
            plane: bt,
            robot: Ct,
            sad: jt,
            search: _t,
            smiley: kt,
            symbols: Et,
            tree: xt,
            users: St,
            warning: Ft,
            xmark: Pt,
        },
        K = {
            recents: "clock",
            "smileys-emotion": "smiley",
            "people-body": "users",
            "animals-nature": "tree",
            "food-drink": "mug",
            activities: "gamepad",
            "travel-places": "plane",
            objects: "lightbulb",
            symbols: "symbols",
            flags: "flag",
            custom: "robot",
        };
    function Te(i, e) {
        if (!(i in Ie))
            return (
                console.warn(`Unknown icon: "${i}"`),
                document.createElement("div")
            );
        const t = zt(i, Ie[i]);
        return e && t.classList.add(N(`icon-${e}`)), t;
    }
    const Lt = { mode: "sync" };
    class g {
        constructor(e, t = {}) {
            b(this, I);
            b(this, T);
            b(this, R);
            b(this, k, void 0);
            b(this, A, void 0);
            J(this, k, e), J(this, A, t.mode || Lt.mode);
        }
        renderSync(e = {}) {
            const t = B(w(this, k).call(this, e));
            return (
                v(this, R, we).call(this, t, e),
                v(this, T, ve).call(this, t),
                v(this, I, fe).call(this, t, e),
                t
            );
        }
        async renderAsync(e = {}) {
            const t = B(w(this, k).call(this, e));
            return (
                v(this, R, we).call(this, t, e),
                v(this, T, ve).call(this, t),
                await v(this, I, fe).call(this, t, e),
                t
            );
        }
        render(e) {
            return w(this, A) === "sync"
                ? this.renderSync(e)
                : this.renderAsync(e);
        }
    }
    (k = new WeakMap()),
        (A = new WeakMap()),
        (I = new WeakSet()),
        (fe = async function (e, t) {
            const o = e.querySelectorAll("[data-view]"),
                s = [];
            for (const r of o) {
                const a = t[r.dataset.view];
                a
                    ? r.dataset.render !== "sync"
                        ? s.push(a.render().then((c) => (r.replaceWith(c), c)))
                        : r.replaceWith(a.renderSync())
                    : r.remove();
            }
            return Promise.all(s);
        }),
        (T = new WeakSet()),
        (ve = function (e) {
            e.querySelectorAll("i[data-icon]").forEach((o) => {
                const { icon: s, size: r } = o.dataset;
                o.replaceWith(Te(s, r));
            });
        }),
        (R = new WeakSet()),
        (we = function (e, t) {
            return (
                e.querySelectorAll("[data-placeholder]").forEach((s) => {
                    const r = s.dataset.placeholder;
                    if (r && t[r]) {
                        const a = t[r];
                        s.replaceWith(...[a].flat());
                    } else
                        console.warn(
                            `Missing placeholder element for key "${r}"`
                        );
                }),
                e
            );
        });
    const $t = y("imagePlaceholder", "placeholder"),
        At = new g(
            ({ classes: i }) => `
  <div class="${i.placeholder} ${i.imagePlaceholder}"></div>
`
        );
    class It extends l {
        constructor({ classNames: e } = {}) {
            super({ template: At, classes: $t }), (this.classNames = e);
        }
        load(e) {
            const t = document.createElement("img");
            this.classNames && (t.className = this.classNames),
                t.addEventListener(
                    "load",
                    () => {
                        this.el.replaceWith(t);
                    },
                    { once: !0 }
                ),
                Promise.resolve(e).then((o) => (t.src = o));
        }
        renderSync() {
            return (
                super.renderSync(),
                this.classNames &&
                    this.classNames
                        .split(" ")
                        .forEach((t) => this.el.classList.add(t)),
                this.el
            );
        }
    }
    const Tt = y("customEmoji");
    class Re {
        renderElement(e) {
            return { content: e };
        }
        renderImage(e = "", t) {
            const o = new It({ classNames: e });
            return (
                o.renderSync(),
                { content: o, resolver: () => (o.load(t()), o.el) }
            );
        }
        doRender(e, t, o) {
            if (e.custom) return this.renderCustom(e, t, o);
            const { content: s, resolver: r } = this.render(e, o),
                a = s instanceof Element ? s : s.el;
            return r && r(), a;
        }
        doEmit(e) {
            return e.custom ? this.emitCustom(e) : this.emit(e);
        }
        emitCustom({ url: e, label: t, emoji: o, data: s }) {
            return { url: e, label: t, emoji: o, data: s };
        }
        renderCustom(e, t, o = "") {
            const s = [Tt.customEmoji, o].join(" ").trim(),
                { content: r, resolver: a } = this.renderImage(s, () => e.url),
                c = r instanceof Element ? r : r.el;
            return a && a(), c;
        }
    }
    const Rt = new g(({ emoji: i }) => `<span>${i}</span>`);
    class Me extends Re {
        render(e) {
            return this.renderElement(Rt.renderSync({ emoji: e.emoji }));
        }
        emit({ emoji: e, hexcode: t, label: o }) {
            return { emoji: e, hexcode: t, label: o };
        }
    }
    const oe = {
            "categories.activities": "Activities",
            "categories.animals-nature": "Animals & Nature",
            "categories.custom": "Custom",
            "categories.flags": "Flags",
            "categories.food-drink": "Food & Drink",
            "categories.objects": "Objects",
            "categories.people-body": "People & Body",
            "categories.recents": "Recently Used",
            "categories.smileys-emotion": "Smileys & Emotion",
            "categories.symbols": "Symbols",
            "categories.travel-places": "Travel & Places",
            "error.load": "Failed to load emojis",
            "recents.clear": "Clear recent emojis",
            "recents.none": "You haven't selected any emojis yet.",
            retry: "Try again",
            "search.clear": "Clear search",
            "search.error": "Failed to search emojis",
            "search.notFound": "No results found",
            search: "Search emojis...",
        },
        se = "PicMo";
    function re(i) {
        return new Mt(i);
    }
    re.deleteDatabase = (i) =>
        new Promise((e, t) => {
            const o = indexedDB.deleteDatabase(`${se}-${i}`);
            o.addEventListener("success", e), o.addEventListener("error", t);
        });
    class Mt extends Pe {
        async open() {
            const e = indexedDB.open(`${se}-${this.locale}`);
            return new Promise((t, o) => {
                e.addEventListener("success", (s) => {
                    var r;
                    (this.db = (r = s.target) == null ? void 0 : r.result), t();
                }),
                    e.addEventListener("error", o),
                    e.addEventListener("upgradeneeded", async (s) => {
                        var a;
                        (this.db = (a = s.target) == null ? void 0 : a.result),
                            this.db.createObjectStore("category", {
                                keyPath: "order",
                            });
                        const r = this.db.createObjectStore("emoji", {
                            keyPath: "emoji",
                        });
                        r.createIndex("category", "group"),
                            r.createIndex("version", "version"),
                            this.db.createObjectStore("meta");
                    });
            });
        }
        async delete() {
            this.close();
            const e = indexedDB.deleteDatabase(`${se}-${this.locale}`);
            await this.waitForRequest(e);
        }
        close() {
            this.db.close();
        }
        async getEmojiCount() {
            const t = this.db
                .transaction("emoji", "readonly")
                .objectStore("emoji");
            return (await this.waitForRequest(t.count())).target.result;
        }
        async getEtags() {
            const t = this.db
                    .transaction("meta", "readonly")
                    .objectStore("meta"),
                [o, s] = await Promise.all([
                    this.waitForRequest(t.get("emojisEtag")),
                    this.waitForRequest(t.get("messagesEtag")),
                ]);
            return {
                storedEmojisEtag: o.target.result,
                storedMessagesEtag: s.target.result,
            };
        }
        async setMeta(e) {
            const t = this.db.transaction("meta", "readwrite"),
                o = t.objectStore("meta");
            return new Promise((s) => {
                (t.oncomplete = s),
                    Object.keys(e)
                        .filter(Boolean)
                        .forEach((a) => {
                            o.put(e[a], a);
                        });
            });
        }
        async getHash() {
            const t = this.db
                .transaction("meta", "readonly")
                .objectStore("meta");
            return (await this.waitForRequest(t.get("hash"))).target.result;
        }
        async isPopulated() {
            const t = this.db
                .transaction("category", "readonly")
                .objectStore("category");
            return (await this.waitForRequest(t.count())).target.result > 0;
        }
        async populate({
            groups: e,
            emojis: t,
            emojisEtag: o,
            messagesEtag: s,
            hash: r,
        }) {
            await this.removeAllObjects("category", "emoji");
            const a = [
                this.addObjects("category", e),
                this.addObjects("emoji", t),
                this.setMeta({ emojisEtag: o, messagesEtag: s, hash: r }),
            ];
            await Promise.all(a);
        }
        async getCategories(e) {
            var a;
            const o = this.db
                .transaction("category", "readonly")
                .objectStore("category");
            let r = (
                await this.waitForRequest(o.getAll())
            ).target.result.filter((c) => c.key !== "component");
            if (
                (e.showRecents && r.unshift({ key: "recents", order: -1 }),
                (a = e.custom) != null &&
                    a.length &&
                    r.push({ key: "custom", order: 10 }),
                e.categories)
            ) {
                const c = e.categories;
                (r = r.filter((h) => c.includes(h.key))),
                    r.sort((h, p) => c.indexOf(h.key) - c.indexOf(p.key));
            } else r.sort((c, h) => c.order - h.order);
            return r;
        }
        async getEmojis(e, t) {
            const r = this.db
                    .transaction("emoji", "readonly")
                    .objectStore("emoji")
                    .index("category"),
                h = (await this.waitForRequest(r.getAll(e.order))).target.result
                    .filter((p) => p.version <= t)
                    .sort((p, m) =>
                        p.order != null && m.order != null
                            ? p.order - m.order
                            : 0
                    )
                    .map(P);
            return H(h, t);
        }
        async searchEmojis(e, t, o, s) {
            const r = [];
            return new Promise((a, c) => {
                const m = this.db
                    .transaction("emoji", "readonly")
                    .objectStore("emoji")
                    .openCursor();
                m.addEventListener("success", (d) => {
                    var Qe;
                    const pe = (Qe = d.target) == null ? void 0 : Qe.result;
                    if (!pe)
                        return a([...H(r, o), ...t.filter((Ni) => O(Ni, e))]);
                    const ge = pe.value;
                    O(ge, e, s) && ge.version <= o && r.push(P(ge)),
                        pe.continue();
                }),
                    m.addEventListener("error", (d) => {
                        c(d);
                    });
            });
        }
        async waitForRequest(e) {
            return new Promise((t, o) => {
                (e.onsuccess = t), (e.onerror = o);
            });
        }
        withTransaction(e, t = "readwrite", o) {
            return new Promise((s, r) => {
                const a = this.db.transaction(e, t);
                (a.oncomplete = s), (a.onerror = r), o(a);
            });
        }
        async removeAllObjects(...e) {
            const t = this.db.transaction(e, "readwrite"),
                o = e.map((s) => t.objectStore(s));
            await Promise.all(o.map((s) => this.waitForRequest(s.clear())));
        }
        async addObjects(e, t) {
            return this.withTransaction(e, "readwrite", (o) => {
                const s = o.objectStore(e);
                t.forEach((r) => {
                    s.add(r);
                });
            });
        }
    }
    function Ve() {
        let i = {};
        return {
            getItem: (e) => i[e],
            setItem: (e, t) => (i[e] = t),
            length: Object.keys(i).length,
            clear: () => (i = {}),
            key: (e) => Object.keys(i)[e],
            removeItem: (e) => delete i[e],
        };
    }
    class ae {}
    const ne = "PicMo:recents";
    class De extends ae {
        constructor(e) {
            super(), (this.storage = e);
        }
        clear() {
            this.storage.removeItem(ne);
        }
        getRecents(e) {
            var t;
            try {
                return JSON.parse(
                    (t = this.storage.getItem(ne)) != null ? t : "[]"
                ).slice(0, e);
            } catch {
                return [];
            }
        }
        addOrUpdateRecent(e, t) {
            const o = [
                e,
                ...this.getRecents(t).filter((s) => s.hexcode !== e.hexcode),
            ].slice(0, t);
            try {
                this.storage.setItem(ne, JSON.stringify(o));
            } catch {
                console.warn(
                    "storage is not available, recent emojis will not be saved"
                );
            }
        }
    }
    class Be extends De {
        constructor() {
            super(Fe() ? localStorage : Ve());
        }
    }
    const Vt = {
        dataStore: re,
        theme: Ae,
        animate: !0,
        showCategoryTabs: !0,
        showPreview: !0,
        showRecents: !0,
        showSearch: !0,
        showVariants: !0,
        emojisPerRow: 8,
        visibleRows: 6,
        emojiVersion: "auto",
        i18n: oe,
        locale: "en",
        maxRecents: 50,
        custom: [],
    };
    function Ne(i = {}) {
        return {
            ...Vt,
            ...i,
            renderer: i.renderer || new Me(),
            recentsProvider: i.recentsProvider || new Be(),
        };
    }
    class U {
        constructor() {
            b(this, E);
            b(this, M);
            b(this, C, new Map());
        }
        on(e, t, o) {
            v(this, M, be).call(this, e, t, o);
        }
        once(e, t, o) {
            v(this, M, be).call(this, e, t, o, !0);
        }
        off(e, t) {
            const o = v(this, E, Z).call(this, e);
            w(this, C).set(
                e,
                o.filter((s) => s.handler !== t)
            );
        }
        emit(e, ...t) {
            v(this, E, Z)
                .call(this, e)
                .forEach((s) => {
                    s.handler.apply(s.context, t),
                        s.once && this.off(e, s.handler);
                });
        }
        removeAll() {
            w(this, C).clear();
        }
    }
    (C = new WeakMap()),
        (E = new WeakSet()),
        (Z = function (e) {
            return (
                w(this, C).has(e) || w(this, C).set(e, []), w(this, C).get(e)
            );
        }),
        (M = new WeakSet()),
        (be = function (e, t, o, s = !1) {
            v(this, E, Z)
                .call(this, e)
                .push({ context: o, handler: t, once: s });
        });
    const Oe = { injectStyles: !0 };
    class Dt extends U {}
    class Bt extends U {}
    const ce = y("emojiCategory", "categoryName", "noRecents", "recentEmojis");
    class le extends l {
        constructor({
            template: e,
            category: t,
            showVariants: o,
            lazyLoader: s,
        }) {
            super({ template: e, classes: ce }),
                (this.baseUIElements = {
                    categoryName: l.byClass(ce.categoryName),
                }),
                (this.category = t),
                (this.showVariants = o),
                (this.lazyLoader = s);
        }
        setActive(e, t, o) {
            this.emojiContainer.setActive(e, t, o);
        }
    }
    const Nt = new g(
            ({ classes: i, emoji: e }) => `
  <button
    type="button"
    class="${i.emojiButton}"
    title="${e.label}"
    data-emoji="${e.emoji}"
    tabindex="-1">
    <div data-placeholder="emojiContent"></div>
  </button>
`
        ),
        Ot = y("emojiButton");
    class He extends l {
        constructor({ emoji: e, lazyLoader: t, category: o }) {
            super({ template: Nt, classes: Ot }),
                (this.emoji = e),
                (this.lazyLoader = t),
                (this.category = o);
        }
        initialize() {
            (this.uiEvents = [l.uiEvent("focus", this.handleFocus)]),
                super.initialize();
        }
        handleFocus() {
            this.category && this.events.emit("focus:change", this.category);
        }
        activateFocus(e) {
            (this.el.tabIndex = 0), e && this.el.focus();
        }
        deactivateFocus() {
            this.el.tabIndex = -1;
        }
        renderSync() {
            return super.renderSync({
                emoji: this.emoji,
                emojiContent: this.renderer.doRender(
                    this.emoji,
                    this.lazyLoader
                ),
            });
        }
    }
    class Ht {
        constructor(e, t, o = 0, s = 0, r = !1) {
            (this.events = new U()),
                (this.keyHandlers = {
                    ArrowLeft: this.focusPrevious.bind(this),
                    ArrowRight: this.focusNext.bind(this),
                    ArrowUp: this.focusUp.bind(this),
                    ArrowDown: this.focusDown.bind(this),
                }),
                (this.rowCount = Math.ceil(t / e)),
                (this.columnCount = e),
                (this.focusedRow = o),
                (this.focusedColumn = s),
                (this.emojiCount = t),
                (this.wrap = r),
                (this.handleKeyDown = this.handleKeyDown.bind(this));
        }
        destroy() {
            this.events.removeAll();
        }
        on(e, t) {
            this.events.on(e, t);
        }
        handleKeyDown(e) {
            e.key in this.keyHandlers &&
                (e.preventDefault(), this.keyHandlers[e.key]());
        }
        setCell(e, t, o = !0) {
            const s = this.getIndex();
            (this.focusedRow = e),
                t !== void 0 &&
                    (this.focusedColumn = Math.min(this.columnCount, t)),
                (this.focusedRow >= this.rowCount ||
                    this.getIndex() >= this.emojiCount) &&
                    ((this.focusedRow = this.rowCount - 1),
                    (this.focusedColumn =
                        (this.emojiCount % this.columnCount) - 1)),
                this.events.emit("focus:change", {
                    from: s,
                    to: this.getIndex(),
                    performFocus: o,
                });
        }
        setFocusedIndex(e, t = !0) {
            const o = Math.floor(e / this.columnCount),
                s = e % this.columnCount;
            this.setCell(o, s, t);
        }
        focusNext() {
            this.focusedColumn < this.columnCount - 1 &&
            this.getIndex() < this.emojiCount - 1
                ? this.setCell(this.focusedRow, this.focusedColumn + 1)
                : this.focusedRow < this.rowCount - 1
                ? this.setCell(this.focusedRow + 1, 0)
                : this.wrap
                ? this.setCell(0, 0)
                : this.events.emit("focus:overflow", 0);
        }
        focusPrevious() {
            this.focusedColumn > 0
                ? this.setCell(this.focusedRow, this.focusedColumn - 1)
                : this.focusedRow > 0
                ? this.setCell(this.focusedRow - 1, this.columnCount - 1)
                : this.wrap
                ? this.setCell(this.rowCount - 1, this.columnCount - 1)
                : this.events.emit("focus:underflow", this.columnCount - 1);
        }
        focusUp() {
            this.focusedRow > 0
                ? this.setCell(this.focusedRow - 1, this.focusedColumn)
                : this.events.emit("focus:underflow", this.focusedColumn);
        }
        focusDown() {
            this.focusedRow < this.rowCount - 1
                ? this.setCell(this.focusedRow + 1, this.focusedColumn)
                : this.events.emit("focus:overflow", this.focusedColumn);
        }
        focusToIndex(e) {
            this.setCell(
                Math.floor(e / this.columnCount),
                e % this.columnCount
            );
        }
        getIndex() {
            return this.focusedRow * this.columnCount + this.focusedColumn;
        }
        getCell() {
            return { row: this.focusedRow, column: this.focusedColumn };
        }
        getRowCount() {
            return this.rowCount;
        }
    }
    const Kt = new g(
            ({ classes: i }) => `
  <div class="${i.emojiContainer}">
    <div data-placeholder="emojis"></div>
  </div>
`
        ),
        Ut = y("emojiContainer");
    class z extends l {
        constructor({
            emojis: e,
            showVariants: t,
            preview: o = !0,
            lazyLoader: s,
            category: r,
            fullHeight: a = !1,
        }) {
            super({ template: Kt, classes: Ut }),
                (this.fullHeight = !1),
                (this.showVariants = t),
                (this.lazyLoader = s),
                (this.preview = o),
                (this.emojis = e),
                (this.category = r),
                (this.fullHeight = a),
                (this.setFocus = this.setFocus.bind(this)),
                (this.triggerNextCategory =
                    this.triggerNextCategory.bind(this)),
                (this.triggerPreviousCategory =
                    this.triggerPreviousCategory.bind(this));
        }
        initialize() {
            (this.grid = new Ht(
                this.options.emojisPerRow,
                this.emojiCount,
                0,
                0,
                !this.category
            )),
                this.grid.on("focus:change", this.setFocus),
                this.grid.on("focus:overflow", this.triggerNextCategory),
                this.grid.on("focus:underflow", this.triggerPreviousCategory),
                (this.uiEvents = [
                    l.uiEvent("click", this.selectEmoji),
                    l.uiEvent("keydown", this.grid.handleKeyDown),
                ]),
                this.preview &&
                    this.uiEvents.push(
                        l.uiEvent("mouseover", this.showPreview),
                        l.uiEvent("mouseout", this.hidePreview),
                        l.uiEvent("focus", this.showPreview, { capture: !0 }),
                        l.uiEvent("blur", this.hidePreview, { capture: !0 })
                    ),
                super.initialize();
        }
        setFocusedView(e, t) {
            if (!!e)
                if (typeof e == "string") {
                    const o = this.emojis.findIndex((s) => s.emoji === e);
                    this.grid.setFocusedIndex(o, !1),
                        setTimeout(() => {
                            var c, h, p, m;
                            const s = this.emojiViews[o].el;
                            s.scrollIntoView();
                            const r =
                                    (c = s.parentElement) == null
                                        ? void 0
                                        : c.previousElementSibling,
                                a =
                                    (p =
                                        (h = s.parentElement) == null
                                            ? void 0
                                            : h.parentElement) == null
                                        ? void 0
                                        : p.parentElement;
                            a.scrollTop -=
                                (m = r == null ? void 0 : r.offsetHeight) !=
                                null
                                    ? m
                                    : 0;
                        });
                } else
                    e.row === "first" || e.row === 0
                        ? this.grid.setCell(0, e.offset, t)
                        : e.row === "last" &&
                          this.grid.setCell(
                              this.grid.getRowCount() - 1,
                              e.offset,
                              t
                          );
        }
        setActive(e, t, o) {
            var s;
            e
                ? this.setFocusedView(t, o)
                : (s = this.emojiViews[this.grid.getIndex()]) == null ||
                  s.deactivateFocus();
        }
        renderSync() {
            return (
                (this.emojiViews = this.emojis.map((e) =>
                    this.viewFactory.create(He, {
                        emoji: e,
                        category: this.category,
                        lazyLoader: this.lazyLoader,
                        renderer: this.renderer,
                    })
                )),
                (this.emojiElements = this.emojiViews.map((e) =>
                    e.renderSync()
                )),
                super.renderSync({
                    emojis: this.emojiElements,
                    i18n: this.i18n,
                })
            );
        }
        destroy() {
            super.destroy(),
                this.emojiViews.forEach((e) => e.destroy()),
                this.grid.destroy();
        }
        triggerPreviousCategory(e) {
            this.events.emit("category:previous", e);
        }
        triggerNextCategory(e) {
            this.category && this.events.emit("category:next", e);
        }
        setFocus({ from: e, to: t, performFocus: o }) {
            var s, r;
            (s = this.emojiViews[e]) == null || s.deactivateFocus(),
                (r = this.emojiViews[t]) == null || r.activateFocus(o);
        }
        selectEmoji(e) {
            e.stopPropagation();
            const t = D(e, this.emojis);
            t &&
                this.events.emit("emoji:select", {
                    emoji: t,
                    showVariants: this.showVariants,
                });
        }
        showPreview(e) {
            const o = e.target.closest("button"),
                s = o == null ? void 0 : o.firstElementChild,
                r = D(e, this.emojis);
            r &&
                this.events.emit(
                    "preview:show",
                    r,
                    s == null ? void 0 : s.cloneNode(!0)
                );
        }
        hidePreview(e) {
            D(e, this.emojis) && this.events.emit("preview:hide");
        }
        get emojiCount() {
            return this.emojis.length;
        }
    }
    const qt = new g(
        ({ classes: i, category: e, pickerId: t, icon: o, i18n: s }) => `
  <section class="${
      i.emojiCategory
  }" role="tabpanel" aria-labelledby="${t}-category-${e.key}">
    <h3 data-category="${e.key}" class="${i.categoryName}">
      <i data-icon="${o}"></i>
      ${s.get(`categories.${e.key}`, e.message || e.key)}
    </h3>
    <div data-view="emojis" data-render="sync"></div>
  </section>
`
    );
    class Wt extends le {
        constructor({
            category: e,
            showVariants: t,
            lazyLoader: o,
            emojiVersion: s,
        }) {
            super({
                category: e,
                showVariants: t,
                lazyLoader: o,
                template: qt,
            }),
                (this.showVariants = t),
                (this.lazyLoader = o),
                (this.emojiVersion = s);
        }
        initialize() {
            (this.uiElements = { ...this.baseUIElements }), super.initialize();
        }
        async render() {
            await this.emojiDataPromise;
            const e = await this.emojiData.getEmojis(
                this.category,
                this.emojiVersion
            );
            return (
                (this.emojiContainer = this.viewFactory.create(z, {
                    emojis: e,
                    showVariants: this.showVariants,
                    lazyLoader: this.lazyLoader,
                    category: this.category.key,
                })),
                super.render({
                    category: this.category,
                    emojis: this.emojiContainer,
                    emojiCount: e.length,
                    icon: K[this.category.key],
                })
            );
        }
    }
    class Gt extends z {
        constructor({
            category: e,
            emojis: t,
            preview: o = !0,
            lazyLoader: s,
        }) {
            super({
                category: e,
                emojis: t,
                showVariants: !1,
                preview: o,
                lazyLoader: s,
            });
        }
        async addOrUpdate(e) {
            const t = this.el.querySelector(`[data-emoji="${e.emoji}"]`);
            t &&
                (this.el.removeChild(t),
                (this.emojis = this.emojis.filter((s) => s !== e)));
            const o = this.viewFactory.create(He, { emoji: e });
            if (
                (this.el.insertBefore(o.renderSync(), this.el.firstChild),
                (this.emojis = [e, ...this.emojis.filter((s) => s !== e)]),
                this.emojis.length > this.options.maxRecents)
            ) {
                this.emojis = this.emojis.slice(0, this.options.maxRecents);
                const s = this.el.childElementCount - this.options.maxRecents;
                for (let r = 0; r < s; r++)
                    this.el.lastElementChild &&
                        this.el.removeChild(this.el.lastElementChild);
            }
        }
    }
    const Jt = new g(
        ({
            emojiCount: i,
            classes: e,
            category: t,
            pickerId: o,
            icon: s,
            i18n: r,
        }) => `
  <section class="${
      e.emojiCategory
  }" role="tabpanel" aria-labelledby="${o}-category-${t.key}">
    <h3 data-category="${t.key}" class="${e.categoryName}">
      <i data-icon="${s}"></i>
      ${r.get(`categories.${t.key}`, t.message || t.key)}
    </h3>
    <div data-empty="${i === 0}" class="${e.recentEmojis}">
      <div data-view="emojis" data-render="sync"></div>
    </div>
    <div class="${e.noRecents}">
      ${r.get("recents.none")}
    </div>
  </section>
`,
        { mode: "async" }
    );
    class Zt extends le {
        constructor({ category: e, lazyLoader: t, provider: o }) {
            super({
                category: e,
                showVariants: !1,
                lazyLoader: t,
                template: Jt,
            }),
                (this.provider = o);
        }
        initialize() {
            (this.uiElements = {
                ...this.baseUIElements,
                recents: l.byClass(ce.recentEmojis),
            }),
                (this.appEvents = { "recent:add": this.addRecent }),
                super.initialize();
        }
        async addRecent(e) {
            await this.emojiContainer.addOrUpdate(e),
                (this.ui.recents.dataset.empty = "false");
        }
        async render() {
            var t;
            const e =
                (t = this.provider) == null
                    ? void 0
                    : t.getRecents(this.options.maxRecents);
            return (
                (this.emojiContainer = this.viewFactory.create(Gt, {
                    emojis: e,
                    showVariants: !1,
                    lazyLoader: this.lazyLoader,
                    category: this.category.key,
                })),
                await super.render({
                    category: this.category,
                    emojis: this.emojiContainer,
                    emojiCount: e.length,
                    icon: K[this.category.key],
                }),
                this.el
            );
        }
    }
    const Yt = new g(
        ({ classes: i, category: e, pickerId: t, icon: o, i18n: s }) => `
  <section class="${
      i.emojiCategory
  }" role="tabpanel" aria-labelledby="${t}-category-${e.key}">
    <h3 data-category="${e.key}" class="${i.categoryName}">
      <i data-icon="${o}"></i>
      ${s.get(`categories.${e.key}`, e.message || e.key)}
    </h3>
    <div data-view="emojis" data-render="sync"></div>
  </section>
`
    );
    class Qt extends le {
        constructor({ category: e, lazyLoader: t }) {
            super({
                template: Yt,
                showVariants: !1,
                lazyLoader: t,
                category: e,
            });
        }
        initialize() {
            (this.uiElements = { ...this.baseUIElements }), super.initialize();
        }
        async render() {
            return (
                (this.emojiContainer = this.viewFactory.create(z, {
                    emojis: this.customEmojis,
                    showVariants: this.showVariants,
                    lazyLoader: this.lazyLoader,
                    category: this.category.key,
                })),
                super.render({
                    category: this.category,
                    emojis: this.emojiContainer,
                    emojiCount: this.customEmojis.length,
                    icon: K[this.category.key],
                })
            );
        }
    }
    class Ke {
        constructor() {
            this.elements = new Map();
        }
        lazyLoad(e, t) {
            return this.elements.set(e, t), e;
        }
        observe(e) {
            if (window.IntersectionObserver) {
                const t = new IntersectionObserver(
                    (o) => {
                        o.filter((s) => s.intersectionRatio > 0)
                            .map((s) => s.target)
                            .forEach((s) => {
                                const r = this.elements.get(s);
                                r == null || r(), t.unobserve(s);
                            });
                    },
                    { root: e }
                );
                this.elements.forEach((o, s) => {
                    t.observe(s);
                });
            } else
                this.elements.forEach((t) => {
                    t();
                });
        }
    }
    const Ue = y("emojiArea"),
        Xt = new g(
            ({ classes: i }) => `
  <div class="${i.emojiArea}">
    <div data-placeholder="emojis"></div>
  </div>
`,
            { mode: "async" }
        ),
        ei = { recents: Zt, custom: Qt };
    function ti(i) {
        return ei[i.key] || Wt;
    }
    function ii(i) {
        return !i || i === "button" ? { row: "first", offset: 0 } : i;
    }
    class oi extends l {
        constructor({ categoryTabs: e, categories: t, emojiVersion: o }) {
            super({ template: Xt, classes: Ue }),
                (this.selectedCategory = 0),
                (this.scrollListenerState = "active"),
                (this.lazyLoader = new Ke()),
                (this.categoryTabs = e),
                (this.categories = t),
                (this.emojiVersion = o),
                (this.handleScroll = ke(this.handleScroll.bind(this), 100));
        }
        initialize() {
            (this.appEvents = {
                "category:select": this.handleCategorySelect,
                "category:previous": this.focusPreviousCategory,
                "category:next": this.focusNextCategory,
                "focus:change": this.updateFocusedCategory,
            }),
                (this.uiElements = { emojis: l.byClass(Ue.emojiArea) }),
                (this.uiEvents = [l.uiEvent("scroll", this.handleScroll)]),
                super.initialize();
        }
        get focusableEmoji() {
            return this.el.querySelector('[tabindex="0"]');
        }
        async render() {
            this.emojiCategories = this.categories.map(
                this.createCategory,
                this
            );
            const e = {};
            return (
                this.categories.forEach((t, o) => {
                    e[`emojis-${t.key}`] = this.emojiCategories[o];
                }),
                await super.render({
                    emojis: await Promise.all(
                        this.emojiCategories.map((t) => t.render())
                    ),
                }),
                this.lazyLoader.observe(this.el),
                this.el
            );
        }
        destroy() {
            super.destroy(),
                this.emojiCategories.forEach((e) => {
                    var t;
                    (t = this.observer) == null || t.unobserve(e.el),
                        e.destroy();
                });
        }
        handleCategorySelect(e, t) {
            (this.el.style.overflow = "hidden"),
                this.selectCategory(e, t),
                (this.el.style.overflow = "auto");
        }
        createCategory(e) {
            const t = ti(e);
            return this.viewFactory.create(t, {
                category: e,
                showVariants: !0,
                lazyLoader: this.lazyLoader,
                emojiVersion: this.emojiVersion,
                provider: this.options.recentsProvider,
            });
        }
        determineInitialCategory() {
            var e;
            return this.options.initialCategory &&
                this.categories.find(
                    (t) => t.key === this.options.initialCategory
                )
                ? this.options.initialCategory
                : (e = this.categories.find((t) => t.key !== "recents")) == null
                ? void 0
                : e.key;
        }
        determineFocusTarget(e) {
            const t = this.emojiCategories.find((o) => o.category.key === e);
            return this.options.initialEmoji &&
                (t == null
                    ? void 0
                    : t.el.querySelector(
                          `[data-emoji="${this.options.initialEmoji}"]`
                      ))
                ? this.options.initialEmoji
                : "button";
        }
        reset(e = !0) {
            this.events.emit("preview:hide");
            const t = this.determineInitialCategory();
            t &&
                (this.selectCategory(t, {
                    focus: this.determineFocusTarget(t),
                    performFocus: e,
                    scroll: "jump",
                }),
                (this.selectedCategory = this.getCategoryIndex(t)));
        }
        getCategoryIndex(e) {
            return this.categories.findIndex((t) => t.key === e);
        }
        focusPreviousCategory(e) {
            this.selectedCategory > 0 &&
                this.focusCategory(this.selectedCategory - 1, {
                    row: "last",
                    offset: e != null ? e : this.options.emojisPerRow,
                });
        }
        focusNextCategory(e) {
            this.selectedCategory < this.categories.length - 1 &&
                this.focusCategory(this.selectedCategory + 1, {
                    row: "first",
                    offset: e != null ? e : 0,
                });
        }
        focusCategory(e, t) {
            this.selectCategory(e, { focus: t, performFocus: !0 });
        }
        async selectCategory(e, t = {}) {
            var h;
            this.scrollListenerState = "suspend";
            const {
                focus: o,
                performFocus: s,
                scroll: r,
            } = { performFocus: !1, ...t };
            this.emojiCategories[this.selectedCategory].setActive(!1);
            const a = (this.selectedCategory =
                typeof e == "number" ? e : this.getCategoryIndex(e));
            (h = this.categoryTabs) == null ||
                h.setActiveTab(this.selectedCategory, {
                    performFocus: s,
                    scroll: o === "button",
                });
            const c = this.emojiCategories[a].el.offsetTop;
            this.emojiCategories[a].setActive(!0, ii(o), o !== "button" && s),
                r && (this.el.scrollTop = c),
                (this.scrollListenerState = "resume");
        }
        updateFocusedCategory(e) {
            var t;
            this.categories[this.selectedCategory].key !== e &&
                ((this.scrollListenerState = "suspend"),
                (this.selectedCategory = this.getCategoryIndex(e)),
                (t = this.categoryTabs) == null ||
                    t.setActiveTab(this.selectedCategory, {
                        changeFocusable: !1,
                        performFocus: !1,
                    }),
                (this.scrollListenerState = "resume"));
        }
        handleScroll() {
            if (this.scrollListenerState === "suspend" || !this.categoryTabs)
                return;
            if (this.scrollListenerState === "resume") {
                this.scrollListenerState = "active";
                return;
            }
            const e = this.el.scrollTop,
                t = this.el.scrollHeight - this.el.offsetHeight,
                o = this.emojiCategories.findIndex((r, a) => {
                    var c;
                    return (
                        e <
                        ((c = this.emojiCategories[a + 1]) == null
                            ? void 0
                            : c.el.offsetTop)
                    );
                }),
                s = { changeFocusable: !1, performFocus: !1, scroll: !1 };
            e === 0
                ? this.categoryTabs.setActiveTab(0, s)
                : Math.floor(e) === Math.floor(t) || o < 0
                ? this.categoryTabs.setActiveTab(this.categories.length - 1, s)
                : this.categoryTabs.setActiveTab(o, s);
        }
    }
    const si = new g(
            ({ classList: i, classes: e, icon: t, message: o }) => `
<div class="${i}" role="alert">
  <div class="${e.iconContainer}"><i data-size="10x" data-icon="${t}"></i></div>
  <h3 class="${e.title}">${o}</h3>
</div>
`
        ),
        qe = y("error", "iconContainer", "title");
    class he extends l {
        constructor({
            message: e,
            icon: t = "warning",
            template: o = si,
            className: s,
        }) {
            super({ template: o, classes: qe }),
                (this.message = e),
                (this.icon = t),
                (this.className = s);
        }
        renderSync() {
            const e = [qe.error, this.className].join(" ").trim();
            return super.renderSync({
                message: this.message,
                icon: this.icon,
                classList: e,
            });
        }
    }
    const ri = new g(
            ({ classList: i, classes: e, icon: t, i18n: o, message: s }) => `
  <div class="${i}" role="alert">
    <div class="${e.icon}"><i data-size="10x" data-icon="${t}"></i></div>
    <h3 class="${e.title}">${s}</h3>
    <button type="button">${o.get("retry")}</button>
  </div>
`
        ),
        ai = y("dataError");
    class ni extends he {
        constructor({ message: e }) {
            super({ message: e, template: ri, className: ai.dataError });
        }
        initialize() {
            (this.uiElements = { retryButton: "button" }),
                (this.uiEvents = [
                    l.childEvent("retryButton", "click", this.onRetry),
                ]),
                super.initialize();
        }
        async onRetry() {
            this.emojiData
                ? await this.emojiData.delete()
                : await this.options.dataStore.deleteDatabase(
                      this.options.locale
                  ),
                this.events.emit("reinitialize");
            const e = await ie(
                this.options.locale,
                this.options.dataStore,
                this.options.messages,
                this.options.emojiData,
                this.emojiData
            );
            this.viewFactory.setEmojiData(e), this.events.emit("data:ready", e);
        }
    }
    const L = y("preview", "previewEmoji", "previewName", "tagList", "tag"),
        ci = new g(
            ({ classes: i, tag: e }) => `
  <li class="${i.tag}">${e}</li>
`
        ),
        li = new g(
            ({ classes: i }) => `
  <div class="${i.preview}">
    <div class="${i.previewEmoji}"></div>
    <div class="${i.previewName}"></div>
    <ul class="${i.tagList}"></ul>
  </div>
`
        );
    class hi extends l {
        constructor() {
            super({ template: li, classes: L });
        }
        initialize() {
            (this.uiElements = {
                emoji: l.byClass(L.previewEmoji),
                name: l.byClass(L.previewName),
                tagList: l.byClass(L.tagList),
            }),
                (this.appEvents = {
                    "preview:show": this.showPreview,
                    "preview:hide": this.hidePreview,
                }),
                super.initialize();
        }
        showPreview(e, t) {
            if (
                (j(this.ui.emoji, t),
                (this.ui.name.textContent = e.label),
                e.tags)
            ) {
                this.ui.tagList.style.display = "flex";
                const o = e.tags.map((s) =>
                    ci.renderSync({ tag: s, classes: L })
                );
                j(this.ui.tagList, ...o);
            }
        }
        hidePreview() {
            F(this.ui.emoji), F(this.ui.name), F(this.ui.tagList);
        }
    }
    const di = new g(
            ({ classes: i, i18n: e }) => `
  <button title="${e.get("search.clear")}" class="${i.clearSearchButton}">
    <i data-icon="xmark"></i>
  </button>
`
        ),
        mi = new g(
            ({ classes: i, i18n: e }) => `
<div class="${i.searchContainer}">
  <input class="${i.searchField}" placeholder="${e.get("search")}">
  <span class="${i.searchAccessory}"></span>
</div>
`,
            { mode: "async" }
        ),
        $ = y(
            "searchContainer",
            "searchField",
            "clearButton",
            "searchAccessory",
            "clearSearchButton",
            "notFound"
        );
    class ui extends l {
        constructor({ categories: e, emojiVersion: t }) {
            super({ template: mi, classes: $ }),
                (this.categories = e.filter((o) => o.key !== "recents")),
                (this.emojiVersion = t),
                (this.search = Ee(this.search.bind(this), 100));
        }
        initialize() {
            (this.uiElements = {
                searchField: l.byClass($.searchField),
                searchAccessory: l.byClass($.searchAccessory),
            }),
                (this.uiEvents = [
                    l.childEvent("searchField", "keydown", this.onKeyDown),
                    l.childEvent("searchField", "input", this.onSearchInput),
                ]),
                super.initialize();
        }
        async render() {
            return (
                await super.render(),
                (this.searchIcon = Te("search")),
                (this.notFoundMessage = this.viewFactory.create(he, {
                    message: this.i18n.get("search.notFound"),
                    className: $.notFound,
                    icon: "sad",
                })),
                this.notFoundMessage.renderSync(),
                (this.errorMessage = this.viewFactory.create(he, {
                    message: this.i18n.get("search.error"),
                })),
                this.errorMessage.renderSync(),
                (this.clearSearchButton = di.render({
                    classes: $,
                    i18n: this.i18n,
                })),
                this.clearSearchButton.addEventListener("click", (e) =>
                    this.onClearSearch(e)
                ),
                (this.searchField = this.ui.searchField),
                this.showSearchIcon(),
                this.el
            );
        }
        showSearchIcon() {
            this.showSearchAccessory(this.searchIcon);
        }
        showClearSearchButton() {
            this.showSearchAccessory(this.clearSearchButton);
        }
        showSearchAccessory(e) {
            j(this.ui.searchAccessory, e);
        }
        clear() {
            (this.searchField.value = ""), this.showSearchIcon();
        }
        focus() {
            this.searchField.focus();
        }
        onClearSearch(e) {
            var t;
            e.stopPropagation(),
                (this.searchField.value = ""),
                (t = this.resultsContainer) == null || t.destroy(),
                (this.resultsContainer = null),
                this.showSearchIcon(),
                this.events.emit("content:show"),
                this.searchField.focus();
        }
        handleResultsKeydown(e) {
            this.resultsContainer &&
                e.key === "Escape" &&
                this.onClearSearch(e);
        }
        onKeyDown(e) {
            var t;
            e.key === "Escape" && this.searchField.value
                ? this.onClearSearch(e)
                : (e.key === "Enter" || e.key === "ArrowDown") &&
                  this.resultsContainer &&
                  (e.preventDefault(),
                  (t =
                      this.resultsContainer.el.querySelector(
                          '[tabindex="0"]'
                      )) == null || t.focus());
        }
        onSearchInput(e) {
            this.searchField.value
                ? (this.showClearSearchButton(), this.search())
                : this.onClearSearch(e);
        }
        async search() {
            var e;
            if (!!this.searchField.value)
                try {
                    const t = await this.emojiData.searchEmojis(
                        this.searchField.value,
                        this.customEmojis,
                        this.emojiVersion,
                        this.categories
                    );
                    if ((this.events.emit("preview:hide"), t.length)) {
                        const o = new Ke();
                        (this.resultsContainer = this.viewFactory.create(z, {
                            emojis: t,
                            fullHeight: !0,
                            showVariants: !0,
                            lazyLoader: o,
                        })),
                            this.resultsContainer.renderSync(),
                            (e = this.resultsContainer) != null &&
                                e.el &&
                                (o.observe(this.resultsContainer.el),
                                this.resultsContainer.setActive(
                                    !0,
                                    { row: 0, offset: 0 },
                                    !1
                                ),
                                this.resultsContainer.el.addEventListener(
                                    "keydown",
                                    (s) => this.handleResultsKeydown(s)
                                ),
                                this.events.emit(
                                    "content:show",
                                    this.resultsContainer
                                ));
                    } else
                        this.events.emit("content:show", this.notFoundMessage);
                } catch {
                    this.events.emit("content:show", this.errorMessage);
                }
        }
    }
    const pi = new g(
            ({ classes: i }) => `
  <div class="${i.variantOverlay}">
    <div class="${i.variantPopup}">
      <div data-view="emojis" data-render="sync"></div>
    </div>
  </div>
`
        ),
        We = y("variantOverlay", "variantPopup"),
        de = { easing: "ease-in-out", duration: 250, fill: "both" },
        Ge = { opacity: [0, 1] },
        Je = {
            opacity: [0, 1],
            transform: ["scale3d(0.8, 0.8, 0.8)", "scale3d(1, 1, 1)"],
        };
    class gi extends l {
        constructor({ emoji: e, parent: t }) {
            super({ template: pi, classes: We, parent: t }),
                (this.focusedEmojiIndex = 0),
                (this.focusTrap = new $e()),
                (this.animateShow = () =>
                    Promise.all([
                        S(this.el, Ge, de, this.options),
                        S(this.ui.popup, Je, de, this.options),
                    ])),
                (this.emoji = e);
        }
        initialize() {
            (this.uiElements = { popup: l.byClass(We.variantPopup) }),
                (this.uiEvents = [
                    l.uiEvent("click", this.handleClick),
                    l.uiEvent("keydown", this.handleKeydown),
                ]),
                super.initialize();
        }
        animateHide() {
            const e = { ...de, direction: "reverse" };
            return Promise.all([
                S(this.el, Ge, e, this.options),
                S(this.ui.popup, Je, e, this.options),
            ]);
        }
        async hide() {
            await this.animateHide(), this.events.emit("variantPopup:hide");
        }
        handleKeydown(e) {
            e.key === "Escape" && (this.hide(), e.stopPropagation());
        }
        handleClick(e) {
            this.ui.popup.contains(e.target) || this.hide();
        }
        getEmoji(e) {
            return this.renderedEmojis[e];
        }
        setFocusedEmoji(e) {
            const t = this.getEmoji(this.focusedEmojiIndex);
            (t.tabIndex = -1), (this.focusedEmojiIndex = e);
            const o = this.getEmoji(this.focusedEmojiIndex);
            (o.tabIndex = 0), o.focus();
        }
        destroy() {
            this.emojiContainer.destroy(),
                this.focusTrap.deactivate(),
                super.destroy();
        }
        renderSync() {
            const e = { ...this.emoji, skins: null },
                t = (this.emoji.skins || []).map((s) => ({
                    ...s,
                    label: this.emoji.label,
                    tags: this.emoji.tags,
                })),
                o = [e, ...t];
            return (
                (this.emojiContainer = this.viewFactory.create(z, {
                    emojis: o,
                    preview: !1,
                })),
                super.renderSync({ emojis: this.emojiContainer }),
                o.length < this.options.emojisPerRow &&
                    this.el.style.setProperty(
                        "--emojis-per-row",
                        o.length.toString()
                    ),
                this.el
            );
        }
        activate() {
            this.emojiContainer.setActive(!0, { row: 0, offset: 0 }, !0),
                this.focusTrap.activate(this.el);
        }
    }
    const yi = new g(
            ({ classes: i, i18n: e, category: t, pickerId: o, icon: s }) => `
<li class="${i.categoryTab}">
  <button
    aria-selected="false"
    role="tab"
    class="${i.categoryButton}"
    tabindex="-1"
    title="${e.get(`categories.${t.key}`, t.message || t.key)}"
    type="button"
    data-category="${t.key}"
    id="${o}-category-${t.key}"
  >
    <i data-icon="${s}"></i>
</li>
`
        ),
        me = y("categoryTab", "categoryTabActive", "categoryButton");
    class fi extends l {
        constructor({ category: e, icon: t }) {
            super({ template: yi, classes: me }),
                (this.isActive = !1),
                (this.category = e),
                (this.icon = t);
        }
        initialize() {
            (this.uiElements = { button: l.byClass(me.categoryButton) }),
                (this.uiEvents = [
                    l.childEvent("button", "click", this.selectCategory),
                    l.childEvent("button", "focus", this.selectCategory),
                ]),
                super.initialize();
        }
        renderSync() {
            return (
                super.renderSync({ category: this.category, icon: this.icon }),
                (this.ui.button.ariaSelected = "false"),
                this.el
            );
        }
        setActive(e, t = {}) {
            const {
                changeFocusable: o,
                performFocus: s,
                scroll: r,
            } = { changeFocusable: !0, performFocus: !0, scroll: !0, ...t };
            this.el.classList.toggle(me.categoryTabActive, e),
                o &&
                    ((this.ui.button.tabIndex = e ? 0 : -1),
                    (this.ui.button.ariaSelected = e.toString())),
                e &&
                    s &&
                    (this.ui.button.focus(),
                    r &&
                        this.events.emit("category:select", this.category.key, {
                            scroll: "animate",
                            focus: "button",
                            performFocus: !1,
                        })),
                (this.isActive = e);
        }
        selectCategory() {
            this.isActive ||
                this.events.emit("category:select", this.category.key, {
                    scroll: "animate",
                    focus: "button",
                    performFocus: !0,
                });
        }
    }
    const vi = new g(
            ({ classes: i }) => `
  <div class="${i.categoryButtonsContainer}">
    <ul role="tablist" class="${i.categoryButtons}">
      <div data-placeholder="tabs"></div>
    </ul>
  </div>
`
        ),
        wi = y("categoryButtons", "categoryButtonsContainer");
    class bi extends l {
        constructor({ categories: e }) {
            super({ template: vi, classes: wi }),
                (this.activeCategoryIndex = 0),
                (this.categories = e);
        }
        initialize() {
            (this.keyBindings = {
                ArrowLeft: this.stepSelectedTab(-1),
                ArrowRight: this.stepSelectedTab(1),
            }),
                (this.uiEvents = [l.uiEvent("scroll", this.checkOverflow)]),
                super.initialize();
        }
        checkOverflow() {
            const e =
                    Math.abs(
                        this.el.scrollLeft -
                            (this.el.scrollWidth - this.el.offsetWidth)
                    ) > 1,
                t = this.el.scrollLeft > 0;
            (this.el.className = "categoryButtonsContainer"),
                t && e
                    ? this.el.classList.add("has-overflow-both")
                    : t
                    ? this.el.classList.add("has-overflow-left")
                    : e && this.el.classList.add("has-overflow-right");
        }
        renderSync() {
            return (
                (this.tabViews = this.categories.map((e) =>
                    this.viewFactory.create(fi, { category: e, icon: K[e.key] })
                )),
                super.renderSync({
                    tabs: this.tabViews.map((e) => e.renderSync()),
                }),
                this.el
            );
        }
        get currentCategory() {
            return this.categories[this.activeCategoryIndex];
        }
        get currentTabView() {
            return this.tabViews[this.activeCategoryIndex];
        }
        setActiveTab(e, t = {}) {
            this.checkOverflow();
            const o = this.currentTabView,
                s = this.tabViews[e];
            o.setActive(!1, t),
                s.setActive(!0, t),
                (this.activeCategoryIndex = e);
        }
        getTargetCategory(e) {
            return e < 0
                ? this.categories.length - 1
                : e >= this.categories.length
                ? 0
                : e;
        }
        stepSelectedTab(e) {
            return () => {
                const t = this.activeCategoryIndex + e;
                this.setActiveTab(this.getTargetCategory(t), {
                    changeFocusable: !0,
                    performFocus: !0,
                });
            };
        }
    }
    function Oi(i) {}
    const Ci = [
        { version: 15, emoji: String.fromCodePoint(129768) },
        { version: 14, emoji: String.fromCodePoint(128733) },
        { version: 13, emoji: String.fromCodePoint(129729) },
        { version: 12, emoji: String.fromCodePoint(129449) },
        { version: 11, emoji: String.fromCodePoint(129463) },
        { version: 5, emoji: String.fromCodePoint(129322) },
        { version: 4, emoji: String.fromCodePoint(9877) },
        { version: 3, emoji: String.fromCodePoint(129314) },
        { version: 2, emoji: String.fromCodePoint(128488) },
        { version: 1, emoji: String.fromCodePoint(128512) },
    ];
    function ji() {
        var e;
        const i = Ci.find((t) => _i(t.emoji));
        return (e = i == null ? void 0 : i.version) != null ? e : 1;
    }
    function _i(i) {
        const e = document.createElement("canvas").getContext("2d");
        if (e)
            return (
                (e.textBaseline = "top"),
                (e.font = "32px Arial"),
                e.fillText(i, 0, 0),
                e.getImageData(16, 16, 1, 1).data[0] !== 0
            );
    }
    function ue(i, e) {
        return Array.from({ length: i }, () => e).join("");
    }
    function ki({ showHeader: i, classes: e }) {
        return i
            ? `
    <header class="${e.header}">
      <div data-view="search"></div>
      <div data-view="categoryTabs" data-render="sync"></div>
    </header>
  `
            : "";
    }
    function Ei(i) {
        const { classes: e, theme: t, className: o = "" } = i;
        return `
    <div class="picmo__picker ${e.picker} ${t} ${o}">
      ${ki(i)}
      <div class="${e.content}">
        <div data-view="emojiArea"></div>
      </div>
      <div data-view="preview"></div>
    </div>
  `;
    }
    function xi(i) {
        const {
                emojiCount: e,
                classes: t,
                theme: o,
                className: s,
                categoryCount: r,
            } = i,
            a = ({ showSearch: m, classes: d }) =>
                m
                    ? `
    <div class="${d.searchSkeleton}">
      <div class="${d.searchInput} ${d.placeholder}"></div>
    </div>
  `
                    : "",
            c = ({ showCategoryTabs: m, classes: d }) =>
                m
                    ? `
    <div class="${d.categoryTabsSkeleton}">
      ${ue(r, `<div class="${d.placeholder} ${d.categoryTab}"></div>`)}
    </div>
  `
                    : "",
            h = ({ showHeader: m, classes: d }) =>
                m
                    ? `
    <header class="${d.headerSkeleton}">
      ${a(i)}
      ${c(i)}
    </header>
  `
                    : "",
            p = ({ showPreview: m, classes: d }) =>
                m
                    ? `
    <div class="${d.previewSkeleton}">
      <div class="${d.placeholder} ${d.previewEmoji}"></div>
      <div class="${d.placeholder} ${d.previewName}"></div>
      <ul class="${d.tagList}">
        ${ue(3, `<li class="${d.placeholder} ${d.tag}"></li>`)}
      </ul>
    </div>
  `
                    : "";
        return `
    <div class="picmo__picker ${t.skeleton} ${t.picker} ${o} ${s}">
      ${h(i)}
      <div class="${t.contentSkeleton}">
        <div class="${t.placeholder} ${t.categoryName}"></div>
        <div class="${t.emojiGrid}">
          ${ue(e, `<div class="${t.placeholder} ${t.emoji}"></div>`)}
        </div>
      </div>
      ${p(i)}
    </div>
  `;
    }
    const Si = new g((i) => (i.isLoaded ? Ei(i) : xi(i))),
        q = y(
            "picker",
            "skeleton",
            "placeholder",
            "searchSkeleton",
            "searchInput",
            "categoryTabsSkeleton",
            "headerSkeleton",
            "categoryTab",
            "contentSkeleton",
            "categoryName",
            "emojiGrid",
            "emoji",
            "previewSkeleton",
            "previewEmoji",
            "previewName",
            "tagList",
            "tag",
            "overlay",
            "content",
            "fullHeight",
            "pluginContainer",
            "header"
        ),
        W = {
            emojisPerRow: "--emojis-per-row",
            visibleRows: "--row-count",
            emojiSize: "--emoji-size",
        };
    class Ze extends l {
        constructor() {
            super({ template: Si, classes: q }),
                (this.pickerReady = !1),
                (this.externalEvents = new Bt()),
                (this.updaters = {
                    styleProperty: (e) => (t) =>
                        this.el.style.setProperty(W[e], t.toString()),
                    theme: (e) => {
                        const t = this.options.theme,
                            o = this.el.closest(`.${t}`);
                        this.el.classList.remove(t),
                            o == null || o.classList.remove(t),
                            this.el.classList.add(e),
                            o == null || o.classList.add(e);
                    },
                    className: (e) => {
                        this.options.className &&
                            this.el.classList.remove(this.options.className),
                            this.el.classList.add(e);
                    },
                    emojisPerRow: this.updateStyleProperty.bind(
                        this,
                        "emojisPerRow"
                    ),
                    emojiSize: this.updateStyleProperty.bind(this, "emojiSize"),
                    visibleRows: this.updateStyleProperty.bind(
                        this,
                        "visibleRows"
                    ),
                });
        }
        initialize() {
            (this.uiElements = {
                pickerContent: l.byClass(q.content),
                header: l.byClass(q.header),
            }),
                (this.uiEvents = [l.uiEvent("keydown", this.handleKeyDown)]),
                (this.appEvents = {
                    error: this.onError,
                    reinitialize: this.reinitialize,
                    "data:ready": this.onDataReady,
                    "content:show": this.showContent,
                    "variantPopup:hide": this.hideVariantPopup,
                    "emoji:select": this.selectEmoji,
                }),
                super.initialize(),
                this.options.recentsProvider;
        }
        destroy() {
            var e, t;
            super.destroy(),
                (e = this.search) == null || e.destroy(),
                this.emojiArea.destroy(),
                (t = this.categoryTabs) == null || t.destroy(),
                this.events.removeAll(),
                this.externalEvents.removeAll();
        }
        clearRecents() {
            this.options.recentsProvider.clear();
        }
        addEventListener(e, t) {
            this.externalEvents.on(e, t);
        }
        removeEventListener(e, t) {
            this.externalEvents.off(e, t);
        }
        initializePickerView() {
            this.pickerReady && (this.showContent(), this.emojiArea.reset(!1));
        }
        handleKeyDown(e) {
            const t = e.ctrlKey || e.metaKey;
            e.key === "s" &&
                t &&
                this.search &&
                (e.preventDefault(), this.search.focus());
        }
        buildChildViews() {
            return (
                this.options.showPreview &&
                    (this.preview = this.viewFactory.create(hi)),
                this.options.showSearch &&
                    (this.search = this.viewFactory.create(ui, {
                        categories: this.categories,
                        emojiVersion: this.emojiVersion,
                    })),
                this.options.showCategoryTabs &&
                    (this.categoryTabs = this.viewFactory.create(bi, {
                        categories: this.categories,
                    })),
                (this.currentView = this.emojiArea =
                    this.viewFactory.create(oi, {
                        categoryTabs: this.categoryTabs,
                        categories: this.categories,
                        emojiVersion: this.emojiVersion,
                    })),
                [this.preview, this.search, this.emojiArea, this.categoryTabs]
            );
        }
        setStyleProperties() {
            this.options.showSearch ||
                this.el.style.setProperty("--search-height-full", "0px"),
                this.options.showCategoryTabs ||
                    (this.el.style.setProperty("--category-tabs-height", "0px"),
                    this.el.style.setProperty("--category-tabs-offset", "0px")),
                this.options.showPreview ||
                    this.el.style.setProperty(
                        "--emoji-preview-height-full",
                        "0px"
                    ),
                Object.keys(W).forEach((e) => {
                    this.options[e] &&
                        this.el.style.setProperty(
                            W[e],
                            this.options[e].toString()
                        );
                });
        }
        updateStyleProperty(e, t) {
            this.el.style.setProperty(W[e], t.toString());
        }
        reinitialize() {
            this.renderSync();
        }
        onError(e) {
            const t = this.viewFactory.createWithOptions({ data: !1 }, ni, {
                    message: this.i18n.get("error.load"),
                }),
                o = this.el.offsetHeight || 375;
            throw (
                ((this.el.style.height = `${o}px`),
                j(this.el, t.renderSync()),
                e)
            );
        }
        async onDataReady(e) {
            const t = this.el;
            try {
                e ? (this.emojiData = e) : await this.emojiDataPromise,
                    this.options.emojiVersion === "auto"
                        ? (this.emojiVersion = ji() || parseFloat(u))
                        : (this.emojiVersion = this.options.emojiVersion),
                    (this.categories = await this.emojiData.getCategories(
                        this.options
                    ));
                const [o, s, r, a] = this.buildChildViews();
                await super.render({
                    isLoaded: !0,
                    search: s,
                    categoryTabs: a,
                    emojiArea: r,
                    preview: o,
                    showHeader: Boolean(this.search || this.categoryTabs),
                    theme: this.options.theme,
                    className: this.options.className,
                }),
                    this.el.style.setProperty(
                        "--category-count",
                        this.categories.length.toString()
                    ),
                    (this.pickerReady = !0),
                    t.replaceWith(this.el),
                    this.setStyleProperties(),
                    this.initializePickerView(),
                    this.setInitialFocus(),
                    this.externalEvents.emit("data:ready");
            } catch (o) {
                this.events.emit("error", o);
            }
        }
        renderSync() {
            var t;
            let e =
                ((t = this.options.categories) == null ? void 0 : t.length) ||
                10;
            if (
                (this.options.showRecents && (e += 1),
                super.renderSync({
                    isLoaded: !1,
                    theme: this.options.theme,
                    className: this.options.className,
                    showSearch: this.options.showSearch,
                    showPreview: this.options.showPreview,
                    showCategoryTabs: this.options.showCategoryTabs,
                    showHeader:
                        this.options.showSearch ||
                        this.options.showCategoryTabs,
                    emojiCount:
                        this.options.emojisPerRow * this.options.visibleRows,
                    categoryCount: e,
                }),
                this.el.style.setProperty("--category-count", e.toString()),
                !this.options.rootElement)
            )
                throw new Error(
                    "Picker must be given a root element via the rootElement option"
                );
            return (
                j(this.options.rootElement, this.el),
                this.setStyleProperties(),
                this.pickerReady && this.initializePickerView(),
                this.el
            );
        }
        getInitialFocusTarget() {
            if (typeof this.options.autoFocus < "u")
                switch (this.options.autoFocus) {
                    case "emojis":
                        return this.emojiArea.focusableEmoji;
                    case "search":
                        return this.search;
                    case "auto":
                        return this.search || this.emojiArea.focusableEmoji;
                    default:
                        return null;
                }
            if (this.options.autoFocusSearch === !0)
                return (
                    console.warn(
                        "options.autoFocusSearch is deprecated, please use options.focusTarget instead"
                    ),
                    this.search
                );
        }
        setInitialFocus() {
            var e;
            !this.pickerReady ||
                (e = this.getInitialFocusTarget()) == null ||
                e.focus();
        }
        reset(e = !0) {
            var t;
            this.pickerReady &&
                (this.emojiArea.reset(e), this.showContent(this.emojiArea)),
                (t = this.search) == null || t.clear(),
                this.hideVariantPopup();
        }
        showContent(e = this.emojiArea) {
            var t, o;
            e !== this.currentView &&
                (this.currentView !== this.emojiArea &&
                    ((t = this.currentView) == null || t.destroy()),
                this.ui.pickerContent.classList.toggle(
                    q.fullHeight,
                    e !== this.emojiArea
                ),
                j(this.ui.pickerContent, e.el),
                (this.currentView = e),
                e === this.emojiArea
                    ? (this.emojiArea.reset(),
                      this.categoryTabs &&
                          this.ui.header.appendChild(this.categoryTabs.el))
                    : (o = this.categoryTabs) == null || o.el.remove());
        }
        hideVariantPopup() {
            var e;
            (e = this.variantPopup) == null || e.destroy();
        }
        isPickerClick(e) {
            var r, a;
            const t = e.target,
                o = this.el.contains(t),
                s =
                    (a = (r = this.variantPopup) == null ? void 0 : r.el) ==
                    null
                        ? void 0
                        : a.contains(t);
            return o || s;
        }
        async selectEmoji({ emoji: e }) {
            var t, o;
            ((t = e.skins) == null ? void 0 : t.length) &&
            this.options.showVariants &&
            !this.isVariantPopupOpen
                ? this.showVariantPopup(e)
                : (await ((o = this.variantPopup) == null
                      ? void 0
                      : o.animateHide()),
                  this.events.emit("variantPopup:hide"),
                  await this.emitEmoji(e));
        }
        get isVariantPopupOpen() {
            return this.variantPopup && !this.variantPopup.isDestroyed;
        }
        async showVariantPopup(e) {
            const t = document.activeElement;
            this.events.once("variantPopup:hide", () => {
                t == null || t.focus();
            }),
                (this.variantPopup = this.viewFactory.create(gi, {
                    emoji: e,
                    parent: this.el,
                })),
                this.el.appendChild(this.variantPopup.renderSync()),
                this.variantPopup.activate();
        }
        async emitEmoji(e) {
            this.externalEvents.emit(
                "emoji:select",
                await this.renderer.doEmit(e)
            ),
                this.options.recentsProvider.addOrUpdateRecent(
                    e,
                    this.options.maxRecents
                ),
                this.events.emit("recent:add", e);
        }
        updateOptions(e) {
            Object.keys(e).forEach((t) => {
                this.updaters[t](e[t]);
            }),
                Object.assign(this.options, e);
        }
    }
    class Fi {
        constructor({
            events: e,
            i18n: t,
            renderer: o,
            emojiData: s,
            options: r,
            customEmojis: a = [],
            pickerId: c,
        }) {
            (this.events = e),
                (this.i18n = t),
                (this.renderer = o),
                (this.emojiData = s),
                (this.options = r),
                (this.customEmojis = a),
                (this.pickerId = c);
        }
        setEmojiData(e) {
            this.emojiData = Promise.resolve(e);
        }
        createWithOptions(e = {}, t, ...o) {
            const s = new t(...o);
            return (
                s.setPickerId(this.pickerId),
                s.setEvents(this.events),
                s.setI18n(this.i18n),
                s.setRenderer(this.renderer),
                e.data !== !1 && s.setEmojiData(this.emojiData),
                s.setOptions(this.options),
                s.setCustomEmojis(this.customEmojis),
                (s.viewFactory = this),
                s.initialize(),
                s
            );
        }
        create(e, ...t) {
            return this.createWithOptions({}, e, ...t);
        }
    }
    class Pi {
        constructor(e = {}) {
            b(this, V, void 0);
            J(this, V, new Map(Object.entries(e)));
        }
        get(e, t = e) {
            return w(this, V).get(e) || t;
        }
    }
    V = new WeakMap();
    function zi(i, e) {
        e === void 0 && (e = {});
        var t = e.insertAt;
        if (!(!i || typeof document > "u")) {
            var o = document.head || document.getElementsByTagName("head")[0],
                s = document.createElement("style");
            (s.type = "text/css"),
                t === "top" && o.firstChild
                    ? o.insertBefore(s, o.firstChild)
                    : o.appendChild(s),
                s.styleSheet
                    ? (s.styleSheet.cssText = i)
                    : s.appendChild(document.createTextNode(i));
        }
    }
    function Ye() {
        let i = !1;
        return function (t) {
            Oe.injectStyles && !i && (zi(t), (i = !0));
        };
    }
    const Li = `.picmo__picker .picmo__icon{width:1.25em;height:1em;fill:currentColor}.picmo__icon-small{font-size:.8em}.picmo__icon-medium{font-size:1em}.picmo__icon-large{font-size:1.25em}.picmo__icon-2x{font-size:2em}.picmo__icon-3x{font-size:3em}.picmo__icon-4x{font-size:4em}.picmo__icon-5x{font-size:5em}.picmo__icon-8x{font-size:8em}.picmo__icon-10x{font-size:10em}.picmo__light,.picmo__auto{color-scheme:light;--accent-color: #4f46e5;--background-color: #f9fafb;--border-color: #cccccc;--category-name-background-color: #f9fafb;--category-name-button-color: #999999;--category-name-text-color: hsl(214, 30%, 50%);--category-tab-active-background-color: rgba(255, 255, 255, .6);--category-tab-active-color: var(--accent-color);--category-tab-color: #666;--category-tab-highlight-background-color: rgba(0, 0, 0, .15);--error-color-dark: hsl(0, 100%, 45%);--error-color: hsl(0, 100%, 40%);--focus-indicator-background-color: hsl(198, 65%, 85%);--focus-indicator-color: #333333;--hover-background-color: #c7d2fe;--placeholder-background-color: #cccccc;--search-background-color: #f9fafb;--search-focus-background-color: #ffffff;--search-icon-color: #999999;--search-placeholder-color: #71717a;--secondary-background-color: #e2e8f0;--secondary-text-color: #666666;--tag-background-color: rgba(162, 190, 245, .3);--text-color: #000000;--variant-popup-background-color: #ffffff}.picmo__dark{color-scheme:dark;--accent-color: #A580F9;--background-color: #333333;--border-color: #666666;--category-name-background-color: #333333;--category-name-button-color: #eeeeee;--category-name-text-color: #ffffff;--category-tab-active-background-color: #000000;--category-tab-active-color: var(--accent-color);--category-tab-color: #cccccc;--category-tab-highlight-background-color: #4A4A4A;--error-color-dark: hsl(0, 7%, 3%);--error-color: hsl(0, 30%, 60%);--focus-indicator-background-color: hsl(0, 0%, 50%);--focus-indicator-color: #999999;--hover-background-color: hsla(0, 0%, 40%, .85);--image-placeholder-color: #ffffff;--placeholder-background-color: #666666;--search-background-color: #71717a;--search-focus-background-color: #52525b;--search-icon-color: #cccccc;--search-placeholder-color: #d4d4d8;--secondary-background-color: #000000;--secondary-text-color: #999999;--tag-background-color: rgba(162, 190, 245, .3);--text-color: #ffffff;--variant-popup-background-color: #333333}@media (prefers-color-scheme: dark){.picmo__auto{color-scheme:dark;--accent-color: #A580F9;--background-color: #333333;--border-color: #666666;--category-name-background-color: #333333;--category-name-button-color: #eeeeee;--category-name-text-color: #ffffff;--category-tab-active-background-color: #000000;--category-tab-active-color: var(--accent-color);--category-tab-color: #cccccc;--category-tab-highlight-background-color: #4A4A4A;--error-color-dark: hsl(0, 7%, 3%);--error-color: hsl(0, 30%, 60%);--focus-indicator-background-color: hsl(0, 0%, 50%);--focus-indicator-color: #999999;--hover-background-color: hsla(0, 0%, 40%, .85);--image-placeholder-color: #ffffff;--placeholder-background-color: #666666;--search-background-color: #71717a;--search-focus-background-color: #52525b;--search-icon-color: #cccccc;--search-placeholder-color: #d4d4d8;--secondary-background-color: #000000;--secondary-text-color: #999999;--tag-background-color: rgba(162, 190, 245, .3);--text-color: #ffffff;--variant-popup-background-color: #333333}}.picmo__picker .picmo__categoryButtonsContainer{overflow:auto;padding:2px 0}.picmo__picker .picmo__categoryButtonsContainer.picmo__has-overflow-right{mask-image:linear-gradient(270deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 10%);-webkit-mask-image:linear-gradient(270deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 10%)}.picmo__picker .picmo__categoryButtonsContainer.picmo__has-overflow-left{mask-image:linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 10%);-webkit-mask-image:linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 10%)}.picmo__picker .picmo__categoryButtonsContainer.picmo__has-overflow-both{mask-image:linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 10%,rgba(255,255,255,1) 90%,rgba(255,255,255,0) 100%);-webkit-mask-image:linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 10%,rgba(255,255,255,1) 90%,rgba(255,255,255,0) 100%)}.picmo__picker .picmo__categoryButtons{display:flex;flex-direction:row;gap:var(--tab-gap);margin:0;padding:0 .5em;align-items:center;height:var(--category-tabs-height);box-sizing:border-box;width:100%;justify-content:space-between;position:relative;list-style-type:none;justify-self:center;max-width:min(23.55rem,calc(var(--category-count, 1) * 2.5rem))}.picmo__picker .picmo__categoryButtons .picmo__categoryTab{display:flex;align-items:center;transition:all .1s;width:2em}.picmo__picker .picmo__categoryButtons .picmo__categoryTab.picmo__categoryTabActive .picmo__categoryButton{color:var(--category-tab-active-color);background:linear-gradient(rgba(255,255,255,.75) 0%,rgba(255,255,255,.75) 100%),linear-gradient(var(--category-tab-active-color) 0%,var(--category-tab-active-color) 100%);border:2px solid var(--category-tab-active-color)}.picmo__picker .picmo__categoryButtons .picmo__categoryTab.picmo__categoryTabActive .picmo__categoryButton:hover{background-color:var(--category-tab-active-background-color)}.picmo__picker .picmo__categoryButtons .picmo__categoryTab button.picmo__categoryButton{border-radius:5px;background:transparent;border:2px solid transparent;color:var(--category-tab-color);cursor:pointer;padding:2px;vertical-align:middle;display:flex;align-items:center;justify-content:center;font-size:1.2rem;width:1.6em;height:1.6em;transition:all .1s}.picmo__picker .picmo__categoryButtons .picmo__categoryTab button.picmo__categoryButton:is(img){width:var(--category-tab-size);height:var(--category-tab-size)}.picmo__picker .picmo__categoryButtons .picmo__categoryTab button.picmo__categoryButton:hover{background:var(--category-tab-highlight-background-color)}.picmo__dataError [data-icon]{opacity:.8}@keyframes appear{0%{opacity:0}to{opacity:.8}}@keyframes appear-grow{0%{opacity:0;transform:scale(.8)}to{opacity:.8;transform:scale(1)}}.picmo__picker .picmo__error{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:var(--secondary-text-color)}.picmo__picker .picmo__error .picmo__iconContainer{opacity:.8;animation:appear-grow .25s cubic-bezier(.175,.885,.32,1.275);--color-primary: var(--error-color);--color-secondary: var(--error-color-dark)}.picmo__picker .picmo__error .picmo__title{animation:appear .25s;animation-delay:50ms;animation-fill-mode:both}.picmo__picker .picmo__error button{padding:8px 16px;cursor:pointer;background:var(--background-color);border:1px solid var(--text-color);border-radius:5px;color:var(--text-color)}.picmo__picker .picmo__error button:hover{background:var(--text-color);color:var(--background-color)}.picmo__emojiButton{background:transparent;border:none;border-radius:15px;cursor:pointer;display:flex;font-family:var(--emoji-font);font-size:var(--emoji-size);height:100%;justify-content:center;align-items:center;margin:0;overflow:hidden;padding:0;width:100%}.picmo__emojiButton:hover{background:var(--hover-background-color)}.picmo__emojiButton:focus{border-radius:0;background:var(--focus-indicator-background-color);outline:1px solid var(--focus-indicator-color)}.picmo__picker .picmo__emojiArea{height:var(--emoji-area-height);overflow-y:auto;position:relative}.picmo__picker .picmo__emojiCategory{position:relative}.picmo__picker .picmo__emojiCategory .picmo__categoryName{font-size:.9em;padding:.5rem;margin:0;background:var(--category-name-background-color);color:var(--category-name-text-color);top:0;z-index:1;display:grid;gap:4px;grid-template-columns:auto 1fr auto;align-items:center;line-height:1;box-sizing:border-box;height:var(--category-name-height);justify-content:flex-start;text-transform:uppercase}.picmo__picker .picmo__emojiCategory .picmo__categoryName button{background:transparent;border:none;display:flex;align-items:center;cursor:pointer;color:var(--category-name-button-color)}.picmo__picker .picmo__emojiCategory .picmo__categoryName button:hover{opacity:1}.picmo__picker .picmo__emojiCategory .picmo__noRecents{color:var(--secondary-text-color);grid-column:1 / span var(--emojis-per-row);font-size:.9em;text-align:center;display:flex;align-items:center;justify-content:center;min-height:calc(var(--emoji-size) * var(--emoji-size-multiplier))}.picmo__picker .picmo__emojiCategory .picmo__recentEmojis[data-empty=true]{display:none}:is(.picmo__picker .picmo__emojiCategory) .picmo__recentEmojis[data-empty=false]+div{display:none}.picmo__picker .picmo__emojiContainer{display:grid;justify-content:space-between;gap:1px;padding:0 .5em;grid-template-columns:repeat(var(--emojis-per-row),calc(var(--emoji-size) * var(--emoji-size-multiplier)));grid-auto-rows:calc(var(--emoji-size) * var(--emoji-size-multiplier));align-items:center;justify-items:center}.picmo__picker.picmo__picker{--border-radius: 5px;--emoji-area-height: calc( (var(--row-count) * var(--emoji-size) * var(--emoji-size-multiplier)) + var(--category-name-height) );--content-height: var(--emoji-area-height);--emojis-per-row: 8;--row-count: 6;--emoji-preview-margin: 4px;--emoji-preview-height: calc(var(--emoji-preview-size) + 1em + 1px);--emoji-preview-height-full: calc(var(--emoji-preview-height) + var(--emoji-preview-margin));--emoji-preview-size: 2.75em;--emoji-size: 2rem;--emoji-size-multiplier: 1.3;--content-margin: 8px;--category-tabs-height:calc(1.5em + 9px);--category-tabs-offset: 8px;--category-tab-size: 1.2rem;--category-name-height: 2rem;--category-name-padding-y: 6px;--search-height: 2em;--search-margin: .5em;--search-margin-bottom: 4px;--search-height-full: calc(var(--search-height) + var(--search-margin) + var(--search-margin-bottom));--overlay-background-color: rgba(0, 0, 0, .8);--emoji-font: "Segoe UI Emoji", "Segoe UI Symbol", "Segoe UI", "Apple Color Emoji", "Twemoji Mozilla", "Noto Color Emoji", "EmojiOne Color", "Android Emoji";--ui-font: -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;--ui-font-size: 16px;--picker-width: calc(var(--emojis-per-row) * var(--emoji-size) * var(--emoji-size-multiplier) + 2.75rem);--preview-background-color: var(--secondary-background-color);background:var(--background-color);border-radius:var(--border-radius);border:1px solid var(--border-color);font-family:var(--ui-font);font-size:var(--ui-font-size);overflow:hidden;position:relative;width:var(--picker-width);display:grid;gap:8px}.picmo__picker.picmo__picker>*{font-family:var(--ui-font)}.picmo__picker.picmo__skeleton{background:var(--background-color);border-radius:var(--border-radius);border:1px solid var(--border-color);font-family:var(--ui-font);width:var(--picker-width);color:var(--secondary-text-color)}.picmo__picker.picmo__skeleton *{box-sizing:border-box}.picmo__picker.picmo__skeleton .picmo__placeholder{background:var(--placeholder-background-color);position:relative;overflow:hidden}.picmo__picker.picmo__skeleton .picmo__placeholder:after{position:absolute;top:0;right:0;bottom:0;left:0;transform:translate(-100%);background-image:linear-gradient(90deg,rgba(255,255,255,0) 0,rgba(255,255,255,.2) 20%,rgba(255,255,255,.5) 60%,rgba(255,255,255,0) 100%);animation:shine 2s infinite;content:""}.picmo__picker.picmo__skeleton .picmo__headerSkeleton{background-color:var(--secondary-background-color);padding-top:8px;padding-bottom:8px;display:flex;flex-direction:column;overflow:hidden;gap:8px;border-bottom:1px solid var(--border-color);width:var(--picker-width)}.picmo__picker.picmo__skeleton .picmo__searchSkeleton{padding:0 8px;height:var(--search-height)}.picmo__picker.picmo__skeleton .picmo__searchSkeleton .picmo__searchInput{width:100%;height:28px;border-radius:3px}.picmo__picker.picmo__skeleton .picmo__categoryTabsSkeleton{height:var(--category-tabs-height);display:flex;flex-direction:row;align-items:center;justify-self:center;width:calc(2rem * var(--category-count, 1))}.picmo__picker.picmo__skeleton .picmo__categoryTabsSkeleton .picmo__categoryTab{width:25px;height:25px;padding:2px;border-radius:5px;margin:.25em}.picmo__picker.picmo__skeleton .picmo__contentSkeleton{height:var(--content-height);padding-right:8px;opacity:.7}.picmo__picker.picmo__skeleton .picmo__contentSkeleton .picmo__categoryName{width:50%;height:1rem;margin:.5rem;box-sizing:border-box}.picmo__picker.picmo__skeleton .picmo__contentSkeleton .picmo__emojiGrid{display:grid;justify-content:space-between;gap:1px;padding:0 .5em;grid-template-columns:repeat(var(--emojis-per-row),calc(var(--emoji-size) * var(--emoji-size-multiplier)));grid-auto-rows:calc(var(--emoji-size) * var(--emoji-size-multiplier));align-items:center;justify-items:center;width:var(--picker-width)}.picmo__picker.picmo__skeleton .picmo__contentSkeleton .picmo__emojiGrid .picmo__emoji{width:var(--emoji-size);height:var(--emoji-size);border-radius:50%}.picmo__picker.picmo__skeleton .picmo__previewSkeleton{height:var(--emoji-preview-height);border-top:1px solid var(--border-color);display:grid;align-items:center;padding:.5em;gap:6px;grid-template-columns:auto 1fr;grid-template-rows:auto 1fr;grid-template-areas:"emoji name" "emoji tags"}.picmo__picker.picmo__skeleton .picmo__previewSkeleton .picmo__previewEmoji{grid-area:emoji;border-radius:50%;width:var(--emoji-preview-size);height:var(--emoji-preview-size)}.picmo__picker.picmo__skeleton .picmo__previewSkeleton .picmo__previewName{grid-area:name;height:.8em;width:80%}.picmo__picker.picmo__skeleton .picmo__previewSkeleton .picmo__tagList{grid-area:tags;list-style-type:none;display:flex;flex-direction:row;padding:0;margin:0}.picmo__picker.picmo__skeleton .picmo__previewSkeleton .picmo__tagList .picmo__tag{border-radius:3px;padding:2px 8px;margin-right:.25em;height:1em;width:20%}.picmo__overlay{background:rgba(0,0,0,.75);height:100%;left:0;position:fixed;top:0;width:100%;z-index:1000}.picmo__content{position:relative;overflow:hidden;height:var(--content-height)}.picmo__content.picmo__fullHeight{height:calc(var(--content-height) + var(--category-tabs-height) + var(--category-tabs-offset));overflow-y:auto}.picmo__pluginContainer{margin:.5em;display:flex;flex-direction:row}.picmo__header{background-color:var(--secondary-background-color);padding-top:8px;padding-bottom:8px;display:grid;gap:8px;border-bottom:1px solid var(--border-color)}@media (prefers-reduced-motion: reduce){.picmo__placeholder{background:var(--placeholder-background-color);position:relative;overflow:hidden}.picmo__placeholder:after{display:none}}.picmo__picker .picmo__preview{border-top:1px solid var(--border-color);display:grid;align-items:center;gap:6px;grid-template-columns:auto 1fr;grid-template-rows:auto 1fr;grid-template-areas:"emoji name" "emoji tags";height:var(--emoji-preview-height);box-sizing:border-box;padding:.5em;position:relative;background:var(--preview-background-color)}.picmo__picker .picmo__preview .picmo__previewEmoji{grid-area:emoji;font-size:var(--emoji-preview-size);font-family:var(--emoji-font);width:1.25em;display:flex;align-items:center;justify-content:center}.picmo__picker .picmo__preview .picmo__previewName{grid-area:name;color:var(--text-color);font-size:.8em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:500}.picmo__picker .picmo__preview .picmo__tagList{grid-area:tags;list-style-type:none;display:flex;flex-direction:row;padding:0;margin:0;font-size:.75em;overflow:hidden}.picmo__picker .picmo__preview .picmo__tag{border-radius:3px;background:var(--tag-background-color);color:var(--text-color);padding:2px 8px;margin-right:.25em;white-space:nowrap}.picmo__picker .picmo__preview .picmo__tag:last-child{margin-right:0}.picmo__picker .picmo__searchContainer{display:flex;height:var(--search-height);box-sizing:border-box;padding:0 8px;position:relative}.picmo__picker .picmo__searchContainer .picmo__searchField{background:var(--search-background-color);border-radius:3px;border:none;box-sizing:border-box;color:var(--text-color);font-size:.9em;outline:none;padding:.5em 2.25em .5em .5em;width:100%}.picmo__picker .picmo__searchContainer .picmo__searchField:focus{background:var(--search-focus-background-color)}.picmo__picker .picmo__searchContainer .picmo__searchField::placeholder{color:var(--search-placeholder-color)}.picmo__picker .picmo__searchContainer .picmo__searchAccessory{color:var(--search-icon-color);height:100%;position:absolute;right:1em;top:0;width:1.25rem;display:flex;align-items:center}.picmo__picker .picmo__searchContainer .picmo__searchAccessory svg{fill:var(--search-icon-color)}.picmo__picker .picmo__searchContainer .picmo__clearButton{border:0;color:var(--search-icon-color);background:transparent;cursor:pointer}.picmo__picker .picmo__searchContainer .picmo__clearSearchButton{cursor:pointer;border:none;background:transparent;color:var(--search-icon-color);font-size:1em;width:100%;height:100%;display:flex;align-items:center;padding:0}.picmo__picker .picmo__searchContainer .picmo__notFound [data-icon]{fill:#f3e265}.picmo__picker .picmo__variantOverlay{background:var(--overlay-background-color);border-radius:5px;display:flex;flex-direction:column;height:100%;justify-content:center;left:0;position:absolute;top:0;width:100%;z-index:1}.picmo__picker .picmo__variantOverlay .picmo__variantPopup{background:var(--variant-popup-background-color);border-radius:5px;margin:.5em;padding:.5em;text-align:center;user-select:none;display:flex;align-items:center;justify-content:center}.picmo__customEmoji{width:1em;height:1em}@keyframes shine{to{transform:translate(100%)}}.picmo__picker .picmo__imagePlaceholder{width:2rem;height:2rem;border-radius:50%}.picmo__placeholder{background:#DDDBDD;position:relative}.picmo__placeholder:after{position:absolute;top:0;right:0;bottom:0;left:0;transform:translate(-100%);background-image:linear-gradient(90deg,rgba(255,255,255,0) 0,rgba(255,255,255,.2) 20%,rgba(255,255,255,.5) 60%,rgba(255,255,255,0) 100%);animation:shine 2s infinite;content:""}
`;
    function $i(i) {
        return ie(i.locale, i.dataStore, i.messages, i.emojiData);
    }
    let Ai = 0,
        G;
    function Ii() {
        return `picmo-${Date.now()}-${Ai++}`;
    }
    const Ti = Ye();
    function Ri(i) {
        Ti(Li);
        const e = Ne(i),
            t = ((e == null ? void 0 : e.custom) || []).map((c) => ({
                ...c,
                custom: !0,
                tags: ["custom", ...(c.tags || [])],
            })),
            o = new Dt();
        G || (G = $i(e));
        const s = new Pi(e.i18n);
        G.then((c) => {
            o.emit("data:ready", c);
        }).catch((c) => {
            o.emit("error", c);
        });
        const a = new Fi({
            events: o,
            i18n: s,
            customEmojis: t,
            renderer: e.renderer,
            options: e,
            emojiData: G,
            pickerId: Ii(),
        }).create(Ze);
        return a.renderSync(), a;
    }
    const Mi = Object.freeze(
        Object.defineProperty(
            {
                __proto__: null,
                de: {
                    "categories.activities": "Aktivit\xE4ten",
                    "categories.animals-nature": "Tiere & Natur",
                    "categories.custom": "Benutzerdefiniert",
                    "categories.flags": "Flaggen",
                    "categories.food-drink": "Essen & Trinken",
                    "categories.objects": "Gegenst\xE4nde",
                    "categories.people-body": "Mensch & K\xF6rper",
                    "categories.recents": "Zuletzt genutzt",
                    "categories.smileys-emotion": "Smileys & Emotionen",
                    "categories.symbols": "Symbole",
                    "categories.travel-places": "Reisen & Orte",
                    "error.load": "Emojis wurden nicht geladen",
                    "recents.clear": "Zuletzt genutzte Emojis l\xF6schen",
                    "recents.none": "Kein Emoji ausgew\xE4hlt.",
                    retry: "Erneut versuchen",
                    "search.clear": "Suche l\xF6schen",
                    "search.error": "Suche erfolglos",
                    "search.notFound": "Kein Emoji gefunden",
                    search: "Emojis durchsuchen ...",
                },
                en: oe,
                fi: {
                    "categories.activities": "Aktiviteetit",
                    "categories.animals-nature": "El\xE4imet & luonto",
                    "categories.custom": "Mukautettu",
                    "categories.flags": "Liput",
                    "categories.food-drink": "Ruoka & juoma",
                    "categories.objects": "Esineet",
                    "categories.people-body": "Ihmiset & keho",
                    "categories.recents": "Viimeksi k\xE4ytetty",
                    "categories.smileys-emotion": "Hymi\xF6t & tunne",
                    "categories.symbols": "Symbolit",
                    "categories.travel-places": "Matkustus & paikat",
                    "error.load": "Emojien lataaminen ep\xE4onnistui",
                    "recents.clear": "Tyhjenn\xE4 viimeksi k\xE4ytetyt emojit",
                    "recents.none": "Et ole valinnut viel\xE4 emojia.",
                    retry: "Kokeile uudestaan",
                    "search.clear": "Tyhjenn\xE4 haku",
                    "search.error": "Emojien etsiminen ep\xE4onnistui",
                    "search.notFound": "Emojia ei l\xF6ytynyt",
                    search: "Etsi emojia...",
                },
                fr: {
                    "categories.activities": "Activit\xE9s",
                    "categories.animals-nature": "Animaux et nature",
                    "categories.custom": "Personnalis\xE9",
                    "categories.flags": "Drapeaux",
                    "categories.food-drink": "Nourriture et boissons",
                    "categories.objects": "Objets",
                    "categories.people-body": "Personnes et corps",
                    "categories.recents": "R\xE9cemment utilis\xE9",
                    "categories.smileys-emotion": "Visages et \xE9motions",
                    "categories.symbols": "Symboles",
                    "categories.travel-places": "Voyages et lieux",
                    "error.load": "\xC9chec du chargement des \xE9mojis",
                    "recents.clear": "Effacez les \xE9mojis r\xE9cents",
                    "recents.none":
                        "Vous n'avez pas encore s\xE9lectionn\xE9 d'\xE9mojis.",
                    retry: "Essayez \xE0 nouveau",
                    "search.clear": "Effacer la recherche",
                    "search.error": "\xC9chec de la recherche d'\xE9mojis",
                    "search.notFound": "Aucun \xE9moji trouv\xE9",
                    search: "Rechercher des \xE9mojis...",
                },
                nl: {
                    "categories.activities": "Activiteiten",
                    "categories.animals-nature": "Dieren & Natuur",
                    "categories.custom": "Aangepast",
                    "categories.flags": "Vlaggen",
                    "categories.food-drink": "Eten & Drinken",
                    "categories.objects": "Voorwerpen",
                    "categories.people-body": "Mens & Lichaam",
                    "categories.recents": "Laatst gebruikt",
                    "categories.smileys-emotion": "Smileys en emoties",
                    "categories.symbols": "Symbolen",
                    "categories.travel-places": "Reizen & Plaatsen",
                    "error.load": "Kan emoji's niet laden",
                    "recents.clear": "Wis recente emoji's",
                    "recents.none": "Geen emoji geselecteerd.",
                    retry: "Probeer het nog eens",
                    "search.clear": "Zoekopdracht wissen",
                    "search.error": "Zoeken mislukt",
                    "search.notFound": "Geen emoji gevonden",
                    search: "Zoek emoji...",
                },
                no: {
                    "categories.activities": "Aktiviteter",
                    "categories.animals-nature": "Dyr & natur",
                    "categories.custom": "Tilpasset",
                    "categories.flags": "Flagg",
                    "categories.food-drink": "Mat & drikke",
                    "categories.objects": "Objekter",
                    "categories.people-body": "Mennesker & kropp",
                    "categories.recents": "Nylig brukte",
                    "categories.smileys-emotion": "Smilefjes & f\xF8lelser",
                    "categories.symbols": "Symboler",
                    "categories.travel-places": "Reise & steder",
                    "error.load": "Klarte ikke laste inn emojis",
                    "recents.clear": "Fjern nylige emojis",
                    "recents.none": "Du har ikke valgt noen emojis enda.",
                    retry: "Pr\xF8v igjen",
                    "search.clear": "T\xF8m s\xF8k",
                    "search.error": "Klarte ikke \xE5 s\xF8ke etter emojis",
                    "search.notFound": "Ingen emojis funnet",
                    search: "S\xF8k etter emojis...",
                },
                sv: {
                    "categories.activities": "Aktiviteter",
                    "categories.animals-nature": "Djur & natur",
                    "categories.custom": "Anpassad",
                    "categories.flags": "Flagga",
                    "categories.food-drink": "Mat & dryck",
                    "categories.objects": "Objekt",
                    "categories.people-body": "M\xE4nniskor & kropp",
                    "categories.recents": "Nyligen anv\xE4nd",
                    "categories.smileys-emotion": "Hum\xF6r & k\xE4nslor",
                    "categories.symbols": "Symboler",
                    "categories.travel-places": "Resor & platser",
                    "error.load": "Det gick inte att ladda emojis",
                    "recents.clear": "Ta bort de senaste emojis",
                    "recents.none": "Du har inte valt n\xE5gra emojis \xE4n",
                    retry: "F\xF6rs\xF6k igen",
                    "search.clear": "Tom s\xF6kning",
                    "search.error": "Det gick inte att s\xF6ka efter emojis",
                    "search.notFound": "Inga emojis hittades",
                    search: "S\xF6k efter emojis...",
                },
            },
            Symbol.toStringTag,
            { value: "Module" }
        )
    );
    class Vi extends De {
        constructor() {
            super(X() ? sessionStorage : Ve());
        }
    }
    class Di extends ae {
        constructor() {
            super(...arguments), (this.recents = []);
        }
        clear() {
            this.recents = [];
        }
        getRecents(e) {
            return this.recents.slice(0, e);
        }
        addOrUpdateRecent(e, t) {
            this.recents = [
                e,
                ...this.getRecents(t).filter((o) => o.hexcode !== e.hexcode),
            ].slice(0, t);
        }
    }
    async function Bi(i, e, t, o) {
        (await ie(i, e, t, o)).close();
    }
    (n.EmojiPicker = Ze),
        (n.Events = U),
        (n.FocusTrap = $e),
        (n.InMemoryProvider = Di),
        (n.InMemoryStoreFactory = te),
        (n.IndexedDbStoreFactory = re),
        (n.LocalStorageProvider = Be),
        (n.NativeRenderer = Me),
        (n.RecentsProvider = ae),
        (n.Renderer = Re),
        (n.SessionStorageProvider = Vi),
        (n.animate = S),
        (n.autoTheme = ut),
        (n.caseInsensitiveIncludes = Q),
        (n.computeHash = xe),
        (n.createDatabase = Bi),
        (n.createPicker = Ri),
        (n.createStyleInjector = Ye),
        (n.darkTheme = mt),
        (n.debounce = Ee),
        (n.deleteDatabase = dt),
        (n.empty = F),
        (n.en = oe),
        (n.getEmojiForEvent = D),
        (n.getOptions = Ne),
        (n.getPrefixedClasses = y),
        (n.globalConfig = Oe),
        (n.i18n = Mi),
        (n.isLocalStorageAvailable = Fe),
        (n.isSessionStorageAvailable = X),
        (n.lightTheme = Ae),
        (n.prefixClassName = N),
        (n.replaceChildren = j),
        (n.shouldAnimate = Y),
        (n.throttle = ke),
        (n.toElement = B),
        Object.defineProperties(n, {
            __esModule: { value: !0 },
            [Symbol.toStringTag]: { value: "Module" },
        });
});
//# sourceMappingURL=index.js.map
(function (T, b) {
    typeof exports == "object" && typeof module < "u"
        ? b(exports, require("picmo"))
        : typeof define == "function" && define.amd
        ? define(["exports", "picmo"], b)
        : ((T = typeof globalThis < "u" ? globalThis : T || self),
          b((T.picmoPopup = {}), T.picmo));
})(this, function (T, b) {
    "use strict";
    function _(t) {
        return t.split("-")[0];
    }
    function F(t) {
        return t.split("-")[1];
    }
    function H(t) {
        return ["top", "bottom"].includes(_(t)) ? "x" : "y";
    }
    function et(t) {
        return t === "y" ? "height" : "width";
    }
    function nt(t, e, n) {
        let { reference: i, floating: o } = t;
        const c = i.x + i.width / 2 - o.width / 2,
            r = i.y + i.height / 2 - o.height / 2,
            s = H(e),
            l = et(s),
            a = i[l] / 2 - o[l] / 2,
            d = _(e),
            f = s === "x";
        let u;
        switch (d) {
            case "top":
                u = { x: c, y: i.y - o.height };
                break;
            case "bottom":
                u = { x: c, y: i.y + i.height };
                break;
            case "right":
                u = { x: i.x + i.width, y: r };
                break;
            case "left":
                u = { x: i.x - o.width, y: r };
                break;
            default:
                u = { x: i.x, y: i.y };
        }
        switch (F(e)) {
            case "start":
                u[s] -= a * (n && f ? -1 : 1);
                break;
            case "end":
                u[s] += a * (n && f ? -1 : 1);
                break;
        }
        return u;
    }
    const vt = async (t, e, n) => {
        const {
                placement: i = "bottom",
                strategy: o = "absolute",
                middleware: c = [],
                platform: r,
            } = n,
            s = await (r.isRTL == null ? void 0 : r.isRTL(e));
        let l = await r.getElementRects({
                reference: t,
                floating: e,
                strategy: o,
            }),
            { x: a, y: d } = nt(l, i, s),
            f = i,
            u = {},
            h = 0;
        for (let m = 0; m < c.length; m++) {
            const { name: p, fn: w } = c[m],
                {
                    x: y,
                    y: g,
                    data: v,
                    reset: x,
                } = await w({
                    x: a,
                    y: d,
                    initialPlacement: i,
                    placement: f,
                    strategy: o,
                    middlewareData: u,
                    rects: l,
                    platform: r,
                    elements: { reference: t, floating: e },
                });
            if (
                ((a = y != null ? y : a),
                (d = g != null ? g : d),
                (u = { ...u, [p]: { ...u[p], ...v } }),
                x && h <= 50)
            ) {
                h++,
                    typeof x == "object" &&
                        (x.placement && (f = x.placement),
                        x.rects &&
                            (l =
                                x.rects === !0
                                    ? await r.getElementRects({
                                          reference: t,
                                          floating: e,
                                          strategy: o,
                                      })
                                    : x.rects),
                        ({ x: a, y: d } = nt(l, f, s))),
                    (m = -1);
                continue;
            }
        }
        return { x: a, y: d, placement: f, strategy: o, middlewareData: u };
    };
    function bt(t) {
        return { top: 0, right: 0, bottom: 0, left: 0, ...t };
    }
    function Ct(t) {
        return typeof t != "number"
            ? bt(t)
            : { top: t, right: t, bottom: t, left: t };
    }
    function I(t) {
        return {
            ...t,
            top: t.y,
            left: t.x,
            right: t.x + t.width,
            bottom: t.y + t.height,
        };
    }
    async function Q(t, e) {
        var n;
        e === void 0 && (e = {});
        const {
                x: i,
                y: o,
                platform: c,
                rects: r,
                elements: s,
                strategy: l,
            } = t,
            {
                boundary: a = "clippingAncestors",
                rootBoundary: d = "viewport",
                elementContext: f = "floating",
                altBoundary: u = !1,
                padding: h = 0,
            } = e,
            m = Ct(h),
            w = s[u ? (f === "floating" ? "reference" : "floating") : f],
            y = I(
                await c.getClippingRect({
                    element:
                        (n = await (c.isElement == null
                            ? void 0
                            : c.isElement(w))) == null || n
                            ? w
                            : w.contextElement ||
                              (await (c.getDocumentElement == null
                                  ? void 0
                                  : c.getDocumentElement(s.floating))),
                    boundary: a,
                    rootBoundary: d,
                    strategy: l,
                })
            ),
            g = I(
                c.convertOffsetParentRelativeRectToViewportRelativeRect
                    ? await c.convertOffsetParentRelativeRectToViewportRelativeRect(
                          {
                              rect:
                                  f === "floating"
                                      ? { ...r.floating, x: i, y: o }
                                      : r.reference,
                              offsetParent: await (c.getOffsetParent == null
                                  ? void 0
                                  : c.getOffsetParent(s.floating)),
                              strategy: l,
                          }
                      )
                    : r[f]
            );
        return {
            top: y.top - g.top + m.top,
            bottom: g.bottom - y.bottom + m.bottom,
            left: y.left - g.left + m.left,
            right: g.right - y.right + m.right,
        };
    }
    const Et = Math.min,
        Pt = Math.max;
    function ot(t, e, n) {
        return Pt(t, Et(e, n));
    }
    const At = { left: "right", right: "left", bottom: "top", top: "bottom" };
    function z(t) {
        return t.replace(/left|right|bottom|top/g, (e) => At[e]);
    }
    function it(t, e, n) {
        n === void 0 && (n = !1);
        const i = F(t),
            o = H(t),
            c = et(o);
        let r =
            o === "x"
                ? i === (n ? "end" : "start")
                    ? "right"
                    : "left"
                : i === "start"
                ? "bottom"
                : "top";
        return (
            e.reference[c] > e.floating[c] && (r = z(r)),
            { main: r, cross: z(r) }
        );
    }
    const Lt = { start: "end", end: "start" };
    function Z(t) {
        return t.replace(/start|end/g, (e) => Lt[e]);
    }
    const Ot = ["top", "right", "bottom", "left"].reduce(
        (t, e) => t.concat(e, e + "-start", e + "-end"),
        []
    );
    function Rt(t, e, n) {
        return (
            t
                ? [
                      ...n.filter((o) => F(o) === t),
                      ...n.filter((o) => F(o) !== t),
                  ]
                : n.filter((o) => _(o) === o)
        ).filter((o) => (t ? F(o) === t || (e ? Z(o) !== o : !1) : !0));
    }
    const kt = function (t) {
        return (
            t === void 0 && (t = {}),
            {
                name: "autoPlacement",
                options: t,
                async fn(e) {
                    var n, i, o, c, r;
                    const {
                            x: s,
                            y: l,
                            rects: a,
                            middlewareData: d,
                            placement: f,
                            platform: u,
                            elements: h,
                        } = e,
                        {
                            alignment: m = null,
                            allowedPlacements: p = Ot,
                            autoAlignment: w = !0,
                            ...y
                        } = t,
                        g = Rt(m, w, p),
                        v = await Q(e, y),
                        x =
                            (n =
                                (i = d.autoPlacement) == null
                                    ? void 0
                                    : i.index) != null
                                ? n
                                : 0,
                        P = g[x];
                    if (P == null) return {};
                    const { main: U, cross: G } = it(
                        P,
                        a,
                        await (u.isRTL == null ? void 0 : u.isRTL(h.floating))
                    );
                    if (f !== P)
                        return { x: s, y: l, reset: { placement: g[0] } };
                    const J = [v[_(P)], v[U], v[G]],
                        A = [
                            ...((o =
                                (c = d.autoPlacement) == null
                                    ? void 0
                                    : c.overflows) != null
                                ? o
                                : []),
                            { placement: P, overflows: J },
                        ],
                        D = g[x + 1];
                    if (D)
                        return {
                            data: { index: x + 1, overflows: A },
                            reset: { placement: D },
                        };
                    const V = A.slice().sort(
                            (k, j) => k.overflows[0] - j.overflows[0]
                        ),
                        $ =
                            (r = V.find((k) => {
                                let { overflows: j } = k;
                                return j.every((re) => re <= 0);
                            })) == null
                                ? void 0
                                : r.placement,
                        N = $ != null ? $ : V[0].placement;
                    return N !== f
                        ? {
                              data: { index: x + 1, overflows: A },
                              reset: { placement: N },
                          }
                        : {};
                },
            }
        );
    };
    function Tt(t) {
        const e = z(t);
        return [Z(t), e, Z(e)];
    }
    const Bt = function (t) {
        return (
            t === void 0 && (t = {}),
            {
                name: "flip",
                options: t,
                async fn(e) {
                    var n;
                    const {
                            placement: i,
                            middlewareData: o,
                            rects: c,
                            initialPlacement: r,
                            platform: s,
                            elements: l,
                        } = e,
                        {
                            mainAxis: a = !0,
                            crossAxis: d = !0,
                            fallbackPlacements: f,
                            fallbackStrategy: u = "bestFit",
                            flipAlignment: h = !0,
                            ...m
                        } = t,
                        p = _(i),
                        y = f || (p === r || !h ? [z(r)] : Tt(r)),
                        g = [r, ...y],
                        v = await Q(e, m),
                        x = [];
                    let P = ((n = o.flip) == null ? void 0 : n.overflows) || [];
                    if ((a && x.push(v[p]), d)) {
                        const { main: A, cross: D } = it(
                            i,
                            c,
                            await (s.isRTL == null
                                ? void 0
                                : s.isRTL(l.floating))
                        );
                        x.push(v[A], v[D]);
                    }
                    if (
                        ((P = [...P, { placement: i, overflows: x }]),
                        !x.every((A) => A <= 0))
                    ) {
                        var U, G;
                        const A =
                                ((U =
                                    (G = o.flip) == null ? void 0 : G.index) !=
                                null
                                    ? U
                                    : 0) + 1,
                            D = g[A];
                        if (D)
                            return {
                                data: { index: A, overflows: P },
                                reset: { placement: D },
                            };
                        let V = "bottom";
                        switch (u) {
                            case "bestFit": {
                                var J;
                                const $ =
                                    (J = P.map((N) => [
                                        N,
                                        N.overflows
                                            .filter((k) => k > 0)
                                            .reduce((k, j) => k + j, 0),
                                    ]).sort((N, k) => N[1] - k[1])[0]) == null
                                        ? void 0
                                        : J[0].placement;
                                $ && (V = $);
                                break;
                            }
                            case "initialPlacement":
                                V = r;
                                break;
                        }
                        if (i !== V) return { reset: { placement: V } };
                    }
                    return {};
                },
            }
        );
    };
    async function St(t, e) {
        const { placement: n, platform: i, elements: o } = t,
            c = await (i.isRTL == null ? void 0 : i.isRTL(o.floating)),
            r = _(n),
            s = F(n),
            l = H(n) === "x",
            a = ["left", "top"].includes(r) ? -1 : 1,
            d = c && l ? -1 : 1,
            f = typeof e == "function" ? e(t) : e;
        let {
            mainAxis: u,
            crossAxis: h,
            alignmentAxis: m,
        } = typeof f == "number"
            ? { mainAxis: f, crossAxis: 0, alignmentAxis: null }
            : { mainAxis: 0, crossAxis: 0, alignmentAxis: null, ...f };
        return (
            s && typeof m == "number" && (h = s === "end" ? m * -1 : m),
            l ? { x: h * d, y: u * a } : { x: u * a, y: h * d }
        );
    }
    const st = function (t) {
        return (
            t === void 0 && (t = 0),
            {
                name: "offset",
                options: t,
                async fn(e) {
                    const { x: n, y: i } = e,
                        o = await St(e, t);
                    return { x: n + o.x, y: i + o.y, data: o };
                },
            }
        );
    };
    function _t(t) {
        return t === "x" ? "y" : "x";
    }
    const rt = function (t) {
        return (
            t === void 0 && (t = {}),
            {
                name: "shift",
                options: t,
                async fn(e) {
                    const { x: n, y: i, placement: o } = e,
                        {
                            mainAxis: c = !0,
                            crossAxis: r = !1,
                            limiter: s = {
                                fn: (w) => {
                                    let { x: y, y: g } = w;
                                    return { x: y, y: g };
                                },
                            },
                            ...l
                        } = t,
                        a = { x: n, y: i },
                        d = await Q(e, l),
                        f = H(_(o)),
                        u = _t(f);
                    let h = a[f],
                        m = a[u];
                    if (c) {
                        const w = f === "y" ? "top" : "left",
                            y = f === "y" ? "bottom" : "right",
                            g = h + d[w],
                            v = h - d[y];
                        h = ot(g, h, v);
                    }
                    if (r) {
                        const w = u === "y" ? "top" : "left",
                            y = u === "y" ? "bottom" : "right",
                            g = m + d[w],
                            v = m - d[y];
                        m = ot(g, m, v);
                    }
                    const p = s.fn({ ...e, [f]: h, [u]: m });
                    return { ...p, data: { x: p.x - n, y: p.y - i } };
                },
            }
        );
    };
    function ct(t) {
        return t && t.document && t.location && t.alert && t.setInterval;
    }
    function L(t) {
        if (t == null) return window;
        if (!ct(t)) {
            const e = t.ownerDocument;
            return (e && e.defaultView) || window;
        }
        return t;
    }
    function C(t) {
        return L(t).getComputedStyle(t);
    }
    function O(t) {
        return ct(t) ? "" : t ? (t.nodeName || "").toLowerCase() : "";
    }
    function lt() {
        const t = navigator.userAgentData;
        return t != null && t.brands
            ? t.brands.map((e) => e.brand + "/" + e.version).join(" ")
            : navigator.userAgent;
    }
    function E(t) {
        return t instanceof L(t).HTMLElement;
    }
    function B(t) {
        return t instanceof L(t).Element;
    }
    function Dt(t) {
        return t instanceof L(t).Node;
    }
    function M(t) {
        if (typeof ShadowRoot > "u") return !1;
        const e = L(t).ShadowRoot;
        return t instanceof e || t instanceof ShadowRoot;
    }
    function X(t) {
        const { overflow: e, overflowX: n, overflowY: i } = C(t);
        return /auto|scroll|overlay|hidden/.test(e + i + n);
    }
    function Vt(t) {
        return ["table", "td", "th"].includes(O(t));
    }
    function at(t) {
        const e = /firefox/i.test(lt()),
            n = C(t);
        return (
            n.transform !== "none" ||
            n.perspective !== "none" ||
            n.contain === "paint" ||
            ["transform", "perspective"].includes(n.willChange) ||
            (e && n.willChange === "filter") ||
            (e && (n.filter ? n.filter !== "none" : !1))
        );
    }
    function ft() {
        return !/^((?!chrome|android).)*safari/i.test(lt());
    }
    const ut = Math.min,
        W = Math.max,
        Y = Math.round;
    function R(t, e, n) {
        var i, o, c, r;
        e === void 0 && (e = !1), n === void 0 && (n = !1);
        const s = t.getBoundingClientRect();
        let l = 1,
            a = 1;
        e &&
            E(t) &&
            ((l = (t.offsetWidth > 0 && Y(s.width) / t.offsetWidth) || 1),
            (a = (t.offsetHeight > 0 && Y(s.height) / t.offsetHeight) || 1));
        const d = B(t) ? L(t) : window,
            f = !ft() && n,
            u =
                (s.left +
                    (f &&
                    (i =
                        (o = d.visualViewport) == null
                            ? void 0
                            : o.offsetLeft) != null
                        ? i
                        : 0)) /
                l,
            h =
                (s.top +
                    (f &&
                    (c =
                        (r = d.visualViewport) == null
                            ? void 0
                            : r.offsetTop) != null
                        ? c
                        : 0)) /
                a,
            m = s.width / l,
            p = s.height / a;
        return {
            width: m,
            height: p,
            top: h,
            right: u + m,
            bottom: h + p,
            left: u,
            x: u,
            y: h,
        };
    }
    function S(t) {
        return (
            (Dt(t) ? t.ownerDocument : t.document) || window.document
        ).documentElement;
    }
    function K(t) {
        return B(t)
            ? { scrollLeft: t.scrollLeft, scrollTop: t.scrollTop }
            : { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset };
    }
    function dt(t) {
        return R(S(t)).left + K(t).scrollLeft;
    }
    function Nt(t) {
        const e = R(t);
        return Y(e.width) !== t.offsetWidth || Y(e.height) !== t.offsetHeight;
    }
    function Ft(t, e, n) {
        const i = E(e),
            o = S(e),
            c = R(t, i && Nt(e), n === "fixed");
        let r = { scrollLeft: 0, scrollTop: 0 };
        const s = { x: 0, y: 0 };
        if (i || (!i && n !== "fixed"))
            if (((O(e) !== "body" || X(o)) && (r = K(e)), E(e))) {
                const l = R(e, !0);
                (s.x = l.x + e.clientLeft), (s.y = l.y + e.clientTop);
            } else o && (s.x = dt(o));
        return {
            x: c.left + r.scrollLeft - s.x,
            y: c.top + r.scrollTop - s.y,
            width: c.width,
            height: c.height,
        };
    }
    function pt(t) {
        return O(t) === "html"
            ? t
            : t.assignedSlot || t.parentNode || (M(t) ? t.host : null) || S(t);
    }
    function ht(t) {
        return !E(t) || C(t).position === "fixed" ? null : Mt(t);
    }
    function Mt(t) {
        let { offsetParent: e } = t,
            n = t,
            i = !1;
        for (; n && n !== e; ) {
            const { assignedSlot: o } = n;
            if (o) {
                let c = o.offsetParent;
                if (C(o).display === "contents") {
                    const r = o.hasAttribute("style"),
                        s = o.style.display;
                    (o.style.display = C(n).display),
                        (c = o.offsetParent),
                        (o.style.display = s),
                        r || o.removeAttribute("style");
                }
                (n = o), e !== c && ((e = c), (i = !0));
            } else if (M(n) && n.host && i) break;
            n = (M(n) && n.host) || n.parentNode;
        }
        return e;
    }
    function Wt(t) {
        let e = pt(t);
        for (M(e) && (e = e.host); E(e) && !["html", "body"].includes(O(e)); ) {
            if (at(e)) return e;
            {
                const n = e.parentNode;
                e = M(n) ? n.host : n;
            }
        }
        return null;
    }
    function tt(t) {
        const e = L(t);
        let n = ht(t);
        for (; n && Vt(n) && C(n).position === "static"; ) n = ht(n);
        return n &&
            (O(n) === "html" ||
                (O(n) === "body" && C(n).position === "static" && !at(n)))
            ? e
            : n || Wt(t) || e;
    }
    function mt(t) {
        if (E(t)) return { width: t.offsetWidth, height: t.offsetHeight };
        const e = R(t);
        return { width: e.width, height: e.height };
    }
    function $t(t) {
        let { rect: e, offsetParent: n, strategy: i } = t;
        const o = E(n),
            c = S(n);
        if (n === c) return e;
        let r = { scrollLeft: 0, scrollTop: 0 };
        const s = { x: 0, y: 0 };
        if (
            (o || (!o && i !== "fixed")) &&
            ((O(n) !== "body" || X(c)) && (r = K(n)), E(n))
        ) {
            const l = R(n, !0);
            (s.x = l.x + n.clientLeft), (s.y = l.y + n.clientTop);
        }
        return {
            ...e,
            x: e.x - r.scrollLeft + s.x,
            y: e.y - r.scrollTop + s.y,
        };
    }
    function jt(t, e) {
        const n = L(t),
            i = S(t),
            o = n.visualViewport;
        let c = i.clientWidth,
            r = i.clientHeight,
            s = 0,
            l = 0;
        if (o) {
            (c = o.width), (r = o.height);
            const a = ft();
            (a || (!a && e === "fixed")) &&
                ((s = o.offsetLeft), (l = o.offsetTop));
        }
        return { width: c, height: r, x: s, y: l };
    }
    function Ht(t) {
        var e;
        const n = S(t),
            i = K(t),
            o = (e = t.ownerDocument) == null ? void 0 : e.body,
            c = W(
                n.scrollWidth,
                n.clientWidth,
                o ? o.scrollWidth : 0,
                o ? o.clientWidth : 0
            ),
            r = W(
                n.scrollHeight,
                n.clientHeight,
                o ? o.scrollHeight : 0,
                o ? o.clientHeight : 0
            );
        let s = -i.scrollLeft + dt(t);
        const l = -i.scrollTop;
        return (
            C(o || n).direction === "rtl" &&
                (s += W(n.clientWidth, o ? o.clientWidth : 0) - c),
            { width: c, height: r, x: s, y: l }
        );
    }
    function gt(t) {
        const e = pt(t);
        return ["html", "body", "#document"].includes(O(e))
            ? t.ownerDocument.body
            : E(e) && X(e)
            ? e
            : gt(e);
    }
    function q(t, e) {
        var n;
        e === void 0 && (e = []);
        const i = gt(t),
            o = i === ((n = t.ownerDocument) == null ? void 0 : n.body),
            c = L(i),
            r = o ? [c].concat(c.visualViewport || [], X(i) ? i : []) : i,
            s = e.concat(r);
        return o ? s : s.concat(q(r));
    }
    function It(t, e) {
        const n = e.getRootNode == null ? void 0 : e.getRootNode();
        if (t.contains(e)) return !0;
        if (n && M(n)) {
            let i = e;
            do {
                if (i && t === i) return !0;
                i = i.parentNode || i.host;
            } while (i);
        }
        return !1;
    }
    function zt(t, e) {
        const n = R(t, !1, e === "fixed"),
            i = n.top + t.clientTop,
            o = n.left + t.clientLeft;
        return {
            top: i,
            left: o,
            x: o,
            y: i,
            right: o + t.clientWidth,
            bottom: i + t.clientHeight,
            width: t.clientWidth,
            height: t.clientHeight,
        };
    }
    function wt(t, e, n) {
        return e === "viewport" ? I(jt(t, n)) : B(e) ? zt(e, n) : I(Ht(S(t)));
    }
    function Xt(t) {
        const e = q(t),
            i =
                ["absolute", "fixed"].includes(C(t).position) && E(t)
                    ? tt(t)
                    : t;
        return B(i) ? e.filter((o) => B(o) && It(o, i) && O(o) !== "body") : [];
    }
    function Yt(t) {
        let { element: e, boundary: n, rootBoundary: i, strategy: o } = t;
        const r = [...(n === "clippingAncestors" ? Xt(e) : [].concat(n)), i],
            s = r[0],
            l = r.reduce((a, d) => {
                const f = wt(e, d, o);
                return (
                    (a.top = W(f.top, a.top)),
                    (a.right = ut(f.right, a.right)),
                    (a.bottom = ut(f.bottom, a.bottom)),
                    (a.left = W(f.left, a.left)),
                    a
                );
            }, wt(e, s, o));
        return {
            width: l.right - l.left,
            height: l.bottom - l.top,
            x: l.left,
            y: l.top,
        };
    }
    const Kt = {
        getClippingRect: Yt,
        convertOffsetParentRelativeRectToViewportRelativeRect: $t,
        isElement: B,
        getDimensions: mt,
        getOffsetParent: tt,
        getDocumentElement: S,
        getElementRects: (t) => {
            let { reference: e, floating: n, strategy: i } = t;
            return {
                reference: Ft(e, tt(n), i),
                floating: { ...mt(n), x: 0, y: 0 },
            };
        },
        getClientRects: (t) => Array.from(t.getClientRects()),
        isRTL: (t) => C(t).direction === "rtl",
    };
    function qt(t, e, n, i) {
        i === void 0 && (i = {});
        const {
                ancestorScroll: o = !0,
                ancestorResize: c = !0,
                elementResize: r = !0,
                animationFrame: s = !1,
            } = i,
            l = o && !s,
            a = c && !s,
            d = l || a ? [...(B(t) ? q(t) : []), ...q(e)] : [];
        d.forEach((p) => {
            l && p.addEventListener("scroll", n, { passive: !0 }),
                a && p.addEventListener("resize", n);
        });
        let f = null;
        if (r) {
            let p = !0;
            (f = new ResizeObserver(() => {
                p || n(), (p = !1);
            })),
                B(t) && !s && f.observe(t),
                f.observe(e);
        }
        let u,
            h = s ? R(t) : null;
        s && m();
        function m() {
            const p = R(t);
            h &&
                (p.x !== h.x ||
                    p.y !== h.y ||
                    p.width !== h.width ||
                    p.height !== h.height) &&
                n(),
                (h = p),
                (u = requestAnimationFrame(m));
        }
        return (
            n(),
            () => {
                var p;
                d.forEach((w) => {
                    l && w.removeEventListener("scroll", n),
                        a && w.removeEventListener("resize", n);
                }),
                    (p = f) == null || p.disconnect(),
                    (f = null),
                    s && cancelAnimationFrame(u);
            }
        );
    }
    const Ut = (t, e, n) => vt(t, e, { platform: Kt, ...n });
    async function Gt(t, e, n, i) {
        if (!i) throw new Error("Must provide a positioning option");
        return await (typeof i == "string" ? Jt(t, e, n, i) : Qt(e, i));
    }
    async function Jt(t, e, n, i) {
        if (!n)
            throw new Error(
                "Reference element is required for relative positioning"
            );
        let o;
        return (
            i === "auto"
                ? (o = {
                      middleware: [
                          kt(),
                          rt(),
                          st({ mainAxis: 5, crossAxis: 12 }),
                      ],
                  })
                : (o = { placement: i, middleware: [Bt(), rt(), st(5)] }),
            qt(n, e, async () => {
                if ((!n.isConnected || !n.offsetParent) && Zt(t)) return;
                const { x: c, y: r } = await Ut(n, e, o);
                Object.assign(e.style, {
                    position: "absolute",
                    left: `${c}px`,
                    top: `${r}px`,
                });
            })
        );
    }
    function Qt(t, e) {
        return (
            (t.style.position = "fixed"),
            Object.entries(e).forEach(([n, i]) => {
                t.style[n] = i;
            }),
            () => {}
        );
    }
    function Zt(t) {
        switch (t.options.onPositionLost) {
            case "close":
                return t.close(), !0;
            case "destroy":
                return t.destroy(), !0;
            case "hold":
                return !0;
        }
    }
    const te = {
        hideOnClickOutside: !0,
        hideOnEmojiSelect: !0,
        hideOnEscape: !0,
        position: "auto",
        showCloseButton: !0,
        onPositionLost: "none",
    };
    function ee(t = {}) {
        return { ...te, rootElement: document.body, ...t };
    }
    const ne =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>',
        yt = b.getPrefixedClasses("popupContainer", "closeButton");
    class xt {
        constructor(e, n) {
            (this.isOpen = !1),
                (this.externalEvents = new b.Events()),
                (this.options = { ...ee(n), ...b.getOptions(e) }),
                (this.popupEl = document.createElement("div")),
                this.popupEl.classList.add(yt.popupContainer),
                this.popupEl.classList.add(this.options.theme),
                n.className && this.popupEl.classList.add(n.className),
                this.options.showCloseButton &&
                    ((this.closeButton = document.createElement("button")),
                    (this.closeButton.type = "button"),
                    this.closeButton.classList.add(yt.closeButton),
                    (this.closeButton.innerHTML = ne),
                    this.closeButton.addEventListener("click", () => {
                        this.close();
                    }),
                    this.popupEl.appendChild(this.closeButton));
            const i = document.createElement("div");
            this.popupEl.appendChild(i),
                (this.picker = b.createPicker({
                    ...this.options,
                    rootElement: i,
                })),
                (this.focusTrap = new b.FocusTrap()),
                this.picker.addEventListener("data:ready", () => {
                    this.focusTrap.activate(this.picker.el),
                        this.picker.setInitialFocus();
                }),
                this.options.hideOnEmojiSelect &&
                    this.picker.addEventListener("emoji:select", () => {
                        var o;
                        this.close(),
                            (o = this.triggerElement) == null || o.focus();
                    }),
                this.options.hideOnClickOutside &&
                    ((this.onDocumentClick = this.onDocumentClick.bind(this)),
                    document.addEventListener("click", this.onDocumentClick)),
                this.options.hideOnEscape &&
                    ((this.handleKeydown = this.handleKeydown.bind(this)),
                    this.popupEl.addEventListener(
                        "keydown",
                        this.handleKeydown
                    )),
                (this.referenceElement = this.options.referenceElement),
                (this.triggerElement = this.options.triggerElement);
        }
        addEventListener(e, n) {
            this.externalEvents.on(e, n), this.picker.addEventListener(e, n);
        }
        removeEventListener(e, n) {
            this.externalEvents.off(e, n),
                this.picker.removeEventListener(e, n);
        }
        handleKeydown(e) {
            var n;
            e.key === "Escape" &&
                (this.close(), (n = this.triggerElement) == null || n.focus());
        }
        async destroy() {
            this.isOpen && (await this.close()),
                document.removeEventListener("click", this.onDocumentClick),
                this.picker.destroy(),
                this.externalEvents.removeAll();
        }
        toggle(e) {
            return this.isOpen ? this.close() : this.open(e);
        }
        async open({ triggerElement: e, referenceElement: n } = {}) {
            this.isOpen ||
                (e && (this.triggerElement = e),
                n && (this.referenceElement = n),
                await this.initiateOpenStateChange(!0),
                (this.popupEl.style.opacity = "0"),
                this.options.rootElement.appendChild(this.popupEl),
                await this.setPosition(),
                this.picker.reset(!1),
                await this.animatePopup(!0),
                await this.animateCloseButton(!0),
                this.picker.setInitialFocus(),
                this.externalEvents.emit("picker:open"));
        }
        async close() {
            var e;
            !this.isOpen ||
                (await this.initiateOpenStateChange(!1),
                await this.animateCloseButton(!1),
                await this.animatePopup(!1),
                this.popupEl.remove(),
                this.picker.reset(),
                (e = this.positionCleanup) == null || e.call(this),
                this.focusTrap.deactivate(),
                this.externalEvents.emit("picker:close"));
        }
        getRunningAnimations() {
            return this.picker.el
                .getAnimations()
                .filter((e) => e.playState === "running");
        }
        async setPosition() {
            var e;
            (e = this.positionCleanup) == null || e.call(this),
                (this.positionCleanup = await Gt(
                    this,
                    this.popupEl,
                    this.referenceElement,
                    this.options.position
                ));
        }
        awaitPendingAnimations() {
            return Promise.all(
                this.getRunningAnimations().map((e) => e.finished)
            );
        }
        onDocumentClick(e) {
            var o;
            const n = e.target,
                i = (o = this.triggerElement) == null ? void 0 : o.contains(n);
            this.isOpen && !this.picker.isPickerClick(e) && !i && this.close();
        }
        animatePopup(e) {
            return b.animate(
                this.popupEl,
                { opacity: [0, 1], transform: ["scale(0.9)", "scale(1)"] },
                {
                    duration: 150,
                    id: e ? "show-picker" : "hide-picker",
                    easing: "ease-in-out",
                    direction: e ? "normal" : "reverse",
                    fill: "both",
                },
                this.options
            );
        }
        animateCloseButton(e) {
            if (this.closeButton)
                return b.animate(
                    this.closeButton,
                    { opacity: [0, 1] },
                    {
                        duration: 25,
                        id: e ? "show-close" : "hide-close",
                        easing: "ease-in-out",
                        direction: e ? "normal" : "reverse",
                        fill: "both",
                    },
                    this.options
                );
        }
        async initiateOpenStateChange(e) {
            (this.isOpen = e), await this.awaitPendingAnimations();
        }
    }
    const oe = `.picmo__popupContainer{display:flex;flex-direction:column;position:absolute}.picmo__popupContainer .picmo__closeButton{position:absolute;opacity:0;background:transparent;border:none;z-index:1;right:0;top:0;cursor:pointer;padding:4px;align-self:flex-end;transform:translate(50%,-50%);background:#999999;width:1.5rem;height:1.5rem;display:flex;align-items:center;justify-content:center;border-radius:50%}.picmo__popupContainer .picmo__closeButton:hover{background:var(--accent-color)}.picmo__popupContainer .picmo__closeButton svg{fill:#fff;width:1.25rem;height:1.25rem}
`,
        ie = b.createStyleInjector();
    function se(t, e) {
        return ie(oe), new xt({ autoFocus: "auto", ...t }, e);
    }
    (T.PopupPickerController = xt),
        (T.createPopup = se),
        Object.defineProperties(T, {
            __esModule: { value: !0 },
            [Symbol.toStringTag]: { value: "Module" },
        });
});
//# sourceMappingURL=index.js.map
