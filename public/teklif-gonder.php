<?php
/**
 * Quotation submission endpoint — shared-hosting replacement for the Next.js
 * route handler this site used on Vercel (`src/app/api/quote/route.ts`).
 *
 * The single rule this file exists to enforce is carried over unchanged from
 * that route: **a request is only reported as accepted once it has actually
 * been delivered somewhere.** An unconfigured deployment must refuse loudly
 * rather than thank a buyer for an enquiry it just dropped — a visitor who is
 * told the message failed can pick up the phone; one who is told it succeeded
 * cannot.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * WHAT THIS HOST CAN AND CANNOT DO — measured 2026-08-31, not assumed.
 *
 * A probe run on the live account reported:
 *
 *   disable_functions : … exec, passthru, pclose, popen, proc_*, shell_exec,
 *                       system, MAIL, SENDMAIL
 *   outbound SMTP     : 25 / 587 / 465 all hang until the server's own
 *                       connection timeout — silently dropped
 *   outbound HTTPS    : OPEN (curl + openssl present, verified with a real
 *                       request)
 *
 * So there is no local mail path at all: `mail()` is blocked, `sendmail` is
 * blocked, and every function that could shell out to the binary is blocked
 * too. Talking SMTP directly is equally impossible because the ports are
 * dropped. **The only way a message leaves this server is HTTPS**, so delivery
 * here is an HTTPS API call rather than a local mail call. That is a
 * consequence of the hosting plan, not a preference.
 *
 * Delivery runs through Brevo's transactional API, keyed from
 * `~/raymar-gizli.php` above the document root. Until that key exists this
 * endpoint has no working transport: it answers 503 and `stash()` writes the
 * enquiry to `~/teklif-yedek.jsonl` so nothing is lost while it is being set
 * up. The stash is a safety net on the failure path, never a success path —
 * a visitor told the message failed can pick up the phone.
 * ─────────────────────────────────────────────────────────────────────────
 */

// ── Configuration ────────────────────────────────────────────────────────────

/**
 * Secrets live ABOVE the document root and are never committed.
 *
 * `public/` is copied verbatim into the deployed site, so an API key written
 * into this file would be in the repository and one path away from being
 * served. This include is outside `public_html` entirely; if it is absent the
 * endpoint simply has no transport configured and refuses honestly, which is
 * the same behaviour as before any key existed.
 *
 * Expected shape — create `/home/<account>/raymar-gizli.php`:
 *
 *   <?php return [
 *       'brevo_api_key' => 'xkeysib-…',   // Brevo → SMTP & API → API Keys
 *       // 'webhook_url' => 'https://…',  // optional alternative
 *   ];
 */
$secrets = [];
$secretsPath = dirname(__DIR__) . '/raymar-gizli.php';
if (is_readable($secretsPath)) {
    $loaded = require $secretsPath;
    if (is_array($loaded)) {
        $secrets = $loaded;
    }
}

/**
 * Where enquiries are delivered. Empty = not configured = 503, never a lie.
 */
const QUOTE_TO_EMAIL = 'info@raymarnuts.com';

/**
 * The address the notification is sent FROM.
 *
 * With an HTTPS provider this must be an address that provider has verified —
 * a sender it has not verified is rejected outright, and one that is verified
 * but whose domain lacks the provider's SPF/DKIM records is accepted and then
 * filtered as spam. `info@` rather than `noreply@` because that mailbox
 * demonstrably exists and can complete a verification click; the buyer's own
 * address still goes in Reply-To, so replying from the inbox answers the buyer.
 */
const QUOTE_FROM_EMAIL = 'info@raymarnuts.com';

/** Per-IP limit, mirroring the Node route: 5 submissions per 10 minutes. */
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 600;

// ── Wire format ──────────────────────────────────────────────────────────────

header('Content-Type: application/json; charset=utf-8');
// The form is same-origin; no CORS header is emitted on purpose, so this
// endpoint cannot be driven from another site.

/** Mirrors the client's own reporting shape: `{ ok: boolean }`, nothing else. */
function respond(int $status, bool $ok): void {
    http_response_code($status);
    echo json_encode(['ok' => $ok]);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, false);
}

// ── Rate limiting ────────────────────────────────────────────────────────────

/**
 * Deliberately modest, exactly as the Node version was: a speed bump against
 * casual form-spam, not a real control. The honeypot is what actually stops
 * bots. File-backed because PHP has no cross-request memory on shared hosting.
 */
function rate_limited(string $ip): bool {
    $path = sys_get_temp_dir() . '/raymar-quote-' . sha1($ip) . '.txt';
    $now = time();

    $recent = [];
    if (is_readable($path)) {
        $raw = @file_get_contents($path);
        if ($raw !== false) {
            foreach (explode(',', $raw) as $stamp) {
                $stamp = (int) $stamp;
                if ($stamp > 0 && $now - $stamp < RATE_LIMIT_WINDOW) {
                    $recent[] = $stamp;
                }
            }
        }
    }

    $recent[] = $now;
    @file_put_contents($path, implode(',', $recent), LOCK_EX);

    return count($recent) > RATE_LIMIT_MAX;
}

