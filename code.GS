// ============================================================
//  Lumière Salon Nairobi — Code.gs
//  Google Apps Script Web App — Booking Capture Backend
// ============================================================
//
//  HOW TO DEPLOY (one-time setup, ~5 minutes):
//
//  1. Open Google Sheets → create a new spreadsheet.
//     Name it "Lumière Salon – Bookings".
//
//  2. Extensions → Apps Script
//
//  3. Delete any existing code and paste THIS entire file.
//
//  4. Set NOTIFY_EMAIL below to receive instant booking alerts.
//
//  5. Deploy → New Deployment:
//       Type          → Web App
//       Execute as    → Me
//       Who has access → Anyone
//     Click Deploy → copy the Web App URL.
//
//  6. Paste that URL into script.js as SHEETS_WEBHOOK_URL.
//
//  7. Done! Every booking writes a new row instantly.
// ============================================================

// ─── CONFIGURATION ───────────────────────────────────────────
var SHEET_NAME   = 'Bookings';
var NOTIFY_EMAIL = '';                        // e.g. 'salon@lumiere.co.ke'
var EMAIL_SUBJECT = '💄 New Salon Booking — Lumière';
// ─────────────────────────────────────────────────────────────

/**
 * Receives POST from the website booking form.
 */
function doPost(e) {
  try {
    var p = e.parameter;

    var name      = p.name          || '';
    var phone     = p.phone         || '';
    var service   = p.service       || 'Not specified';
    var date      = p.preferredDate || 'Not specified';
    var time      = p.preferredTime || 'Any time';
    var notes     = p.notes         || '—';
    var timestamp = p.submittedAt   || new Date().toLocaleString();
    var pageUrl   = p.pageUrl       || '—';
    var userAgent = p.userAgent     || '—';

    // Server-side validation
    if (!name || !phone || !service) {
      return jsonResponse({ result: 'error', error: 'Name, phone, and service are required.' });
    }

    // Get or create the sheet
    var ss    = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);

      // Header row
      sheet.appendRow([
        'Timestamp (Nairobi)',
        'Client Name',
        'Phone',
        'Service',
        'Preferred Date',
        'Preferred Time',
        'Notes',
        'Status',
        'Stylist Assigned',
        'Page URL',
        'Device',
      ]);

      // Style the header
      var hdr = sheet.getRange(1, 1, 1, 11);
      hdr.setFontWeight('bold');
      hdr.setBackground('#1a1209');
      hdr.setFontColor('#c9a84c');
      sheet.setFrozenRows(1);

      // Column widths
      sheet.setColumnWidth(1, 200);  // Timestamp
      sheet.setColumnWidth(2, 180);  // Name
      sheet.setColumnWidth(3, 150);  // Phone
      sheet.setColumnWidth(4, 200);  // Service
      sheet.setColumnWidth(5, 140);  // Date
      sheet.setColumnWidth(6, 130);  // Time
      sheet.setColumnWidth(7, 280);  // Notes
      sheet.setColumnWidth(8, 120);  // Status
      sheet.setColumnWidth(9, 160);  // Stylist
      sheet.setColumnWidth(10, 200); // URL
      sheet.setColumnWidth(11, 300); // Device
    }

    // Detect device type from user agent
    var device = 'Desktop';
    if (/android|iphone|ipad|mobile/i.test(userAgent)) device = 'Mobile';

    // Append new booking row
    sheet.appendRow([
      timestamp,
      name,
      phone,
      service,
      date,
      time,
      notes,
      'New',        // Status — update to: Confirmed / Rescheduled / Completed / No-Show
      '',           // Stylist Assigned — fill in manually
      pageUrl,
      device,
    ]);

    // Colour-code new rows for quick scanning (light gold tint)
    var lastRow  = sheet.getLastRow();
    var newRange = sheet.getRange(lastRow, 1, 1, 11);
    newRange.setBackground('#fdf8ec');

    // Optional: email notification
    if (NOTIFY_EMAIL) {
      var body =
        '✨ New Booking at Lumière Salon\n\n' +
        'Client  : ' + name    + '\n' +
        'Phone   : ' + phone   + '\n' +
        'Service : ' + service + '\n' +
        'Date    : ' + date    + '\n' +
        'Time    : ' + time    + '\n' +
        'Notes   : ' + notes   + '\n\n' +
        'Booked at: ' + timestamp + '\n\n' +
        'Open spreadsheet: ' + ss.getUrl();

      MailApp.sendEmail(NOTIFY_EMAIL, EMAIL_SUBJECT, body);
    }

    return jsonResponse({ result: 'success' });

  } catch (err) {
    Logger.log('doPost error: ' + err.message);
    return jsonResponse({ result: 'error', error: err.message });
  }
}


/**
 * Health check — visit the Web App URL in a browser to confirm it's live.
 */
function doGet() {
  return HtmlService.createHtmlOutput(
    '<h2 style="font-family:Georgia,serif;color:#c9a84c;padding:40px">✓ Lumière Salon – Booking Webhook is Live</h2>' +
    '<p style="font-family:sans-serif;padding:0 40px;color:#4a3728">POST booking data here to log appointments.</p>'
  );
}


/**
 * JSON response helper with correct MIME type.
 */
function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