function client_ip(): string {
    $forwarded = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? '';
    if ($forwarded !== '') {
        $first = trim(explode(',', $forwarded)[0]);
        if ($first !== '') return $first;
    }
    return $_SERVER['REMOTE_ADDR'] ?? 'unknown';
}

if (rate_limited(client_ip())) {
    respond(429, false);
}

// ── Parsing and validation ───────────────────────────────────────────────────

$raw = file_get_contents('php://input');
$body = json_decode($raw === false ? '' : $raw, true);

if (!is_array($body)) {
    respond(400, false);
}

/** Same caps as the Node route: generous for a real enquiry, bounded payload. */
$max_length = [
    'name' => 120,
    'company' => 160,
    'country' => 80,
    'email' => 200,
    'phone' => 40,
    'product' => 80,
    'message' => 4000,
];

$read = static function (array $body, string $key): string {
    $value = $body[$key] ?? '';
    return is_string($value) ? trim($value) : '';
};

$payload = [
    'name' => $read($body, 'name'),
    'company' => $read($body, 'company'),
    'country' => $read($body, 'country'),
    'email' => $read($body, 'email'),
    'phone' => $read($body, 'phone'),
    'product' => $read($body, 'product'),
    'message' => $read($body, 'message'),
];
$consent = ($body['consent'] ?? false) === true;
$honeypot = $read($body, 'website');

/*
 * The failure reason is never echoed back — the client already knows which
 * field it failed to fill, and a per-field oracle is free reconnaissance.
 */
foreach (['name', 'company', 'country', 'email', 'product', 'message'] as $field) {
    if ($payload[$field] === '') respond(400, false);
}
if (!filter_var($payload['email'], FILTER_VALIDATE_EMAIL)) respond(400, false);
if (!$consent) respond(400, false);
foreach ($max_length as $field => $limit) {
    if (mb_strlen($payload[$field]) > $limit) respond(400, false);
}

/*
 * Honeypot: accept-and-drop rather than reject.
 *
 * A bot that gets a 400 learns the field is checked and removes it next time.
 * A bot that gets a 200 learns nothing and moves on.
 */
if ($honeypot !== '') {
    respond(200, true);
}

// ── Delivery ─────────────────────────────────────────────────────────────────

function plain_text(array $p): string {
    return implode("\n", [
        'Ad Soyad : ' . $p['name'],
        'Firma    : ' . $p['company'],
        'Ülke     : ' . $p['country'],
        'E-posta  : ' . $p['email'],
        'Telefon  : ' . ($p['phone'] !== '' ? $p['phone'] : '—'),
        'Ürün     : ' . $p['product'],
        '',
        'Mesaj:',
        $p['message'],
    ]);
}

/**
 * Strips anything that could start a new header line.
 *
 * `name`, `company` and `product` are interpolated into the Subject and the
 * buyer's address into Reply-To. A raw CR/LF in any of them would let a
 * submitter append headers of their own — a Bcc to a spam list, most obviously
 * — and turn this form into an open relay. Everything else is body text, which
 * cannot inject.
 */
function header_safe(string $value): string {
    return trim(str_replace(["\r", "\n", "\0"], ' ', $value));
}

/** The subject line an operator sees in the inbox. */
function subject_line(array $payload): string {
    return sprintf(
        'Teklif talebi — %s (%s)',
        header_safe($payload['company']),
        header_safe($payload['product'])
    );
}

/**
 * One HTTPS POST, reporting whether the far end accepted it.
 *
 * Every transport below goes through here, so the timeout, the TLS
 * verification and the "2xx or it did not happen" rule are stated once. Ten
 * seconds is a deliberate ceiling: the visitor is waiting on this request, and
 * a provider that has not answered in ten seconds has effectively failed —
 * better to stash and tell the truth than to hold the page open.
 */
function https_post(string $url, string $body, array $headers): bool {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_SSL_VERIFYHOST => 2,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_POSTFIELDS => $body,
    ]);
    $response = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($status >= 200 && $status < 300) {
        return true;
    }

    /*
     * The provider's own words are worth keeping — "sender not verified",
     * "invalid api key" and "quota exceeded" all look identical from the
     * outside otherwise. The enquiry itself is never logged; only the failure.
     */
    error_log(sprintf(
        '[quote] transport rejected: HTTP %d %s %s',
        $status,
        $error,
        substr(is_string($response) ? $response : '', 0, 300)
    ));
    return false;
}

/** Brevo's transactional endpoint. HTTPS only — no SMTP, no local mail. */
function send_via_brevo(array $payload, string $apiKey): bool {
    return https_post(
        'https://api.brevo.com/v3/smtp/email',
        (string) json_encode([
            'sender' => ['name' => 'Raymar Nuts', 'email' => QUOTE_FROM_EMAIL],
            'to' => [['email' => QUOTE_TO_EMAIL]],
            // Hitting reply in the inbox answers the buyer, not the website.
            'replyTo' => [
                'email' => header_safe($payload['email']),
                'name' => header_safe($payload['name']),
            ],
            'subject' => subject_line($payload),
            'textContent' => plain_text($payload),
        ], JSON_UNESCAPED_UNICODE),
        ['Content-Type: application/json', 'accept: application/json', 'api-key: ' . $apiKey]
    );
}

/** Generic JSON relay — Zapier, Make, n8n, a CRM intake, Web3Forms. */
function send_via_webhook(array $payload, string $url): bool {
    return https_post(
        $url,
        (string) json_encode(
            $payload + ['subject' => subject_line($payload), 'receivedAt' => gmdate('c')],
            JSON_UNESCAPED_UNICODE
        ),
        ['Content-Type: application/json']
    );
}

/**
 * Returns true only on confirmed delivery; false makes the caller answer 503.
 *
 * Transports are tried in order and the first CONFIGURED one decides the
 * outcome — it does not fall through to the next on failure. Falling through
 * would mean a misconfigured primary silently sending every enquiry somewhere
 * the operator is not watching, which is the same class of quiet lie this file
 * exists to prevent.
 *
 * `mail()` is last and, on this host, permanently unreachable — kept so the
 * file still works unchanged if the site ever moves somewhere that allows local
 * mail. `is_callable` rather than `function_exists`: a function present but
 * named in `disable_functions` still fatals when called, and that fatal is what
 * once turned an honest 503 into a bare 500.
 *
 * Nothing here writes the enquiry to disk. `stash()` below does that, on the
 * failure path only, and it deliberately does not make the failure look like a
 * success — see its own comment.
 */
function deliver(array $payload, array $secrets): bool {
    if (!empty($secrets['brevo_api_key'])) {
        return send_via_brevo($payload, (string) $secrets['brevo_api_key']);
    }

    if (!empty($secrets['webhook_url'])) {
        return send_via_webhook($payload, (string) $secrets['webhook_url']);
    }

    if (QUOTE_TO_EMAIL !== '' && is_callable('mail')) {
        $headers = implode("\r\n", [
            'From: Raymar Nuts <' . QUOTE_FROM_EMAIL . '>',
            'Reply-To: ' . header_safe($payload['email']),
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: 8bit',
            'MIME-Version: 1.0',
        ]);
        return mail(
            QUOTE_TO_EMAIL,
            '=?UTF-8?B?' . base64_encode(subject_line($payload)) . '?=',
            plain_text($payload),
            $headers,
            '-f' . QUOTE_FROM_EMAIL
        );
    }

    error_log(
        '[quote] no transport available — this host blocks mail()/sendmail and '
        . 'no API key is present in raymar-gizli.php'
    );
    return false;
}

/**
 * Last-resort store for an enquiry that could not be delivered.
 *
 * This is a safety net, not a delivery channel, and it deliberately does not
 * turn a failure into a success: the caller still answers 503 and the visitor
 * is still told to use another channel. What it buys is that the enquiry is not
 * gone. When the transport is down — an expired key, a provider outage, or the
 * key file simply not created yet — every submission made in the meantime would
 * otherwise vanish the moment the response was written.
 *
 * Written ABOVE the document root, never inside `public_html`: this is the
 * personal data the KVKK notice says only authorised staff see, so it must not
 * be fetchable over HTTP even by exact filename. `0600` so it is readable only
 * by the account itself, JSON-lines so it can be appended atomically and read
 * without parsing state.
 *
 * Returns false if it could not even do this, so the caller can say so.
 */
function stash(array $payload): bool {
    $path = dirname(__DIR__) . '/teklif-yedek.jsonl';
    $line = json_encode(
        $payload + ['receivedAt' => gmdate('c')],
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    );
    if ($line === false) {
        return false;
    }

    $written = @file_put_contents($path, $line . "\n", FILE_APPEND | LOCK_EX);
    if ($written === false) {
        return false;
    }
    @chmod($path, 0600);
    return true;
}

if (!deliver($payload, $secrets)) {
    /*
     * The payload is never written to the error log — that is a shared host's
     * log, not the "authorised staff only" the KVKK notice promises. It goes to
     * the account-private stash above instead, and only the fact of the failure
     * is logged here.
     */
    error_log(
        stash($payload)
            ? '[quote] delivery failed — enquiry stashed to ~/teklif-yedek.jsonl'
            : '[quote] delivery failed AND could not be stashed — enquiry lost'
    );
    respond(503, false);
}

respond(200, true);
